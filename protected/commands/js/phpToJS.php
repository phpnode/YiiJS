<?php
/**
 * A woefully naive, context unaware PHP to JavaScript token transformer.
 * Relies on php.js for a lot of the built in PHP functions.
 * HERE BE DRAGONS!
 * THIS IS A BUNCH OF STRING AND ARRAY FUNCTIONS THROWN
 * TOGETHER WHEN I SHOULD HAVE BEEN WORKING ON SOMETHING MORE 
 * IMPORTANT. THE CODE PRODUCED IS OFTEN MANGLED AND AWFUL!
 * ... sorry for shouting, but you're going to have to check generated code
 * very closely, major problems:
 * 					Strings containing $variables will be mangled
 * 					Casting doesn't really work very well
 * 					Calls to parent classes will be broken
 * 					$_GET/$_POST etc dont work, won't work, can't work
 * 					Written with Yii in mind, not often suitable for other codebases
 * 
 * "60% of the time it works every time."
 * 
 * Usage:
 * <pre>
 * $converter = new phpToJS;
 * $classToConvert = new phpClass("SomeClassName");
 * echo $test->convert();
 * </pre>
 * 
 * @author Charles Pick, but I'm ashamed.
 * 
 */
class phpToJS extends CComponent {
	/**
	 * A list of declared variables
	 * @var array
	 */
	public $declaredVars = array();
	/**
	 * An array of PHP tokens and their corresponding JS mappings
	 * @var array
	 */
	public static $tokenMap = array(
			"." => "+",
			"]" => array("convertArrayPush"),
			T_NEW => array("convertNew"),
			T_STRING_CAST => array("convertCast"),
			T_BOOL_CAST => array("convertCast"),
			T_ARRAY_CAST => array("convertCast"),
			T_DOUBLE_CAST => array("convertCast"),
			T_INT_CAST => array("convertCast"),
			T_ARRAY => array("convertArray"),
			T_FOREACH => array("convertForEach"),
			T_IF => array("convertIf","type" => "if"),
			T_ELSE => array("convertElse"),
			T_ELSEIF => array("convertIf","type" => "elseif"),
			T_VARIABLE => array("convertVariable"),
			T_STRING => array("convertFunction"),
			T_CATCH => array("convertFunction"),
			T_ISSET => array("convertFunction"),
			T_UNSET => array("convertFunction"),
			T_EMPTY => array("convertFunction"),
			T_ECHO => array("convertEcho"),
			T_LIST => array("convertList"),
			T_RETURN => array("convertReturn"),
			T_COMMENT => array("convertComment"),
			T_OBJECT_OPERATOR => ".",
			T_CONCAT_EQUAL => "+=",
			T_DOUBLE_ARROW => ":",
			T_DOUBLE_COLON => ".",
			T_STATIC => "",
			T_OPEN_TAG => "",
			"@" => "",
		);
	/**
	 * An array of PHP functions and their corresponding JS equivalents
	 * @var array
	 */
	public static $functionMap = array(
		"print_r" => "console.log",
		"implode" => array(2 => "{1}.join({0})"),
		"explode" => array(2 => "{1}.split({0})"),
		"preg_match" => array(2 => "{0}.exec({1})"),
		"preg_replace" => array(2 => "{2}.replace({0},{1})"),
		"preg_replace_callback" => array(2 => "{2}.replace({0},Yii.getFunction({1}))"),
		"preg_split" => array(2 => "{1}.split({0})"),
		"strtolower" => array(1 => "{0}.toLowerCase()"),
		"strtoupper" => array(1 => "{0}.toUpperCase()"),
		"is_string" => array(1 => "typeof({0}) === 'string'"),
		"!is_string" => array(1 => "typeof({0}) !== 'string'"),
		"is_array" => array(1 => "Object.prototype.toString.call({0}) === '[object Array]'"),
		"!is_array" => array(1 => "Object.prototype.toString.call({0}) !== '[object Array]'"),
		"is_bool" => array(1 => "typeof({0}) === 'boolean'"),
		"!is_bool" => array(1 => "typeof({0}) !== 'boolean'"),
		"is_int" => array(1 => "(typeof({0}) === 'number' && ({0} % 1 ? false : true))"),
		"!is_int" => array(1 => "(typeof({0}) !== 'number' || ({0} % 1 ? true : false))"),
		"is_integer" => array(1 => "(typeof({0}) === 'number' && ({0} % 1 ? false : true))"),
		"!is_integer" => array(1 => "(typeof({0}) !== 'number' || ({0} % 1 ? true : false))"),
		"is_float" => array(1 => "(typeof({0}) === 'number' && ({0} % 1 ? true : false))"),
		"!is_float" => array(1 => "(typeof({0}) !== 'number' || ({0} % 1 ? false : true))"),
		"is_object" => array(1 => "(!{0} instanceof Array && {0} !== null && typeof({0}) === 'object')"),
		"!is_object" => array(1 => "({0} instanceof Array || {0} === null || typeof({0}) !== 'object')"),
		
		"substr" => array(2 => "{0}.slice({1})", 3 => "{0}.slice({1}, {2})"),
		"count" => array(1 => "{0}.length"),
		"strlen" => array(1 => "String({0}).length"),
		"isset" => array(1 => "{0} !== undefined"),
		"!isset" => array(1 => "{0} === undefined"),
		"unset" => array(1 => "delete {0}"),
		
		"method_exists" => array(2 => "{0}[{1}] !== undefined"),
		"property_exists" => array(2 => "{0}[{1}] !== undefined"),
		'get_class' => array(1 => "{0}.getClassName()"),
		"__get" => "get",
		"__set" => "set",
		"__isset" => "isset",
		"__unset" => "unset",
		"__call" => "call",
		"self" => "this",
		"DIRECTORY_SEPARATOR" => "'/'",
		"func_num_args" => "arguments.length",
		"func_get_args" => "arguments",
		
		"catch" => array(1 => "catch({0})"),
		"import" => "imports",
		"mt_rand" => "php.mt_rand",
		"rtrim" => "php.rtrim",
		"ini_set" => "php.ini_set",
		"ini_get" => "php.ini_get",
		"ctype_digit" => "php.ctype_digit",
		"gmmktime" => "php.gmmktime",
		"getdate" => "php.getdate",
		"checkdate" => "php.checkdate",
		"gmdate" => "php.gmdate",
		"strrpos" => "php.strrpos",
		'array_chunk' => 'php.array_chunk',
		'array_combine' => 'php.array_combine',
		'array_diff' => 'php.array_diff',
		'array_fill' => 'php.array_fill',
		'array_fill_keys' => 'php.array_fill_keys',
		'array_filter' => 'php.array_filter',
		'array_flip' => 'php.array_flip',
		'array_intersect' => 'php.array_intersect',
		'array_key_exists' => 'php.array_key_exists',
		'array_keys' => 'php.array_keys',
		'array_map' => 'php.array_map',
		'array_merge' => 'php.array_merge',
		'array_merge_recursive' => 'php.array_merge_recursive',
		'array_pop' => 'php.array_pop',
		'array_push' => 'php.array_push',
		'array_reduce' => 'php.array_reduce',
		'array_reverse' => 'php.array_reverse',
		'array_shift' => 'php.array_shift',
		'array_slice' => 'php.array_slice',
		'array_splice' => 'php.array_splice',
		'array_sum' => 'php.array_sum',
		'array_unique' => 'php.array_unique',
		'array_unshift' => 'php.array_unshift',
		'array_values' => 'php.array_values',
		'array_walk' => 'php.array_walk',
		'array_walk_recursive' => 'php.array_walk_recursive',
		'arsort' => 'php.arsort',
		'asort' => 'php.asort',
		'compact' => 'php.compact',
		'count' => 'php.count',
		'end' => 'php.end',
		'extract' => 'php.extract',
		'in_array' => 'php.in_array',
		'krsort' => 'php.krsort',
		'ksort' => 'php.ksort',
		'natcasesort' => 'php.natcasesort',
		'natsort' => 'php.natsort',
		'range' => 'php.range',
		'reset' => 'php.reset',
		'rsort' => 'php.rsort',
		'shuffle' => 'php.shuffle',
		'sizeof' => 'php.sizeof',
		'sort' => 'php.sort',
		'uasort' => 'php.uasort',
		'uksort' => 'php.uksort',
		'usort' => 'php.usort',
		'class_exists' => 'php.class_exists',
		
		'method_exists' => 'php.method_exists',
		'property_exists' => 'php.property_exists',
		'date' => 'php.date',
		'microtime' => 'php.microtime',
		'mktime' => 'php.mktime',
		'strtotime' => 'php.strtotime',
		'time' => 'php.time',
		'basename' => 'php.basename',
		'dirname' => 'php.dirname',
		'call_user_func' => 'php.call_user_func',
		'call_user_func_array' => 'php.call_user_func_array',
		'abs' => 'php.abs',
		'base_convert' => 'php.base_convert',
		'ceil' => 'php.ceil',
		'floor' => 'php.floor',
		'max' => 'php.max',
		'min' => 'php.min',
		'rand' => 'php.rand',
		'round' => 'php.round',
		'setcookie' => 'php.setcookie',
		'setrawcookie' => 'php.setrawcookie',
		'addcslashes' => 'php.addcslashes',
		'addslashes' => 'php.addslashes',
		'chr' => 'php.chr',
		'crc32' => 'php.crc32',
		'get_html_translation_table' => 'php.get_html_translation_table',
		'html_entity_decode' => 'php.html_entity_decode',
		'htmlentities' => 'php.htmlentities',
		'htmlspecialchars' => 'php.htmlspecialchars',
		'htmlspecialchars_decode' => 'php.htmlspecialchars_decode',
		'lcfirst' => 'php.lcfirst',
		'ltrim' => 'php.ltrim',
		'md5' => 'php.md5',
		'nl2br' => 'php.nl2br',
		'number_format' => 'php.number_format',
		'ord' => 'php.ord',
		'parse_str' => 'php.parse_str',
		'printf' => 'php.printf',
		'quotemeta' => 'php.quotemeta',
		'sha1' => 'php.sha1',
		'sprintf' => 'php.sprintf',
		'str_ireplace' => 'php.str_ireplace',
		'str_pad' => 'php.str_pad',
		'str_repeat' => 'php.str_repeat',
		'str_replace' => 'php.str_replace',
		'str_word_count' => 'php.str_word_count',
		'strcasecmp' => 'php.strcasecmp',
		'strcmp' => 'php.strcmp',
		'strcspn' => 'php.strcspn',
		'strip_tags' => 'php.strip_tags',
		'stripos' => 'php.stripos',
		'stripslashes' => 'php.stripslashes',
		'stristr' => 'php.stristr',
		'strlen' => 'php.strlen',
		'strnatcasecmp' => 'php.strnatcasecmp',
		'strnatcmp' => 'php.strnatcmp',
		'strncasecmp' => 'php.strncasecmp',
		'strncmp' => 'php.strncmp',
		'strpos' => 'php.strpos',
		'strtok' => 'php.strtok',
		'strtr' => 'php.strtr',
		'substr_compare' => 'php.substr_compare',
		'substr_count' => 'php.substr_count',
		'substr_replace' => 'php.substr_replace',
		'trim' => 'php.trim',
		'ucfirst' => 'php.ucfirst',
		'ucwords' => 'php.ucwords',
		'base64_decode' => 'php.base64_decode',
		'base64_encode' => 'php.base64_encode',
		'http_build_query' => 'php.http_build_query',
		'parse_url' => 'php.parse_url',
		'urldecode' => 'php.urldecode',
		'urlencode' => 'php.urlencode',
		'empty' => 'php.empty',
		'gettype' => 'php.gettype',
		'intval' => 'php.intval',
		'is_callable' => 'php.is_callable',
		'is_float' => 'php.is_float',
		'is_int' => 'php.is_int',
		'utf8_decode' => 'php.utf8_decode',
		'utf8_encode' => 'php.utf8_encode'
	);	
	
	/**
	 * Converts an array of PHP tokens to JavaScript tokens where possible
	 * @param array $tokens the PHP tokens to convert
	 * @return array The JavaScript tokens
	 */
	public function convertTokens($tokens) {
		
		for($i = array_shift(array_keys($tokens)); $i < count($tokens); $i++ ) {
			$token = $tokens[$i];
			if (is_array($token) && isset(self::$tokenMap[$token[0]])) { 
				$map = self::$tokenMap[$token[0]];
				if (is_array($map)) {
					$funcName = array_shift($map);
					$tokens = $this->{$funcName}($i,$tokens,$map);
				}
				else {
					$tokens[$i][1] = $map;
				}
			}
			elseif (!is_array($token) && isset(self::$tokenMap[$token])) {
				$map = self::$tokenMap[$token];
				if (is_array($map)) {
					$funcName = array_shift($map);
					$tokens = $this->{$funcName}($i,$tokens,$map);
				}
				else {
					$tokens[$i] = $map;
				}
			}
		}
		return $tokens;
	}
	
	/**
	 * Converts a PHP function call to it's JavaScript equivalent if possible
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertFunction($pos, $tokens, $params = array()) {
		$funcName = strtolower($tokens[$pos][1]);
		
		// see if this is a not
		$not = false;
		$last = $pos - 1;
		if (isset($tokens[$last]) && $tokens[$last] == "!") {
			$not = true;
		}
		elseif(isset($tokens[$last]) && is_array($tokens[$last]) && $tokens[$last][0] == T_WHITESPACE) {
			$last -= 1;
			if (isset($tokens[$last]) && $tokens[$last] == "!") {
				$not = true;
			}
		}
		if ($not) {
			if (isset(self::$functionMap["!".$funcName])) {
				$funcName = "!".$funcName;
				$tokens[$last] = "";
			}
		}
		if (isset(self::$functionMap[$funcName])) {
			
			if (is_array(self::$functionMap[$funcName])) {
				
				$stream = array();
				$methodParams = array();
				$bracketStack = array();
				$stack = array();
				for($i = $pos + 1; $i < count($tokens); $i++) {
					$stream[] = $i;
					$token = $tokens[$i];
					switch($token) {
						case "(":
							$bracketStack[] = $i;
							if (count($bracketStack) == 1) {
								continue 2;
							}
							break;
						case ")":
							$lastBracket = array_pop($bracketStack);
							if (count($bracketStack) == 0) {
								if (count($stack)) {
									$methodParams[] = $stack;
								}
								break 2;
							}
							break;
						case ",":
							if (count($bracketStack) == 1) {
								$methodParams[] = $stack;
								$stack = array();
								continue 2;
							}
							break;
						
					}
					
					$stack[] = $token;
				}
				$outTokens = array();
				$template = array();
				foreach($methodParams as $n => $p) {
					$template["{".$n."}"] = $this->printTokens($this->convertTokens($p));
				}
				$which = count($methodParams);
				if (!isset(self::$functionMap[$funcName][$which])) {
					$which = max(array_keys(self::$functionMap[$funcName]));
				}
				
				if ($funcName == "catch" && count($template) == 1) {
					if (strstr($template["{0}"]," ")) {
						$template["{0}"] = array_pop(explode(" ",$template["{0}"]));
					}
				}
				$tokens[$pos][1] = trim(strtr(self::$functionMap[$funcName][$which],$template));
				
				foreach($stream as $k) {
					$tokens[$k] = "";
				} 
			}
			else {
				$tokens[$pos][1] = self::$functionMap[$funcName];
			}
		}
		else {
			
			if (substr($tokens[$pos][1],0,1) == "C") {
				$tokens[$pos][1] = "Yii.".$tokens[$pos][1];
			}
			
		}
		return $tokens;
	}
	
	/**
	 * Converts a PHP echo to a JavaScript document.write()
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertEcho($pos, $tokens, $params = array()) {
		$tokens[$pos] = "document.write(";
		$nextIsWhitespace = true;
		for($i = $pos + 1; $i < count($tokens); $i++) {
			if ($nextIsWhitespace) {
				if (is_array($tokens[$i]) && $tokens[$i][0] == T_WHITESPACE) {
					$tokens[$i] = "";
				}
				elseif ($tokens[$i] == " ") {
					$tokens[$i] = "";
				}
				$nextIsWhitespace = false;
			}
			if (!is_array($tokens[$i]) && substr($tokens[$i],0,1) == ";") {
				$tokens[$i] = ")".$tokens[$i];
				break;
			}
			
		}
		return $tokens;
	}
	
	/**
	 * Converts a PHP list() to a series of JavaScript statements
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertList($pos, $tokens, $params = array()) {
		$stream = array();
		$methodParams = array();
		$bracketStack = array();
		$stack = array();
		
		for($i = $pos + 1; $i < count($tokens); $i++) {
			$stream[] = $i;
			$token = $tokens[$i];
			switch($token) {
				case "(":
					$bracketStack[] = $i;
					if (count($bracketStack) == 1) {
						continue 2;
					}
					break;
				case ")":
					$lastBracket = array_pop($bracketStack);
					if (count($bracketStack) == 0) {
						if (count($stack)) {
							$methodParams[] = $stack;
						}
						break 2;
					}
					break;
				case ",":
					if (count($bracketStack) == 1) {
						$methodParams[] = $stack;
						$stack = array();
						continue 2;
					}
					break;
				
			}
			
			$stack[] = $token;
		}
		$eqSign = null;
		$lastStatement = null;
		$statement = array();
		$isMethod = false;
		for($i = $pos + count($stream); $i < count($tokens); $i++) {
			$token = $tokens[$i];
			switch($token) {
				case "=":
					if (!$eqSign) {
						$eqSign = $i;
						$tokens[$i] = "";
					}
					break;
				case ";":
					$lastStatement = $i;
					$tokens[$i] = "";
					break 2;
				default:
					if ($eqSign) {
						if (!is_array($token) && stristr($token,"(")) {
							$isMethod = true;
						}
						$statement[] = $token;
						$tokens[$i] = "";
					}
					break;
			}
		}
		if ($isMethod) {
			$varName = "list";
			if (!isset($this->declaredVars[$varName])) {
				$this->declaredVars[$varName] = $varName;
			}
		
			$tokens[$pos] = $varName." = ";
			$tokens[array_shift($stream)] = $this->printTokens($this->convertTokens($statement)).";\n";
		}
		else {
			$tokens[$pos] = "";
			$varName = $this->printTokens($this->convertTokens($statement));
		}
		
		foreach($methodParams as $n => $param) {
			$v = $this->printTokens($this->convertTokens($param));
			$tokens[array_shift($stream)] = "\t\t".$v." = ".$varName."[".$n."];\n";
		}
		foreach($stream as $k) {
			$tokens[$k] = "";
		} 
		return $tokens;
	}
	/**
	 * Converts a PHP return to a JavaScript return, splits assignments which
	 * are not allowed in JavaScript returns
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertReturn($pos, $tokens, $params = array()) {
		$limit = count($tokens);
		$bracketStack = array();
		$matchToken = null;
		$openBrackets = array();
		$closeBrackets = array();
		$nextIsVal = null;
		$ifLine = null;
		$firstBracket = null;
		$lastBracket = null;
		
		$whiteSpace = null;
		$bracketToken = null;
		$lastStatement = null;
		$eqSign = null;
		for($i = $pos + 1; $i < $limit; $i++) {
			$token = $tokens[$i];
			if (is_array($token) && $token[0] != T_WHITESPACE) {
				if ($bracketToken === null) {
					$bracketToken = false;
				}
			}
			elseif (is_array($token) && $token[0] == T_WHITESPACE && $bracketToken === null) {
				$whiteSpace = $i;
			}
			elseif (!is_array($token)) {
				if (strstr($token,"(")) {
					if (!count($bracketStack) && $bracketToken === null) {
						$bracketToken = $i;
						
					}
					$bracketStack[] = $i;
				}
				elseif (strstr($token,";")) {
					$lastStatement = $i;
					break;
				}
				elseif (strstr($token,")")) { 
					array_pop($bracketStack);
					if (!count($bracketStack) && $bracketToken) {
						break;
					}
				}
				elseif (strstr($token,"=")) {
					if (!count($bracketStack)) {
						$eqSign = $i;
					}
				}
			}
		}
		if (!$bracketToken && $eqSign !== null) {
			$tokens[$pos][1] .= " (";
			$tokens[$lastStatement] = ")".$tokens[$lastStatement];
			if ($whiteSpace !== null) {
				$tokens[$whiteSpace] = "";
			}
			
			
		}
		return $tokens;
	}

	/**
	 * Converts a PHP new to a JavaScript new, ensures () appear at the end 
	 * to signify constructor
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertNew($pos, $tokens, $params = array()) {
		$limit = count($tokens);
		$bracketStack = array();
		$lastStatement = null;
		for($i = $pos + 1; $i < $limit; $i++) {
			$token = $tokens[$i];
			if (!is_array($token)) {
				if (strstr($token,"(")) {
					$bracketStack[] = $i;
					break;
				}
				elseif (strstr($token,")")) {
					array_pop($bracketStack);
					break;
				}
				elseif (strstr($token,";") || strstr($token,":")) {
					$lastStatement = $i;
					break;
				}
				
			}
		}
		if (!count($bracketStack) && $lastStatement) {
			
			$tokens[$lastStatement] = "()".$tokens[$lastStatement];
		}
		return $tokens;
	}
	/**
	 * Converts PHP's [] = array push notation to a JavaScript array push notation
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertArrayPush($pos, $tokens, $params = array()) {
		if ($tokens[$pos - 1] == "[" && $tokens[$pos] == "]") {
			// make sure the previous token isn't a =
			$last = $pos - 2;
			if (is_array($tokens[$last]) && ($tokens[$last][0] == T_VARIABLE || $tokens[$last][0] == T_STRING)) {
			
				$tokens[$pos - 1] = ".push";
				$tokens[$pos] = "(";
				// now step through the tokens looking for = and ;
				$foundEq = false;
				for($i = $pos + 1; $i < count($tokens); $i++) {
					if ($tokens[$i] == "=" && !$foundEq) {
						if (is_array($tokens[$i - 1]) && $tokens[$i - 1][0] == T_WHITESPACE) {
							$tokens[$i - 1] = "";
						}
						if (is_array($tokens[$i + 1]) && $tokens[$i + 1][0] == T_WHITESPACE) {
							$tokens[$i + 1] = "";
						}
						$tokens[$i] = "";
						$foundEq = true;
					}
					elseif (!is_array($tokens[$i]) && (substr(trim($tokens[$i]),0,1) == ";" || substr(trim($tokens[$i]),0,1) == ":")) {
						$tokens[$i] = ")".$tokens[$i];
						break;
					}
				}
			}
			
		}
		return $tokens;
	}
	/**
	 * Converts a PHP comment to a JavaScript comment, we need
	 * this because JavaScript doesn't support # comments
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertComment($pos, $tokens, $params = array()) {
		if (substr(trim($tokens[$pos][1]),0,1) == "#") {
			$tokens[$pos][1] = "/* ".trim(substr($tokens[$pos][1],1)). " */\n";
		}
		return $tokens;
	}
	/**
	 * Converts a PHP cast to a JavaScript cast if possible
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertCast($pos, $tokens, $params = array()) {
		$bracketStack = array();
		$openBrackets = array();
		$closeBrackets = array();
		$nextIsWhiteSpace = false;
		for ($i = $pos; $i < count($tokens); $i++) {
			$token = $tokens[$i];
			if (is_array($token)) {
				if ($nextIsWhiteSpace) {
					$nextIsWhiteSpace = false;
					if ($token[0] == T_WHITESPACE) {
						$tokens[$i] = "";
					}
				}
				if ($token[0] == T_STRING_CAST) {
					$tokens[$i][1] = "String(";
					$nextIsWhiteSpace = true;
				}
				elseif ($token[0] == T_BOOL_CAST) {
					$tokens[$i][1] = "Boolean(";
					$nextIsWhiteSpace = true;
				}
				elseif ($token[0] == T_ARRAY_CAST) {
					$tokens[$i][1] = "Array(";
					$nextIsWhiteSpace = true;
				}
				elseif ($token[0] == T_DOUBLE_CAST || $token[0] == T_INT_CAST) {
					$tokens[$i][1] = "Number(";
					$nextIsWhiteSpace = true;
				}
				
			}
			else {
				switch($token) {
					case ")": 
						if (!count($bracketStack)) {
							// this is the end of cast
							$tokens[$i] .= ")";
							break 2;
						}
						array_pop($bracketStack);
						break;
					case "(": 
						$bracketStack[] = $i;
						break;
					case ";":
					case ":":
						if (!count($bracketStack)) {
							// this is the end of cast
							$tokens[$i] = ")".$token;
							break 2;
						}
						break;
				}
			}
		}
		return $tokens;
	}
	/**
	 * Converts a PHP array to a JavaScript array
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertArray($pos, $tokens, $params = array()) {
		$limit = count($tokens);
		$bracketStack = array();
		$nextIsArray = false;
		$nextIsFunc = false;
		$openBrackets = array();
		$closeBrackets = array();
		$isObject = false;
		for($i = $pos; $i < $limit; $i++) {
			$token = $tokens[$i];
			if ($token == "(") {
				if ($nextIsArray || !count($bracketStack)) {
					
					$tokens[$i] = "[";
					$openBrackets[] = $i;
				}
				$bracketStack[] = $i;
			}
			elseif ($token == ")") {
				array_pop($bracketStack);
				if ($nextIsArray || !count($bracketStack)) {
					$tokens[$i] = "]";
					$nextIsArray = false;
					$closeBrackets[] = $i;
					if (!count($bracketStack)) {
						break;
					}
				}
			}
			elseif(is_array($token) && $token[0] == T_ARRAY) {
				$tokens[$i] = "";
				$nextIsArray = true;
			}
			elseif(is_array($token) && $token[0] == T_DOUBLE_ARROW) {
				$tokens[$i] = ":";
				$isObject = true;
			}
			elseif(is_array($token) && $token[0] == T_STRING) {
				$nextIsArray = false;
				$nextIsFunc = true;
			}
			else {
				
			}
		}
		if ($isObject) {
			if (count($openBrackets) != count($closeBrackets)) {
				#print_r($tokens);
			}
			foreach($openBrackets as $n) {
				$tokens[$n] = "{";
			}
			foreach($closeBrackets as $n) {
				$tokens[$n] = "}";
			}
		}
		return $tokens;
	}

	/**
	 * Converts a PHP foreach loop to a JavaScript for loop
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertForEach($pos, $tokens, $params = array()) {
		$limit = count($tokens);
		$bracketStack = array();
		$matchToken = null;
		$openBrackets = array();
		$closeBrackets = array();
		$nextIsVal = null;
		$keyName = null;
		$valueName = null;
		$feLine = null;
		$firstBracket = null;
		$lastBracket = null;
		for($i = $pos; $i < $limit; $i++) {
			$token = $tokens[$i];
			if (is_array($token)) {
				switch ($token[0]) {
					case T_FOREACH:
						$matchToken = $i;
						$feLine = $token[2];
						break;
					case T_VARIABLE:
						if ($nextIsVal) {
							if ($valueName !== null) {
								$keyName = $valueName;
							}
							$valueName = substr($token[1],1);
							$nextIsVal = false;
							$tokens[$i] = "";
						}
						break;
					case T_DOUBLE_ARROW:
						$nextIsVal = true;
						$tokens[$i] = "";
						break;
					case T_AS:
						$nextIsVal = true;
						$tokens[$i] = "";
						break;
					case T_WHITESPACE:
						$tokens[$i] = "";
						break;
				}
			}
			else {
				switch ($token) {
					case "(":
						if ($firstBracket === null) {
							$firstBracket = $i;
						}
						$bracketStack[] = $i;
						break;
					case ")":
						$lastOpen = array_pop($bracketStack);
						if (!count($bracketStack)) {
							$tokens[$matchToken] = "for ";
							if (!$keyName) {
								$keyName = $this->getIteratorVariable();
							}
							$tokens[$lastOpen] .= $keyName." in ";
							$lastBracket = $i;
							break 2;
						}
						break;
				}
			}
		}
		$bracketToken = null;
		$lastStatement = null;
		$lastCurlyBracket = null;
		$bracketStack = array();
		for($i = $lastBracket; $i < $limit; $i++) {
			$token = $tokens[$i];
			switch ($token) {
				case "{":
					if ($bracketToken === null) {
						$bracketToken = $i;
					}
					$bracketStack[] = $i;
					break;
				case "}":
					array_pop($bracketStack);
					if (!count($bracketStack)) {
						$lastCurlyBracket = $i;
						break 2;
					}
					break;
				case ";":
					if ($bracketToken === null) { 
						$lastStatement = $i;
						break 2;
					}
					break;
			}
		}
		if (!$bracketToken) {
			if (!$lastStatement) {
				return $tokens;
			}
			$tokens[$lastBracket] .= " {";
			$bracketToken = $lastBracket;
			$tokens[$lastStatement] .= "\n\t\t}";
			
		}
		$varName = "";
		$convertedTokens = array();
		$toRemove = array();
		for($i = $firstBracket + 1; $i < $lastBracket; $i++) {
			$convertedTokens[] = $tokens[$i];
			$toRemove[] = $i;
		}
		$convertedTokens = $this->convertTokens($convertedTokens);
		foreach($convertedTokens as $token) {
			if (is_array($token)) {
				$varName .= $token[1];
			}
			else {
				$varName .= $token;
			}
		}
		if (strstr($varName,"(")) {
			// this is a function call so let's cache the result
			$iteratorValue = $varName;
			if (strlen($keyName) > 1) {
				$varName = lcfirst($keyName).ucfirst($valueName);
			}
			else {
				$varName = lcfirst($valueName)."List";
			}
			if (isset($this->declaredVars[$varName])) {
				$varName = lcfirst($keyName).ucFirst($valueName)."List";
				if (isset($this->declaredVars[$varName])) {
					$varName = lcfirst($keyName).ucFirst($valueName)."Collection";
					if (isset($this->declaredVars[$varName])) {
						$varName = lcfirst($keyName).ucFirst($valueName)."_forEach";
					}
					else {
						$this->declaredVars[$varName] = $varName;
					}
				}
				else {
					$this->declaredVars[$varName] = $varName;
				}
			}
			else {
				$this->declaredVars[$varName] = $varName;
			}
			
			$tokens[$pos] = $varName." = ".$iteratorValue.";\n\t\t".$tokens[$pos];
			$tokens[array_shift($toRemove)] = $varName;
			foreach($toRemove as $i) {
				$tokens[$i] = "";
			}
		}
		$tokens[$bracketToken] .= "\n\t\t\tif (".$varName.".hasOwnProperty(".$keyName.")) {\n";
		$tokens[$bracketToken] .= "\n\t\t\t\t".$valueName." = ".$varName."[".$keyName."];\n";
		if ($lastCurlyBracket !== null) {
			$tokens[$lastCurlyBracket] .= "\n\t\t}";
		}
		else {
			$tokens[$lastStatement] .= "\n\t\t}";
		}
		return $tokens;
	}
	/**
	 * Gets an unused iterator variable
	 * @return string the variable name
	 */
	public function getIteratorVariable() {
		$names = array("i","n","j","k","m","p");
		foreach($names as $name) {
			if (!isset($this->declaredVars[$name])) {
				$this->declaredVars[$name] = $name;
				return $name;
			}
		}
		
	}
	/**
	 * Converts a PHP if to a JavaScript if, ensures brackets appear
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertIf($pos, $tokens, $params = array()) {
		$limit = count($tokens);
		$bracketStack = array();
		$matchToken = null;
		$openBrackets = array();
		$closeBrackets = array();
		$nextIsVal = null;
		$ifLine = null;
		$firstBracket = null;
		$lastBracket = null;
		for($i = $pos; $i < $limit; $i++) {
			$token = $tokens[$i];
			if (is_array($token)) {
				switch ($token[0]) {
					case T_IF:
						if ($params['type'] == "if") {
							$matchToken = $i;
							$ifLine = $token[2];
						}
						break;
					case T_ELSEIF:
						if ($params['type'] == "elseif") {
							$matchToken = $i;
							$ifLine = $token[2];
							$tokens[$i][1] = "else if";
						}
						break;
					
				}
			}
			else {
				switch ($token) {
					case "(":
						if ($firstBracket === null) {
							$firstBracket = $i;
						}
						$bracketStack[] = $i;
						break;
					case ")":
						$lastOpen = array_pop($bracketStack);
						if (!count($bracketStack)) {
							
							$lastBracket = $i;
							break 2;
						}
						break;
				}
			}
		}
		$bracketToken = null;
		$lastStatement = null;
		for($i = $lastBracket; $i < $limit; $i++) {
			if (!isset($tokens[$i])) {
				break;
			}
			$token = $tokens[$i];
			if (!is_array($token)) {
				switch (trim(substr($token,-1,1))) {
					case "{":
						$bracketToken = $i;
						break 2;
					case ";": 
						$lastStatement = $i;
						break 2;
					case "}": 
						$lastStatement = $i;
						break 2;
				}
			}
			else {
				
			}
			
		}
		if (!$bracketToken && $lastBracket) {
			$tokens[$lastBracket] .= " {";
			$bracketToken = $lastBracket;
			$tokens[$lastStatement] .= "\n\t\t}";
			
		}
		return $tokens;
	}
	
	/**
	 * Converts a PHP else to a JavaScript else, ensures brackets appear
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertElse($pos, $tokens, $params = array()) {
		$limit = count($tokens);
		$bracketStack = array();
		$matchToken = null;
		$openBrackets = array();
		$closeBrackets = array();
		$nextIsVal = null;
		$ifLine = null;
		$firstBracket = null;
		$lastBracket = null;
		
		
		$bracketToken = null;
		$lastStatement = null;
		for($i = $pos + 1; $i < $limit; $i++) {
			$token = $tokens[$i];
			if (is_array($token) && $token[0] == T_IF) {
				return $tokens;
			}
			switch ($token) {
				case "{":
					$bracketToken = $i;
					break 2;
				case ";": 
					$lastStatement = $i;
					break 2;
				case "}": 
					$lastStatement = $i;
					break 2;
			}
		}
		if (!$bracketToken && $lastStatement) {
			$tokens[$pos][1] .= " {";
			$tokens[$lastStatement] .= "\n\t\t}";
			
		}
		return $tokens;
	}
	/**
	 * Converts a PHP variable name to a JavaScript variable name
	 * @param integer $pos The current position in the list of tokens
	 * @param array $tokens The list of tokens
	 * @param array $params Extra parameters to pass to this function
	 */
	protected function convertVariable($pos, $tokens, $params = array()) {
		if (is_string($tokens[$pos])) {
			return $tokens;
		}
		
		
		
		if (stristr($tokens[$pos][1],".")) {
			
			$var = substr(array_shift(explode(".",$tokens[$pos][1])),1);
			
		}
		else {
			$var = substr($tokens[$pos][1],1);
		}
		$sanitized = $this->sanitizeVariableName($var);
		if ($sanitized != $var) {
			$this->declaredVars[$sanitized] = $sanitized;
			$tokens[$pos][1] = $sanitized.substr($tokens[$pos][1],strlen($sanitized) + 1);
		}
		else {
			$this->declaredVars[$var] = $var;
			$tokens[$pos][1] = substr($tokens[$pos][1],1);
		}
		return $tokens;
	}	

	/**
	 * Sanitizes a variable name to ensure it doesn't conflict with JavaScript keywords
	 * @param string $name the name of the variable
	 * @return string the sanitized name
	 */
	public function sanitizeVariableName($name) {
		static $varNames = array(
				'break' => 'breakVar',
				'case' => 'caseVar',
				'comment' => 'commentVar',
				'abstract' => 'abstractVar',
				'boolean' => 'booleanVar',
				'byte' => 'byteVar',
				'char' => 'charVar',
				'double' => 'doubleVar',
				'FALSE' => 'FALSEVar',
				'final' => 'finalVar',
				'float' => 'floatVar',
				'goto' => 'gotoVar',
				'catch' => 'catchVar',
				'class' => 'classVar',
				'const' => 'constVar',
				'debugger' => 'debuggerVar',
				'continue' => 'continueVar',
				'default' => 'defaultVar',
				'delete' => 'deleteVar',
				'implements' => 'implementsVar',
				'instanceOf' => 'instanceOfVar',
				'int' => 'intVar',
				'interface' => 'interfaceVar',
				'long' => 'longVar',
				'native' => 'nativeVar',
				'null' => 'nullVar',
				'package' => 'packageVar',
				'private' => 'privateVar',
				'enum' => 'enumVar',
				'extends' => 'extendsVar',
				'finally' => 'finallyVar',
				'super' => 'superVar',
				'do' => 'doVar',
				'else' => 'elseVar',
				'export' => 'exportVar',
				'protected' => 'protectedVar',
				'public' => 'publicVar',
				'short' => 'shortVar',
				'static' => 'staticVar',
				'synchronized' => 'synchronizedVar',
				'throws' => 'throwsVar',
				'transient' => 'transientVar',
				'TRUE' => 'TRUEVar',
				'throw' => 'Throw',
				'try' => 'haveAGo',
				'for' => 'forVar',
				'function' => 'func',
				'if' => 'ifVar',
				'import' => 'imports',
				'in' => 'inVar',
				'label' => 'labelVar',
				'new' => 'newVar',
				'return' => 'returnVar',
				'switch' => 'switchVar',
				'typeof' => 'typeofVar',
				'var' => 'varVar',
				'void' => 'voidVar',
				'while' => 'whileVar',
				'with' => 'withVar',
		);
		if (isset($varNames[$name])) {
			return $varNames[$name];
		}
		return $name;
	}
	
	
	/**
	 * Assembles a list of tokens into the appropriate code
	 * @return string the detokenized code
	 */
	public function printTokens($tokens) {
		$output = "";
		foreach($tokens as $token) {
			if (is_array($token)) {
				$output .= $token[1];
			}
			else {
				$output .= $token;
			}
		}
		return $output;
	}
}


class phpBase extends CComponent {
	/**
	 * The level of intentation for this item
	 * @var integer
	 */
	public $indent = 0;
	/**
	 * Holds the reflection for this item
	 * @var Reflection
	 */
	public $reflection;
	
	/**
	 * Magic method to allow easy access to reflection properties
	 */
	public function __get($name) {
		$methodName = "get".$name;
		if (is_object($this->reflection) && method_exists($this->reflection, $methodName)) {
			return $this->reflection->{$methodName}();
		}
		return parent::__get($name);
	}
	
	/**
	 * Gets the source code for this item
	 * @return string the php source code for this item
	 */
	public function getSourceCode() {
		if ($this->reflection instanceof ReflectionClass) {
			$filename = $this->reflection->getFileName();
		}
		else {
			$filename = $this->reflection->getDeclaringClass()->getFileName();
		}
		$lines = file($filename);
		return "<?php ".implode("",array_slice($lines,$this->reflection->getStartLine() -1,$this->reflection->getEndLine() - $this->reflection->getStartLine() +1));
	}
	
	/**
	 * Gets all the php tokens for this item
	 * @return array the php tokens
	 */
	public function getTokens() {
		return token_get_all($this->getSourceCode());
	}
	
	
	
	/**
	 * Gets the sanitized doc comment for this item
	 * @return string the sanitized comments
	 */
	public function getSanitizedComment() {
		$comment = $this->reflection->getDocComment();
		$comment=strtr(trim(preg_replace('/^\s*\**( |\t)?/m','',trim($comment,'/'))),"\r",'');
		
		if ($comment == "") {
			return "";
		}
		
		$comment = $this->processTags($comment);
		if ($comment === "") {
			return "";
		}
		$comment = preg_replace_callback('#\<pre\>(.+?)\<\/pre\>#s',array($this,"translatePreTags"),$comment);
		$return = str_repeat("\t",$this->indent)."/**";
		$lines =  preg_split("/((\r(?!\n))|((?<!\r)\n)|(\r\n))/","\n".trim($comment));
		$return .= str_repeat("\t",$this->indent).implode("\n".str_repeat("\t",$this->indent)." * ",$lines)."\n";
		$return .= str_repeat("\t",$this->indent)." */\n";
		return $return;
	}
	
	/**
	 * Translates examples to JavaScript
	 * @param array $matches the matches from preg_replace_callback
	 * @return string the translated examples
	 */
	public function translatePreTags($matches) {
		$conv = new phpToJS;
		$tokens = token_get_all("<?php ".$matches[1]);
		
		return "<pre>".$conv->printTokens($conv->convertTokens($tokens))."</pre>";
	}
	
	/**
	 * Processes tags for the given doc comment
	 * @param string $comment the comment to search for tags
	 * @return string The comment with the updated tags
	 */
	protected function processTags($comment)
	{
		$tags=preg_split('/^\s*@/m',$comment,-1,PREG_SPLIT_NO_EMPTY);
		foreach($tags as $n => $tag)
		{
			$segs=preg_split('/\s+/',trim($tag),2);
			$tagName=$segs[0];
			$param=isset($segs[1])?trim($segs[1]):'';
			$tagMethod='tag'.ucfirst($tagName);
			if(method_exists($this,$tagMethod)) {
				$tags[$n] = $this->$tagMethod($param);
			}
			else {
				$tags[$n] = "@".$tag;
			}
			$comment = str_replace("@$tag",trim($tags[$n])."\n",$comment);
		}
		
		return $comment;
	}
	/**
	 * Converts phpDoc return tag to jsDoc returns tag
	 */
	protected function tagReturn($param) {
		$param = explode(" ",trim($param));
		$type = ucfirst(array_shift($param));
		if (substr($type,0,1) == "C") {
			$type = "Yii.".$type;
		}
		return "@returns {".$type."} ".implode(" ",$param);
	}
	
	/**
	 * Converts phpDoc author tag to jsDoc author tag
	 */
	protected function tagAuthor($param) {
		
		return "@originalAuthor ".$param;
	}
	/**
	 * Converts phpDoc throws tag to jsDoc throws tag
	 */
	protected function tagThrows($param) {
		$param = explode(" ",trim($param));
		$type = ucfirst(array_shift($param));
		if (substr($type,0,1) == "C") {
			$type = "Yii.".$type;
		}
		return "@throws {".$type."} ".implode(" ",$param);
	}
	/**
	 * Converts phpDoc param tag to jsDoc param tag
	 */
	protected function tagParam($param) {
		$param = explode(" ",trim($param));
		$type = ucfirst(array_shift($param));
		if (substr($type,0,1) == "C") {
			$type = "Yii.".$type;
		}
		$var = array_shift($param);
		$var = substr($var,1);
		$var = phpToJS::sanitizeVariableName($var);
		return "@param {".$type."} ".$var." ".implode(" ",$param);
	}
	/**
	 * Converts phpDoc var tag to jsDoc var tag
	 */
	protected function tagVar($param) {
		$param = explode(" ",trim($param));
		$type = ucfirst(array_shift($param));
		if (substr($type,0,1) == "C") {
			$type = "Yii.".$type;
		}
		return "@var {".$type."} ".implode(" ",$param);
	}
	
	
}

/**
 * Holds information about a PHP class
 */
class phpClass extends phpBase {
	
	/**
	 * Constructor
	 * @param string $className the name of the class this object refers to
	 */
	public function __construct($className) {
		$this->reflection = new ReflectionClass($className);
	}
	
	
	/**
	 * Converts the class to a JS object
	 * @return string The JavaScript code that represents this object
	 */
	public function convert() {
		$properties = array();
		$methods = array();
		$constants = array();
		$parentClass = $this->parentClass;
		$constList = $this->constants;
		
		if ($parentClass !== false) {
			
			foreach($parentClass->getConstants() as $const => $value) {
				
				
				if (isset($constList[$const]) && $constList[$const] == $value) {
					
					unset($constList[$const]);
				}
			}
		}
		foreach($constList as $const => $value) {
			$item = "/**\n";
			$item .= " * @const\n";
			$item .= " */\n";
			$item.= "Yii.".$this->reflection->name.".".$const." = ".CJavaScript::encode($value);
			$constants[] = $item;
		}
		$hasConstructor = false;
		foreach($this->properties as $property) {
			if ($property->name == "__construct") {
				$hasConstructor = true;
			}
			$property = new phpProperty($property);
			
			if ($property->declaringClass->name != $this->reflection->name) {
				continue;
			}
			$properties[] = $property->convert();
		}
		foreach($this->methods as $method) {
			$method = new phpMethod($method);
			if ($method->declaringClass->name != $this->reflection->name) {
				continue;
			}
			
			$methods[] = $method->convert();
		}
		$comment = trim(rtrim(trim($this->sanitizedComment),"*/"));
		if (strlen($comment) == 0) {
			$comment .= "/**\n";
		}
		$comment .= "\n * @author Charles Pick\n";
		$comment .= "\n * @class\n";
		if ($this->reflection->getParentClass() !== false) {
			$comment .= "\n * @extends Yii.".$this->reflection->getParentClass()->name."\n";
		}
		$comment .= "\n */\n";
		$output = "/*global Yii, php, \$, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */\n";
		$output .= $comment;
		
		$output .= "Yii.".$this->reflection->name." = function ".$this->reflection->name." () {\n";
		if ($hasConstructor) {
			$output .= "\tthis.construct();\n";
		}
		$output .= "};\n";
		if ($this->reflection->getParentClass() !== false) {
			$output .= "Yii.".$this->reflection->name. ".prototype = new Yii.".$this->reflection->getParentClass()->name."();\n";
			$output .= "Yii.".$this->reflection->name. ".prototype.constructor =  Yii.".$this->reflection->name.";\n";
		}
		
		
		#$output .= "Yii.".$this->reflection->name.".prototype = /** @lends Yii.".$this->reflection->name.".prototype */{\n";
		$output .= implode(";\n",array_merge($constants, $properties, $methods));
		$output .= ";";
		#$output .= "\n};\n";
		
		// clean up empty lines
		$output = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $output);
		return $output;
	}
}

/**
 * Holds information about a PHP class property
 */
class phpProperty extends phpBase {
	/**
	 * The indentation level for this item
	 */
	public $indent = 0;
	
	/**
	 * Constructor
	 * @param ReflectionProperty $property the property this object refers to
	 */
	public function __construct(ReflectionProperty $property) {
		$this->reflection = $property;
	}
	
	/**
	 * Converts the property to a JavaScript property
	 * @return string the JavaScript that represents this property
	 */
	public function convert() {
		$comment = $this->sanitizedComment;
		$conv = new phpToJS;
		$name = $conv->sanitizeVariableName($this->reflection->name);
		$defaultProperties = $this->declaringClass->getDefaultProperties();
		$value = $defaultProperties[$this->reflection->name];
		$value = CJavaScript::encode($value,2);
		$return = $comment."Yii.".$this->declaringClass->name.".prototype.".$name." = ".$value;
		return $return;
	}
}



/**
 * Holds information about a PHP class method
 */
class phpMethod extends phpBase {
	/**
	 * The indentation level for this item
	 */
	public $indent = 0;
	/**
	 * Constructor
	 * @param ReflectionMethod $method the method this object refers to
	 */
	public function __construct(ReflectionMethod $method) {
		$this->reflection = $method;
	}
	/**
	 * Get just the tokens from inside this method (overrides parent implementation)
	 * @return array the php tokens that make up this method
	 */
	public function getTokens() {
		$tokens = parent::getTokens();
		$return = array();
		$firstBracket = null;
		$lastBracket = null;
		$bracketStack = array();
		foreach($tokens as $i => $token) {
			if ($token == "{") {
				if ($firstBracket === null) {
					$firstBracket = $i;
				}
				$bracketStack[] = $i;
			}
			elseif ($token == "}") {
				array_pop($bracketStack);
				if (count($bracketStack) == 0) {
					$lastBracket = $i;
					break;
				}
			}
		}
		for($i = $firstBracket + 1; $i < $lastBracket; $i++) {
			$return[] = $tokens[$i];
		}
		return $return;
	}
	
	/**
	 * Converts the method to a JavaScript method
	 * @return string the JavaScript that represents this property
	 */
	public function convert() {
		$conv = new phpToJS;
		$return = "";
		$return .= $this->sanitizedComment;
		$signature = array();
		$params = array();
		$defaultValues = array();
		foreach($this->parameters as $param) {
			$name = $conv->sanitizeVariableName($param->getName());
			$signature[] = $name;
			if ($param->isDefaultValueAvailable()) {
				$defaultValues[$name] = $param->getDefaultValue();
			}
			$params[$name] = $name;
		}
		$signature = implode(", ",$signature);
		$methodName = $this->reflection->name;
		if (substr($methodName,0,2) == "__") {
			$methodName = substr($methodName,2);
		}
		$methodName = $conv->sanitizeVariableName($methodName);
		$return .= "Yii.".$this->declaringClass->name.".prototype.".$methodName. " = function (".$signature.") {\n";
		
		$code = $conv->printTokens($conv->convertTokens($this->tokens));
		foreach($conv->declaredVars as $n => $item) {
			if (isset($params[$item]) || $item == "this") {
				
				unset($conv->declaredVars[$n]);
			}
		}
		if (count($conv->declaredVars)) {
			$return .= "\t\tvar ".implode(", ",$conv->declaredVars).";\n";
		}
		foreach($defaultValues as $name => $value) {
			$return .= "\t\tif ($name === undefined) {\n";
			$return .= "\t\t\t$name = ".CJavaScript::encode($value).";\n";
			$return .= "\t\t}\n";
		}
		
		$return .= $code;
		$return .= "\t\t\n";
		$return .= "\t}";
		return $return;
	}
	
}
