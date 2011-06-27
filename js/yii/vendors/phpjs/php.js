/* 
 * More info at: http://phpjs.org
 * 
 * This is version: 3.24
 * php.js is copyright 2011 Kevin van Zonneveld.
 * 
 * Portions copyright Brett Zamir (http://brett-zamir.me), Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net), Onno Marsman, Theriault, Michael White
 * (http://getsprink.com), Waldo Malqui Silva, Paulo Freitas, Jonas Raoni
 * Soares Silva (http://www.jsfromhell.com), Jack, Philip Peterson, Ates Goral
 * (http://magnetiq.com), Legaev Andrey, Ratheous, Alex, Martijn Wieringa,
 * Nate, lmeyrick (https://sourceforge.net/projects/bcmath-js/), Enrique
 * Gonzalez, Philippe Baumann, Rafał Kukawski (http://blog.kukawski.pl),
 * Webtoolkit.info (http://www.webtoolkit.info/), Ole Vrijenhoek, Ash Searle
 * (http://hexmen.com/blog/), travc, Carlos R. L. Rodrigues
 * (http://www.jsfromhell.com), Jani Hartikainen, stag019, GeekFG
 * (http://geekfg.blogspot.com), WebDevHobo (http://webdevhobo.blogspot.com/),
 * Erkekjetter, pilus, Rafał Kukawski (http://blog.kukawski.pl/), Johnny Mast
 * (http://www.phpvrouwen.nl), T.Wild,
 * http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript,
 * d3x, Michael Grier, Andrea Giammarchi (http://webreflection.blogspot.com),
 * marrtins, Mailfaker (http://www.weedem.fr/), Steve Hilder, gettimeofday,
 * mdsjack (http://www.mdsjack.bo.it), felix, majak, Steven Levithan
 * (http://blog.stevenlevithan.com), Mirek Slugen, Oleg Eremeev, Felix
 * Geisendoerfer (http://www.debuggable.com/felix), Martin
 * (http://www.erlenwiese.de/), gorthaur, Lars Fischer, Joris, AJ, Paul Smith,
 * Tim de Koning (http://www.kingsquare.nl), KELAN, Josh Fraser
 * (http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),
 * Chris, Marc Palau, Kevin van Zonneveld (http://kevin.vanzonneveld.net/),
 * Arpad Ray (mailto:arpad@php.net), Breaking Par Consulting Inc
 * (http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),
 * Nathan, Karol Kowalski, David, Dreamer, Diplom@t (http://difane.com/), Caio
 * Ariede (http://caioariede.com), Robin, Imgen Tata (http://www.myipdf.com/),
 * Pellentesque Malesuada, saulius, Aman Gupta, Sakimori, Tyler Akins
 * (http://rumkin.com), Thunder.m, Public Domain
 * (http://www.json.org/json2.js), Michael White, Kankrelune
 * (http://www.webfaktory.info/), Alfonso Jimenez
 * (http://www.alfonsojimenez.com), Frank Forte, vlado houba, Marco, Billy,
 * David James, madipta, noname, sankai, class_exists, Jalal Berrami, ger,
 * Itsacon (http://www.itsacon.net/), Scott Cariss, nobbler, Arno, Denny
 * Wardhana, ReverseSyntax, Mateusz "loonquawl" Zalega, Slawomir Kaniecki,
 * Francois, Fox, mktime, Douglas Crockford (http://javascript.crockford.com),
 * john (http://www.jd-tech.net), Oskar Larsson Högfeldt
 * (http://oskar-lh.name/), marc andreu, Nick Kolosov (http://sammy.ru), date,
 * Marc Jansen, Steve Clay, Olivier Louvignes (http://mg-crea.com/), Soren
 * Hansen, merabi, Subhasis Deb, josh, T0bsn, Tim Wiel, Brad Touesnard, MeEtc
 * (http://yass.meetcweb.com), Peter-Paul Koch
 * (http://www.quirksmode.org/js/beat.html), Pyerre, Jon Hohle, duncan, Bayron
 * Guevara, Adam Wallner (http://web2.bitbaro.hu/), paulo kuong, Gilbert,
 * Lincoln Ramsay, Thiago Mata (http://thiagomata.blog.com), Linuxworld,
 * lmeyrick (https://sourceforge.net/projects/bcmath-js/this.), djmix, Bryan
 * Elliott, David Randall, Sanjoy Roy, jmweb, Francesco, Stoyan Kyosev
 * (http://www.svest.org/), J A R, kenneth, T. Wild, Ole Vrijenhoek
 * (http://www.nervous.nl/), Raphael (Ao RUDLER), Shingo, LH, JB, nord_ua, jd,
 * JT, Thomas Beaucourt (http://www.webapp.fr), Ozh, XoraX
 * (http://www.xorax.info), EdorFaus, Eugene Bulkin (http://doubleaw.com/),
 * Der Simon (http://innerdom.sourceforge.net/), 0m3r, echo is bad,
 * FremyCompany, stensi, Kristof Coomans (SCK-CEN Belgian Nucleair Research
 * Centre), Devan Penner-Woelk, Pierre-Luc Paour, Martin Pool, Brant Messenger
 * (http://www.brantmessenger.com/), Kirk Strobeck, Saulo Vallory, Christoph,
 * Wagner B. Soares, Artur Tchernychev, Valentina De Rosa, Jason Wong
 * (http://carrot.org/), Daniel Esteban, strftime, Rick Waldron, Mick@el,
 * Anton Ongson, Bjorn Roesbeke (http://www.bjornroesbeke.be/), Simon Willison
 * (http://simonwillison.net), Gabriel Paderni, Philipp Lenssen, Marco van
 * Oort, Bug?, Blues (http://tech.bluesmoon.info/), Tomasz Wesolowski, rezna,
 * Eric Nagel, Evertjan Garretsen, Luke Godfrey, Pul, Bobby Drake, uestla,
 * Alan C, Ulrich, Zahlii, Yves Sucaet, sowberry, Norman "zEh" Fuchs, hitwork,
 * johnrembo, Brian Tafoya (http://www.premasolutions.com/), Nick Callen,
 * Steven Levithan (stevenlevithan.com), ejsanders, Scott Baker, Philippe
 * Jausions (http://pear.php.net/user/jausions), Aidan Lister
 * (http://aidanlister.com/), Rob, e-mike, HKM, ChaosNo1, metjay, strcasecmp,
 * strcmp, Taras Bogach, jpfle, Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), DxGx, kilops, Orlando,
 * dptr1988, Le Torbi, James (http://www.james-bell.co.uk/), Pedro Tainha
 * (http://www.pedrotainha.com), James, penutbutterjelly, Arnout Kazemier
 * (http://www.3rd-Eden.com), 3D-GRAF, daniel airton wermann
 * (http://wermann.com.br), jakes, Yannoo, FGFEmperor, gabriel paderni, Atli
 * Þór, Maximusya, Diogo Resende, Rival, Howard Yeend, Allan Jensen
 * (http://www.winternet.no), davook, Benjamin Lupton, baris ozdil, Greg
 * Frazier, Manish, Matt Bradley, Cord, fearphage
 * (http://http/my.opera.com/fearphage/), Matteo, Victor, taith, Tim de
 * Koning, Ryan W Tenney (http://ryan.10e.us), Tod Gentille, Alexander M
 * Beedie, Riddler (http://www.frontierwebdev.com/), Luis Salazar
 * (http://www.freaky-media.com/), Rafał Kukawski, T.J. Leahy, Luke Smith
 * (http://lucassmith.name), Kheang Hok Chin (http://www.distantia.ca/),
 * Russell Walker (http://www.nbill.co.uk/), Jamie Beck
 * (http://www.terabit.ca/), Garagoth, Andrej Pavlovic, Dino, Le Torbi
 * (http://www.letorbi.de/), Ben (http://benblume.co.uk/), DtTvB
 * (http://dt.in.th/2008-09-16.string-length-in-bytes.html), Michael, Chris
 * McMacken, setcookie, YUI Library:
 * http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html, Andreas,
 * Blues at http://hacks.bluesmoon.info/strftime/strftime.js, rem, Josep Sanz
 * (http://www.ws3.es/), Cagri Ekin, Lorenzo Pisani, incidence, Amirouche, Jay
 * Klehr, Amir Habibi (http://www.residence-mixte.com/), Tony, booeyOH, meo,
 * William, Greenseed, Yen-Wei Liu, Ben Bryan, Leslie Hoare, mk.keck
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */ 


// jslint.com configuration options. See: http://wiki.github.com/kvz/phpjs/jslint-options
/* global window */
/* jslint adsafe: false, bitwise: false, browser: false, cap: false, css: false, debug: false, devel: false, eqeqeq: true, evil: false, forin: false, fragment: false, immed: true, indent: 4, laxbreak: false, maxerr: 100, maxlen: 80, newcap: true, nomen: false, on: true, onevar: false, passfail: false, plusplus: false, regexp: false, rhino: false, safe: false, sidebar: false, strict: false, sub: false, undef: true, white: false, widget: false */

// Our idea with CommonJS is that you can do the following:
// var php = require('php');
// php.md5('test');
var php = {};

php.ini_set = function (varname, newvalue) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This will not set a global_value or access level for the ini item
    // *     example 1: ini_set('date.timezone', 'America/Chicago');
    // *     returns 1: 'Asia/Hong_Kong'

    var oldval = '',
        that = this;
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    this.php_js.ini[varname] = this.php_js.ini[varname] || {};
    oldval = this.php_js.ini[varname].local_value;

    var _setArr = function (oldval) { // Although these are set individually, they are all accumulated
        if (typeof oldval === 'undefined') {
            that.php_js.ini[varname].local_value = [];
        }
        that.php_js.ini[varname].local_value.push(newvalue);
    };

    switch (varname) {
    case 'extension':
        if (typeof this.dl === 'function') {
            this.dl(newvalue); // This function is only experimental in php.js
        }
        _setArr(oldval, newvalue);
        break;
    default:
        this.php_js.ini[varname].local_value = newvalue;
        break;
    }
    return oldval;
};
php.ini_get = function (varname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: The ini values must be set by ini_set or manually within an ini file
    // *     example 1: ini_get('date.timezone');
    // *     returns 1: 'Asia/Hong_Kong'
    if (this.php_js && this.php_js.ini && this.php_js.ini[varname] && this.php_js.ini[varname].local_value !== undefined) {
        if (this.php_js.ini[varname].local_value === null) {
            return '';
        }
        return this.php_js.ini[varname].local_value;
    }
    return '';
}

php.ctype_digit = function (text) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: ctype_digit('150');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.dg) !== -1;
};
php.gmmktime = function () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   derived from: mktime
    // *     example 1: gmmktime(14, 10, 2, 2, 1, 2008);
    // *     returns 1: 1201875002
    // *     example 2: gmmktime(0, 0, -1, 1, 1, 1970);
    // *     returns 2: -1
    var d = new Date(),
        r = arguments,
        i = 0,
        e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

    for (i = 0; i < e.length; i++) {
        if (typeof r[i] === 'undefined') {
            r[i] = d['getUTC' + e[i]]();
            r[i] += (i === 3); // +1 to fix JS months.
        } else {
            r[i] = parseInt(r[i], 10);
            if (isNaN(r[i])) {
                return false;
            }
        }
    }

    // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

    // Set year, month (-1 to fix JS months), and date.
    // !This must come before the call to setHours!
    d.setUTCFullYear(r[5], r[3] - 1, r[4]);

    // Set hours, minutes, and seconds.
    d.setUTCHours(r[0], r[1], r[2]);

    // Divide milliseconds by 1000 to return seconds and drop decimal.
    // Add 1 second if negative or it'll be off from PHP by 1 second.
    return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
};
php.getdate = function (timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // +   input by: Alex
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: getdate(1055901520);
    // *     returns 1: {'seconds': 40, 'minutes': 58, 'hours': 21, 'mday': 17, 'wday': 2, 'mon': 6, 'year': 2003, 'yday': 167, 'weekday': 'Tuesday', 'month': 'June', '0': 1055901520}
    var _w = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];
    var _m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
    (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
    new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    var w = d.getDay();
    var m = d.getMonth();
    var y = d.getFullYear();
    var r = {};

    r.seconds = d.getSeconds();
    r.minutes = d.getMinutes();
    r.hours = d.getHours();
    r.mday = d.getDate();
    r.wday = w;
    r.mon = m + 1;
    r.year = y;
    r.yday = Math.floor((d - (new Date(y, 0, 1))) / 86400000);
    r.weekday = _w[w] + 'day';
    r.month = _m[m];
    r['0'] = parseInt(d.getTime() / 1000, 10);

    return r;
};
php.checkdate = function (m, d, y) {
    // Returns true(1) if it is a valid date in gregorian calendar  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/checkdate
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Pyerre
    // +   improved by: Theriault
    // *     example 1: checkdate(12, 31, 2000);
    // *     returns 1: true
    // *     example 2: checkdate(2, 29, 2001);
    // *     returns 2: false
    // *     example 3: checkdate(3, 31, 2008);
    // *     returns 3: true
    // *     example 4: checkdate(1, 390, 2000);
    // *     returns 4: false
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
};
php.gmdate = function (format, timestamp) {
    // Format a GMT date/time  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/gmdate
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Alex
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: date
    // *     example 1: gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
    // *     returns 1: '07:09:40 m is month'
    var dt = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
    (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
    new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
    );
    timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
    return this.date(format, timestamp);
};
php.mt_rand = function (min, max) {
    // Returns a random number from Mersenne Twister  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/mt_rand
    // +   original by: Onno Marsman
    // *     example 1: mt_rand(1, 1);
    // *     returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

php.abs = function (mixed_number) {
    // Return the absolute value of the number  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/abs
    // +   original by: Waldo Malqui Silva
    // +   improved by: Karol Kowalski
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: \php.abs(4.2);
    // *     returns 1: 4.2
    // *     example 2: \php.abs(-4.2);
    // *     returns 2: 4.2
    // *     example 3: \php.abs(-5);
    // *     returns 3: 5
    // *     example 4: \php.abs('_argos');
    // *     returns 4: 0
    return Math.abs(mixed_number) || 0;
};

php.addcslashes = function (str, charlist) {
    // Escapes all chars mentioned in charlist with backslash. It creates octal representations if asked to backslash characters with 8th bit set or with ASCII<32 (except '\n', '\r', '\t' etc...)  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/addcslashes
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %  note 1: We show double backslashes in the return value example code below because a JavaScript string will not
    // %  note 1: render them as backslashes otherwise
    // *     example 1: \php.addcslashes('foo[ ]', 'A..z'); // Escape all ASCII within capital A to lower z range, including square brackets
    // *     returns 1: "\\f\\o\\o\\[ \\]"
    // *     example 2: \php.addcslashes("zoo['.']", 'z..A'); // Only escape z, period, and A here since not a lower-to-higher range
    // *     returns 2: "\\zoo['\\.']"
    // *     example 3: \php.addcslashes("@a\u0000\u0010\u00A9", "\0..\37!@\177..\377") == '\\@a\\000\\020\\302\\251'); // Escape as octals those specified and less than 32 (0x20) or greater than 126 (0x7E), but not otherwise
    // *     returns 3: true
    // *     example 4: \php.addcslashes("\u0020\u007E", "\40..\175") == '\\ ~'); // Those between 32 (0x20 or 040) and 126 (0x7E or 0176) decimal value will be backslashed if specified (not octalized)
    // *     returns 4: true
    // *     example 5: \php.addcslashes("\r\u0007\n", '\0..\37'); // Recognize C escape sequences if specified
    // *     returns 5: "\\r\\a\\n"
    // *     example 6: \php.addcslashes("\r\u0007\n", '\0'); // Do not recognize C escape sequences if not specified
    // *     returns 7: "\r\u0007\n"
    var target = '',
        chrs = [],
        i = 0,
        j = 0,
        c = '',
        next = '',
        rangeBegin = '',
        rangeEnd = '',
        chr = '',
        begin = 0,
        end = 0,
        octalLength = 0,
        postOctalPos = 0,
        cca = 0,
        escHexGrp = [],
        encoded = '',
        percentHex = /%([\dA-Fa-f]+)/g;
    var _pad = function (n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };

    for (i = 0; i < charlist.length; i++) {
        c = charlist.charAt(i);
        next = charlist.charAt(i + 1);
        if (c === '\\' && next && (/\d/).test(next)) { // Octal
            rangeBegin = charlist.slice(i + 1).match(/^\d+/)[0];
            octalLength = rangeBegin.length;
            postOctalPos = i + octalLength + 1;
            if (charlist.charAt(postOctalPos) + charlist.charAt(postOctalPos + 1) === '..') { // Octal begins range
                begin = rangeBegin.charCodeAt(0);
                if ((/\\\d/).test(charlist.charAt(postOctalPos + 2) + charlist.charAt(postOctalPos + 3))) { // Range ends with octal
                    rangeEnd = charlist.slice(postOctalPos + 3).match(/^\d+/)[0];
                    i += 1; // Skip range end backslash
                } else if (charlist.charAt(postOctalPos + 2)) { // Range ends with character
                    rangeEnd = charlist.charAt(postOctalPos + 2);
                } else {
                    throw 'Range with no end point';
                }
                end = rangeEnd.charCodeAt(0);
                if (end > begin) { // Treat as a range
                    for (j = begin; j <= end; j++) {
                        chrs.push(String.fromCharCode(j));
                    }
                } else { // Supposed to treat period, begin and end as individual characters only, not a range
                    chrs.push('.', rangeBegin, rangeEnd);
                }
                i += rangeEnd.length + 2; // Skip dots and range end (already skipped range end backslash if present)
            } else { // Octal is by itself
                chr = String.fromCharCode(parseInt(rangeBegin, 8));
                chrs.push(chr);
            }
            i += octalLength; // Skip range begin
        } else if (next + charlist.charAt(i + 2) === '..') { // Character begins range
            rangeBegin = c;
            begin = rangeBegin.charCodeAt(0);
            if ((/\\\d/).test(charlist.charAt(i + 3) + charlist.charAt(i + 4))) { // Range ends with octal
                rangeEnd = charlist.slice(i + 4).match(/^\d+/)[0];
                i += 1; // Skip range end backslash
            } else if (charlist.charAt(i + 3)) { // Range ends with character
                rangeEnd = charlist.charAt(i + 3);
            } else {
                throw 'Range with no end point';
            }
            end = rangeEnd.charCodeAt(0);
            if (end > begin) { // Treat as a range
                for (j = begin; j <= end; j++) {
                    chrs.push(String.fromCharCode(j));
                }
            } else { // Supposed to treat period, begin and end as individual characters only, not a range
                chrs.push('.', rangeBegin, rangeEnd);
            }
            i += rangeEnd.length + 2; // Skip dots and range end (already skipped range end backslash if present)
        } else { // Character is by itself
            chrs.push(c);
        }
    }

    for (i = 0; i < str.length; i++) {
        c = str.charAt(i);
        if (chrs.indexOf(c) !== -1) {
            target += '\\';
            cca = c.charCodeAt(0);
            if (cca < 32 || cca > 126) { // Needs special escaping
                switch (c) {
                case '\n':
                    target += 'n';
                    break;
                case '\t':
                    target += 't';
                    break;
                case '\u000D':
                    target += 'r';
                    break;
                case '\u0007':
                    target += 'a';
                    break;
                case '\v':
                    target += 'v';
                    break;
                case '\b':
                    target += 'b';
                    break;
                case '\f':
                    target += 'f';
                    break;
                default:
                    //target += _pad(cca.toString(8), 3);break; // Sufficient for UTF-16
                    encoded = encodeURIComponent(c);

                    // 3-length-padded UTF-8 octets
                    if ((escHexGrp = percentHex.exec(encoded)) !== null) {
                        target += _pad(parseInt(escHexGrp[1], 16).toString(8), 3); // already added a slash above
                    }
                    while ((escHexGrp = percentHex.exec(encoded)) !== null) {
                        target += '\\' + _pad(parseInt(escHexGrp[1], 16).toString(8), 3);
                    }
                    break;
                }
            } else { // Perform regular backslashed escaping
                target += c;
            }
        } else { // Just add the character unescaped
            target += c;
        }
    }
    return target;
};

php.addslashes = function (str) {
    // Escapes single quote, double quotes and backslash characters in a string with backslashes  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/addslashes
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // +   improved by: Nate
    // +   improved by: Onno Marsman
    // +   input by: Denny Wardhana
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
    // *     example 1: \php.addslashes("kevin's birthday");
    // *     returns 1: 'kevin\'s birthday'
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
};

php.array_chunk = function (input, size) {
    // Split array into chunks  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_chunk
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // *     example 1: \php.array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
    // *     returns 1: {0 : {0: 'Kevin', 1: 'van'} , 1 : {0: 'Zonneveld'}}
    for (var x, i = 0, c = -1, l = input.length, n = []; i < l; i++) {
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
    }

    return n;
};

php.array_combine = function (keys, values) {
    // Creates an array by using the elements of the first parameter as keys and the elements of the second as the corresponding values  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_combine
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.array_combine([0,1,2], ['kevin','van','zonneveld']);
    // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
    var new_array = {},
        keycount = keys && keys.length,
        i = 0;

    // input sanitation
    if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
    typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
        return false;
    }

    // number of elements does not match
    if (keycount != values.length) {
        return false;
    }

    for (i = 0; i < keycount; i++) {
        new_array[keys[i]] = values[i];
    }

    return new_array;
};

php.array_diff = function () {
    // Returns the entries of arr1 that have values which are not present in any of the others arguments.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_diff
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sanjoy Roy
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
    // *     returns 1: {0:'Kevin'}
    var arr1 = arguments[0],
        retArr = {};
    var k1 = '',
        i = 1,
        k = '',
        arr = {};

    arr1keys: for (k1 in arr1) {
        for (i = 1; i < arguments.length; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1]) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }

    return retArr;
};

php.array_fill = function (start_index, num, mixed_val) {
    // Create an array containing num elements starting with index start_key each initialized to val  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_fill
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // *     example 1: \php.array_fill(5, 6, 'banana');
    // *     returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
    var key, tmp_arr = {};

    if (!isNaN(start_index) && !isNaN(num)) {
        for (key = 0; key < num; key++) {
            tmp_arr[(key + start_index)] = mixed_val;
        }
    }

    return tmp_arr;
};

php.array_fill_keys = function (keys, value) {
    // Create an array using the elements of the first parameter as keys each initialized to val  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_fill_keys
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
    // *     example 1: \php.array_fill_keys(keys, 'banana')
    // *     returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
    var retObj = {},
        key = '';

    for (key in keys) {
        retObj[keys[key]] = value;
    }

    return retObj;
};

php.array_filter = function (arr, func) {
    // Filters elements from the array via the callback.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_filter
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Takes a function as an argument, not a function's name
    // *     example 1: \php.var odd = function (num) {return (num & 1);}; 
    // *     example 1: \php.array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
    // *     returns 1: {"a": 1, "c": 3, "e": 5}
    // *     example 2: \php.var even = function (num) {return (!(num & 1));}
    // *     example 2: \php.array_filter([6, 7, 8, 9, 10, 11, 12], even);
    // *     returns 2: {0: 6, 2: 8, 4: 10, 6: 12} 
    var retObj = {},
        k;

    for (k in arr) {
        if (func(arr[k])) {
            retObj[k] = arr[k];
        }
    }

    return retObj;
};

php.array_flip = function (trans) {
    // Return array with key <-> value flipped  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_flip
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}
    var key, tmp_ar = {};

    for (key in trans) {
        tmp_ar[trans[key]] = key;
    }

    return tmp_ar;
};

php.array_intersect = function () {
    // Returns the entries of arr1 that have values which are present in all the other arguments  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_intersect
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: These only output associative arrays (would need to be
    // %        note 1: all numeric and counting from zero to be numeric)
    // *     example 1: $array1 = {'a' : 'green', 0:'red', 1: 'blue'};
    // *     example 1: $array2 = {'b' : 'green', 0:'yellow', 1:'red'};
    // *     example 1: $array3 = ['green', 'red'];
    // *     example 1: $result = array_intersect($array1, $array2, $array3);
    // *     returns 1: {0: 'red', a: 'green'}
    var arr1 = arguments[0],
        retArr = {};
    var k1 = '',
        arr = {},
        i = 0,
        k = '';

    arr1keys: for (k1 in arr1) {
        arrs: for (i = 1; i < arguments.length; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1]) {
                    if (i === arguments.length - 1) {
                        retArr[k1] = arr1[k1];
                    }
                    // If the innermost loop always leads at least once to an equal value, continue the loop until done
                    continue arrs;
                }
            }
            // If it reaches here, it wasn't found in at least one array, so try next value
            continue arr1keys;
        }
    }

    return retArr;
};

php.array_key_exists = function (key, search) {
    // Checks if the given key or index exists in the array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_key_exists
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: \php.array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true
    // input sanitation
    if (!search || (search.constructor !== Array && search.constructor !== Object)) {
        return false;
    }

    return key in search;
};

php.array_keys = function (input, search_value, argStrict) {
    // Return just the keys from the input array, optionally only for the specified search_value  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_keys
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: jd
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}
    var search = typeof search_value !== 'undefined',
        tmp_arr = [],
        strict = !!argStrict,
        include = true,
        key = '';

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== search_value) {
                    include = false;
                }
                else if (input[key] != search_value) {
                    include = false;
                }
            }

            if (include) {
                tmp_arr[tmp_arr.length] = key;
            }
        }
    }

    return tmp_arr;
};

php.array_map = function (callback) {
    // Applies the callback to the elements in given arrays.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_map
    // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Takes a function as an argument, not a function's name
    // %        note 2: If the callback is a string, it can only work if the function name is in the global context
    // *     example 1: \php.array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] );
    // *     returns 1: [ 1, 8, 27, 64, 125 ]
    var argc = arguments.length,
        argv = arguments;
    var j = argv[1].length,
        i = 0,
        k = 1,
        m = 0;
    var tmp = [],
        tmp_ar = [];

    while (i < j) {
        while (k < argc) {
            tmp[m++] = argv[k++][i];
        }

        m = 0;
        k = 1;

        if (callback) {
            if (typeof callback === 'string') {
                callback = this.window[callback];
            }
            tmp_ar[i++] = callback.apply(null, tmp);
        } else {
            tmp_ar[i++] = tmp;
        }

        tmp = [];
    }

    return tmp_ar;
};

php.array_merge = function () {
    // Merges elements from passed arrays into one array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_merge
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Nate
    // +   input by: josh
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.arr1 = {"color": "red", 0: 2, 1: 4}
    // *     example 1: \php.arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    // *     example 1: \php.array_merge(arr1, arr2)
    // *     returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
    // *     example 2: \php.arr1 = []
    // *     example 2: \php.arr2 = {1: "data"}
    // *     example 2: \php.array_merge(arr1, arr2)
    // *     returns 2: {0: "data"}
    var args = Array.prototype.slice.call(arguments),
        retObj = {},
        k, j = 0,
        i = 0,
        retArr = true;

    for (i = 0; i < args.length; i++) {
        if (!(args[i] instanceof Array)) {
            retArr = false;
            break;
        }
    }

    if (retArr) {
        retArr = [];
        for (i = 0; i < args.length; i++) {
            retArr = retArr.concat(args[i]);
        }
        return retArr;
    }
    var ct = 0;

    for (i = 0, ct = 0; i < args.length; i++) {
        if (args[i] instanceof Array) {
            for (j = 0; j < args[i].length; j++) {
                retObj[ct++] = args[i][j];
            }
        } else {
            for (k in args[i]) {
                if (args[i].hasOwnProperty(k)) {
                    if (parseInt(k, 10) + '' === k) {
                        retObj[ct++] = args[i][k];
                    } else {
                        retObj[k] = args[i][k];
                    }
                }
            }
        }
    }
    return retObj;
};

php.array_merge_recursive = function (arr1, arr2) {
    // Recursively merges elements from passed arrays into one array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_merge_recursive
    // +   original by: Subhasis Deb
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: array_merge
    // *     example 1: \php.arr1 = {'color': {'favourite': 'read'}, 0: 5}
    // *     example 1: \php.arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
    // *     example 1: \php.array_merge_recursive(arr1, arr2)
    // *     returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
    var idx = '';

    if ((arr1 && (arr1 instanceof Array)) && (arr2 && (arr2 instanceof Array))) {
        for (idx in arr2) {
            arr1.push(arr2[idx]);
        }
    } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
        for (idx in arr2) {
            if (idx in arr1) {
                if (typeof arr1[idx] == 'object' && typeof arr2 == 'object') {
                    arr1[idx] = this.array_merge(arr1[idx], arr2[idx]);
                } else {
                    arr1[idx] = arr2[idx];
                }
            } else {
                arr1[idx] = arr2[idx];
            }
        }
    }

    return arr1;
};

php.array_pop = function (inputArr) {
    // Pops an element off the end of the array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_pop
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Theriault
    // %        note 1: While IE (and other browsers) support iterating an object's
    // %        note 1: own properties in order, if one attempts to add back properties
    // %        note 1: in IE, they may end up in their former position due to their position
    // %        note 1: being retained. So use of this function with "associative arrays"
    // %        note 1: (objects) may lead to unexpected behavior in an IE environment if
    // %        note 1: you add back properties with the same keys that you removed
    // *     example 1: \php.array_pop([0,1,2]);
    // *     returns 1: 2
    // *     example 2: \php.data = {firstName: 'Kevin', surName: 'van Zonneveld'};
    // *     example 2: \php.lastElem = array_pop(data);
    // *     returns 2: 'van Zonneveld'
    // *     results 2: data == {firstName: 'Kevin'}
    var key = '',
        lastKey = '';

    if (inputArr.hasOwnProperty('length')) {
        // Indexed
        if (!inputArr.length) {
            // Done popping, are we?
            return null;
        }
        return inputArr.pop();
    } else {
        // Associative
        for (key in inputArr) {
            if (inputArr.hasOwnProperty(key)) {
                lastKey = key;
            }
        }
        if (lastKey) {
            var tmp = inputArr[lastKey];
            delete(inputArr[lastKey]);
            return tmp;
        } else {
            return null;
        }
    }
};

php.array_push = function (inputArr) {
    // Pushes elements onto the end of the array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_push
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Note also that IE retains information about property position even
    // %        note 1: after being supposedly deleted, so if you delete properties and then
    // %        note 1: add back properties with the same keys (including numeric) that had
    // %        note 1: been deleted, the order will be as before; thus, this function is not
    // %        note 1: really recommended with associative arrays (objects) in IE environments
    // *     example 1: \php.array_push(['kevin','van'], 'zonneveld');
    // *     returns 1: 3
    var i = 0,
        pr = '',
        argv = arguments,
        argc = argv.length,
        allDigits = /^\d$/,
        size = 0,
        highestIdx = 0,
        len = 0;
    if (inputArr.hasOwnProperty('length')) {
        for (i = 1; i < argc; i++) {
            inputArr[inputArr.length] = argv[i];
        }
        return inputArr.length;
    }

    // Associative (object)
    for (pr in inputArr) {
        if (inputArr.hasOwnProperty(pr)) {
            ++len;
            if (pr.search(allDigits) !== -1) {
                size = parseInt(pr, 10);
                highestIdx = size > highestIdx ? size : highestIdx;
            }
        }
    }
    for (i = 1; i < argc; i++) {
        inputArr[++highestIdx] = argv[i];
    }
    return len + i - 1;
};

php.array_reduce = function (a_input, callback) {
    // Iteratively reduce the array to a single value via the callback.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_reduce
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // %        note 1: Takes a function as an argument, not a function's name
    // *     example 1: \php.array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;});
    // *     returns 1: 15
    var lon = a_input.length;
    var res = 0,
        i = 0;
    var tmp = [];


    for (i = 0; i < lon; i += 2) {
        tmp[0] = a_input[i];
        if (a_input[(i + 1)]) {
            tmp[1] = a_input[(i + 1)];
        } else {
            tmp[1] = 0;
        }
        res += callback.apply(null, tmp);
        tmp = [];
    }

    return res;
};

php.array_reverse = function (array, preserve_keys) {
    // Return input as a new array with the order of the entries reversed  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_reverse
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Karol Kowalski
    // *     example 1: \php.array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}
    var arr_len = array.length,
        newkey = 0,
        tmp_arr = {},
        key = '';
    preserve_keys = !! preserve_keys;

    for (key in array) {
        newkey = arr_len - key - 1;
        tmp_arr[preserve_keys ? key : newkey] = array[key];
    }

    return tmp_arr;
};

php.array_shift = function (inputArr) {
    // Pops an element off the beginning of the array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_shift
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Martijn Wieringa
    // %        note 1: Currently does not handle objects
    // *     example 1: \php.array_shift(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin'
    var props = false,
        shift = undefined,
        pr = '',
        allDigits = /^\d$/,
        int_ct = -1,
        _checkToUpIndices = function (arr, ct, key) {
            // Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
            // increment all subsequent (skipping current key, since we need its value below) until find unused)
            if (arr[ct] !== undefined) {
                var tmp = ct;
                ct += 1;
                if (ct === key) {
                    ct += 1;
                }
                ct = _checkToUpIndices(arr, ct, key);
                arr[ct] = arr[tmp];
                delete arr[tmp];
            }
            return ct;
        };


    if (inputArr.length === 0) {
        return null;
    }
    if (inputArr.length > 0) {
        return inputArr.shift();
    }

/*
    UNFINISHED FOR HANDLING OBJECTS
    for (pr in inputArr) {
        if (inputArr.hasOwnProperty(pr)) {
            props = true;
            shift = inputArr[pr];
            delete inputArr[pr];
            break;
        }
    }
    for (pr in inputArr) {
        if (inputArr.hasOwnProperty(pr)) {
            if (pr.search(allDigits) !== -1) {
                int_ct += 1;
                if (parseInt(pr, 10) === int_ct) { // Key is already numbered ok, so don't need to change key for value
                    continue;
                }
                _checkToUpIndices(inputArr, int_ct, pr);
                arr[int_ct] = arr[pr];
                delete arr[pr];
            }
        }
    }
    if (!props) {
        return null;
    }
    return shift;
    */
};

php.array_slice = function (arr, offst, lgth, preserve_keys) {
    // Returns elements specified by offset and length  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_slice
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: is_int
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %          note: Relies on is_int because !isNaN accepts floats 
    // *     example 1: \php.array_slice(["a", "b", "c", "d", "e"], 2, -1);
    // *     returns 1: {0: 'c', 1: 'd'}
    // *     example 2: \php.array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
    // *     returns 2: {2: 'c', 3: 'd'}
/*
    if ('callee' in arr && 'length' in arr) {
        arr = Array.prototype.slice.call(arr);
    }
    */

    var key = '';

    if (!(arr instanceof Array) || (preserve_keys && offst !== 0)) { // Assoc. array as input or if required as output
        var lgt = 0,
            newAssoc = {};
        for (key in arr) {
            //if (key !== 'length') {
            lgt += 1;
            newAssoc[key] = arr[key];
            //}
        }
        arr = newAssoc;

        offst = (offst < 0) ? lgt + offst : offst;
        lgth = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth;

        var assoc = {};
        var start = false,
            it = -1,
            arrlgth = 0,
            no_pk_idx = 0;
        for (key in arr) {
            ++it;
            if (arrlgth >= lgth) {
                break;
            }
            if (it == offst) {
                start = true;
            }
            if (!start) {
                continue;
            }++arrlgth;
            if (this.is_int(key) && !preserve_keys) {
                assoc[no_pk_idx++] = arr[key];
            } else {
                assoc[key] = arr[key];
            }
        }
        //assoc.length = arrlgth; // Make as array-like object (though length will not be dynamic)
        return assoc;
    }

    if (lgth === undefined) {
        return arr.slice(offst);
    } else if (lgth >= 0) {
        return arr.slice(offst, offst + lgth);
    } else {
        return arr.slice(offst, lgth);
    }
};

php.array_splice = function (arr, offst, lgth, replacement) {
    // Removes the elements designated by offset and length and replace them with supplied array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_splice
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Theriault
    // %        note 1: Order does get shifted in associative array input with numeric indices,
    // %        note 1: since PHP behavior doesn't preserve keys, but I understand order is
    // %        note 1: not reliable anyways
    // %        note 2: Note also that IE retains information about property position even
    // %        note 2: after being supposedly deleted, so use of this function may produce
    // %        note 2: unexpected results in IE if you later attempt to add back properties
    // %        note 2: with the same keys that had been deleted
    // -    depends on: is_int
    // *     example 1: \php.input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"};
    // *     example 1: \php.array_splice(input, 2);
    // *     returns 1: {0: "blue", 'dud': "yellow"}
    // *     results 1: input == {'abc':"green", 0:"red"}
    // *     example 2: \php.input = ["red", "green", "blue", "yellow"];
    // *     example 2: \php.array_splice(input, 3, 0, "purple");
    // *     returns 2: []
    // *     results 2: input == ["red", "green", "blue", "purple", "yellow"]
    // *     example 3: \php.input = ["red", "green", "blue", "yellow"]
    // *     example 3: \php.array_splice(input, -1, 1, ["black", "maroon"]);
    // *     returns 3: ["yellow"]
    // *     results 3: input == ["red", "green", "blue", "black", "maroon"]
    var _checkToUpIndices = function (arr, ct, key) {
        // Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
        // increment all subsequent (skipping current key, since we need its value below) until find unused)
        if (arr[ct] !== undefined) {
            var tmp = ct;
            ct += 1;
            if (ct === key) {
                ct += 1;
            }
            ct = _checkToUpIndices(arr, ct, key);
            arr[ct] = arr[tmp];
            delete arr[tmp];
        }
        return ct;
    };

    if (replacement && typeof replacement !== 'object') {
        replacement = [replacement];
    }
    if (lgth === undefined) {
        lgth = offst >= 0 ? arr.length - offst : -offst;
    } else if (lgth < 0) {
        lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
    }

    if (!(arr instanceof Array)) {
/*if (arr.length !== undefined) { // Deal with array-like objects as input
        delete arr.length;
        }*/
        var lgt = 0,
            ct = -1,
            rmvd = [],
            rmvdObj = {},
            repl_ct = -1,
            int_ct = -1;
        var returnArr = true,
            rmvd_ct = 0,
            rmvd_lgth = 0,
            key = '';
        // rmvdObj.length = 0;
        for (key in arr) { // Can do arr.__count__ in some browsers
            lgt += 1;
        }
        offst = (offst >= 0) ? offst : lgt + offst;
        for (key in arr) {
            ct += 1;
            if (ct < offst) {
                if (this.is_int(key)) {
                    int_ct += 1;
                    if (parseInt(key, 10) === int_ct) { // Key is already numbered ok, so don't need to change key for value
                        continue;
                    }
                    _checkToUpIndices(arr, int_ct, key); // Deal with situation, e.g.,
                    // if encounter index 4 and try to set it to 0, but 0 exists later in loop
                    arr[int_ct] = arr[key];
                    delete arr[key];
                }
                continue;
            }
            if (returnArr && this.is_int(key)) {
                rmvd.push(arr[key]);
                rmvdObj[rmvd_ct++] = arr[key]; // PHP starts over here too
            } else {
                rmvdObj[key] = arr[key];
                returnArr = false;
            }
            rmvd_lgth += 1;
            // rmvdObj.length += 1;
            if (replacement && replacement[++repl_ct]) {
                arr[key] = replacement[repl_ct];
            } else {
                delete arr[key];
            }
        }
        // arr.length = lgt - rmvd_lgth + (replacement ? replacement.length : 0); // Make (back) into an array-like object
        return returnArr ? rmvd : rmvdObj;
    }

    if (replacement) {
        replacement.unshift(offst, lgth);
        return Array.prototype.splice.apply(arr, replacement);
    }
    return arr.splice(offst, lgth);
};

php.array_sum = function (array) {
    // Returns the sum of the array entries  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_sum
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nate
    // +   bugfixed by: Gilbert
    // *     example 1: \php.array_sum([4, 9, 182.6]);
    // *     returns 1: 195.6
    // *     example 2: \php.total = []; index = 0.1; for (y=0; y < 12; y++){total[y] = y + index;}
    // *     example 2: \php.array_sum(total);
    // *     returns 2: 67.2
    var key, sum = 0;

    // input sanitation
    if (typeof array !== 'object') {
        return null;
    }

    for (key in array) {
        //tester_print_r(typeof sum);
        sum += (array[key] * 1);
    }

    return sum;
};

php.array_unique = function (inputArr) {
    // Removes duplicate values from array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_unique
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      input by: duncan
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nate
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael Grier
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: The second argument, sort_flags is not implemented;
    // %          note 1: also should be sorted (asort?) first according to docs
    // *     example 1: \php.array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
    // *     returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    // *     example 2: \php.array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
    // *     returns 2: {a: 'green', 0: 'red', 1: 'blue'}
    var key = '',
        tmp_arr2 = {},
        val = '';

    var __array_search = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey;
                }
            }
        }
        return false;
    };

    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key];
            if (false === __array_search(val, tmp_arr2)) {
                tmp_arr2[key] = val;
            }
        }
    }

    return tmp_arr2;
};

php.array_unshift = function (array) {
    // Pushes elements onto the beginning of the array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_unshift
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Martijn Wieringa
    // +   improved by: jmweb
    // %        note 1: Currently does not handle objects
    // *     example 1: \php.array_unshift(['van', 'Zonneveld'], 'Kevin');
    // *     returns 1: 3
    var i = arguments.length;

    while (--i !== 0) {
        arguments[0].unshift(arguments[i]);
    }

    return arguments[0].length;
};

php.array_values = function (input) {
    // Return just the values from the input array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_values
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [],
        cnt = 0;
    var key = '';

    for (key in input) {
        tmp_arr[cnt] = input[key];
        cnt++;
    }

    return tmp_arr;
};

php.array_walk = function (array, funcname, userdata) {
    // Apply a user function to every member of an array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_walk
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: \php.array_walk ({'a':'b'}, 'void', 'userdata');
    // *     returns 1: true
    // *     example 2: \php.array_walk ('a', 'void', 'userdata');
    // *     returns 2: false
    var key;

    if (typeof array !== 'object' || array === null) {
        return false;
    }

    for (key in array) {
        if (typeof(userdata) !== 'undefined') {
            eval(funcname + '( array [key] , key , userdata  )');
        } else {
            eval(funcname + '(  userdata ) ');
        }
    }

    return true;
};

php.array_walk_recursive = function (array, funcname, userdata) {
    // Apply a user function recursively to every member of an array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/array_walk_recursive
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: \php.array_walk_recursive ({'a': 'b', 'c': {'d': 'e'}}, 'void', 'userdata');
    // *     returns 1: true
    // *     example 2: \php.array_walk_recursive ('a', 'void', 'userdata');
    // *     returns 2: false
    var key;

    if (typeof array != 'object') {
        return false;
    }

    for (key in array) {
        if (typeof array[key] == 'object') {
            return this.array_walk_recursive(array[key], funcname, userdata);
        }

        if (typeof(userdata) != 'undefined') {
            eval(funcname + '( array [key] , key , userdata  )');
        } else {
            eval(funcname + '(  userdata ) ');
        }
    }

    return true;
};

php.arsort = function (inputArr, sort_flags) {
    // Sort an array in reverse order and maintain index association  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/arsort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: The examples are correct, this is a new way
    // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
    // %        note 3: This function deviates from PHP in returning a copy of the array instead
    // %        note 3: of acting by reference and returning true; this was necessary because
    // %        note 3: IE does not allow deleting and re-adding of properties without caching
    // %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 3: get the PHP behavior, but use this only if you are in an environment
    // %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 3: property deletion is supported. Note that we intend to implement the PHP
    // %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 3: is by reference in PHP anyways
    // %        note 4: Since JS objects' keys are always strings, and (the
    // %        note 4: default) SORT_REGULAR flag distinguishes by key type,
    // %        note 4: if the content is a numeric string, we treat the
    // %        note 4: "original type" as numeric.
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.data = arsort(data);
    // *     returns 1: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: \php.arsort(data);
    // *     results 2: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
    // *     returns 2: true
    var valArr = [],
        keyArr = [],
        k, i, ret, sorter, that = this,
        strictForIn = false,
        populateArr = {};

    switch (sort_flags) {
    case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
            return that.strnatcmp(b, a);
        };
        break;
    case 'SORT_LOCALE_STRING':
        // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
    case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
            return (a - b);
        };
        break;
    case 'SORT_REGULAR':
        // compare items normally (don't change types)
    default:
        sorter = function (b, a) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    var bubbleSort = function (keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length - 2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = sorter(inputArr[j + 1], inputArr[j]);
                if (ret > 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j + 1];
                    keyArr[j + 1] = tempKeyVal;
                }
            }
        }
    };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    // Get key and value arrays
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            keyArr.push(k);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch (e) {
        return false;
    }

    // Repopulate the old array
    for (i = 0; i < valArr.length; i++) {
        populateArr[keyArr[i]] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.asort = function (inputArr, sort_flags) {
    // Sort an array and maintain index association  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/asort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: paulo kuong
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Adam Wallner (http://web2.bitbaro.hu/)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: The examples are correct, this is a new way
    // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
    // %        note 3: This function deviates from PHP in returning a copy of the array instead
    // %        note 3: of acting by reference and returning true; this was necessary because
    // %        note 3: IE does not allow deleting and re-adding of properties without caching
    // %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 3: get the PHP behavior, but use this only if you are in an environment
    // %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 3: property deletion is supported. Note that we intend to implement the PHP
    // %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 3: is by reference in PHP anyways
    // %        note 4: Since JS objects' keys are always strings, and (the
    // %        note 4: default) SORT_REGULAR flag distinguishes by key type,
    // %        note 4: if the content is a numeric string, we treat the
    // %        note 4: "original type" as numeric.
    // -    depends on: strnatcmp
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.data = asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: \php.asort(data);
    // *     results 2: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 2: true
    var valArr = [],
        keyArr = [],
        k, i, ret, sorter, that = this,
        strictForIn = false,
        populateArr = {};

    switch (sort_flags) {
    case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
            return that.strnatcmp(a, b);
        };
        break;
    case 'SORT_LOCALE_STRING':
        // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
    case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
            return (a - b);
        };
        break;
    case 'SORT_REGULAR':
        // compare items normally (don't change types)
    default:
        sorter = function (a, b) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    var bubbleSort = function (keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length - 2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = sorter(inputArr[j + 1], inputArr[j]);
                if (ret < 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j + 1];
                    keyArr[j + 1] = tempKeyVal;
                }
            }
        }
    };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Get key and value arrays
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            keyArr.push(k);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch (e) {
        return false;
    }

    // Repopulate the old array
    for (i = 0; i < valArr.length; i++) {
        populateArr[keyArr[i]] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.base64_decode = function (data) {
    // Decodes string using MIME base64 algorithm  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/base64_decode
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_decode
    // *     example 1: \php.base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['btoa'] == 'function') {
    //    return btoa(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    dec = this.utf8_decode(dec);

    return dec;
};

php.base64_encode = function (data) {
    // Encodes string using MIME base64 algorithm  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/base64_encode
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: \php.base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['atob'] == 'function') {
    //    return atob(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data = this.utf8_encode(data + '');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
    case 1:
        enc = enc.slice(0, -2) + '==';
        break;
    case 2:
        enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
};

php.base_convert = function (number, frombase, tobase) {
    // Converts a number in a string from any base <= 36 to any base <= 36  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/base_convert
    // +   original by: Philippe Baumann
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // *     example 1: \php.base_convert('A37334', 16, 2);
    // *     returns 1: '101000110111001100110100'
    return parseInt(number + '', frombase | 0).toString(tobase | 0);
};

php.basename = function (path, suffix) {
    // Returns the filename component of the path  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/basename
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // +   improved by: djmix
    // *     example 1: \php.basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'
    // *     example 2: \php.basename('ecra.php?p=1');
    // *     returns 2: 'ecra.php?p=1'
    var b = path.replace(/^.*[\/\\]/g, '');

    if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
        b = b.substr(0, b.length - suffix.length);
    }

    return b;
};

php.call_user_func = function (cb) {
    // Call a user function which is the first parameter  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/call_user_func
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Diplom@t (http://difane.com/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.call_user_func('isNaN', 'a');
    // *     returns 1: true
    var func;

    if (typeof cb === 'string') {
        func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
    } else if (cb instanceof Array) {
        func = (typeof cb[0] == 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
    } else if (typeof cb === 'function') {
        func = cb;
    }

    if (typeof func != 'function') {
        throw new Error(func + ' is not a valid function');
    }

    var parameters = Array.prototype.slice.call(arguments, 1);
    return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(null, parameters) : func.apply(cb[0], parameters);
};

php.call_user_func_array = function (cb, parameters) {
    // Call a user function which is the first parameter with the arguments contained in array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/call_user_func_array
    // +   original by: Thiago Mata (http://thiagomata.blog.com)
    // +   revised  by: Jon Hohle
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Diplom@t (http://difane.com/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.call_user_func_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: \php.call_user_func_array('isNaN', [1]);
    // *     returns 2: false
    var func;

    if (typeof cb === 'string') {
        func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
    } else if (cb instanceof Array) {
        func = (typeof cb[0] == 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
    } else if (typeof cb === 'function') {
        func = cb;
    }

    if (typeof func !== 'function') {
        throw new Error(func + ' is not a valid function');
    }

    return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(null, parameters) : func.apply(cb[0], parameters);
};

php.ceil = function (value) {
    // Returns the next highest integer value of the number  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/ceil
    // +   original by: Onno Marsman
    // *     example 1: \php.ceil(8723321.4);
    // *     returns 1: 8723322
    return Math.ceil(value);
};

php.chr = function (codePt) {
    // Converts a codepoint number to a character  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/chr
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.chr(75);
    // *     returns 1: 'K'
    // *     example 1: \php.chr(65536) === '\uD800\uDC00';
    // *     returns 1: true
    if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
        //   enough for the UTF-16 encoding (JavaScript internal use), to
        //   require representation with two surrogates (reserved non-characters
        //   used for building other characters; the first is "high" and the next "low")
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    return String.fromCharCode(codePt);
};

php.class_exists = function (cls) {
    // Checks if the class exists  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/class_exists
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function class_a() {this.meth1 = function () {return true;}};
    // *     example 1: \php.var instance_a = new class_a();
    // *     example 1: \php.class_exists('class_a');
    // *     returns 1: true
    var i = '';
    cls = this.window[cls]; // Note: will prevent inner classes
    if (typeof cls !== 'function') {
        return false;
    }

    for (i in cls.prototype) {
        return true;
    }
    for (i in cls) { // If static members exist, then consider a "class"
        if (i !== 'prototype') {
            return true;
        }
    }
    if (cls.toSource && cls.toSource().match(/this\./)) {
        // Hackish and non-standard but can probably detect if setting
        // a property (we don't want to test by instantiating as that
        // may have side-effects)
        return true;
    }

    return false;
};

php.compact = function () {
    // Creates a hash containing variables and their values  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/compact
    // +   original by: Waldo Malqui Silva
    // +    tweaked by: Jack
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld';  
    // *     example 1: \php.compact('var1', 'var2', 'var3');
    // *     returns 1: {'var1': 'Kevin', 'var2': 'van', 'var3': 'Zonneveld'}    
    var matrix = {},
        that = this;

    var process = function (value) {
        var i = 0,
            l = value.length,
            key_value = '';
        for (i = 0; i < l; i++) {
            key_value = value[i];
            if (key_value instanceof Array) {
                process(key_value);
            } else {
                if (typeof that.window[key_value] !== 'undefined') {
                    matrix[key_value] = that.window[key_value];
                }
            }
        }
        return true;
    };

    process(arguments);
    return matrix;
};

php.count = function (mixed_var, mode) {
    // Count the number of elements in a variable (usually an array)  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/count
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Waldo Malqui Silva
    // +   bugfixed by: Soren Hansen
    // +      input by: merabi
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
    // *     example 1: \php.count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: \php.count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    var key, cnt = 0;

    if (mixed_var === null || typeof mixed_var === 'undefined') {
        return 0;
    } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
        return 1;
    }

    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode != 1) {
        mode = 0;
    }

    for (key in mixed_var) {
        if (mixed_var.hasOwnProperty(key)) {
            cnt++;
            if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
                cnt += this.count(mixed_var[key], 1);
            }
        }
    }

    return cnt;
};

php.crc32 = function (str) {
    // Calculate the crc32 polynomial of a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/crc32
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: T0bsn
    // -    depends on: utf8_encode
    // *     example 1: \php.crc32('Kevin van Zonneveld');
    // *     returns 1: 1249991249
    str = this.utf8_encode(str);
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    var crc = 0;
    var x = 0;
    var y = 0;

    crc = crc ^ (-1);
    for (var i = 0, iTop = str.length; i < iTop; i++) {
        y = (crc ^ str.charCodeAt(i)) & 0xFF;
        x = "0x" + table.substr(y * 9, 8);
        crc = (crc >>> 8) ^ x;
    }

    return crc ^ (-1);
};

php.date = function (format, timestamp) {
    // Format a local date/time  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/date
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: MeEtc (http://yass.meetcweb.com)
    // +   improved by: Brad Touesnard
    // +   improved by: Tim Wiel
    // +   improved by: Bryan Elliott
    //
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: David Randall
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +  derived from: gettimeofday
    // +      input by: majak
    // +   bugfixed by: majak
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Alex
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
    // +   improved by: JT
    // +   improved by: Theriault
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // %        note 1: Uses global: php_js to store the default timezone
    // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
    // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
    // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
    // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
    // *     example 1: \php.date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
    // *     returns 1: '09:09:40 m is month'
    // *     example 2: \php.date('F j, Y, g:i a', 1062462400);
    // *     returns 2: 'September 2, 2003, 2:26 am'
    // *     example 3: \php.date('Y W o', 1062462400);
    // *     returns 3: '2003 36 2003'
    // *     example 4: x = date('Y m d', (new Date()).getTime()/1000); 
    // *     example 4: (x+'').length == 10 // 2009 01 09
    // *     returns 4: true
    // *     example 5: \php.date('W', 1104534000);
    // *     returns 5: '53'
    // *     example 6: \php.date('B t', 1104534000);
    // *     returns 6: '999 31'
    // *     example 7: \php.date('W U', 1293750000.82); // 2010-12-31
    // *     returns 7: '52 1293750000'
    // *     example 8: \php.date('W', 1293836400); // 2011-01-01
    // *     returns 8: '52'
    // *     example 9: \php.date('W Y-m-d', 1293974054); // 2011-01-02
    // *     returns 9: '52 2011-01-02'
    var that = this,
        jsdate, f, formatChr = /\\?([a-z])/gi,
        formatChrCb,
        // Keep this here (works, but for code commented-out
        // below for file size reasons)
        //, tal= [],
        _pad = function (n, c) {
            if ((n = n + "").length < c) {
                return new Array((++c) - n.length).join("0") + n;
            } else {
                return n;
            }
        },
        txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        txt_ordin = {
            1: "st",
            2: "nd",
            3: "rd",
            21: "st",
            22: "nd",
            23: "rd",
            31: "st"
        };
    formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    f = {
        // Day
        d: function () { // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D: function () { // Shorthand day name; Mon...Sun
            return f.l().slice(0, 3);
        },
        j: function () { // Day of month; 1..31
            return jsdate.getDate();
        },
        l: function () { // Full day name; Monday...Sunday
            return txt_words[f.w()] + 'day';
        },
        N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S: function () { // Ordinal suffix for day of month; st, nd, rd, th
            return txt_ordin[f.j()] || 'th';
        },
        w: function () { // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z: function () { // Day of year; 0..365
            var a = new Date(f.Y(), f.n() - 1, f.j()),
                b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5) + 1;
        },

        // Week
        W: function () { // ISO-8601 week number
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                b = new Date(a.getFullYear(), 0, 4);
            return 1 + Math.round((a - b) / 864e5 / 7);
        },

        // Month
        F: function () { // Full month name; January...December
            return txt_words[6 + f.n()];
        },
        m: function () { // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        M: function () { // Shorthand month name; Jan...Dec
            return f.F().slice(0, 3);
        },
        n: function () { // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t: function () { // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0)).getDate();
        },

        // Year
        L: function () { // Is leap year?; 0 or 1
            return new Date(f.Y(), 1, 29).getMonth() === 1 | 0;
        },
        o: function () { // ISO-8601 year
            var n = f.n(),
                W = f.W(),
                Y = f.Y();
            return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
        },
        Y: function () { // Full year; e.g. 1980...2010
            return jsdate.getFullYear();
        },
        y: function () { // Last two digits of year; 00...99
            return (f.Y() + "").slice(-2);
        },

        // Time
        a: function () { // am or pm
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function () { // AM or PM
            return f.a().toUpperCase();
        },
        B: function () { // Swatch Internet time; 000..999
            var H = jsdate.getUTCHours() * 36e2,
                // Hours
                i = jsdate.getUTCMinutes() * 60,
                // Minutes
                s = jsdate.getUTCSeconds(); // Seconds
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () { // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        G: function () { // 24-Hours; 0..23
            return jsdate.getHours();
        },
        h: function () { // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H: function () { // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i: function () { // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () { // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () { // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },

        // Timezone
        e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
/*              return this.date_default_timezone_get();
*/
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function () { // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            var a = new Date(f.Y(), 0),
                // Jan 1
                c = Date.UTC(f.Y(), 0),
                // Jan 1 UTC
                b = new Date(f.Y(), 6),
                // Jul 1
                d = Date.UTC(f.Y(), 6); // Jul 1 UTC
            return 0 + ((a - c) !== (b - d));
        },
        O: function () { // Difference to GMT in hour format; e.g. +0200
            var a = jsdate.getTimezoneOffset();
            return (a > 0 ? "-" : "+") + _pad(Math.abs(a / 60 * 100), 4);
        },
        P: function () { // Difference to GMT w/colon; e.g. +02:00
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },
        T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
/*              var abbr = '', i = 0, os = 0, default = 0;
            if (!tal.length) {
                tal = that.timezone_abbreviations_list();
            }
            if (that.php_js && that.php_js.default_timezone) {
                default = that.php_js.default_timezone;
                for (abbr in tal) {
                    for (i=0; i < tal[abbr].length; i++) {
                        if (tal[abbr][i].timezone_id === default) {
                            return abbr.toUpperCase();
                        }
                    }
                }
            }
            for (abbr in tal) {
                for (i = 0; i < tal[abbr].length; i++) {
                    os = -jsdate.getTimezoneOffset() * 60;
                    if (tal[abbr][i].offset === os) {
                        return abbr.toUpperCase();
                    }
                }
            }
*/
            return 'UTC';
        },
        Z: function () { // Timezone offset in seconds (-43200...50400)
            return -jsdate.getTimezoneOffset() * 60;
        },

        // Full Date/Time
        c: function () { // ISO-8601 date.
            return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () { // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () { // Seconds since UNIX epoch
            return jsdate.getTime() / 1000 | 0;
        }
    };
    this.date = function (format, timestamp) {
        that = this;
        jsdate = ((typeof timestamp === 'undefined') ? new Date() : // Not provided
        (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
        );
        return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);
};

php.dirname = function (path) {
    // Returns the directory name component of the path  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/dirname
    // +   original by: Ozh
    // +   improved by: XoraX (http://www.xorax.info)
    // *     example 1: \php.dirname('/etc/passwd');
    // *     returns 1: '/etc'
    // *     example 2: \php.dirname('c:/Temp/x');
    // *     returns 2: 'c:/Temp'
    // *     example 3: \php.dirname('/dir/test/');
    // *     returns 3: '/dir'
    return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
};

php.empty = function (mixed_var) {
    // !No description available for empty. @php.js developers: Please update the function summary text file.
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/empty
    // +   original by: Philippe Baumann
    // +      input by: Onno Marsman
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: LH
    // +   improved by: Onno Marsman
    // +   improved by: Francesco
    // +   improved by: Marc Jansen
    // +   input by: Stoyan Kyosev (http://www.svest.org/)
    // *     example 1: \php.empty(null);
    // *     returns 1: true
    // *     example 2: \php.empty(undefined);
    // *     returns 2: true
    // *     example 3: \php.empty([]);
    // *     returns 3: true
    // *     example 4: \php.empty({});
    // *     returns 4: true
    // *     example 5: \php.empty({'aFunc' : function () { alert('humpty'); } });
    // *     returns 5: false
    var key;

    if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
        return true;
    }

    if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        return true;
    }

    return false;
};

php.end = function (arr) {
    // Advances array argument's internal pointer to the last element and return it  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/end
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // +    revised by: J A R
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   restored by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // *     example 1: \php.end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    // *     returns 1: 'Zonneveld'
    // *     example 2: \php.end(['Kevin', 'van', 'Zonneveld']);
    // *     returns 2: 'Zonneveld'
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.pointers = this.php_js.pointers || [];
    var indexOf = function (value) {
        for (var i = 0, length = this.length; i < length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    };
    // END REDUNDANT
    var pointers = this.php_js.pointers;
    if (!pointers.indexOf) {
        pointers.indexOf = indexOf;
    }
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var arrpos = pointers.indexOf(arr);
    if (!(arr instanceof Array)) {
        var ct = 0;
        for (var k in arr) {
            ct++;
            var val = arr[k];
        }
        if (ct === 0) {
            return false; // Empty
        }
        pointers[arrpos + 1] = ct - 1;
        return val;
    }
    if (arr.length === 0) {
        return false;
    }
    pointers[arrpos + 1] = arr.length - 1;
    return arr[pointers[arrpos + 1]];
};

php.extract = function (arr, type, prefix) {
    // Imports variables into symbol table from an array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/extract
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Only works by extracting into global context (whether called in the global scope or
    // %        note 1: within a function); also, the EXTR_REFS flag I believe can't be made to work
    // *     example 1: \php.size = 'large';
    // *     example 1: \php.var_array = {'color' : 'blue', 'size' : 'medium', 'shape' : 'sphere'};
    // *     example 1: \php.extract(var_array, 'EXTR_PREFIX_SAME', 'wddx');
    // *     example 1: \php.color+'-'+size+'-'+shape+'-'+wddx_size;
    // *     returns 1: 'blue-large-sphere-medium'
    if (arr instanceof Array && (type !== 'EXTR_PREFIX_ALL' && type !== 'EXTR_PREFIX_INVALID')) {
        return 0;
    }
    var targetObj = this.window;
    if (this.php_js && this.php_js.ini && this.php_js.ini['phpjs.extractTargetObj'] && this.php_js.ini['phpjs.extractTargetObj'].local_value) { // Allow designated object to be used instead of window
        targetObj = this.php_js.ini['phpjs.extractTargetObj'].local_value;
    }
    var chng = 0;

    for (var i in arr) {
        var validIdent = /^[_a-zA-Z$][\w|$]*$/; // TODO: Refine regexp to allow JS 1.5+ Unicode identifiers
        var prefixed = prefix + '_' + i;
        try {
            switch (type) {
            case 'EXTR_PREFIX_SAME' || 2:
                if (targetObj[i] !== undefined) {
                    if (prefixed.match(validIdent) !== null) {
                        targetObj[prefixed] = arr[i];
                        ++chng;
                    }
                } else {
                    targetObj[i] = arr[i];
                    ++chng;
                }
                break;
            case 'EXTR_SKIP' || 1:
                if (targetObj[i] === undefined) {
                    targetObj[i] = arr[i];
                    ++chng;
                }
                break;
            case 'EXTR_PREFIX_ALL' || 3:
                if (prefixed.match(validIdent) !== null) {
                    targetObj[prefixed] = arr[i];
                    ++chng;
                }
                break;
            case 'EXTR_PREFIX_INVALID' || 4:
                if (i.match(validIdent) !== null) {
                    if (prefixed.match(validIdent) !== null) {
                        targetObj[prefixed] = arr[i];
                        ++chng;
                    }
                } else {
                    targetObj[i] = arr[i];
                    ++chng;
                }
                break;
            case 'EXTR_IF_EXISTS' || 6:
                if (targetObj[i] !== undefined) {
                    targetObj[i] = arr[i];
                    ++chng;
                }
                break;
            case 'EXTR_PREFIX_IF_EXISTS' || 5:
                if (targetObj[i] !== undefined && prefixed.match(validIdent) !== null) {
                    targetObj[prefixed] = arr[i];
                    ++chng;
                }
                break;
            case 'EXTR_REFS' || 256:
                throw 'The EXTR_REFS type will not work in JavaScript';
            case 'EXTR_OVERWRITE' || 0:
                // Fall-through
            default:
                targetObj[i] = arr[i];
                ++chng;
                break;
            }
        } catch (e) { // Just won't increment for problem assignments
        }
    }
    return chng;
};

php.floor = function (value) {
    // Returns the next lowest integer value from the number  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/floor
    // +   original by: Onno Marsman
    // *     example 1: \php.floor(8723321.4);
    // *     returns 1: 8723321
    return Math.floor(value);
};

php.get_class = function (obj) {
    // Retrieves the class name  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/get_class
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: David James
    // *     example 1: \php.get_class(new (function MyClass() {}));
    // *     returns 1: "MyClass"
    // *     example 2: \php.get_class({});
    // *     returns 2: "Object"
    // *     example 3: \php.get_class([]);
    // *     returns 3: false
    // *     example 4: \php.get_class(42);
    // *     returns 4: false
    // *     example 5: \php.get_class(window);
    // *     returns 5: false
    // *     example 6: \php.get_class(function MyFunction() {});
    // *     returns 6: false
    if (obj instanceof Object && !(obj instanceof Array) && !(obj instanceof Function) && obj.constructor && obj != this.window) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return false;
};

php.get_html_translation_table = function (table, quote_style) {
    // Returns the internal translation table used by htmlspecialchars and htmlentities  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/get_html_translation_table
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: \php.get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
        hash_map = {},
        decimal = 0,
        symbol = '';
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }

    return hash_map;
};

php.gettype = function (mixed_var) {
    // Returns the type of the variable  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/gettype
    // +   original by: Paulo Freitas
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Douglas Crockford (http://javascript.crockford.com)
    // +   input by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: is_float
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.gettype(1);
    // *     returns 1: 'integer'
    // *     example 2: \php.gettype(undefined);
    // *     returns 2: 'undefined'
    // *     example 3: \php.gettype({0: 'Kevin van Zonneveld'});
    // *     returns 3: 'array'
    // *     example 4: \php.gettype('foo');
    // *     returns 4: 'string'
    // *     example 5: \php.gettype({0: function () {return false;}});
    // *     returns 5: 'array'
    var s = typeof mixed_var,
        name;
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (s === 'object') {
        if (mixed_var !== null) { // From: http://javascript.crockford.com/remedial.html
            if (typeof mixed_var.length === 'number' && !(mixed_var.propertyIsEnumerable('length')) && typeof mixed_var.splice === 'function') {
                s = 'array';
            } else if (mixed_var.constructor && getFuncName(mixed_var.constructor)) {
                name = getFuncName(mixed_var.constructor);
                if (name === 'Date') {
                    s = 'date'; // not in PHP
                } else if (name === 'RegExp') {
                    s = 'regexp'; // not in PHP
                } else if (name === 'PHPJS_Resource') { // Check against our own resource constructor
                    s = 'resource';
                }
            }
        } else {
            s = 'null';
        }
    } else if (s === 'number') {
        s = this.is_float(mixed_var) ? 'double' : 'integer';
    }
    return s;
};

php.html_entity_decode = function (string, quote_style) {
    // Convert all HTML entities to their applicable characters  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/html_entity_decode
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: marc andreu
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Ratheous
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Nick Kolosov (http://sammy.ru)
    // +   bugfixed by: Fox
    // -    depends on: get_html_translation_table
    // *     example 1: \php.html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'
    // *     example 2: \php.html_entity_decode('&amp;lt;');
    // *     returns 2: '&lt;'
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    // fix &amp; problem
    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
    delete(hash_map['&']);
    hash_map['&'] = '&amp;';

    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }
    tmp_str = tmp_str.split('&#039;').join("'");

    return tmp_str;
};

php.htmlentities = function (string, quote_style) {
    // Convert all applicable characters to HTML entities  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/htmlentities
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // -    depends on: get_html_translation_table
    // *     example 1: \php.htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: \php.htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
    hash_map["'"] = '&#039;';
    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }

    return tmp_str;
};

php.htmlspecialchars = function (string, quote_style, charset, double_encode) {
    // Convert special characters to HTML entities  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/htmlspecialchars
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nathan
    // +   bugfixed by: Arno
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +      input by: Mailfaker (http://www.weedem.fr/)
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      input by: felix
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: charset argument not supported
    // *     example 1: \php.htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
    // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    // *     example 2: \php.htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
    // *     returns 2: 'ab"c&#039;d'
    // *     example 3: \php.htmlspecialchars("my "&entity;" is still here", null, null, false);
    // *     returns 3: 'my &quot;&entity;&quot; is still here'
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined' || quote_style === null) {
        quote_style = 2;
    }
    if (string === null) {
    	string = "";
    }
    string = string.toString();
    if (double_encode !== false) { // Put this first to avoid double-encoding
        string = string.replace(/&/g, '&amp;');
    }
    string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            } else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;');
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;');
    }

    return string;
};

php.htmlspecialchars_decode = function (string, quote_style) {
    // Convert special HTML entities back to characters  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/htmlspecialchars_decode
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Mateusz "loonquawl" Zalega
    // +      input by: ReverseSyntax
    // +      input by: Slawomir Kaniecki
    // +      input by: Scott Cariss
    // +      input by: Francois
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +      input by: Mailfaker (http://www.weedem.fr/)
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
    // *     returns 1: '<p>this -> &quot;</p>'
    // *     example 2: \php.htmlspecialchars_decode("&amp;quot;");
    // *     returns 2: '&quot;'
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined') {
        quote_style = 2;
    }
    string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            } else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
        // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
    }
    if (!noquotes) {
        string = string.replace(/&quot;/g, '"');
    }
    // Put this in last place to avoid escape being double-decoded
    string = string.replace(/&amp;/g, '&');

    return string;
};

php.http_build_query = function (formdata, numeric_prefix, arg_separator) {
    // Generates a form-encoded query string from an associative array or object.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/http_build_query
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   improved by: Michael White (http://getsprink.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +    revised by: stag019
    // +   input by: Dreamer
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: urlencode
    // *     example 1: \php.http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
    // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    // *     example 2: \php.http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
    // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
    var value, key, tmp = [],
        that = this;

    var _http_build_query_helper = function (key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = "1";
        } else if (val === false) {
            val = "0";
        }
        if (val !== null && typeof(val) === "object") {
            for (k in val) {
                if (val[k] !== null) {
                    tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
                }
            }
            return tmp.join(arg_separator);
        } else if (typeof(val) !== "function") {
            return that.urlencode(key) + "=" + that.urlencode(val);
        } else {
            throw new Error('There was an error processing for http_build_query().');
        }
    };

    if (!arg_separator) {
        arg_separator = "&";
    }
    for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        tmp.push(_http_build_query_helper(key, value, arg_separator));
    }

    return tmp.join(arg_separator);
};

php.in_array = function (needle, haystack, argStrict) {
    // Checks if the given value exists in the array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/in_array
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: \php.in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: \php.in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: \php.in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: \php.in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
};

php.intval = function (mixed_var, base) {
    // Get the integer value of a variable using the optional base for the conversion  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/intval
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: stensi
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Matteo
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: \php.intval(4.2);
    // *     returns 2: 4
    // *     example 3: \php.intval(42, 8);
    // *     returns 3: 42
    // *     example 4: \php.intval('09');
    // *     returns 4: 9
    // *     example 5: \php.intval('1e', 16);
    // *     returns 5: 30
    var tmp;

    var type = typeof(mixed_var);

    if (type === 'boolean') {
        return (mixed_var) ? 1 : 0;
    } else if (type === 'string') {
        tmp = parseInt(mixed_var, base || 10);
        return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
    } else if (type === 'number' && isFinite(mixed_var)) {
        return Math.floor(mixed_var);
    } else {
        return 0;
    }
};

php.is_callable = function (v, syntax_only, callable_name) {
    // Returns true if var is callable.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/is_callable
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: The variable callable_name cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
    // %        note 2: When used on an object, depends on a constructor property being kept on the object prototype
    // *     example 1: \php.is_callable('is_callable');
    // *     returns 1: true
    // *     example 2: \php.is_callable('bogusFunction', true);
    // *     returns 2:true // gives true because does not do strict checking
    // *     example 3: \php.function SomeClass () {}
    // *     example 3: SomeClass.prototype.someMethod = function (){};
    // *     example 3: \php.var testObj = new SomeClass();
    // *     example 3: \php.is_callable([testObj, 'someMethod'], true, 'myVar');
    // *     example 3: \php.alert(myVar); // 'SomeClass::someMethod'
    var name = '',
        obj = {},
        method = '';
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (typeof v === 'string') {
        obj = this.window;
        method = v;
        name = v;
    } else if (v instanceof Array && v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
        obj = v[0];
        method = v[1];
        name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
    } else {
        return false;
    }
    if (syntax_only || typeof obj[method] === 'function') {
        if (callable_name) {
            this.window[callable_name] = name;
        }
        return true;
    }
    return false;
};

php.is_float = function (mixed_var) {
    // Returns true if variable is float point  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/is_float
    // +   original by: Paulo Freitas
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.is_float(186.31);
    // *     returns 1: true
    if (typeof mixed_var !== 'number') {
        return false;
    }

    return !!(mixed_var % 1);
};

php.is_int = function (mixed_var) {
    // !No description available for is_int. @php.js developers: Please update the function summary text file.
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/is_int
    // +   original by: Alex
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Matt Bradley
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.is_int(23)
    // *     returns 1: true
    // *     example 2: \php.is_int('23')
    // *     returns 2: false
    // *     example 3: \php.is_int(23.5)
    // *     returns 3: false
    // *     example 4: \php.is_int(true)
    // *     returns 4: false
    if (typeof mixed_var !== 'number') {
        return false;
    }

    return !(mixed_var % 1);
};

php.krsort = function (inputArr, sort_flags) {
    // Sort an array by key value in reverse order  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/krsort
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: The examples are correct, this is a new way
    // %        note 2: This function deviates from PHP in returning a copy of the array instead
    // %        note 2: of acting by reference and returning true; this was necessary because
    // %        note 2: IE does not allow deleting and re-adding of properties without caching
    // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 2: get the PHP behavior, but use this only if you are in an environment
    // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 2: property deletion is supported. Note that we intend to implement the PHP
    // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 2: is by reference in PHP anyways
    // %        note 3: Since JS objects' keys are always strings, and (the
    // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
    // %        note 3: if the content is a numeric string, we treat the
    // %        note 3: "original type" as numeric.
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.data = krsort(data);
    // *     results 1: {d: 'lemon', c: 'apple', b: 'banana', a: 'orange'}
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
    // *     example 2: \php.krsort(data);
    // *     results 2: data == {3: 'Kevin', 2: 'van', 1: 'Zonneveld'}
    // *     returns 2: true
    var tmp_arr = {},
        keys = [],
        sorter, i, k, that = this,
        strictForIn = false,
        populateArr = {};

    switch (sort_flags) {
    case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
            return that.strnatcmp(b, a);
        };
        break;
    case 'SORT_LOCALE_STRING':
        // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
    case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
            return (b - a);
        };
        break;
    case 'SORT_REGULAR':
        // compare items normally (don't change types)
    default:
        sorter = function (b, a) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort(sorter);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmp_arr[k] = inputArr[k];
        if (strictForIn) {
            delete inputArr[k];
        }
    }
    for (i in tmp_arr) {
        if (tmp_arr.hasOwnProperty(i)) {
            populateArr[i] = tmp_arr[i];
        }
    }

    return strictForIn || populateArr;
};

php.ksort = function (inputArr, sort_flags) {
    // Sort an array by key  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/ksort
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: The examples are correct, this is a new way
    // %        note 2: This function deviates from PHP in returning a copy of the array instead
    // %        note 2: of acting by reference and returning true; this was necessary because
    // %        note 2: IE does not allow deleting and re-adding of properties without caching
    // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 2: get the PHP behavior, but use this only if you are in an environment
    // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 2: property deletion is supported. Note that we intend to implement the PHP
    // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 2: is by reference in PHP anyways
    // %        note 3: Since JS objects' keys are always strings, and (the
    // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
    // %        note 3: if the content is a numeric string, we treat the
    // %        note 3: "original type" as numeric.
    // -    depends on: i18n_loc_get_default
    // -    depends on: strnatcmp
    // *     example 1: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.data = ksort(data);
    // *     results 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
    // *     example 2: \php.ksort(data);
    // *     results 2: data == {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    // *     returns 2: true
    var tmp_arr = {},
        keys = [],
        sorter, i, k, that = this,
        strictForIn = false,
        populateArr = {};

    switch (sort_flags) {
    case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
            return that.strnatcmp(a, b);
        };
        break;
    case 'SORT_LOCALE_STRING':
        // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
    case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
            return ((a + 0) - (b + 0));
        };
        break;
        // case 'SORT_REGULAR': // compare items normally (don't change types)
    default:
        sorter = function (a, b) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    keys.sort(sorter);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmp_arr[k] = inputArr[k];
        if (strictForIn) {
            delete inputArr[k];
        }
    }
    for (i in tmp_arr) {
        if (tmp_arr.hasOwnProperty(i)) {
            populateArr[i] = tmp_arr[i];
        }
    }

    return strictForIn || populateArr;
};

php.lcfirst = function (str) {
    // !No description available for lcfirst. @php.js developers: Please update the function summary text file.
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/lcfirst
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.lcfirst('Kevin Van Zonneveld');
    // *     returns 1: 'kevin Van Zonneveld'
    str += '';
    var f = str.charAt(0).toLowerCase();
    return f + str.substr(1);
};

php.ltrim = function (str, charlist) {
    // Strips whitespace from the beginning of a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/ltrim
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: \php.ltrim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld    '
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    var re = new RegExp('^[' + charlist + ']+', 'g');
    return (str + '').replace(re, '');
};
php.rtrim = function (str, charlist) {
    // Removes trailing whitespace  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/rtrim
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: rem
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: rtrim('    Kevin van Zonneveld    ');
    // *     returns 1: '    Kevin van Zonneveld'
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return (str + '').replace(re, '');
};
php.max = function () {
    // Return the highest value in an array or a series of arguments  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/max
    // +   original by: Onno Marsman
    // +    revised by: Onno Marsman
    // +    tweaked by: Jack
    // %          note: Long code cause we're aiming for maximum PHP compatibility
    // *     example 1: \php.max(1, 3, 5, 6, 7);
    // *     returns 1: 7
    // *     example 2: \php.max([2, 4, 5]);
    // *     returns 2: 5
    // *     example 3: \php.max(0, 'hello');
    // *     returns 3: 0
    // *     example 4: \php.max('hello', 0);
    // *     returns 4: 'hello'
    // *     example 5: \php.max(-1, 'hello');
    // *     returns 5: 'hello'
    // *     example 6: \php.max([2, 4, 8], [2, 5, 7]);
    // *     returns 6: [2, 5, 7]
    var ar, retVal, i = 0,
        n = 0;
    var argv = arguments,
        argc = argv.length;

    var _obj2Array = function (obj) {
        if (obj instanceof Array) {
            return obj;
        } else {
            var ar = [];
            for (var i in obj) {
                ar.push(obj[i]);
            }
            return ar;
        }
    }; //function _obj2Array
    var _compare = function (current, next) {
        var i = 0,
            n = 0,
            tmp = 0;
        var nl = 0,
            cl = 0;

        if (current === next) {
            return 0;
        } else if (typeof current == 'object') {
            if (typeof next == 'object') {
                current = _obj2Array(current);
                next = _obj2Array(next);
                cl = current.length;
                nl = next.length;
                if (nl > cl) {
                    return 1;
                } else if (nl < cl) {
                    return -1;
                } else {
                    for (i = 0, n = cl; i < n; ++i) {
                        tmp = _compare(current[i], next[i]);
                        if (tmp == 1) {
                            return 1;
                        } else if (tmp == -1) {
                            return -1;
                        }
                    }
                    return 0;
                }
            } else {
                return -1;
            }
        } else if (typeof next == 'object') {
            return 1;
        } else if (isNaN(next) && !isNaN(current)) {
            if (current == 0) {
                return 0;
            } else {
                return (current < 0 ? 1 : -1);
            }
        } else if (isNaN(current) && !isNaN(next)) {
            if (next == 0) {
                return 0;
            } else {
                return (next > 0 ? 1 : -1);
            }
        } else {
            if (next == current) {
                return 0;
            } else {
                return (next > current ? 1 : -1);
            }
        }
    }; //function _compare
    if (argc === 0) {
        throw new Error('At least one value should be passed to max()');
    } else if (argc === 1) {
        if (typeof argv[0] === 'object') {
            ar = _obj2Array(argv[0]);
        } else {
            throw new Error('Wrong parameter count for max()');
        }
        if (ar.length === 0) {
            throw new Error('Array must contain at least one element for max()');
        }
    } else {
        ar = argv;
    }

    retVal = ar[0];
    for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) == 1) {
            retVal = ar[i];
        }
    }

    return retVal;
};

php.md5 = function (str) {
    // Calculate the md5 hash of a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/md5
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: \php.md5('Kevin van Zonneveld');
    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
    var xl;

    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };

    var addUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    };

    var _F = function (x, y, z) {
        return (x & y) | ((~x) & z);
    };
    var _G = function (x, y, z) {
        return (x & z) | (y & (~z));
    };
    var _H = function (x, y, z) {
        return (x ^ y ^ z);
    };
    var _I = function (x, y, z) {
        return (y ^ (x | (~z)));
    };

    var _FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var _GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var _HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var _II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function (str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = new Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    var wordToHex = function (lValue) {
        var wordToHexValue = "",
            wordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };

    var x = [],
        k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22,
        S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20,
        S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23,
        S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

    str = this.utf8_encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    xl = x.length;
    for (k = 0; k < xl; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }

    var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

    return temp.toLowerCase();
};

php.method_exists = function (obj, method) {
    // Checks if the class method exists  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/method_exists
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function class_a() {this.meth1 = function () {return true;}};
    // *     example 1: \php.var instance_a = new class_a();
    // *     example 1: \php.method_exists(instance_a, 'meth1');
    // *     returns 1: true
    // *     example 2: \php.function class_a() {this.meth1 = function () {return true;}};
    // *     example 2: \php.var instance_a = new class_a();
    // *     example 2: \php.method_exists(instance_a, 'meth2');
    // *     returns 2: false
    if (typeof obj === 'string') {
        return this.window[obj] && typeof this.window[obj][method] === 'function';
    }

    return typeof obj[method] === 'function';
};

php.microtime = function (get_as_float) {
    // Returns either a string or a float containing the current time in seconds and microseconds  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/microtime
    // +   original by: Paulo Freitas
    // *     example 1: \php.timeStamp = microtime(true);
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    var now = new Date().getTime() / 1000;
    var s = parseInt(now, 10);

    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
};

php.min = function () {
    // Return the lowest value in an array or a series of arguments  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/min
    // +   original by: Onno Marsman
    // +    revised by: Onno Marsman
    // +    tweaked by: Jack
    // %          note: Long code cause we're aiming for maximum PHP compatibility
    // *     example 1: \php.min(1, 3, 5, 6, 7);
    // *     returns 1: 1
    // *     example 2: \php.min([2, 4, 5]);
    // *     returns 2: 2
    // *     example 3: \php.min(0, 'hello');
    // *     returns 3: 0
    // *     example 4: \php.min('hello', 0);
    // *     returns 4: 'hello'
    // *     example 5: \php.min(-1, 'hello');
    // *     returns 5: -1
    // *     example 6: \php.min([2, 4, 8], [2, 5, 7]);
    // *     returns 6: [2, 4, 8]
    var ar, retVal, i = 0,
        n = 0;
    var argv = arguments,
        argc = argv.length;

    var _obj2Array = function (obj) {
        if (obj instanceof Array) {
            return obj;
        } else {
            var ar = [];
            for (var i in obj) {
                ar.push(obj[i]);
            }
            return ar;
        }
    }; //function _obj2Array
    var _compare = function (current, next) {
        var i = 0,
            n = 0,
            tmp = 0;
        var nl = 0,
            cl = 0;

        if (current === next) {
            return 0;
        } else if (typeof current == 'object') {
            if (typeof next == 'object') {
                current = _obj2Array(current);
                next = _obj2Array(next);
                cl = current.length;
                nl = next.length;
                if (nl > cl) {
                    return 1;
                } else if (nl < cl) {
                    return -1;
                } else {
                    for (i = 0, n = cl; i < n; ++i) {
                        tmp = _compare(current[i], next[i]);
                        if (tmp == 1) {
                            return 1;
                        } else if (tmp == -1) {
                            return -1;
                        }
                    }
                    return 0;
                }
            } else {
                return -1;
            }
        } else if (typeof next == 'object') {
            return 1;
        } else if (isNaN(next) && !isNaN(current)) {
            if (current == 0) {
                return 0;
            } else {
                return (current < 0 ? 1 : -1);
            }
        } else if (isNaN(current) && !isNaN(next)) {
            if (next == 0) {
                return 0;
            } else {
                return (next > 0 ? 1 : -1);
            }
        } else {
            if (next == current) {
                return 0;
            } else {
                return (next > current ? 1 : -1);
            }
        }
    }; //function _compare
    if (argc === 0) {
        throw new Error('At least one value should be passed to min()');
    } else if (argc === 1) {
        if (typeof argv[0] === 'object') {
            ar = _obj2Array(argv[0]);
        } else {
            throw new Error('Wrong parameter count for min()');
        }
        if (ar.length === 0) {
            throw new Error('Array must contain at least one element for min()');
        }
    } else {
        ar = argv;
    }

    retVal = ar[0];
    for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) == -1) {
            retVal = ar[i];
        }
    }

    return retVal;
};

php.mktime = function () {
    // Get UNIX timestamp for a date  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/mktime
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: baris ozdil
    // +      input by: gabriel paderni
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FGFEmperor
    // +      input by: Yannoo
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: jakes
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Marc Palau
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: 3D-GRAF
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Chris
    // +    revised by: Theriault
    // %        note 1: The return values of the following examples are
    // %        note 1: received only if your system's timezone is UTC.
    // *     example 1: \php.mktime(14, 10, 2, 2, 1, 2008);
    // *     returns 1: 1201875002
    // *     example 2: \php.mktime(0, 0, 0, 0, 1, 2008);
    // *     returns 2: 1196467200
    // *     example 3: \php.make = mktime();
    // *     example 3: \php.td = new Date();
    // *     example 3: \php.real = Math.floor(td.getTime() / 1000);
    // *     example 3: \php.diff = (real - make);
    // *     results 3: diff < 5
    // *     example 4: \php.mktime(0, 0, 0, 13, 1, 1997)
    // *     returns 4: 883612800 
    // *     example 5: \php.mktime(0, 0, 0, 1, 1, 1998)
    // *     returns 5: 883612800 
    // *     example 6: \php.mktime(0, 0, 0, 1, 1, 98)
    // *     returns 6: 883612800 
    // *     example 7: \php.mktime(23, 59, 59, 13, 0, 2010)
    // *     returns 7: 1293839999
    // *     example 8: \php.mktime(0, 0, -1, 1, 1, 1970)
    // *     returns 8: -1
    var d = new Date(),
        r = arguments,
        i = 0,
        e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear'];

    for (i = 0; i < e.length; i++) {
        if (typeof r[i] === 'undefined') {
            r[i] = d['get' + e[i]]();
            r[i] += (i === 3); // +1 to fix JS months.
        } else {
            r[i] = parseInt(r[i], 10);
            if (isNaN(r[i])) {
                return false;
            }
        }
    }

    // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
    r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0);

    // Set year, month (-1 to fix JS months), and date.
    // !This must come before the call to setHours!
    d.setFullYear(r[5], r[3] - 1, r[4]);

    // Set hours, minutes, and seconds.
    d.setHours(r[0], r[1], r[2]);

    // Divide milliseconds by 1000 to return seconds and drop decimal.
    // Add 1 second if negative or it'll be off from PHP by 1 second.
    return (d.getTime() / 1e3 >> 0) - (d.getTime() < 0);
};

php.natcasesort = function (inputArr) {
    // Sort an array using case-insensitive natural sort  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/natcasesort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // %        note 2: We cannot use numbers as keys and have them be reordered since they
    // %        note 2: adhere to numerical order in some implementations
    // -    depends on: strnatcasecmp
    // *     example 1: $array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'};
    // *     example 1: $array1 = natcasesort($array1);
    // *     returns 1: {a: 'IMG0.png', e: 'img1.png', d: 'img2.png', f: 'IMG3.png', c: 'img10.png', b: 'img12.png'}
    var valArr = [],
        keyArr = [],
        k, i, ret, that = this,
        strictForIn = false,
        populateArr = {};

    var bubbleSort = function (keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length - 2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = that.strnatcasecmp(inputArr[j + 1], inputArr[j]);
                if (ret < 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j + 1];
                    keyArr[j + 1] = tempKeyVal;
                }
            }
        }
    };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Get key and value arrays
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            keyArr.push(k);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }

    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch (e) {
        return false;
    }

    // Repopulate the old array
    for (i = 0; i < valArr.length; i++) {
        populateArr[keyArr[i]] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.natsort = function (inputArr) {
    // Sort an array using natural sort  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/natsort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // -    depends on: strnatcmp
    // *     example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
    // *     example 1: $array1 = natsort($array1);
    // *     returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
    var valArr = [],
        keyArr = [],
        k, i, ret, that = this,
        strictForIn = false,
        populateArr = {};

    var bubbleSort = function (keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length - 2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = that.strnatcmp(inputArr[j + 1], inputArr[j]);
                if (ret < 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j + 1];
                    keyArr[j + 1] = tempKeyVal;
                }
            }
        }
    };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Get key and value arrays
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            keyArr.push(k);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch (e) {
        return false;
    }

    // Repopulate the old array
    for (i = 0; i < valArr.length; i++) {
        populateArr[keyArr[i]] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.nl2br = function (str, is_xhtml) {
    // Converts newlines to HTML line breaks  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/nl2br
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Atli Þór
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Maximusya
    // *     example 1: \php.nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
    // *     example 2: \php.nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: \php.nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';

    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

php.number_format = function (number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/number_format
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +      input by: Amirouche
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: \php.number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: \php.number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: \php.number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: \php.number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: \php.number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: \php.number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: \php.number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: \php.number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: \php.number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: \php.number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: \php.number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: \php.number_format('1 000,50', 2, '.', ' ');
    // *    returns 13: '100 050.00'
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};

php.ord = function (string) {
    // Returns the codepoint value of a character  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/ord
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: incidence
    // *     example 1: \php.ord('K');
    // *     returns 1: 75
    // *     example 2: \php.ord('\uD800\uDC00'); // surrogate pair to create a single Unicode character
    // *     returns 2: 65536
    var str = string + '',
        code = str.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
        var hi = code;
        if (str.length === 1) {
            return code; // This is just a high surrogate with no following low surrogate, so we return its value;
            // we could also throw an error as it is not a complete character, but someone may want to know
        }
        var low = str.charCodeAt(1);
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        return code; // This is just a low surrogate with no preceding high surrogate, so we return its value;
        // we could also throw an error as it is not a complete character, but someone may want to know
    }
    return code;
};

php.parse_str = function (str, array) {
    // Parses GET/POST/COOKIE data and sets global variables  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/parse_str
    // +   original by: Cagri Ekin
    // +   improved by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   reimplemented by: stag019
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: stag019
    // -    depends on: urldecode
    // +   input by: Dreamer
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: When no argument is specified, will put variables in global scope.
    // *     example 1: \php.var arr = {};
    // *     example 1: \php.parse_str('first=foo&second=bar', arr);
    // *     results 1: arr == { first: 'foo', second: 'bar' }
    // *     example 2: \php.var arr = {};
    // *     example 2: \php.parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
    // *     results 2: arr == { str_a: "Jack and Jill didn't see the well." }
    var glue1 = '=',
        glue2 = '&',
        array2 = String(str).replace(/^&?([\s\S]*?)&?$/, '$1').split(glue2),
        i, j, chr, tmp, key, value, bracket, keys, evalStr, that = this,
        fixStr = function (str) {
            return that.urldecode(str).replace(/([\\"'])/g, '\\$1').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
        };

    if (!array) {
        array = this.window;
    }

    for (i = 0; i < array2.length; i++) {
        tmp = array2[i].split(glue1);
        if (tmp.length < 2) {
            tmp = [tmp, ''];
        }
        key = fixStr(tmp[0]);
        value = fixStr(tmp[1]);
        while (key.charAt(0) === ' ') {
            key = key.substr(1);
        }
        if (key.indexOf('\0') !== -1) {
            key = key.substr(0, key.indexOf('\0'));
        }
        if (key && key.charAt(0) !== '[') {
            keys = [];
            bracket = 0;
            for (j = 0; j < key.length; j++) {
                if (key.charAt(j) === '[' && !bracket) {
                    bracket = j + 1;
                } else if (key.charAt(j) === ']') {
                    if (bracket) {
                        if (!keys.length) {
                            keys.push(key.substr(0, bracket - 1));
                        }
                        keys.push(key.substr(bracket, j - bracket));
                        bracket = 0;
                        if (key.charAt(j + 1) !== '[') {
                            break;
                        }
                    }
                }
            }
            if (!keys.length) {
                keys = [key];
            }
            for (j = 0; j < keys[0].length; j++) {
                chr = keys[0].charAt(j);
                if (chr === ' ' || chr === '.' || chr === '[') {
                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
                }
                if (chr === '[') {
                    break;
                }
            }
            evalStr = 'array';
            for (j = 0; j < keys.length; j++) {
                key = keys[j];
                if ((key !== '' && key !== ' ') || j === 0) {
                    key = "'" + key + "'";
                } else {
                    key = eval(evalStr + '.push([]);') - 1;
                }
                evalStr += '[' + key + ']';
                if (j !== keys.length - 1 && eval('typeof ' + evalStr) === 'undefined') {
                    eval(evalStr + ' = [];');
                }
            }
            evalStr += " = '" + value + "';\n";
            eval(evalStr);
        }
    }
};

php.parse_url = function (str, component) {
    // Parse a URL and return its components  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/parse_url
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + input by: Lorenzo Pisani
    // + input by: Tony
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
    // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: \php.parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
    var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 
                        'relative', 'path', 'directory', 'file', 'query', 'fragment'],
        ini = (this.php_js && this.php_js.ini) || {},
        mode = (ini['phpjs.parse_url.mode'] && 
            ini['phpjs.parse_url.mode'].local_value) || 'php',
        parser = {
            php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
        };

    var m = parser[mode].exec(str),
        uri = {},
        i = 14;
    while (i--) {
        if (m[i]) {
          uri[key[i]] = m[i];  
        }
    }

    if (component) {
        return uri[component.replace('PHP_URL_', '').toLowerCase()];
    }
    if (mode !== 'php') {
        var name = (ini['phpjs.parse_url.queryKey'] && 
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        uri[key[12]].replace(parser, function ($0, $1, $2) {
            if ($1) {uri[name][$1] = $2;}
        });
    }
    delete uri.source;
    return uri;
};

php.printf = function () {
    // Output a formatted string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/printf
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://getsprink.com)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: sprintf
    // *     example 1: \php.printf("%01.2f", 123.1);
    // *     returns 1: 6
    var body, elmt, d = this.window.document;
    var ret = '';

    var HTMLNS = 'http://www.w3.org/1999/xhtml';
    body = d.getElementsByTagNameNS ? (d.getElementsByTagNameNS(HTMLNS, 'body')[0] ? d.getElementsByTagNameNS(HTMLNS, 'body')[0] : d.documentElement.lastChild) : d.getElementsByTagName('body')[0];

    if (!body) {
        return false;
    }

    ret = this.sprintf.apply(this, arguments);

    elmt = d.createTextNode(ret);
    body.appendChild(elmt);

    return ret.length;
};

php.property_exists = function (cls, prop) {
    // Checks if the object or class has a property  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/property_exists
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function class_a () {this.prop1 = 'one'};
    // *     example 1: \php.var instance_a = new class_a();
    // *     example 1: \php.property_exists(instance_a, 'prop1');
    // *     returns 1: true
    // *     example 2: \php.function class_a () {this.prop1 = 'one'};
    // *     example 2: \php.var instance_a = new class_a();
    // *     example 2: \php.property_exists(instance_a, 'prop2');
    // *     returns 2: false
    cls = (typeof cls === 'string') ? this.window[cls] : cls;

    if (typeof cls === 'function' && cls.toSource && cls.toSource().match(new RegExp('this\\.' + prop + '\\s'))) {
        // Hackish and non-standard but can probably detect if setting
        // the property (we don't want to test by instantiating as that
        // may have side-effects)
        return true;
    }

    return (cls[prop] !== undefined && typeof cls[prop] !== 'function') || (cls.prototype !== undefined && cls.prototype[prop] !== undefined && typeof cls.prototype[prop] !== 'function') || (cls.constructor && cls.constructor[prop] !== undefined && typeof cls.constructor[prop] !== 'function');
};

php.quotemeta = function (str) {
    // Quotes meta characters  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/quotemeta
    // +   original by: Paulo Freitas
    // *     example 1: \php.quotemeta(". + * ? ^ ( $ )");
    // *     returns 1: '\. \+ \* \? \^ \( \$ \)'
    return (str + '').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
};

php.rand = function (min, max) {
    // Returns a random number  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/rand
    // +   original by: Leslie Hoare
    // +   bugfixed by: Onno Marsman
    // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
    // *     example 1: \php.rand(1, 1);
    // *     returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;

/*
    // See note above for an explanation of the following alternative code
    
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: srand
    // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
    var rand_seed, ctx, PHP_RAND_MAX=2147483647; // 0x7fffffff

    if (!this.php_js || this.php_js.rand_seed === undefined) {
        this.srand();
    }
    rand_seed = this.php_js.rand_seed;

    var argc = arguments.length;
    if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }

    var do_rand = function (ctx) {
        return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
    };

    var php_rand = function (ctxArg) { // php_rand_r
        this.php_js.rand_seed = do_rand(ctxArg);
        return parseInt(this.php_js.rand_seed, 10);
    };

    var number = php_rand(rand_seed);

    if (argc === 2) {
        number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
    }
    return number;
    */
};

php.range = function (low, high, step) {
    // Create an array containing the range of integers or characters from low to high (inclusive)  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/range
    // +   original by: Waldo Malqui Silva
    // *     example 1: \php.range ( 0, 12 );
    // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // *     example 2: \php.range( 0, 100, 10 );
    // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    // *     example 3: \php.range( 'a', 'i' );
    // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    // *     example 4: \php.range( 'c', 'a' );
    // *     returns 4: ['c', 'b', 'a']
    var matrix = [];
    var inival, endval, plus;
    var walker = step || 1;
    var chars = false;

    if (!isNaN(low) && !isNaN(high)) {
        inival = low;
        endval = high;
    } else if (isNaN(low) && isNaN(high)) {
        chars = true;
        inival = low.charCodeAt(0);
        endval = high.charCodeAt(0);
    } else {
        inival = (isNaN(low) ? 0 : low);
        endval = (isNaN(high) ? 0 : high);
    }

    plus = ((inival > endval) ? false : true);
    if (plus) {
        while (inival <= endval) {
            matrix.push(((chars) ? String.fromCharCode(inival) : inival));
            inival += walker;
        }
    } else {
        while (inival >= endval) {
            matrix.push(((chars) ? String.fromCharCode(inival) : inival));
            inival -= walker;
        }
    }

    return matrix;
};

php.reset = function (arr) {
    // Set array argument's internal pointer to the first element and return it  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/reset
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // *     example 1: \php.reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
    // *     returns 1: 'Kevin' 
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.pointers = this.php_js.pointers || [];
    var indexOf = function (value) {
        for (var i = 0, length = this.length; i < length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    };
    // END REDUNDANT
    var pointers = this.php_js.pointers;
    if (!pointers.indexOf) {
        pointers.indexOf = indexOf;
    }
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var arrpos = pointers.indexOf(arr);
    if (!(arr instanceof Array)) {
        for (var k in arr) {
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            } else {
                pointers[arrpos + 1] = 0;
            }
            return arr[k];
        }
        return false; // Empty
    }
    if (arr.length === 0) {
        return false;
    }
    pointers[arrpos + 1] = 0;
    return arr[pointers[arrpos + 1]];
};

php.round = function (value, precision, mode) {
    // Returns the number rounded to specified precision  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/round
    // +   original by: Philip Peterson
    // +    revised by: Onno Marsman
    // +      input by: Greenseed
    // +    revised by: T.Wild
    // +      input by: meo
    // +      input by: William
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Josep Sanz (http://www.ws3.es/)
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // %        note 1: Great work. Ideas for improvement:
    // %        note 1:  - code more compliant with developer guidelines
    // %        note 1:  - for implementing PHP constant arguments look at
    // %        note 1:  the pathinfo() function, it offers the greatest
    // %        note 1:  flexibility & compatibility possible
    // *     example 1: \php.round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: \php.round(3.6);
    // *     returns 2: 4
    // *     example 3: \php.round(2.835, 2);
    // *     returns 3: 2.84
    // *     example 4: \php.round(1.1749999999999, 2);
    // *     returns 4: 1.17
    // *     example 5: \php.round(58551.799999999996, 2);
    // *     returns 5: 58551.8
    var m, f, isHalf, sgn; // helper variables
    precision |= 0; // making sure precision is integer
    m = Math.pow(10, precision);
    value *= m;
    sgn = (value > 0) | -(value < 0); // sign of the number
    isHalf = value % 1 === 0.5 * sgn;
    f = Math.floor(value);

    if (isHalf) {
        switch (mode) {
        case 'PHP_ROUND_HALF_DOWN':
            value = f + (sgn < 0); // rounds .5 toward zero
            break;
        case 'PHP_ROUND_HALF_EVEN':
            value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
            break;
        case 'PHP_ROUND_HALF_ODD':
            value = f + !(f % 2); // rounds .5 towards the next odd integer
            break;
        default:
            value = f + (sgn > 0); // rounds .5 away from zero
        }
    }

    return (isHalf ? value : Math.round(value)) / m;
};

php.rsort = function (inputArr, sort_flags) {
    // Sort an array in reverse order  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/rsort
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: This function deviates from PHP in returning a copy of the array instead
    // %        note 2: of acting by reference and returning true; this was necessary because
    // %        note 2: IE does not allow deleting and re-adding of properties without caching
    // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 2: get the PHP behavior, but use this only if you are in an environment
    // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 2: property deletion is supported. Note that we intend to implement the PHP
    // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 2: is by reference in PHP anyways
    // %        note 3: Since JS objects' keys are always strings, and (the
    // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
    // %        note 3: if the content is a numeric string, we treat the
    // %        note 3: "original type" as numeric.
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.rsort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: ['van', 'Zonneveld', 'Kevin']
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: \php.rsort(fruits);
    // *     results 2: fruits == {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
    // *     returns 2: true
    var valArr = [],
        k = '',
        i = 0,
        sorter = false,
        that = this,
        strictForIn = false,
        populateArr = [];

    switch (sort_flags) {
    case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
            return that.strnatcmp(b, a);
        };
        break;
    case 'SORT_LOCALE_STRING':
        // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
    case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
            return (b - a);
        };
        break;
    case 'SORT_REGULAR':
        // compare items normally (don't change types)
    default:
        sorter = function (b, a) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }

    valArr.sort(sorter);

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[i] = valArr[i];
    }
    return strictForIn || populateArr;
};

php.setcookie = function (name, value, expires, path, domain, secure) {
    // Send a cookie  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/setcookie
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Andreas
    // +   bugfixed by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: setrawcookie
    // *     example 1: \php.setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true
    return this.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
};

php.setrawcookie = function (name, value, expires, path, domain, secure) {
    // Send a cookie with no url encoding of the value  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/setrawcookie
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   derived from: setcookie
    // +   input by: Michael
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true
    if (typeof expires === 'string' && (/^\d+$/).test(expires)) {
        expires = parseInt(expires, 10);
    }

    if (expires instanceof Date) {
        expires = expires.toGMTString();
    } else if (typeof(expires) === 'number') {
        expires = (new Date(expires * 1e3)).toGMTString();
    }

    var r = [name + '=' + value],
        s = {},
        i = '';
    s = {
        expires: expires,
        path: path,
        domain: domain
    };
    for (i in s) {
        if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
            s[i] && r.push(i + '=' + s[i]);
        }
    }

    return secure && r.push('secure'), this.window.document.cookie = r.join(";"), true;
};

php.sha1 = function (str) {
    // Calculate the sha1 hash of a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/sha1
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode
    // *     example 1: \php.sha1('Kevin van Zonneveld');
    // *     returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
    var rotate_left = function (n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

/*var lsb_hex = function (val) { // Not in use; needed?
        var str="";
        var i;
        var vh;
        var vl;

        for ( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };*/

    var cvt_hex = function (val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    str = this.utf8_encode(str);
    var str_len = str.length;

    var word_array = [];
    for (i = 0; i < str_len - 3; i += 4) {
        j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (str_len % 4) {
    case 0:
        i = 0x080000000;
        break;
    case 1:
        i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
        break;
    case 2:
        i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
        break;
    case 3:
        i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
        break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) {
        word_array.push(0);
    }

    word_array.push(str_len >>> 29);
    word_array.push((str_len << 3) & 0x0ffffffff);

    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = word_array[blockstart + i];
        }
        for (i = 16; i <= 79; i++) {
            W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }


        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
};

php.shuffle = function (inputArr) {
    // Randomly shuffle the contents of an array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/shuffle
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // *     example 1: \php.ini_set('phpjs.strictForIn', true);
    // *     example 1: \php.shuffle({5:'a', 2:'3', 3:'c', 4:5, 'q':5});
    // *     returns 1: {5:'a', 4:5, 'q':5, 3:'c', 2:'3'}
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.var data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5};
    // *     example 2: \php.shuffle(data);
    // *     results 2: {5:'a', 'q':5, 3:'c', 2:'3', 4:5}
    // *     returns 2: true
    var valArr = [],
        k = '',
        i = 0,
        strictForIn = false,
        populateArr = [];

    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function () {
        return 0.5 - Math.random();
    });

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[i] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.sizeof = function (mixed_var, mode) {
    // !No description available for sizeof. @php.js developers: Please update the function summary text file.
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/sizeof
    // +   original by: Philip Peterson
    // -    depends on: count
    // *     example 1: \php.sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: \php.sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    return this.count(mixed_var, mode);
};

php.sort = function (inputArr, sort_flags) {
    // Sort an array  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/sort
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: This function deviates from PHP in returning a copy of the array instead
    // %        note 2: of acting by reference and returning true; this was necessary because
    // %        note 2: IE does not allow deleting and re-adding of properties without caching
    // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 2: get the PHP behavior, but use this only if you are in an environment
    // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 2: property deletion is supported. Note that we intend to implement the PHP
    // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 2: is by reference in PHP anyways
    // %        note 3: Since JS objects' keys are always strings, and (the
    // %        note 3: default) SORT_REGULAR flag distinguishes by key type,
    // %        note 3: if the content is a numeric string, we treat the
    // %        note 3: "original type" as numeric.
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.sort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: ['Kevin', 'Zonneveld', 'van']
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: \php.sort(fruits);
    // *     results 2: fruits == {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
    // *     returns 2: true
    var valArr = [],
        keyArr = [],
        k = '',
        i = 0,
        sorter = false,
        that = this,
        strictForIn = false,
        populateArr = [];

    switch (sort_flags) {
    case 'SORT_STRING':
        // compare items as strings
        sorter = function (a, b) {
            return that.strnatcmp(a, b);
        };
        break;
    case 'SORT_LOCALE_STRING':
        // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
        var loc = this.i18n_loc_get_default();
        sorter = this.php_js.i18nLocales[loc].sorting;
        break;
    case 'SORT_NUMERIC':
        // compare items numerically
        sorter = function (a, b) {
            return (a - b);
        };
        break;
    case 'SORT_REGULAR':
        // compare items normally (don't change types)
    default:
        sorter = function (a, b) {
            var aFloat = parseFloat(a),
                bFloat = parseFloat(b),
                aNumeric = aFloat + '' === a,
                bNumeric = bFloat + '' === b;
            if (aNumeric && bNumeric) {
                return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
            } else if (aNumeric && !bNumeric) {
                return 1;
            } else if (!aNumeric && bNumeric) {
                return -1;
            }
            return a > b ? 1 : a < b ? -1 : 0;
        };
        break;
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }

    valArr.sort(sorter);

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[i] = valArr[i];
    }
    return strictForIn || populateArr;
};

php.sprintf = function () {
    // Return a formatted string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/sprintf
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Paulo Freitas
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.sprintf("%01.2f", 123.1);
    // *     returns 1: 123.10
    // *     example 2: \php.sprintf("[%10s]", 'monkey');
    // *     returns 2: '[    monkey]'
    // *     example 3: \php.sprintf("[%'#10s]", 'monkey');
    // *     returns 3: '[####monkey]'
    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments,
        i = 0,
        format = a[i++];

    // pad()
    var pad = function (str, len, chr, leftJustify) {
        if (!chr) {
            chr = ' ';
        }
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };

    // justify()
    var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = pad(value, minWidth, customPadChar, leftJustify);
            } else {
                value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    };

    // formatBaseX()
    var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0;
        prefix = prefix && number && {
            '2': '0b',
            '8': '0',
            '16': '0x'
        }[base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };

    // formatString()
    var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
    };

    // doFormat()
    var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
        var number;
        var prefix;
        var method;
        var textTransform;
        var value;

        if (substring == '%%') {
            return '%';
        }

        // parse flags
        var leftJustify = false,
            positivePrefix = '',
            zeroPad = false,
            prefixBaseX = false,
            customPadChar = ' ';
        var flagsl = flags.length;
        for (var j = 0; flags && j < flagsl; j++) {
            switch (flags.charAt(j)) {
            case ' ':
                positivePrefix = ' ';
                break;
            case '+':
                positivePrefix = '+';
                break;
            case '-':
                leftJustify = true;
                break;
            case "'":
                customPadChar = flags.charAt(j + 1);
                break;
            case '0':
                zeroPad = true;
                break;
            case '#':
                prefixBaseX = true;
                break;
            }
        }

        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0;
        } else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }

        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }

        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }

        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : undefined;
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }

        // grab value using valueIndex if required?
        value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

        switch (type) {
        case 's':
            return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
        case 'c':
            return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
        case 'b':
            return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'o':
            return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'x':
            return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'X':
            return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
        case 'u':
            return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
        case 'i':
        case 'd':
            number = (+value) | 0;
            prefix = number < 0 ? '-' : positivePrefix;
            value = prefix + pad(String(Math.abs(number)), precision, '0', false);
            return justify(value, prefix, leftJustify, minWidth, zeroPad);
        case 'e':
        case 'E':
        case 'f':
        case 'F':
        case 'g':
        case 'G':
            number = +value;
            prefix = number < 0 ? '-' : positivePrefix;
            method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
            textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
            value = prefix + Math.abs(number)[method](precision);
            return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
        default:
            return substring;
        }
    };

    return format.replace(regex, doFormat);
};

php.str_ireplace = function (search, replace, subject) {
    // Replaces all occurrences of search in haystack with replace / case-insensitive  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/str_ireplace
    // +   original by: Martijn Wieringa
    // +      input by: penutbutterjelly
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Jack
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Philipp Lenssen
    // *     example 1: \php.str_ireplace('l', 'l', 'HeLLo');
    // *     returns 1: 'Hello'
    // *     example 2: \php.str_ireplace('$', 'foo', '$bar');
    // *     returns 2: 'foobar'
    var i, k = '';
    var searchl = 0;
    var reg;

    var escapeRegex = function (s) {
        return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
    };

    search += '';
    searchl = search.length;
    if (!(replace instanceof Array)) {
        replace = [replace];
        if (search instanceof Array) {
            // If search is an array and replace is a string,
            // then this replacement string is used for every value of search
            while (searchl > replace.length) {
                replace[replace.length] = replace[0];
            }
        }
    }

    if (!(search instanceof Array)) {
        search = [search];
    }
    while (search.length > replace.length) {
        // If replace has fewer values than search,
        // then an empty string is used for the rest of replacement values
        replace[replace.length] = '';
    }

    if (subject instanceof Array) {
        // If subject is an array, then the search and replace is performed
        // with every entry of subject , and the return value is an array as well.
        for (k in subject) {
            if (subject.hasOwnProperty(k)) {
                subject[k] = str_ireplace(search, replace, subject[k]);
            }
        }
        return subject;
    }

    searchl = search.length;
    for (i = 0; i < searchl; i++) {
        reg = new RegExp(escapeRegex(search[i]), 'gi');
        subject = subject.replace(reg, replace[i]);
    }

    return subject;
};

php.str_pad = function (input, pad_length, pad_string, pad_type) {
    // Returns input string padded on the left or right to specified length with pad_string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/str_pad
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + namespaced by: Michael White (http://getsprink.com)
    // +      input by: Marco van Oort
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
    // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
    // *     example 2: \php.str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
    // *     returns 2: '------Kevin van Zonneveld-----'
    var half = '',
        pad_to_go;

    var str_pad_repeater = function (s, len) {
        var collect = '',
            i;

        while (collect.length < len) {
            collect += s;
        }
        collect = collect.substr(0, len);

        return collect;
    };

    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';

    if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
        pad_type = 'STR_PAD_RIGHT';
    }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type == 'STR_PAD_LEFT') {
            input = str_pad_repeater(pad_string, pad_to_go) + input;
        } else if (pad_type == 'STR_PAD_RIGHT') {
            input = input + str_pad_repeater(pad_string, pad_to_go);
        } else if (pad_type == 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }

    return input;
};

php.str_repeat = function (input, multiplier) {
    // Returns the input string repeat mult times  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/str_repeat
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: \php.str_repeat('-=', 10);
    // *     returns 1: '-=-=-=-=-=-=-=-=-=-='
    return new Array(multiplier + 1).join(input);
};

php.str_replace = function (search, replace, subject, count) {
    // Replaces all occurrences of search in haystack with replace  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: \php.str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: \php.str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = r instanceof Array,
        sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
};

php.str_word_count = function (str, format, charlist) {
    // Counts the number of words inside a string. If format of 1 is specified,     then the function will return an array containing all the words     found inside the string. If format of 2 is specified, then the function     will return an associated array where the position of the word is the key     and the word itself is the value.      For the purpose of this function, 'word' is defined as a locale dependent     string containing alphabetic characters, which also may contain, but not start     with "'" and "-" characters.  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/str_word_count
    // +   original by: Ole Vrijenhoek
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Bug?
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -   depends on: ctype_alpha
    // *     example 1: \php.str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1);
    // *     returns 1: ['Hello', 'fri', 'nd', "you're", 'looking', 'good', 'today']
    // *     example 2: \php.str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 2);
    // *     returns 2: {0: 'Hello', 6: 'fri', 10: 'nd', 14: "you're", 29: 'looking', 46: 'good', 51: 'today'}
    // *     example 3: \php.str_word_count("Hello fri3nd, you're\r\n       looking          good today!", 1, '\u00e0\u00e1\u00e3\u00e73');
    // *     returns 3: ['Hello', 'fri3nd', 'youre', 'looking', 'good', 'today']
    var len = str.length,
        cl = charlist && charlist.length,
        chr = '',
        tmpStr = '',
        i = 0,
        c = '',
        wArr = [],
        wC = 0,
        assoc = {},
        aC = 0,
        reg = '',
        match = false;

    // BEGIN STATIC
    var _preg_quote = function (str) {
        return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, '\\$1');
    },
        _getWholeChar = function (str, i) { // Use for rare cases of non-BMP characters
            var code = str.charCodeAt(i);
            if (code < 0xD800 || code > 0xDFFF) {
                return str.charAt(i);
            }
            if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
                if (str.length <= (i + 1)) {
                    throw 'High surrogate without following low surrogate';
                }
                var next = str.charCodeAt(i + 1);
                if (0xDC00 > next || next > 0xDFFF) {
                    throw 'High surrogate without following low surrogate';
                }
                return str.charAt(i) + str.charAt(i + 1);
            }
            // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            var prev = str.charCodeAt(i - 1);
            if (0xD800 > prev || prev > 0xDBFF) { // (could change last hex to 0xDB7F to treat high private surrogates as single characters)
                throw 'Low surrogate without preceding high surrogate';
            }
            return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
        };
    // END STATIC
    if (cl) {
        reg = '^(' + _preg_quote(_getWholeChar(charlist, 0));
        for (i = 1; i < cl; i++) {
            if ((chr = _getWholeChar(charlist, i)) === false) {
                continue;
            }
            reg += '|' + _preg_quote(chr);
        }
        reg += ')$';
        reg = new RegExp(reg);
    }

    for (i = 0; i < len; i++) {
        if ((c = _getWholeChar(str, i)) === false) {
            continue;
        }
        match = this.ctype_alpha(c) || (reg && c.search(reg) !== -1) || ((i !== 0 && i !== len - 1) && c === '-') || // No hyphen at beginning or end unless allowed in charlist (or locale)
        (i !== 0 && c === "'"); // No apostrophe at beginning unless allowed in charlist (or locale)
        if (match) {
            if (tmpStr === '' && format === 2) {
                aC = i;
            }
            tmpStr = tmpStr + c;
        }
        if (i === len - 1 || !match && tmpStr !== '') {
            if (format !== 2) {
                wArr[wArr.length] = tmpStr;
            } else {
                assoc[aC] = tmpStr;
            }
            tmpStr = '';
            wC++;
        }
    }

    if (!format) {
        return wC;
    } else if (format === 1) {
        return wArr;
    } else if (format === 2) {
        return assoc;
    }
    throw 'You have supplied an incorrect format';
};

php.strcasecmp = function (f_string1, f_string2) {
    // Binary safe case-insensitive string comparison  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strcasecmp
    // +     original by: Martijn Wieringa
    // +     bugfixed by: Onno Marsman
    // *         example 1: \php.strcasecmp('Hello', 'hello');
    // *         returns 1: 0
    var string1 = (f_string1 + '').toLowerCase();
    var string2 = (f_string2 + '').toLowerCase();

    if (string1 > string2) {
        return 1;
    } else if (string1 == string2) {
        return 0;
    }

    return -1;
};

php.strcmp = function (str1, str2) {
    // Binary safe string comparison  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strcmp
    // +   original by: Waldo Malqui Silva
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: gorthaur
    // *     example 1: \php.strcmp( 'waldo', 'owald' );
    // *     returns 1: 1
    // *     example 2: \php.strcmp( 'owald', 'waldo' );
    // *     returns 2: -1
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
};

php.strcspn = function (str, mask, start, length) {
    // Finds length of initial segment consisting entirely of characters not found in mask. If start or/and length is provide works like strcspn(substr($s,$start,$len),$bad_chars)  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strcspn
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.strcspn('abcdefg123', '1234567890');
    // *     returns 1: 7
    // *     example 2: \php.strcspn('123abc', '1234567890');
    // *     returns 2: 3
    start = start ? start : 0;
    var count = (length && ((start + length) < str.length)) ? start + length : str.length;
    strct: for (var i = start, lgth = 0; i < count; i++) {
        for (var j = 0; j < mask.length; j++) {
            if (str.charAt(i).indexOf(mask[j]) !== -1) {
                continue strct;
            }
        }++lgth;
    }

    return lgth;
};

php.strip_tags = function (input, allowed) {
    // Strips HTML and PHP tags from a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strip_tags
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // +      input by: Evertjan Garretsen
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // *     example 1: \php.strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: \php.strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: \php.strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: \php.strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: \php.strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: \php.strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: \php.strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

php.stripos = function (f_haystack, f_needle, f_offset) {
    // Finds position of first occurrence of a string within another, case insensitive  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/stripos
    // +     original by: Martijn Wieringa
    // +      revised by: Onno Marsman
    // *         example 1: \php.stripos('ABC', 'a');
    // *         returns 1: 0
    var haystack = (f_haystack + '').toLowerCase();
    var needle = (f_needle + '').toLowerCase();
    var index = 0;

    if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
        return index;
    }
    return false;
};

php.stripslashes = function (str) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Brant Messenger (http://www.brantmessenger.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: \php.stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"
    return (str + '').replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
        case '\\':
            return '\\';
        case '0':
            return '\u0000';
        case '':
            return '';
        default:
            return n1;
        }
    });
};

php.stristr = function (haystack, needle, bool) {
    // Finds first occurrence of a string within another, case insensitive  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/stristr
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfxied by: Onno Marsman
    // *     example 1: \php.stristr('Kevin van Zonneveld', 'Van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: \php.stristr('Kevin van Zonneveld', 'VAN', true);
    // *     returns 2: 'Kevin '
    var pos = 0;

    haystack += '';
    pos = haystack.toLowerCase().indexOf((needle + '').toLowerCase());
    if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
};

php.strlen = function (string) {
    // Get string length  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strlen
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // +      input by: Kirk Strobeck
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
    // %        note 1: characters and to this function in PHP which does not count the number of bytes
    // %        note 1: but counts the number of characters, something like this is really necessary.
    // *     example 1: \php.strlen('Kevin van Zonneveld');
    // *     returns 1: 19
    // *     example 2: \php.strlen('A\ud87e\udc04Z');
    // *     returns 2: 3
    var str = string + '';
    var i = 0,
        chr = '',
        lgth = 0;

    if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
        return string.length;
    }

    var getWholeChar = function (str, i) {
        var code = str.charCodeAt(i);
        var next = '',
            prev = '';
        if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            if (str.length <= (i + 1)) {
                throw 'High surrogate without following low surrogate';
            }
            next = str.charCodeAt(i + 1);
            if (0xDC00 > next || next > 0xDFFF) {
                throw 'High surrogate without following low surrogate';
            }
            return str.charAt(i) + str.charAt(i + 1);
        } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            prev = str.charCodeAt(i - 1);
            if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                throw 'Low surrogate without preceding high surrogate';
            }
            return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
        }
        return str.charAt(i);
    };

    for (i = 0, lgth = 0; i < str.length; i++) {
        if ((chr = getWholeChar(str, i)) === false) {
            continue;
        } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
        lgth++;
    }
    return lgth;
};

php.strnatcasecmp = function (str1, str2) {
    // Returns the result of case-insensitive string comparison using 'natural' algorithm  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strnatcasecmp
    // +      original by: Martin Pool
    // + reimplemented by: Pierre-Luc Paour
    // + reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +         input by: Devan Penner-Woelk
    // +      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *        example 1: \php.strnatcasecmp(10, 1);
    // *        returns 1: 1
    // *        example 1: \php.strnatcasecmp('1', '10');
    // *        returns 1: -1
    var a = (str1 + '').toLowerCase();
    var b = (str2 + '').toLowerCase();

    var isWhitespaceChar = function (a) {
        return a.charCodeAt(0) <= 32;
    };

    var isDigitChar = function (a) {
        var charCode = a.charCodeAt(0);
        return (charCode >= 48 && charCode <= 57);
    };

    var compareRight = function (a, b) {
        var bias = 0;
        var ia = 0;
        var ib = 0;

        var ca;
        var cb;

        // The longest run of digits wins.  That aside, the greatest
        // value wins, but we can't know that it will until we've scanned
        // both numbers to know that they have the same magnitude, so we
        // remember it in BIAS.
        for (var cnt = 0; true; ia++, ib++) {
            ca = a.charAt(ia);
            cb = b.charAt(ib);

            if (!isDigitChar(ca) && !isDigitChar(cb)) {
                return bias;
            } else if (!isDigitChar(ca)) {
                return -1;
            } else if (!isDigitChar(cb)) {
                return 1;
            } else if (ca < cb) {
                if (bias === 0) {
                    bias = -1;
                }
            } else if (ca > cb) {
                if (bias === 0) {
                    bias = 1;
                }
            } else if (ca === '0' && cb === '0') {
                return bias;
            }
        }
    };

    var ia = 0,
        ib = 0;
    var nza = 0,
        nzb = 0;
    var ca, cb;
    var result;

    while (true) {
        // only count the number of zeroes leading the last number compared
        nza = nzb = 0;

        ca = a.charAt(ia);
        cb = b.charAt(ib);

        // skip over leading spaces or zeros
        while (isWhitespaceChar(ca) || ca === '0') {
            if (ca === '0') {
                nza++;
            } else {
                // only count consecutive zeroes
                nza = 0;
            }

            ca = a.charAt(++ia);
        }

        while (isWhitespaceChar(cb) || cb === '0') {
            if (cb === '0') {
                nzb++;
            } else {
                // only count consecutive zeroes
                nzb = 0;
            }

            cb = b.charAt(++ib);
        }

        // process run of digits
        if (isDigitChar(ca) && isDigitChar(cb)) {
            if ((result = compareRight(a.substring(ia), b.substring(ib))) !== 0) {
                return result;
            }
        }

        if (ca === '0' && cb === '0') {
            // The strings compare the same.  Perhaps the caller
            // will want to call strcmp to break the tie.
            return nza - nzb;
        }

        if (ca < cb) {
            return -1;
        } else if (ca > cb) {
            return +1;
        }

        ++ia;
        ++ib;
    }
};

php.strnatcmp = function (f_string1, f_string2, f_version) {
    // Returns the result of string comparison using 'natural' algorithm  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strnatcmp
    // +   original by: Martijn Wieringa
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // -    depends on: strcmp
    // %          note: Added f_version argument against code guidelines, because it's so neat
    // *     example 1: \php.strnatcmp('Price 12.9', 'Price 12.15');
    // *     returns 1: 1
    // *     example 2: \php.strnatcmp('Price 12.09', 'Price 12.15');
    // *     returns 2: -1
    // *     example 3: \php.strnatcmp('Price 12.90', 'Price 12.15');
    // *     returns 3: 1
    // *     example 4: \php.strnatcmp('Version 12.9', 'Version 12.15', true);
    // *     returns 4: -6
    // *     example 5: \php.strnatcmp('Version 12.15', 'Version 12.9', true);
    // *     returns 5: 6
    var i = 0;

    if (f_version == undefined) {
        f_version = false;
    }

    var __strnatcmp_split = function (f_string) {
        var result = [];
        var buffer = '';
        var chr = '';
        var i = 0,
            f_stringl = 0;

        var text = true;

        f_stringl = f_string.length;
        for (i = 0; i < f_stringl; i++) {
            chr = f_string.substring(i, i + 1);
            if (chr.match(/\d/)) {
                if (text) {
                    if (buffer.length > 0) {
                        result[result.length] = buffer;
                        buffer = '';
                    }

                    text = false;
                }
                buffer += chr;
            } else if ((text == false) && (chr == '.') && (i < (f_string.length - 1)) && (f_string.substring(i + 1, i + 2).match(/\d/))) {
                result[result.length] = buffer;
                buffer = '';
            } else {
                if (text == false) {
                    if (buffer.length > 0) {
                        result[result.length] = parseInt(buffer, 10);
                        buffer = '';
                    }
                    text = true;
                }
                buffer += chr;
            }
        }

        if (buffer.length > 0) {
            if (text) {
                result[result.length] = buffer;
            } else {
                result[result.length] = parseInt(buffer, 10);
            }
        }

        return result;
    };

    var array1 = __strnatcmp_split(f_string1 + '');
    var array2 = __strnatcmp_split(f_string2 + '');

    var len = array1.length;
    var text = true;

    var result = -1;
    var r = 0;

    if (len > array2.length) {
        len = array2.length;
        result = 1;
    }

    for (i = 0; i < len; i++) {
        if (isNaN(array1[i])) {
            if (isNaN(array2[i])) {
                text = true;

                if ((r = this.strcmp(array1[i], array2[i])) != 0) {
                    return r;
                }
            } else if (text) {
                return 1;
            } else {
                return -1;
            }
        } else if (isNaN(array2[i])) {
            if (text) {
                return -1;
            } else {
                return 1;
            }
        } else {
            if (text || f_version) {
                if ((r = (array1[i] - array2[i])) != 0) {
                    return r;
                }
            } else {
                if ((r = this.strcmp(array1[i].toString(), array2[i].toString())) != 0) {
                    return r;
                }
            }

            text = false;
        }
    }

    return result;
};

php.strncasecmp = function (argStr1, argStr2, len) {
    // Binary safe string comparison  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strncasecmp
    // +   original by: Saulo Vallory
    // +      input by: Nate
    // +   bugfixed by: Onno Marsman
    // %          note: Returns < 0 if str1 is less than str2 ; > 0 if str1 is greater than str2 , and 0 if they are equal.
    // *     example 1: \php.strncasecmp('Price 12.9', 'Price 12.15', 2);
    // *     returns 1: 0
    // *     example 2: \php.strncasecmp('Price 12.09', 'Price 12.15', 10);
    // *     returns 2: -1
    // *     example 3: \php.strncasecmp('Price 12.90', 'Price 12.15', 30);
    // *     returns 3: 8
    // *     example 4: \php.strncasecmp('Version 12.9', 'Version 12.15', 20);
    // *     returns 4: 8
    // *     example 5: \php.strncasecmp('Version 12.15', 'Version 12.9', 20);
    // *     returns 5: -8
    var diff, i = 0;
    var str1 = (argStr1 + '').toLowerCase().substr(0, len);
    var str2 = (argStr2 + '').toLowerCase().substr(0, len);

    if (str1.length !== str2.length) {
        if (str1.length < str2.length) {
            len = str1.length;
            if (str2.substr(0, str1.length) == str1) {
                return str1.length - str2.length; // return the difference of chars
            }
        } else {
            len = str2.length;
            // str1 is longer than str2
            if (str1.substr(0, str2.length) == str2) {
                return str1.length - str2.length; // return the difference of chars
            }
        }
    } else {
        // Avoids trying to get a char that does not exist
        len = str1.length;
    }

    for (diff = 0, i = 0; i < len; i++) {
        diff = str1.charCodeAt(i) - str2.charCodeAt(i);
        if (diff !== 0) {
            return diff;
        }
    }

    return 0;
};

php.strncmp = function (str1, str2, lgth) {
    // Binary safe string comparison  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strncmp
    // +      original by: Waldo Malqui Silva
    // +         input by: Steve Hilder
    // +      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +       revised by: gorthaur
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.strncmp('aaa', 'aab', 2);
    // *     returns 1: 0
    // *     example 2: \php.strncmp('aaa', 'aab', 3 );
    // *     returns 2: -1
    var s1 = (str1 + '').substr(0, lgth);
    var s2 = (str2 + '').substr(0, lgth);

    return ((s1 == s2) ? 0 : ((s1 > s2) ? 1 : -1));
};

php.strpos = function (haystack, needle, offset) {
    // Finds position of first occurrence of a string within another  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strpos
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Onno Marsman    
    // +   bugfixed by: Daniel Esteban
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
};

php.strtok = function (str, tokens) {
    // Tokenize a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strtok
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Use tab and newline as tokenizing characters as well
    // *     example 1: $string = "\t\t\t\nThis is\tan example\nstring\n";
    // *     example 1: $tok = strtok($string, " \n\t");
    // *     example 1: $b = '';
    // *     example 1: \php.while ($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
    // *     example 1: $b
    // *     returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    if (tokens === undefined) {
        tokens = str;
        str = this.php_js.strtokleftOver;
    }
    if (str.length === 0) {
        return false;
    }
    if (tokens.indexOf(str.charAt(0)) !== -1) {
        return this.strtok(str.substr(1), tokens);
    }
    for (var i = 0; i < str.length; i++) {
        if (tokens.indexOf(str.charAt(i)) !== -1) {
            break;
        }
    }
    this.php_js.strtokleftOver = str.substr(i + 1);
    return str.substring(0, i);
};

php.strtotime = function (str, now) {
    // Convert string representation of date and time to a timestamp  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strtotime
    // +   original by: Caio Ariede (http://caioariede.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: David
    // +   improved by: Caio Ariede (http://caioariede.com)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Wagner B. Soares
    // +   bugfixed by: Artur Tchernychev
    // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    // *     example 1: \php.strtotime('+1 day', 1129633200);
    // *     returns 1: 1129719600
    // *     example 2: \php.strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    // *     returns 2: 1130425202
    // *     example 3: \php.strtotime('last month', 1129633200);
    // *     returns 3: 1127041200
    // *     example 4: \php.strtotime('2009-05-04 08:30:00');
    // *     returns 4: 1241418600
    var i, match, s, strTmp = '',
        parse = '';

    strTmp = str;
    strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
    strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars
    if (strTmp == 'now') {
        return (new Date()).getTime() / 1000; // Return seconds, not milli-seconds
    } else if (!isNaN(parse = Date.parse(strTmp))) {
        return (parse / 1000);
    } else if (now) {
        now = new Date(now * 1000); // Accept PHP-style seconds
    } else {
        now = new Date();
    }

    strTmp = strTmp.toLowerCase();

    var __is = {
        day: {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        },
        mon: {
            'jan': 0,
            'feb': 1,
            'mar': 2,
            'apr': 3,
            'may': 4,
            'jun': 5,
            'jul': 6,
            'aug': 7,
            'sep': 8,
            'oct': 9,
            'nov': 10,
            'dec': 11
        }
    };

    var process = function (m) {
        var ago = (m[2] && m[2] == 'ago');
        var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);

        switch (m[0]) {
        case 'last':
        case 'next':
            switch (m[1].substring(0, 3)) {
            case 'yea':
                now.setFullYear(now.getFullYear() + num);
                break;
            case 'mon':
                now.setMonth(now.getMonth() + num);
                break;
            case 'wee':
                now.setDate(now.getDate() + (num * 7));
                break;
            case 'day':
                now.setDate(now.getDate() + num);
                break;
            case 'hou':
                now.setHours(now.getHours() + num);
                break;
            case 'min':
                now.setMinutes(now.getMinutes() + num);
                break;
            case 'sec':
                now.setSeconds(now.getSeconds() + num);
                break;
            default:
                var day;
                if (typeof(day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
                    var diff = day - now.getDay();
                    if (diff == 0) {
                        diff = 7 * num;
                    } else if (diff > 0) {
                        if (m[0] == 'last') {
                            diff -= 7;
                        }
                    } else {
                        if (m[0] == 'next') {
                            diff += 7;
                        }
                    }
                    now.setDate(now.getDate() + diff);
                }
            }
            break;

        default:
            if (/\d+/.test(m[0])) {
                num *= parseInt(m[0], 10);

                switch (m[1].substring(0, 3)) {
                case 'yea':
                    now.setFullYear(now.getFullYear() + num);
                    break;
                case 'mon':
                    now.setMonth(now.getMonth() + num);
                    break;
                case 'wee':
                    now.setDate(now.getDate() + (num * 7));
                    break;
                case 'day':
                    now.setDate(now.getDate() + num);
                    break;
                case 'hou':
                    now.setHours(now.getHours() + num);
                    break;
                case 'min':
                    now.setMinutes(now.getMinutes() + num);
                    break;
                case 'sec':
                    now.setSeconds(now.getSeconds() + num);
                    break;
                }
            } else {
                return false;
            }
            break;
        }
        return true;
    };

    match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match != null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        } else if (!match[3]) {
            match[2] += ':00';
        }

        s = match[1].split(/-/g);

        for (i in __is.mon) {
            if (__is.mon[i] == s[1] - 1) {
                s[1] = i;
            }
        }
        s[0] = parseInt(s[0], 10);

        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
    }

    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';

    match = strTmp.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
    if (match == null) {
        return false;
    }

    for (i = 0; i < match.length; i++) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }

    return (now.getTime() / 1000);
};
php.strrpos = function (haystack, needle, offset) {
    // Finds position of last occurrence of a string within another string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strrpos
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: saulius
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16
    // *     example 2: strrpos('somepage.com', '.', false);
    // *     returns 2: 8
    // *     example 3: strrpos('baa', 'a', 3);
    // *     returns 3: false
    // *     example 4: strrpos('baa', 'a', 2);
    // *     returns 4: 2
    var i = -1;
    if (offset) {
        i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    } else {
        i = (haystack + '').lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
};
php.strtr = function (str, from, to) {
    // Translates characters in str using given translation tables  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/strtr
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +      input by: uestla
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Alan C
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Taras Bogach
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: jpfle
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -   depends on: krsort
    // -   depends on: ini_set
    // *     example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
    // *     example 1: \php.strtr('hi all, I said hello', $trans)
    // *     returns 1: 'hello all, I said hi'
    // *     example 2: \php.strtr('äaabaåccasdeöoo', 'äåö','aao');
    // *     returns 2: 'aaabaaccasdeooo'
    // *     example 3: \php.strtr('ääääääää', 'ä', 'a');
    // *     returns 3: 'aaaaaaaa'
    // *     example 4: \php.strtr('http', 'pthxyz','xyzpth');
    // *     returns 4: 'zyyx'
    // *     example 5: \php.strtr('zyyx', 'pthxyz','xyzpth');
    // *     returns 5: 'http'
    // *     example 6: \php.strtr('aa', {'a':1,'aa':2});
    // *     returns 6: '2'
    var fr = '',
        i = 0,
        j = 0,
        lenStr = 0,
        lenFrom = 0,
        tmpStrictForIn = false,
        fromTypeStr = '',
        toTypeStr = '',
        istr = '';
    var tmpFrom = [];
    var tmpTo = [];
    var ret = '';
    var match = false;

    // Received replace_pairs?
    // Convert to normal from->to chars
    if (typeof from === 'object') {
        tmpStrictForIn = this.ini_set('phpjs.strictForIn', false); // Not thread-safe; temporarily set to true
        from = this.krsort(from);
        this.ini_set('phpjs.strictForIn', tmpStrictForIn);

        for (fr in from) {
            if (from.hasOwnProperty(fr)) {
                tmpFrom.push(fr);
                tmpTo.push(from[fr]);
            }
        }

        from = tmpFrom;
        to = tmpTo;
    }

    // Walk through subject and replace chars when needed
    lenStr = str.length;
    lenFrom = from.length;
    fromTypeStr = typeof from === 'string';
    toTypeStr = typeof to === 'string';

    for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
            istr = str.charAt(i);
            for (j = 0; j < lenFrom; j++) {
                if (istr == from.charAt(j)) {
                    match = true;
                    break;
                }
            }
        } else {
            for (j = 0; j < lenFrom; j++) {
                if (str.substr(i, from[j].length) == from[j]) {
                    match = true;
                    // Fast forward
                    i = (i + from[j].length) - 1;
                    break;
                }
            }
        }
        if (match) {
            ret += toTypeStr ? to.charAt(j) : to[j];
        } else {
            ret += str.charAt(i);
        }
    }

    return ret;
};

php.substr_compare = function (main_str, str, offset, length, case_insensitivity) {
    // Binary safe optionally case insensitive comparison of 2 strings from an offset, up to length characters  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/substr_compare
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   derived from: strcasecmp, strcmp
    // *     example 1: \php.substr_compare("abcde", "bc", 1, 2);
    // *     returns 1: 0
    if (!offset && offset !== 0) {
        throw 'Missing offset for substr_compare()';
    }

    if (offset < 0) {
        offset = main_str.length + offset;
    }

    if (length && length > (main_str.length - offset)) {
        return false;
    }
    length = length || main_str.length - offset;

    main_str = main_str.substr(offset, length);
    str = str.substr(0, length); // Should only compare up to the desired length
    if (case_insensitivity) { // Works as strcasecmp
        main_str = (main_str + '').toLowerCase();
        str = (str + '').toLowerCase();
        if (main_str == str) {
            return 0;
        }
        return (main_str > str) ? 1 : -1;
    }
    // Works as strcmp
    return ((main_str == str) ? 0 : ((main_str > str) ? 1 : -1));
};

php.substr_count = function (haystack, needle, offset, length) {
    // Returns the number of times a substring occurs in the string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/substr_count
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: \php.substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: \php.substr_count('Kevin van Zonneveld', 'K', 1);
    // *     returns 2: 0
    // *     example 3: \php.substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false
    var pos = 0,
        cnt = 0;

    haystack += '';
    needle += '';
    if (isNaN(offset)) {
        offset = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    offset--;

    while ((offset = haystack.indexOf(needle, offset + 1)) != -1) {
        if (length > 0 && (offset + needle.length) > length) {
            return false;
        } else {
            cnt++;
        }
    }

    return cnt;
};

php.substr_replace = function (str, replace, start, length) {
    // Replaces part of a string with another string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/substr_replace
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
    // *     returns 1: 'bob'
    // *     example 2: $var = 'ABCDEFGH:/MNRPQR/';
    // *     example 2: \php.substr_replace($var, 'bob', 0, $var.length);
    // *     returns 2: 'bob'
    // *     example 3: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
    // *     returns 3: 'bobABCDEFGH:/MNRPQR/'
    // *     example 4: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
    // *     returns 4: 'ABCDEFGH:/bob/'
    // *     example 5: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
    // *     returns 5: 'ABCDEFGH:/bob/'
    // *     example 6: 'substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)'
    // *     returns 6: 'ABCDEFGH://'
    if (start < 0) { // start position in str
        start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }
    return str.slice(0, start) + replace.substr(0, length) + replace.slice(length) + str.slice(start + length);
};

php.time = function () {
    // Return current UNIX timestamp  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/time
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: metjay
    // +   improved by: HKM
    // *     example 1: \php.timeStamp = time();
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    return Math.floor(new Date().getTime() / 1000);
};

php.trim = function (str, charlist) {
    // Strips whitespace from the beginning and end of a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/trim
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // *     example 1: \php.trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: \php.trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'
    // *     example 3: \php.trim(16, 1);
    // *     returns 3: 6
    var whitespace, l = 0,
        i = 0;
    str += '';

    if (!charlist) {
        // default list
        whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    } else {
        // preg_quote custom list
        charlist += '';
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    }

    l = str.length;
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }

    l = str.length;
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }

    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
};

php.uasort = function (inputArr, sorter) {
    // Sort an array with a user-defined comparison function and maintain index association  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/uasort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // *     example 1: \php.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
    // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    var valArr = [],
        keyArr = [],
        tempKeyVal, tempValue, ret, k = '',
        i = 0,
        strictForIn = false,
        populateArr = {};

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (sorter instanceof Array) {
        sorter = this[sorter[0]][sorter[1]];
    }

    var sorterNew = function (keyArr, valArr) {
        for (var i = valArr.length - 2; i >= 0; i--) {
            for (var j = 0; j <= i; j++) {
                ret = sorter(valArr[j + 1], valArr[j]);
                if (ret < 0) {
                    tempValue = valArr[j];
                    valArr[j] = valArr[j + 1];
                    valArr[j + 1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j + 1];
                    keyArr[j + 1] = tempKeyVal;
                }
            }
        }
    };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            keyArr.push(k);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    try {
        sorterNew(keyArr, valArr); // Sort our new temporary arrays
    } catch (e) {
        return false;
    }
    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[keyArr[i]] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.ucfirst = function (str) {
    // Makes a string's first character uppercase  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/ucfirst
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
};

php.ucwords = function (str) {
    // Uppercase the first character of every word in a string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/ucwords
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Waldo Malqui Silva
    // +   bugfixed by: Onno Marsman
    // +   improved by: Robin
    // +      input by: James (http://www.james-bell.co.uk/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.ucwords('kevin van  zonneveld');
    // *     returns 1: 'Kevin Van  Zonneveld'
    // *     example 2: \php.ucwords('HELLO WORLD');
    // *     returns 2: 'HELLO WORLD'
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
};

php.uksort = function (inputArr, sorter) {
    // Sort an array by keys using a user-defined comparison function  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/uksort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: The examples are correct, this is a new way
    // %        note 2: This function deviates from PHP in returning a copy of the array instead
    // %        note 2: of acting by reference and returning true; this was necessary because
    // %        note 2: IE does not allow deleting and re-adding of properties without caching
    // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 2: get the PHP behavior, but use this only if you are in an environment
    // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 2: property deletion is supported. Note that we intend to implement the PHP
    // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 2: is by reference in PHP anyways
    // *     example 1: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.data = uksort(data, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     results 1: data == {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
    // *     returns 1: true
    var tmp_arr = {},
        keys = [],
        i = 0,
        k = '',
        strictForIn = false,
        populateArr = {};

    if (typeof sorter === 'string') {
        sorter = this.window[sorter];
    }

    // Make a list of key names
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            keys.push(k);
        }
    }

    // Sort key names
    try {
        if (sorter) {
            keys.sort(sorter);
        } else {
            keys.sort();
        }
    } catch (e) {
        return false;
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        k = keys[i];
        tmp_arr[k] = inputArr[k];
        if (strictForIn) {
            delete inputArr[k];
        }
    }
    for (i in tmp_arr) {
        if (tmp_arr.hasOwnProperty(i)) {
            populateArr[i] = tmp_arr[i];
        }
    }
    return strictForIn || populateArr;
};

php.urldecode = function (str) {
    // Decodes URL-encoded string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/urldecode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +   improved by: Orlando
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      bugfixed by: Rob
    // +      input by: e-mike
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: \php.urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    // *     example 2: \php.urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: \php.urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    return decodeURIComponent((str + '').replace(/\+/g, '%20'));
};

php.urlencode = function (str) {
    // URL-encodes string  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/urlencode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Joris
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: \php.urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: \php.urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: \php.urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};

php.usort = function (inputArr, sorter) {
    // Sort an array by values using a user-defined comparison function  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/usort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // *     example 1: \php.stuff = {d: '3', a: '1', b: '11', c: '4'};
    // *     example 1: \php.stuff = usort(stuff, function (a, b) {return(a-b);});
    // *     results 1: stuff = {0: '1', 1: '3', 2: '4', 3: '11'};
    var valArr = [],
        k = '',
        i = 0,
        strictForIn = false,
        populateArr = {};

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (sorter instanceof Array) {
        sorter = this[sorter[0]][sorter[1]];
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    try {
        valArr.sort(sorter);
    } catch (e) {
        return false;
    }
    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[i] = valArr[i];
    }

    return strictForIn || populateArr;
};

php.utf8_decode = function (str_data) {
    // Converts a UTF-8 encoded string to ISO-8859-1  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/utf8_decode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
};

php.utf8_encode = function (argString) {
    // Encodes an ISO-8859-1 string to UTF-8  
    // 
    // version: 1103.1210
    // discuss at: http://phpjs.org/functions/utf8_encode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // *     example 1: \php.utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = "",
        start, end, stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }

    if (end > start) {
        utftext += string.slice(start, stringl);
    }

    return utftext;
};


