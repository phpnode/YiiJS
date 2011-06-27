/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CChoiceFormat is a helper that chooses an appropriate message based on the specified number value.
 * The candidate messages are given as a string in the following format:
 * <pre>
 * 'expr1#message1|expr2#message2|expr3#message3'
 * </pre>
 * where each expression should be a valid PHP expression with 'n' as the only variable.
 * For example, 'n==1' and 'n%10==2 && n>10' are both valid expressions.
 * The variable 'n' will take the given number value, and if an expression evaluates true,
 * the corresponding message will be returned.
 * 
 * For example, given the candidate messages 'n==1#one|n==2#two|n>2#others' and
 * the number value 2, the resulting message will be 'two'.
 * 
 * For expressions like 'n==1', we can also use a shortcut '1'. So the above example
 * candidate messages can be simplified as '1#one|2#two|n>2#others'.
 * 
 * In case the given number doesn't select any message, the last candidate message
 * will be returned.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CChoiceFormat.php 2899 2011-01-20 21:10:03Z alexander.makarow $
 * @package system.i18n
 * @since 1.0.2
 * @author Charles Pick
 * @class
 */
Yii.CChoiceFormat = function CChoiceFormat () {
};
/**
 * Formats a message according to the specified number value.
 * @param {String} messages the candidate messages in the format of 'expr1#message1|expr2#message2|expr3#message3'.
 * See {@link CChoiceFormat} for more details.
 * @param {Mixed} number the number value
 * @returns {String} the selected message
 */
Yii.CChoiceFormat.prototype.format = function (messages, number) {
		var n, matches, i, expression, message, match;
		matches = (messages + "|").match(/\s*([^#]*)\s*#([^\|]*)\|/g);
		if (matches !== null) {
			n = matches.length;
		}
		else {
			return messages;
		}
		if(n===0) {
			return messages;
		}
		for(i=0;i<n;++i) {
			match = matches[i].match(/\s*([^#]*)\s*#([^\|]*)\|/);
			expression=match[0];
			message=match[1];
			if(expression===String(Number(expression)))	{
				if(expression==number) {
					return message;
				}
			}
			else if(this.evaluate(expression,number)) {
				return message;
		}
		}
		return message; // return the last choice
	};
/**
 * Evaluates a PHP expression with the given number value.
 * @param {String} expression the PHP expression
 * @param {Mixed} n the number value
 * @returns {Boolean} the expression result
 */
Yii.CChoiceFormat.prototype.evaluate = function (expression, n) {
		return eval(expression);
	};