/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CDateTimeParser converts a date/time string to a UNIX timestamp according to the specified pattern.
 * 
 * The following pattern characters are recognized:
 * <pre>
 * Pattern |      Description
 * ----------------------------------------------------
 * d       | Day of month 1 to 31, no padding
 * dd      | Day of month 01 to 31, zero leading
 * M       | Month digit 1 to 12, no padding
 * MM      | Month digit 01 to 12, zero leading
 * yy      | 2 year digit, e+g+, 96, 05
 * yyyy    | 4 year digit, e+g+, 2005
 * h       | Hour in 0 to 23, no padding
 * hh      | Hour in 00 to 23, zero leading
 * H       | Hour in 0 to 23, no padding
 * HH      | Hour in 00 to 23, zero leading
 * m       | Minutes in 0 to 59, no padding
 * mm      | Minutes in 00 to 59, zero leading
 * s       | Seconds in 0 to 59, no padding
 * ss      | Seconds in 00 to 59, zero leading
 * a       | AM or PM, case-insensitive (since version 1.1.5)
 * ----------------------------------------------------
 * </pre>
 * All other characters must appear in the date string at the corresponding positions.
 * 
 * For example, to parse a date string '21/10/2008', use the following:
 * <pre>
 * timestamp=Yii.CDateTimeParser.parse('21/10/2008','dd/MM/yyyy');
 * </pre>
 * 
 * To format a timestamp to a date string, please use {@link CDateFormatter}.
 * 
 * @originalAuthor Wei Zhuo <weizhuo[at]gmail[dot]com>
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CDateTimeParser.php 2928 2011-02-01 17:41:51Z alexander.makarow $
 * @package system.utils
 * @since 1.0
 * @author Charles Pick
 * @class
 */
Yii.CDateTimeParser = {
	
};
/**
 * Converts a date string to a timestamp.
 * @param {String} value the date string to be parsed
 * @param {String} pattern the pattern that the date string is following
 * @param {Array} defaults the default values for year, month, day, hour, minute and second.
 * The default values will be used in case when the pattern doesn't specify the
 * corresponding fields. For example, if the pattern is 'MM/dd/yyyy' and this
 * parameter is array('minute'=>0, 'second'=>0), then the actual minute and second
 * for the parsing result will take value 0, while the actual hour value will be
 * the current hour obtained by date('H'). This parameter has been available since version 1.1.5.
 * @returns {Integer} timestamp for the date string. False if parsing fails.
 */
Yii.CDateTimeParser.parse = function (value, pattern, defaults) {
		var tokens, i, n, j, token, year, month, day, hour, minute, second, ampm, tn;
		if (pattern === undefined) {
			pattern = 'MM/dd/yyyy';
		}
		if (defaults === undefined) {
			defaults = [];
		}
		tokens=this.tokenize(pattern);
		i=0;
		n=php.strlen(value);
		for (j in tokens)
		{
			if (tokens.hasOwnProperty(j)) {
				token = tokens[j];
			switch(token)
			{
				case 'yyyy':
					if((year=this.parseInteger(value,i,4,4))===false) {
						return false;
					}
					i+=4;
					break;
				case 'yy':
					if((year=this.parseInteger(value,i,1,2))===false) {
						return false;
					}
					i+=php.strlen(year);
					break;
				case 'MM':
					if((month=this.parseInteger(value,i,2,2))===false) {
						return false;
					}
					i+=2;
					break;
				case 'M':
					if((month=this.parseInteger(value,i,1,2))===false) {
						return false;
					}
					i+=php.strlen(month);
					break;
				case 'dd':
					if((day=this.parseInteger(value,i,2,2))===false) {
						return false;
					}
					i+=2;
					break;
				case 'd':
					if((day=this.parseInteger(value,i,1,2))===false) {
						return false;
					}
					i+=php.strlen(day);
					break;
				case 'h':
				case 'H':
					if((hour=this.parseInteger(value,i,1,2))===false) {
						return false;
					}
					i+=php.strlen(hour);
					break;
				case 'hh':
				case 'HH':
					if((hour=this.parseInteger(value,i,2,2))===false) {
						return false;
					}
					i+=2;
					break;
				case 'm':
					if((minute=this.parseInteger(value,i,1,2))===false) {
						return false;
					}
					i+=php.strlen(minute);
					break;
				case 'mm':
					if((minute=this.parseInteger(value,i,2,2))===false) {
						return false;
					}
					i+=2;
					break;
				case 's':
					if((second=this.parseInteger(value,i,1,2))===false) {
						return false;
					}
					i+=php.strlen(second);
					break;
				case 'ss':
					if((second=this.parseInteger(value,i,2,2))===false) {
						return false;
					}
					i+=2;
					break;
				case 'a':
				    if((ampm=this.parseAmPm(value,i))===false) {
				        return false;
					}
				    if(hour !== undefined)
				    {
						if(hour==12 && ampm==='am') {
							hour=0;
						}
						else if(hour<12 && ampm==='pm') {
							hour+=12;
						}
				    }
					i+=2;
					break;
				default:
					tn=php.strlen(token);
					if(i>=n || value.slice(i, tn)!==token) {
						return false;
					}
					i+=tn;
					break;
			}
		}
		}
		if(i<n) {
			return false;
		}
		if(year === undefined) {
			year=defaults.year !== undefined ? defaults.year : php.date('Y');
		}
		if(month === undefined) {
			month=defaults.month !== undefined ? defaults.month : php.date('n');
		}
		if(day === undefined) {
			day=defaults.day !== undefined ? defaults.day : php.date('j');
		}
		if(php.strlen(year)===2) {
			if(year>=70) {
				year+=1900;
			}
			else {
				year+=2000;
			}
		}
		year=Number(year);
		month=Number(month);
		day=Number(day);
		if(hour === undefined && minute === undefined && second === undefined && defaults.hour === undefined && defaults.minute === undefined && defaults.second === undefined) {
			hour=minute=second=0;
		}
		else {
			if(hour === undefined) {
				hour=defaults.hour !== undefined ? defaults.hour : php.date('H');
			}
			if(minute === undefined) {
				minute=defaults.minute !== undefined ? defaults.minute : php.date('i');
			}
			if(second === undefined) {
				second=defaults.second !== undefined ? defaults.second : php.date('s');
			}
			hour=Number(hour);
			minute=Number(minute);
			second=Number(second);
		}
		if(Yii.CTimestamp.isValidDate(year,month,day) && Yii.CTimestamp.isValidTime(hour,minute,second)) {
			return Yii.CTimestamp.getTimestamp(hour,minute,second,month,day,year);
		}
		else {
			return false;
		}
	};
Yii.CDateTimeParser.tokenize = function (pattern) {
		var n, tokens, c0, start, i, c;
		if(!(n=php.strlen(pattern))) {
			return [];
		}
		tokens=[];
		for(c0=pattern[0],start=0,i=1;i<n;++i) {
			if((c=pattern[i])!==c0)	{
				tokens.push(pattern.slice(start, i-start));
				c0=c;
				start=i;
			}
		}
		tokens.push(pattern.slice(start, n-start));
		return tokens;
	};
Yii.CDateTimeParser.parseInteger = function (value, offset, minLength, maxLength) {
		var len, v;
		for(len=maxLength;len>=minLength;--len)	{
			v=value.slice(offset, len);
			if(php.ctype_digit(v) && php.strlen(v)>=minLength) {
				return v;
			}
		}
		return false;
	};
Yii.CDateTimeParser.parseAmPm = function (value, offset) {
		var v;
		v=value.slice(offset, 2).toLowerCase();
		return v==='am' || v==='pm' ? v : false;
	}