/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CLocale represents the data relevant to a locale.
 * 
 * The data includes the number formatting information and date formatting information.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CLocale.php 2844 2011-01-13 01:29:55Z alexander.makarow $
 * @package system.i18n
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CComponent
 */
Yii.CLocale = function CLocale (id) {
	
	if (id !== false) {
		this.construct(id);
	}
};
Yii.CLocale._locales = null;
Yii.CLocale.prototype = new Yii.CComponent();
Yii.CLocale.prototype.constructor =  Yii.CLocale;
/**
 * @var {String} the directory that contains the locale data. If this property is not set,
 * the locale data will be loaded from 'framework/i18n/data'.
 * @since 1.1.0
 */
Yii.CLocale.prototype.dataPath = null;
Yii.CLocale.prototype._id = null;
Yii.CLocale.prototype._data = null;
Yii.CLocale.prototype._dateFormatter = null;
Yii.CLocale.prototype._numberFormatter = null;
/**
 * Returns the instance of the specified locale.
 * Since the constructor of CLocale is protected, you can only use
 * this method to obtain an instance of the specified locale.
 * @param {String} id the locale ID (e.g. en_US)
 * @returns {Yii.CLocale} the locale instance
 */
Yii.CLocale.getInstance = function (id) {
		
		if(this._locales === null) {
			this._locales = {};
		}
		if(this._locales[id] !== undefined) {
			return this._locales[id];
		}
		else {
			return (this._locales[id]=new Yii.CLocale(id));
		}
	};
/**
 * @returns {Array} IDs of the locales which the framework can recognize
 */
Yii.CLocale.prototype.getLocaleIDs = function () {
		var locales;
		locales=["aa","aa_dj","aa_er","aa_et","af","af_na","af_za","ak","ak_gh","am","am_et","ar","ar_ae","ar_bh","ar_dz","ar_eg","ar_iq","ar_jo","ar_kw","ar_lb","ar_ly","ar_ma","ar_om","ar_qa","ar_sa","ar_sd","ar_sy","ar_tn","ar_ye","as","as_in","asa","asa_tz","az","az_arab","az_arab_ir","az_az","az_cyrl","az_cyrl_az","az_ir","az_latn","az_latn_az","be","be_by","bem","bem_zm","bez","bez_tz","bg","bg_bg","bm","bm_ml","bn","bn_bd","bn_in","bo","bo_cn","bo_in","br","br_fr","brx","brx_in","bs","bs_ba","byn","byn_er","ca","ca_es","cch","cch_ng","cgg","cgg_ug","chr","chr_us","cs","cs_cz","cy","cy_gb","da","da_dk","dav","dav_ke","de","de_at","de_be","de_ch","de_de","de_li","de_lu","dv","dv_mv","dz","dz_bt","ebu","ebu_ke","ee","ee_gh","ee_tg","el","el_cy","el_gr","el_polyton","en","en_as","en_au","en_be","en_bw","en_bz","en_ca","en_dsrt","en_dsrt_us","en_gb","en_gu","en_hk","en_ie","en_in","en_jm","en_mh","en_mp","en_mt","en_mu","en_na","en_nz","en_ph","en_pk","en_sg","en_shaw","en_tt","en_um","en_us","en_us_posix","en_vi","en_za","en_zw","en_zz","eo","es","es_419","es_ar","es_bo","es_cl","es_co","es_cr","es_do","es_ec","es_es","es_gq","es_gt","es_hn","es_mx","es_ni","es_pa","es_pe","es_pr","es_py","es_sv","es_us","es_uy","es_ve","et","et_ee","eu","eu_es","fa","fa_af","fa_ir","ff","ff_sn","fi","fi_fi","fil","fil_ph","fo","fo_fo","fr","fr_be","fr_bf","fr_bi","fr_bj","fr_bl","fr_ca","fr_cd","fr_cf","fr_cg","fr_ch","fr_ci","fr_cm","fr_dj","fr_fr","fr_ga","fr_gn","fr_gp","fr_gq","fr_km","fr_lu","fr_mc","fr_mf","fr_mg","fr_ml","fr_mq","fr_ne","fr_re","fr_rw","fr_sn","fr_td","fr_tg","fur","fur_it","ga","ga_ie","gaa","gaa_gh","gez","gez_er","gez_et","gl","gl_es","gsw","gsw_ch","gu","gu_in","guz","guz_ke","gv","gv_gb","ha","ha_arab","ha_arab_ng","ha_arab_sd","ha_gh","ha_latn","ha_latn_gh","ha_latn_ne","ha_latn_ng","ha_ne","ha_ng","ha_sd","haw","haw_us","he","he_il","hi","hi_in","hr","hr_hr","hu","hu_hu","hy","hy_am","ia","id","id_id","ig","ig_ng","ii","ii_cn","in","is","is_is","it","it_ch","it_it","iu","iw","ja","ja_jp","jmc","jmc_tz","ka","ka_ge","kab","kab_dz","kaj","kaj_ng","kam","kam_ke","kcg","kcg_ng","kde","kde_tz","kea","kea_cv","kfo","kfo_ci","khq","khq_ml","ki","ki_ke","kk","kk_cyrl","kk_cyrl_kz","kk_kz","kl","kl_gl","kln","kln_ke","km","km_kh","kn","kn_in","ko","ko_kr","kok","kok_in","kpe","kpe_gn","kpe_lr","ksb","ksb_tz","ksh","ksh_de","ku","ku_arab","ku_arab_iq","ku_arab_ir","ku_iq","ku_ir","ku_latn","ku_latn_sy","ku_latn_tr","ku_sy","ku_tr","kw","kw_gb","ky","ky_kg","lag","lag_tz","lg","lg_ug","ln","ln_cd","ln_cg","lo","lo_la","lt","lt_lt","luo","luo_ke","luy","luy_ke","lv","lv_lv","mas","mas_ke","mas_tz","mer","mer_ke","mfe","mfe_mu","mg","mg_mg","mi","mi_nz","mk","mk_mk","ml","ml_in","mn","mn_cn","mn_cyrl","mn_cyrl_mn","mn_mn","mn_mong","mn_mong_cn","mo","mr","mr_in","ms","ms_bn","ms_my","mt","mt_mt","my","my_mm","naq","naq_na","nb","nb_no","nd","nd_zw","nds","nds_de","ne","ne_in","ne_np","nl","nl_be","nl_nl","nn","nn_no","no","nr","nr_za","nso","nso_za","ny","ny_mw","nyn","nyn_ug","oc","oc_fr","om","om_et","om_ke","or","or_in","pa","pa_arab","pa_arab_pk","pa_guru","pa_guru_in","pa_in","pa_pk","pl","pl_pl","ps","ps_af","pt","pt_ao","pt_br","pt_gw","pt_mz","pt_pt","rm","rm_ch","ro","ro_md","ro_ro","rof","rof_tz","root","ru","ru_md","ru_ru","ru_ua","rw","rw_rw","rwk","rwk_tz","sa","sa_in","saq","saq_ke","se","se_fi","se_no","seh","seh_mz","ses","ses_ml","sg","sg_cf","sh","sh_ba","sh_cs","sh_yu","shi","shi_latn","shi_latn_ma","shi_ma","shi_tfng","shi_tfng_ma","si","si_lk","sid","sid_et","sk","sk_sk","sl","sl_si","sn","sn_zw","so","so_dj","so_et","so_ke","so_so","sq","sq_al","sr","sr_ba","sr_cs","sr_cyrl","sr_cyrl_ba","sr_cyrl_cs","sr_cyrl_me","sr_cyrl_rs","sr_cyrl_yu","sr_latn","sr_latn_ba","sr_latn_cs","sr_latn_me","sr_latn_rs","sr_latn_yu","sr_me","sr_rs","sr_yu","ss","ss_sz","ss_za","ssy","ssy_er","st","st_ls","st_za","sv","sv_fi","sv_se","sw","sw_ke","sw_tz","syr","syr_sy","ta","ta_in","ta_lk","te","te_in","teo","teo_ke","teo_ug","tg","tg_cyrl","tg_cyrl_tj","tg_tj","th","th_th","ti","ti_er","ti_et","tig","tig_er","tl","tl_ph","tn","tn_za","to","to_to","tr","tr_tr","trv","trv_tw","ts","ts_za","tt","tt_ru","tzm","tzm_latn","tzm_latn_ma","tzm_ma","ug","ug_arab","ug_arab_cn","ug_cn","uk","uk_ua","ur","ur_in","ur_pk","uz","uz_af","uz_arab","uz_arab_af","uz_cyrl","uz_cyrl_uz","uz_latn","uz_latn_uz","uz_uz","ve","ve_za","vi","vi_vn","vun","vun_tz","wal","wal_et","wo","wo_latn","wo_latn_sn","wo_sn","xh","xh_za","xog","xog_ug","yo","yo_ng","zh","zh_cn","zh_hans","zh_hans_cn","zh_hans_hk","zh_hans_mo","zh_hans_sg","zh_hant","zh_hant_hk","zh_hant_mo","zh_hant_tw","zh_hk","zh_mo","zh_sg","zh_tw","zu","zu_za"];
			
		return locales;
	};
/**
 * Constructor.
 * Since the constructor is protected, please use {@link getInstance}
 * to obtain an instance of the specified locale.
 * @param {String} id the locale ID (e.g. en_US)
 */
Yii.CLocale.prototype.construct = function (id) {
		var dataPath, dataFile;
		this._id=this.getCanonicalID(id);
		dataPath=this.dataPath===null ? YII_PATH + '/i18n/data' : this.dataPath;
		dataFile=dataPath+"/"+this._id+'.js';
		this._data= Yii.include(dataFile,false);
		
	};
/**
 * Converts a locale ID to its canonical form.
 * In canonical form, a locale ID consists of only underscores and lower-case letters.
 * @param {String} id the locale ID to be converted
 * @returns {String} the locale ID in canonical form
 */
Yii.CLocale.prototype.getCanonicalID = function (id) {
		return php.str_replace('-','_',id).toLowerCase();
	};
/**
 * @returns {String} the locale ID (in canonical form)
 */
Yii.CLocale.prototype.getId = function () {
		return this._id;
	};
/**
 * @returns {Yii.CNumberFormatter} the number formatter for this locale
 */
Yii.CLocale.prototype.getNumberFormatter = function () {
		if(this._numberFormatter===null) {
			this._numberFormatter=new Yii.CNumberFormatter(this);
		}
		return this._numberFormatter;
	};
/**
 * @returns {Yii.CDateFormatter} the date formatter for this locale
 */
Yii.CLocale.prototype.getDateFormatter = function () {
		if(this._dateFormatter===null) {
			this._dateFormatter=new Yii.CDateFormatter(this);
		}
		return this._dateFormatter;
	};
/**
 * @param {String} currency 3-letter ISO 4217 code. For example, the code "USD" represents the US Dollar and "EUR" represents the Euro currency.
 * @returns {String} the localized currency symbol. Null if the symbol does not exist.
 */
Yii.CLocale.prototype.getCurrencySymbol = function (currency) {
		return this._data.currencySymbols[currency] !== undefined ? this._data.currencySymbols[currency] : null;
	};
/**
 * @param {String} name symbol name
 * @returns {String} symbol
 */
Yii.CLocale.prototype.getNumberSymbol = function (name) {
		return this._data.numberSymbols[name] !== undefined ? this._data.numberSymbols[name] : null;
	};
/**
 * @returns {String} the decimal format
 */
Yii.CLocale.prototype.getDecimalFormat = function () {
		return this._data.decimalFormat;
	};
/**
 * @returns {String} the currency format
 */
Yii.CLocale.prototype.getCurrencyFormat = function () {
		return this._data.currencyFormat;
	};
/**
 * @returns {String} the percent format
 */
Yii.CLocale.prototype.getPercentFormat = function () {
		return this._data.percentFormat;
	};
/**
 * @returns {String} the scientific format
 */
Yii.CLocale.prototype.getScientificFormat = function () {
		return this._data.scientificFormat;
	};
/**
 * @param {Integer} month month (1-12)
 * @param {String} width month name width. It can be 'wide', 'abbreviated' or 'narrow'.
 * @param {Boolean} standAlone whether the month name should be returned in stand-alone format
 * @returns {String} the month name
 */
Yii.CLocale.prototype.getMonthName = function (month, width, standAlone) {
		if (width === undefined) {
			width = 'wide';
		}
		if (standAlone === undefined) {
			standAlone = false;
		}
		if(standAlone) {
			return this._data.monthNamesSA[width][month] !== undefined ? this._data.monthNamesSA[width][month] : this._data.monthNames[width][month];
		}
		else {
			return this._data.monthNames[width][month] !== undefined ? this._data.monthNames[width][month] : this._data.monthNamesSA[width][month];
		}
	};
/**
 * Returns the month names in the specified width.
 * @param {String} width month name width. It can be 'wide', 'abbreviated' or 'narrow'.
 * @param {Boolean} standAlone whether the month names should be returned in stand-alone format
 * @returns {Array} month names indexed by month values (1-12)
 * @since 1.0.9
 */
Yii.CLocale.prototype.getMonthNames = function (width, standAlone) {
		if (width === undefined) {
			width = 'wide';
		}
		if (standAlone === undefined) {
			standAlone = false;
		}
		if(standAlone) {
			return this._data.monthNamesSA[width] !== undefined ? this._data.monthNamesSA[width] : this._data.monthNames[width];
		}
		else {
			return this._data.monthNames[width] !== undefined ? this._data.monthNames[width] : this._data.monthNamesSA[width];
		}
	};
/**
 * @param {Integer} day weekday (0-6, 0 means Sunday)
 * @param {String} width weekday name width.  It can be 'wide', 'abbreviated' or 'narrow'.
 * @param {Boolean} standAlone whether the week day name should be returned in stand-alone format
 * @returns {String} the weekday name
 */
Yii.CLocale.prototype.getWeekDayName = function (day, width, standAlone) {
		if (width === undefined) {
			width = 'wide';
		}
		if (standAlone === undefined) {
			standAlone = false;
		}
		if(standAlone) {
			return this._data.weekDayNamesSA[width][day] !== undefined ? this._data.weekDayNamesSA[width][day] : this._data.weekDayNames[width][day];
		}
		else {
			return this._data.weekDayNames[width][day] !== undefined ? this._data.weekDayNames[width][day] : this._data.weekDayNamesSA[width][day];
		}
	};
/**
 * Returns the week day names in the specified width.
 * @param {String} width weekday name width.  It can be 'wide', 'abbreviated' or 'narrow'.
 * @param {Boolean} standAlone whether the week day name should be returned in stand-alone format
 * @returns {Array} the weekday names indexed by weekday values (0-6, 0 means Sunday, 1 Monday, etc.)
 * @since 1.0.9
 */
Yii.CLocale.prototype.getWeekDayNames = function (width, standAlone) {
		if (width === undefined) {
			width = 'wide';
		}
		if (standAlone === undefined) {
			standAlone = false;
		}
		if(standAlone) {
			return this._data.weekDayNamesSA[width] !== undefined ? this._data.weekDayNamesSA[width] : this._data.weekDayNames[width];
		}
		else {
			return this._data.weekDayNames[width] !== undefined ? this._data.weekDayNames[width] : this._data.weekDayNamesSA[width];
		}
	};
/**
 * @param {Integer} era era (0,1)
 * @param {String} width era name width.  It can be 'wide', 'abbreviated' or 'narrow'.
 * @returns {String} the era name
 */
Yii.CLocale.prototype.getEraName = function (era, width) {
		if (width === undefined) {
			width = 'wide';
		}
		return this._data.eraNames[width][era];
	};
/**
 * @returns {String} the AM name
 */
Yii.CLocale.prototype.getAMName = function () {
		return this._data.amName;
	};
/**
 * @returns {String} the PM name
 */
Yii.CLocale.prototype.getPMName = function () {
		return this._data.pmName;
	};
/**
 * @param {String} width date format width. It can be 'full', 'long', 'medium' or 'short'.
 * @returns {String} date format
 */
Yii.CLocale.prototype.getDateFormat = function (width) {
		if (width === undefined) {
			width = 'medium';
		}
		return this._data.dateFormats[width];
	};
/**
 * @param {String} width time format width. It can be 'full', 'long', 'medium' or 'short'.
 * @returns {String} date format
 */
Yii.CLocale.prototype.getTimeFormat = function (width) {
		if (width === undefined) {
			width = 'medium';
		}
		return this._data.timeFormats[width];
	};
/**
 * @returns {String} datetime format, i.e., the order of date and time.
 */
Yii.CLocale.prototype.getDateTimeFormat = function () {
		return this._data.dateTimeFormat;
	};
/**
 * @returns {String} the character orientation, which is either 'ltr' (left-to-right) or 'rtl' (right-to-left)
 * @since 1.1.2
 */
Yii.CLocale.prototype.getOrientation = function () {
		return this._data.orientation !== undefined ? this._data.orientation : 'ltr';
	};
/**
 * @returns {Array} plural forms expressions
 */
Yii.CLocale.prototype.getPluralRules = function () {
		return this._data.pluralRules !== undefined ? this._data.pluralRules : [];
};