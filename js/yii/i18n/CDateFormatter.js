/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CDateFormatter provides date/time localization functionalities.
 * 
 * CDateFormatter allows you to format dates and times in a locale-sensitive manner.
 * Patterns are interpreted in the locale that the CDateFormatter instance
 * is associated with. For example, month names and weekday names may vary
 * under different locales, which yields different formatting results.
 * The patterns that CDateFormatter recognizes are as defined in
 * {@link http://www.unicode.org/reports/tr35/#Date_Format_Patterns CLDR}.
 * 
 * CDateFormatter supports predefined patterns as well as customized ones:
 * <ul>
 * <li>The method {@link formatDateTime()} formats date or time or both using
 *   predefined patterns which include 'full', 'long', 'medium' (default) and 'short'.</li>
 * <li>The method {@link format()} formats datetime using the specified pattern.
 *   See {@link http://www.unicode.org/reports/tr35/#Date_Format_Patterns} for
 *   details about the recognized pattern characters.</li>
 * </ul>
 * 
 * @originalAuthor Wei Zhuo <weizhuo[at]gmail[dot]com>
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CDateFormatter.php 2798 2011-01-01 19:29:03Z qiang.xue $
 * @package system.i18n
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CDateFormatter = function CDateFormatter (locale) {
	if (locale !== false) {
		this.construct(false);
	}
};
Yii.CDateFormatter.prototype = new Yii.CComponent();
Yii.CDateFormatter.prototype.constructor =  Yii.CDateFormatter;
/**
 * @var {Array} pattern characters mapping to the corresponding translator methods
 */
Yii.CDateFormatter.prototype._formatters = {'G':'formatEra','y':'formatYear','M':'formatMonth','L':'formatMonth','d':'formatDay','h':'formatHour12','H':'formatHour24','m':'formatMinutes','s':'formatSeconds','E':'formatDayInWeek','c':'formatDayInWeek','e':'formatDayInWeek','D':'formatDayInYear','F':'formatDayInMonth','w':'formatWeekInYear','W':'formatWeekInMonth','a':'formatPeriod','k':'formatHourInDay','K':'formatHourInPeriod','z':'formatTimeZone','Z':'formatTimeZone','v':'formatTimeZone'};
Yii.CDateFormatter.prototype._locale = null;
Yii.CDateFormatter.prototype._formats = [];
/**
 * Constructor.
 * @param {Mixed} locale locale ID (string) or CLocale instance
 */
Yii.CDateFormatter.prototype.construct = function (locale) {
		if(typeof(locale) === 'string') {
			this._locale=Yii.CLocale.getInstance(locale);
		}
		else {
			this._locale=locale;
		}
	};
/**
 * Formats a date according to a customized pattern.
 * @param {String} pattern the pattern (See {@link http://www.unicode.org/reports/tr35/#Date_Format_Patterns})
 * @param {Mixed} time UNIX timestamp or a string in strtotime format
 * @returns {String} formatted date time.
 */
Yii.CDateFormatter.prototype.format = function (pattern, time) {
		var date, tokens, i, token;
		if(typeof(time) === 'string')
		{
			if(php.ctype_digit(time)) {
				time=Number(time);
			}
			else {
				time=php.strtotime(time);
			}
		}
		date=Yii.CTimestamp.getdate(time,false,false);
		tokens=this.parseFormat(pattern);
		for (i in tokens) {
			if (tokens.hasOwnProperty(i)) {
				
				if(Object.prototype.toString.call(tokens[i]) === '[object Array]')  {
					// a callback: method name, sub-pattern
					tokens[i]=this[tokens[i][0]](tokens[i][1],date);
				}
			}
		}
		return tokens.join('');
	};
/**
 * Formats a date according to a predefined pattern.
 * The predefined pattern is determined based on the date pattern width and time pattern width.
 * @param {Mixed} timestamp UNIX timestamp or a string in strtotime format
 * @param {String} dateWidth width of the date pattern. It can be 'full', 'long', 'medium' and 'short'.
 * If null, it means the date portion will NOT appear in the formatting result
 * @param {String} timeWidth width of the time pattern. It can be 'full', 'long', 'medium' and 'short'.
 * If null, it means the time portion will NOT appear in the formatting result
 * @returns {String} formatted date time.
 */
Yii.CDateFormatter.prototype.formatDateTime = function (timestamp, dateWidth, timeWidth) {
		var date, time, dateTimePattern;
		if (dateWidth === undefined) {
			dateWidth = 'medium';
		}
		if (timeWidth === undefined) {
			timeWidth = 'medium';
		}
		if(!php.empty(dateWidth)) {
			date=this.format(this._locale.getDateFormat(dateWidth),timestamp);
		}
		if(!php.empty(timeWidth)) {
			time=this.format(this._locale.getTimeFormat(timeWidth),timestamp);
		}
		if(date !== undefined && time !== undefined) {
			dateTimePattern=this._locale.getDateTimeFormat();
			return php.strtr(dateTimePattern,{'{0}':time,'{1}':date});
		}
		else if(date !== undefined) {
			return date;
		}
		else if(time !== undefined) {
			return time;
		}
	};
/**
 * Parses the datetime format pattern.
 * @param {String} pattern the pattern to be parsed
 * @returns {Array} tokenized parsing result
 */
Yii.CDateFormatter.prototype.parseFormat = function (pattern) {
		var tokens, n, isLiteral, literal, i, c, j, p, _formatters;
		
		if(this._formats[pattern] !== undefined) {
			return this._formats[pattern];
		}
		tokens=[];
		n=php.strlen(pattern);
		isLiteral=false;
		literal='';
		for(i=0;i<n;++i) {
			c=pattern[i];
			if(c==="'")	{
				if(i<n-1 && pattern[i+1]==="'"){
					tokens.push("'");
					i++;
				}
				else if(isLiteral){
					tokens.push(literal);
					literal='';
					isLiteral=false;
				}
				else{
					isLiteral=true;
					literal='';
				}
			}
			else if(isLiteral) {
				literal+=c;
			}
			else {
				for(j=i+1;j<n;++j) {
					if(pattern[j]!==c) {
						break;
					}
				}
				p=php.str_repeat(c,j-i);
				if(this._formatters[c] !== undefined) {
					tokens.push([this._formatters[c],p]);
				}
				else {
					tokens.push(p);
				}
				i=j-1;
			}
		}
		if(literal!=='') {
			tokens.push(literal);
		}
		return (this._formats[pattern]=tokens);
	};
/**
 * Get the year.
 * "yy" will return the last two digits of year.
 * "y...y" will pad the year with 0 in the front, e.g. "yyyyy" will generate "02008" for year 2008.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} formatted year
 */
Yii.CDateFormatter.prototype.formatYear = function (pattern, date) {
		var year;
		year=date.year;
		if(pattern==='yy') {
			return php.str_pad(year%100,2,'0','STR_PAD_LEFT');
		}
		else {
			return php.str_pad(year,php.strlen(pattern),'0','STR_PAD_LEFT');
		}
	};
/**
 * Get the month.
 * "M" will return integer 1 through 12;
 * "MM" will return two digits month number with necessary zero padding, e.g. 05;
 * "MMM" will return the abrreviated month name, e.g. "Jan";
 * "MMMM" will return the full month name, e.g. "January";
 * "MMMMM" will return the narrow month name, e.g. "J";
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} month name
 */
Yii.CDateFormatter.prototype.formatMonth = function (pattern, date) {
		var month;
		month=date.mon;
		switch(pattern)	{
			case 'M':
				return month;
			case 'MM':
				return php.str_pad(month,2,'0','STR_PAD_LEFT');
			case 'MMM':
				return this._locale.getMonthName(month,'abbreviated');
			case 'MMMM':
				return this._locale.getMonthName(month,'wide');
			case 'MMMMM':
				return this._locale.getMonthName(month,'narrow');
			case 'L':
				return month;
			case 'LL':
				return php.str_pad(month,2,'0','STR_PAD_LEFT');
			case 'LLL':
				return this._locale.getMonthName(month,'abbreviated', true);
			case 'LLLL':
				return this._locale.getMonthName(month,'wide', true);
			case 'LLLLL':
				return this._locale.getMonthName(month,'narrow', true);
			default:
				throw new Yii.CException(Yii.t('yii','The pattern for month must be "M", "MM", "MMM", "MMMM", "L", "LL", "LLL" or "LLLL".'));
		}
	};
/**
 * Get the day of the month.
 * "d" for non-padding, "dd" will always return 2 digits day numbers, e.g. 05.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} day of the month
 */
Yii.CDateFormatter.prototype.formatDay = function (pattern, date) {
		var day;
		day=date.mday;
		if(pattern==='d') {
			return day;
		}
		else if(pattern==='dd') {
			return php.str_pad(day,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for day of the month must be "d" or "dd".'));
		}
	};
/**
 * Get the day in the year, e.g. [1-366]
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {Integer} hours in AM/PM format.
 */
Yii.CDateFormatter.prototype.formatDayInYear = function (pattern, date) {
		var day, n;
		day=date.yday;
		if((n=php.strlen(pattern))<=3) {
			return php.str_pad(day,n,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for day in year must be "D", "DD" or "DDD".'));
		}
	};
/**
 * Get day of week in the month, e.g. 2nd Wed in July.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {Integer} day in month
 * @see http://www.unicode.org/reports/tr35/#Date_Format_Patterns
 */
Yii.CDateFormatter.prototype.formatDayInMonth = function (pattern, date) {
		if(pattern==='F') {
			return Number((date.mday+6)/7);
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for day in month must be "F".'));
		}
	};
/**
 * Get the day of the week.
 * "E", "EE", "EEE" will return abbreviated week day name, e.g. "Tues";
 * "EEEE" will return full week day name;
 * "EEEEE" will return the narrow week day name, e.g. "T";
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} day of the week.
 * @see http://www.unicode.org/reports/tr35/#Date_Format_Patterns
 */
Yii.CDateFormatter.prototype.formatDayInWeek = function (pattern, date) {
		var day;
		day=date.wday;
		switch(pattern) {
			case 'E':
			case 'EE':
			case 'EEE':
			case 'eee':
				return this._locale.getWeekDayName(day,'abbreviated');
			case 'EEEE':
			case 'eeee':
				return this._locale.getWeekDayName(day,'wide');
			case 'EEEEE':
			case 'eeeee':
				return this._locale.getWeekDayName(day,'narrow');
			case 'e':
			case 'ee':
			case 'c':
				return day ? day : 7;
			case 'ccc':
				return this._locale.getWeekDayName(day,'abbreviated',true);
			case 'cccc':
				return this._locale.getWeekDayName(day,'wide',true);
			case 'ccccc':
				return this._locale.getWeekDayName(day,'narrow',true);
			default:
				throw new Yii.CException(Yii.t('yii','The pattern for day of the week must be "E", "EE", "EEE", "EEEE", "EEEEE", "e", "ee", "eee", "eeee", "eeeee", "c", "cccc" or "ccccc".'));
		}
	};
/**
 * Get the AM/PM designator, 12 noon is PM, 12 midnight is AM.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} AM or PM designator
 */
Yii.CDateFormatter.prototype.formatPeriod = function (pattern, date) {
		if(pattern==='a') {
			if(php.intval(date.hours/12)) {
				return this._locale.getPMName();
			}
			else {
				return this._locale.getAMName();
			}
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for AM/PM marker must be "a".'));
		}
	};
/**
 * Get the hours in 24 hour format, i.e. [0-23].
 * "H" for non-padding, "HH" will always return 2 characters.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} hours in 24 hour format.
 */
Yii.CDateFormatter.prototype.formatHour24 = function (pattern, date) {
		var hour;
		hour=date.hours;
		if(pattern==='H') {
			return hour;
		}
		else if(pattern==='HH') {
			return php.str_pad(hour,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for 24 hour format must be "H" or "HH".'));
		}
	};
/**
 * Get the hours in 12 hour format, i.e., [1-12]
 * "h" for non-padding, "hh" will always return 2 characters.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} hours in 12 hour format.
 */
Yii.CDateFormatter.prototype.formatHour12 = function (pattern, date) {
		var hour;
		hour=date.hours;
		hour=(hour==12|hour===0)?12:(hour)%12;
		if(pattern==='h') {
			return hour;
		}
		else if(pattern==='hh') {
			return php.str_pad(hour,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for 12 hour format must be "h" or "hh".'));
		}
	};
/**
 * Get the hours [1-24].
 * 'k' for non-padding, and 'kk' with 2 characters padding.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {Integer} hours [1-24]
 */
Yii.CDateFormatter.prototype.formatHourInDay = function (pattern, date) {
		var hour;
		hour=date.hours==0?24:date.hours;
		if(pattern==='k') {
			return hour;
		}
		else if(pattern==='kk') {
			return php.str_pad(hour,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for hour in day must be "k" or "kk".'));
		}
	};
/**
 * Get the hours in AM/PM format, e.g [0-11]
 * "K" for non-padding, "KK" will always return 2 characters.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {Integer} hours in AM/PM format.
 */
Yii.CDateFormatter.prototype.formatHourInPeriod = function (pattern, date) {
		var hour;
		hour=date.hours%12;
		if(pattern==='K') {
			return hour;
		}
		else if(pattern==='KK') {
			return php.str_pad(hour,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for hour in AM/PM must be "K" or "KK".'));
		}
	};
/**
 * Get the minutes.
 * "m" for non-padding, "mm" will always return 2 characters.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} minutes.
 */
Yii.CDateFormatter.prototype.formatMinutes = function (pattern, date) {
		var minutes;
		minutes=date.minutes;
		if(pattern==='m') {
			return minutes;
		}
		else if(pattern==='mm') {
			return php.str_pad(minutes,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for minutes must be "m" or "mm".'));
		}
	};
/**
 * Get the seconds.
 * "s" for non-padding, "ss" will always return 2 characters.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} seconds
 */
Yii.CDateFormatter.prototype.formatSeconds = function (pattern, date) {
		var seconds;
		seconds=date.seconds;
		if(pattern==='s') {
			return seconds;
		}
		else if(pattern==='ss') {
			return php.str_pad(seconds,2,'0','STR_PAD_LEFT');
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for seconds must be "s" or "ss".'));
		}
	};
/**
 * Get the week in the year.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {Integer} week in year
 */
Yii.CDateFormatter.prototype.formatWeekInYear = function (pattern, date) {
		if(pattern==='w') {
			return php.date('W',php.mktime(0,0,0,date.mon,date.mday,date.year));
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for week in year must be "w".'));
		}
	};
/**
 * Get week in the month.
 * @param {Array} pattern result of {@link CTimestamp::getdate}.
 * @param {String} date a pattern.
 * @returns {Integer} week in month
 */
Yii.CDateFormatter.prototype.formatWeekInMonth = function (pattern, date) {
		if(pattern==='W') {
			return php.date('W',php.mktime(0,0,0,date.mon, date.mday,date.year))-php.date('W', php.mktime(0,0,0,date.mon,1,date.year))+1;
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for week in month must be "W".'));
		}
	};
/**
 * Get the timezone of the server machine.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} time zone
 * @todo How to get the timezone for a different region?
 */
Yii.CDateFormatter.prototype.formatTimeZone = function (pattern, date) {
		if(pattern[0]==='z' || pattern[0]==='v') {
			return php.date('T', php.mktime(date.hours, date.minutes, date.seconds, date.mon, date.mday, date.year));
		}
		else if(pattern[0]==='Z') {
			return php.date('O', php.mktime(date.hours, date.minutes, date.seconds, date.mon, date.mday, date.year));
		}
		else {
			throw new Yii.CException(Yii.t('yii','The pattern for time zone must be "z" or "v".'));
		}
	};
/**
 * Get the era. i.e. in gregorian, year > 0 is AD, else BC.
 * @param {String} pattern a pattern.
 * @param {Array} date result of {@link CTimestamp::getdate}.
 * @returns {String} era
 * @todo How to support multiple Eras?, e.g. Japanese.
 */
Yii.CDateFormatter.prototype.formatEra = function (pattern, date) {
		var era;
		era=date.year>0 ? 1 : 0;
		switch(pattern)
		{
			case 'G':
			case 'GG':
			case 'GGG':
				return this._locale.getEraName(era,'abbreviated');
			case 'GGGG':
				return this._locale.getEraName(era,'wide');
			case 'GGGGG':
				return this._locale.getEraName(era,'narrow');
			default:
				throw new Yii.CException(Yii.t('yii','The pattern for era must be "G", "GG", "GGG", "GGGG" or "GGGGG".'));
		}
	};