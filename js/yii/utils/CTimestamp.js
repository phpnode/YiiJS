/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CTimestamp represents a timestamp.
 * 
 * Part of this class was adapted from the ADOdb Date Library
 * {@link http://phplens.com/phpeverywhere/ ADOdb abstraction library}.
 * The original source code was released under both BSD and GNU Lesser GPL
 * library license, with the following copyright notice:
 *     Copyright (c) 2000, 2001, 2002, 2003, 2004 John Lim
 *     All rights reserved.
 * 
 * This class is provided to support UNIX timestamp that is beyond the range
 * of 1901-2038 on Unix and1970-2038 on Windows. Except {@link getTimestamp},
 * all other methods in this class can work with the extended timestamp range.
 * For {@link getTimestamp}, because it is merely a wrapper of
 * {@link mktime http://php.net/manual/en/function.mktime.php}, it may still
 * be subject to the limit of timestamp range on certain platforms. Please refer
 * to the PHP manual for more information.
 * 
 * @originalAuthor Wei Zhuo <weizhuo[at]gmail[dot]com>
 * @version $Id: CTimestamp.php 3046 2011-03-12 01:48:15Z qiang.xue $
 * @package system.utils
 * @since 1.0
 * @author Charles Pick
 * @class
 */
Yii.CTimestamp = {
};
/**
 * Gets day of week, 0 = Sunday,... 6=Saturday.
 * Algorithm from PEAR::Date_Calc
 * @param {Integer} year year
 * @param {Integer} month month
 * @param {Integer} day day
 * @returns {Integer} day of week
 */
Yii.CTimestamp.getDayofWeek = function (year, month, day) {
		var greg_correction;
		/*
		Pope Gregory removed 10 days - October 5 to October 14 - from the year 1582 and
		proclaimed that from that time onwards 3 days would be dropped from the calendar
		every 400 years.
		Thursday, October 4, 1582 (Julian) was followed immediately by Friday, October 15, 1582 (Gregorian).
		*/
		if (year <= 1582) {
			if (year < 1582 || (year == 1582 && (month < 10 || (month == 10 && day < 15)))) {
				greg_correction = 3;
			}
			else {
				greg_correction = 0;
			}
		}
		else {
			greg_correction = 0;
		}
		if(month > 2) {
		    month -= 2;
		}
		else {
		    month += 10;
		    year--;
		}
		day = php.floor((13 * month - 1) / 5) +
		        day + (year % 100) +
		        php.floor((year % 100) / 4) +
		        php.floor((year / 100) / 4) - 2 *
		        php.floor(year / 100) + 77 + greg_correction;
		return day - 7 * php.floor(day / 7);
	};
/**
 * Checks for leap year, returns true if it is. No 2-digit year check. Also
 * handles julian calendar correctly.
 * @param {Integer} year year to check
 * @returns {Boolean} true if is leap year
 */
Yii.CTimestamp.isLeapYear = function (year) {
		year = this.digitCheck(year);
		if (year % 4 !== 0) {
			return false;
		}
		if (year % 400 === 0) {
			return true;
		}
		// if gregorian calendar (>1582), century not-divisible by 400 is not leap
		else if (year > 1582 && year % 100 === 0 ) {
			return false;
		}
		return true;
	};
/**
 * Fix 2-digit years. Works for any century.
 * Assumes that if 2-digit is more than 30 years in future, then previous century.
 * @param {Integer} y year
 * @returns {Integer} change two digit year into multiple digits
 */
Yii.CTimestamp.digitCheck = function (y) {
		var yr, century, c1, c0;
		if (y < 100){
			yr = Number(php.date("Y"));
			century = Number((yr /100));
			if (yr%100 > 50) {
				c1 = century + 1;
				c0 = century;
			} else {
				c1 = century;
				c0 = century - 1;
			}
			c1 *= 100;
			// if 2-digit year is less than 30 years in future, set it to this century
			// otherwise if more than 30 years in future, then we set 2-digit year to the prev century.
			if ((y + c1) < yr+30) { y = y + c1;
		}
			else { y = y + c0*100;
		}
		}
		return y;
	};
/**
 * Returns 4-digit representation of the year.
 * @param {Integer} y year
 * @returns {Integer} 4-digit representation of the year
 */
Yii.CTimestamp.get4DigitYear = function (y) {
		return this.digitCheck(y);
	};
/**
 * @returns {Integer} get local time zone offset from GMT
 */
Yii.CTimestamp.getGMTDiff = function () {
		var TZ;
		if (TZ !== undefined) { return TZ; }
		TZ = php.mktime(0,0,0,1,2,1970) - php.gmmktime(0,0,0,1,2,1970);
		return TZ;
	};
/**
 * Returns the getdate() array.
 * @param {Integer} d original date timestamp. False to use the current timestamp.
 * @param {Boolean} fast false to compute the day of the week, default is true
 * @param {Boolean} gmt true to calculate the GMT dates (ignored for now)
 * @returns {Array} an array with date info.
 */
Yii.CTimestamp.getDate = function (d, fast, gmt) {
		var tz, result;
		if (d === undefined) {
			d = false;
		}
		if (fast === undefined) {
			fast = false;
		}
		if (gmt === undefined) {
			gmt = false;
		}
		result = php.getdate(d);
		
		return result;
	};
/**
 * Checks to see if the year, month, day are valid combination.
 * @param {Integer} y year
 * @param {Integer} m month
 * @param {Integer} d day
 * @returns {Boolean} true if valid date, semantic check only.
 */
Yii.CTimestamp.isValidDate = function (y, m, d) {
		return php.checkdate(m, d, y);
	};
/**
 * Checks to see if the hour, minute and second are valid.
 * @param {Integer} h hour
 * @param {Integer} m minute
 * @param {Integer} s second
 * @param {Boolean} hs24 whether the hours should be 0 through 23 (default) or 1 through 12.
 * @returns {Boolean} true if valid date, semantic check only.
 * @since 1.0.5
 */
Yii.CTimestamp.isValidTime = function (h, m, s, hs24) {
		if (hs24 === undefined) {
			hs24 = true;
		}
		if(hs24 && (h < 0 || h > 23) || !hs24 && (h < 1 || h > 12)) {
			return false;
		}
		if(m > 59 || m < 0) {
			return false;
		}
		if(s > 59 || s < 0) {
			return false;
		}
		return true;
	};
/**
 * Formats a timestamp to a date string.
 * @param {String} fmt format pattern
 * @param {Integer} d timestamp
 * @param {Boolean} is_gmt whether this is a GMT timestamp
 * @returns {String} formatted date based on timestamp $d
 */
Yii.CTimestamp.formatDate = function (fmt, d, is_gmt) {
		var _day_power, arr, year, month, day, hour, min, secs, max, dates, i, gmt, d10, hh;
		if (d === undefined) {
			d = false;
		}
		if (is_gmt === undefined) {
			is_gmt = false;
		}
		if (d === false) {
			return (is_gmt)? php.gmdate(fmt): php.date(fmt);
		}
		// check if number in 32-bit signed range
		if ((php.abs(d) <= 0x7FFFFFFF))	{
			// if windows, must be +ve integer
			if (d >= 0) {
				return (is_gmt)? php.gmdate(fmt,d): php.date(fmt,d);
			}
		}
		_day_power = 86400;
		arr = this.getDate(d,true,is_gmt);
		year = arr.year;
		month = arr.mon;
		day = arr.mday;
		hour = arr.hours;
		min = arr.minutes;
		secs = arr.seconds;
		max = php.strlen(fmt);
		dates = '';
		/*
			at this point, we have the following integer vars to manipulate:
			$year, $month, $day, $hour, $min, $secs
		*/
		for (i=0; i < max; i++)
		{
			switch(fmt[i])
			{
				case 'T':
					dates += php.date('T');
					break;
				// YEAR
				case 'L':
					dates += arr.leap ? '1' : '0';
					break;
				case 'r': // Thu, 21 Dec 2000 16:01:07 +0200
					// 4.3.11 uses '04 Jun 2004'
					// 4.3.8 uses  ' 4 Jun 2004'
					dates += php.gmdate('D',_day_power*(3+this.getDayOfWeek(year,month,day)))+', ' + (day<10?'0'+day:day) + ' '+php.date('M',php.mktime(0,0,0,month,2,1971))+' '+year+' ';
					if (hour < 10) {
						dates += '0'+hour;
					}
					else {
						dates += hour;
					}
					if (min < 10) {
						dates += ':0'+min;
					}
					else {
						dates += ':'+min;
					}
					if (secs < 10) {
						dates += ':0'+secs;
					}
					else {
						dates += ':'+secs;
					}
					gmt = this.getGMTDiff();
					dates += php.sprintf(' %s%04d',(gmt<=0)?'+':'-',php.abs(gmt)/36);
					break;
				case 'Y':
					dates += year;
					break;
				case 'y':
					dates += year.slice(php.strlen(year)-2, 2);
					break;
				// MONTH
				case 'm':
					if (month<10) {
						dates += '0'+month;
					}
					else {
						dates += month;
					}
					break;
				case 'Q':
					dates += (month+3)>>2;
					break;
				case 'n':
					dates += month;
					break;
				case 'M':
					dates += php.date('M',php.mktime(0,0,0,month,2,1971));
					break;
				case 'F':
					dates += php.date('F',php.mktime(0,0,0,month,2,1971));
					break;
				// DAY
				case 't':
					dates += arr.ndays;
					break;
				case 'z':
					dates += arr.yday;
					break;
				case 'w':
					dates += this.getDayOfWeek(year,month,day);
					break;
				case 'l':
					dates += php.gmdate('l',_day_power*(3+this.getDayOfWeek(year,month,day)));
					break;
				case 'D':
					dates += php.gmdate('D',_day_power*(3+this.getDayOfWeek(year,month,day)));
					break;
				case 'j':
					dates += day;
					break;
				case 'd':
					if (day<10) {
						dates += '0'+day;
					}
					else {
						dates += day;
					}
					break;
				case 'S':
					d10 = day % 10;
					if (d10 == 1) {
						dates += 'st';
					}
					else if (d10 == 2 && day != 12) {
						dates += 'nd';
					}
					else if (d10 == 3) {
						dates += 'rd';
					}
					else {
						dates += 'th';
					}
					break;
				// HOUR
				case 'Z':
					dates += (is_gmt) ? 0 : -this.getGMTDiff();
					break;
				case 'O':
					gmt = (is_gmt) ? 0 : this.getGMTDiff();
					dates += php.sprintf('%s%04d',(gmt<=0)?'+':'-',php.abs(gmt)/36);
					break;
				case 'H':
					if (hour < 10) {
						dates += '0'+hour;
					}
					else {
						dates += hour;
					}
					break;
				case 'h':
					if (hour > 12) {
						hh = hour - 12;
					}
					else {
						if (hour === 0) {
							hh = '12';
						}
						else {
							hh = hour;
						}
					}
					if (hh < 10) {
						dates += '0'+hh;
					}
					else {
						dates += hh;
					}
					break;
				case 'G':
					dates += hour;
					break;
				case 'g':
					if (hour > 12) {
						hh = hour - 12;
					}
					else {
						if (hour === 0) {
							hh = '12';
						}
						else {
							hh = hour;
						}
					}
					dates += hh;
					break;
				// MINUTES
				case 'i':
					if (min < 10) {
						dates += '0'+min;
					}
					else {
						dates += min;
					}
					break;
			// SECONDS
			case 'U':
				dates += d;
				break;
			case 's':
				if (secs < 10) {
					dates += '0'+secs;
				}
				else {
					dates += secs;
				}
				break;
			// AM/PM
			// Note 00:00 to 11:59 is AM, while 12:00 to 23:59 is PM
			case 'a':
				if (hour>=12) {
					dates += 'pm';
				}
				else {
					dates += 'am';
				}
				break;
				case 'A':
					if (hour>=12) {
						dates += 'PM';
					}
				else {
					dates += 'AM';
				}
				break;
			default:
				dates += fmt[i];
				break;
			// ESCAPE
			case "\\":
				i++;
				if (i < max) {
					dates += fmt[i];
				}
				break;
			}
		}
		return dates;
	};
/**
 * Generates a timestamp.
 * This is the same as the PHP function {@link mktime http://php.net/manual/en/function.mktime.php}.
 * @param {Integer} hr hour
 * @param {Integer} min minute
 * @param {Integer} sec second
 * @param {Integer} mon month
 * @param {Integer} day day
 * @param {Integer} year year
 * @param {Boolean} is_gmt whether this is GMT time. If true, gmmktime() will be used.
 * @returns {Integer|float} a timestamp given a local time.
 */
Yii.CTimestamp.getTimestamp = function (hr, min, sec, mon, day, year, is_gmt) {
	if (mon === undefined) {
		mon = false;
	}
	if (day === undefined) {
		day = false;
	}
	if (year === undefined) {
		year = false;
	}
	if (is_gmt === undefined) {
		is_gmt = false;
	}
	if (mon === false) {
		return is_gmt? php.gmmktime(hr,min,sec): php.mktime(hr,min,sec);
	}
	return is_gmt ? php.gmmktime(hr,min,sec,mon,day,year) : php.mktime(hr,min,sec,mon,day,year);
};