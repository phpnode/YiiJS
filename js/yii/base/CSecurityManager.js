/*global Yii, php, sjcl, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CSecurityManager provides private keys, hashing and encryption functions.
 * 
 * CSecurityManager is used by Yii components and applications for security-related purpose.
 * For example, it is used in cookie validation feature to prevent cookie data
 * from being tampered.
 * 
 * CSecurityManager is mainly used to protect data from being tampered and viewed.
 * It can generate HMAC and encrypt the data. The private key used to generate HMAC
 * is set by {@link setValidationKey ValidationKey}. The key used to encrypt data is
 * specified by {@link setEncryptionKey EncryptionKey}. If the above keys are not
 * explicitly set, random keys will be generated and used.
 * 
 * To protected data with HMAC, call {@link hashData()}; and to check if the data
 * is tampered, call {@link validateData()}, which will return the real data if
 * it is not tampered. The algorithm used to generated HMAC is specified by
 * {@link validation}.
 * 
 * To encrypt and decrypt data, call {@link encrypt()} and {@link decrypt()}
 * respectively, which uses 3DES encryption algorithm.  Note, the PHP Mcrypt
 * extension must be installed and loaded.
 * 
 * CSecurityManager is a core application component that can be accessed via
 * {@link CApplication::getSecurityManager()}.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CSecurityManager.php 3001 2011-02-24 16:42:44Z alexander.makarow $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CApplicationComponent
 */
Yii.CSecurityManager = function CSecurityManager() {
};
Yii.CSecurityManager.prototype = new Yii.CApplicationComponent();
Yii.CSecurityManager.prototype.constructor =  Yii.CSecurityManager;
/**
 * @const
 */
Yii.CSecurityManager.STATE_VALIDATION_KEY = 'Yii.CSecurityManager.validationkey';
/**
 * @const
 */
Yii.CSecurityManager.STATE_ENCRYPTION_KEY = 'Yii.CSecurityManager.encryptionkey';
/**
 * @var {String} the name of the hashing algorithm to be used by {@link computeHMAC}.
 * 
 * Defaults to 'sha1', meaning using SHA1 hash algorithm.
 * @since 1.1.3
 */
Yii.CSecurityManager.prototype.hashAlgorithm = 'sha1';

Yii.CSecurityManager.prototype._validationKey = null;
Yii.CSecurityManager.prototype._encryptionKey = null;
/**
 * @returns {String} a randomly generated private key
 */
Yii.CSecurityManager.prototype.generateRandomKey = function () {
		return php.sprintf('%08x%08x%08x%08x',php.mt_rand(),php.mt_rand(),php.mt_rand(),php.mt_rand());
	};
/**
 * @returns {String} the private key used to generate HMAC.
 * If the key is not explicitly set, a random one is generated and returned.
 */
Yii.CSecurityManager.prototype.getValidationKey = function () {
		var key;
		if(this._validationKey!==null) {
			return this._validationKey;
		}
		else {
			if((key=Yii.app().getGlobalState(this.STATE_VALIDATION_KEY))!==null) {
				this.setValidationKey(key);
			}
			else {
				key=this.generateRandomKey();
				this.setValidationKey(key);
				Yii.app().setGlobalState(this.STATE_VALIDATION_KEY,key);
			}
			return this._validationKey;
		}
	};
/**
 * @param {String} value the key used to generate HMAC
 * @throws {Yii.CException} if the key is empty
 */
Yii.CSecurityManager.prototype.setValidationKey = function (value) {
		if(!php.empty(value)) {
			this._validationKey=value;
		}
		else {
			throw new Yii.CException(Yii.t('yii','CSecurityManager.validationKey cannot be empty.'));
		}
	};
/**
 * @returns {String} the private key used to encrypt/decrypt data.
 * If the key is not explicitly set, a random one is generated and returned.
 */
Yii.CSecurityManager.prototype.getEncryptionKey = function () {
		var key;
		if(this._encryptionKey!==null) {
			return this._encryptionKey;
		}
		else {
			if((key=Yii.app().getGlobalState(this.STATE_ENCRYPTION_KEY))!==null) {
				this.setEncryptionKey(key);
			}
			else {
				key=this.generateRandomKey();
				this.setEncryptionKey(key);
				Yii.app().setGlobalState(this.STATE_ENCRYPTION_KEY,key);
			}
			return this._encryptionKey;
		}
	};
/**
 * @param {String} value the key used to encrypt/decrypt data.
 * @throws {Yii.CException} if the key is empty
 */
Yii.CSecurityManager.prototype.setEncryptionKey = function (value) {
		if(!php.empty(value)) {
			this._encryptionKey=value;
		}
		else {
			throw new Yii.CException(Yii.t('yii','CSecurityManager.encryptionKey cannot be empty.'));
		}
	};
/**
 * This method has been deprecated since version 1.1.3.
 * Please use {@link hashAlgorithm} instead.
 */
Yii.CSecurityManager.prototype.getValidation = function () {
		return this.hashAlgorithm;
	};
/**
 * This method has been deprecated since version 1.1.3.
 * Please use {@link hashAlgorithm} instead.
 * @param {String} value -
 */
Yii.CSecurityManager.prototype.setValidation = function (value) {
		this.hashAlgorithm=value;
	};
/**
 * Encrypts data.
 * @param {String} data data to be encrypted.
 * @param {String} key the decryption key. This defaults to null, meaning using {@link getEncryptionKey EncryptionKey}.
 * @returns {String} the encrypted data
 * @throws {Yii.CException} if PHP Mcrypt extension is not loaded
 */
Yii.CSecurityManager.prototype.encrypt = function (data, key) {
		var module, iv, encrypted;
		if (key === undefined) {
			key = null;
		}
		module=this.openCryptModule();
		key=key===null ? php.md5(this.getEncryptionKey()) : key;
		encrypted = module.encrypt(key, data);
		return encrypted;
	};
/**
 * Decrypts data
 * @param {String} data data to be decrypted.
 * @param {String} key the decryption key. This defaults to null, meaning using {@link getEncryptionKey EncryptionKey}.
 * @returns {String} the decrypted data
 * @throws {Yii.CException} if PHP Mcrypt extension is not loaded
 */
Yii.CSecurityManager.prototype.decrypt = function (data, key) {
		var module, ivSize, iv, decrypted;
		if (key === undefined) {
			key = null;
		}
		module=this.openCryptModule();
		key=key===null ? php.md5(this.getEncryptionKey()) : key;
		decrypted = module.decrypt(key, data);
		return decrypted;
	};
/**
 * Opens the mcrypt module with the configuration specified in {@link cryptAlgorithm}.
 * @returns {Resource} the mycrypt module handle.
 * @since 1.1.3
 */
Yii.CSecurityManager.prototype.openCryptModule = function () {
		var module;
		if(sjcl !== undefined) {
			return sjcl;
		}
		else {
			throw new Yii.CException(Yii.t('yii','CSecurityManager requires the Stanford Javascript Crypto Library to be loaded in order to use data encryption feature.'));
		}
	};
/**
 * Prefixes data with an HMAC.
 * @param {String} data data to be hashed.
 * @param {String} key the private key to be used for generating HMAC. Defaults to null, meaning using {@link validationKey}.
 * @returns {String} data prefixed with HMAC
 */
Yii.CSecurityManager.prototype.hashData = function (data, key) {
		if (key === undefined) {
			key = null;
		}
		return this.computeHMAC(data,key)+data;
	};
/**
 * Validates if data is tampered.
 * @param {String} data data to be validated. The data must be previously
 * generated using {@link hashData()}.
 * @param {String} key the private key to be used for generating HMAC. Defaults to null, meaning using {@link validationKey}.
 * @returns {String} the real data with HMAC stripped off. False if the data
 * is tampered.
 */
Yii.CSecurityManager.prototype.validateData = function (data, key) {
		var len, hmac, data2;
		if (key === undefined) {
			key = null;
		}
		len=php.strlen(this.computeHMAC('test'));
		
		if(php.strlen(data)>=len) {
			hmac=data.slice(0, len);
			data2=data.slice(len);
			return hmac===this.computeHMAC(data2,key)?data2:false;
		}
		else {
			return false;
		}
	};
/**
 * Computes the HMAC for the data with {@link getValidationKey ValidationKey}.
 * @param {String} data data to be generated HMAC
 * @param {String} key the private key to be used for generating HMAC. Defaults to null, meaning using {@link validationKey}.
 * @returns {String} the HMAC for the data
 */
Yii.CSecurityManager.prototype.computeHMAC = function (data, key) {
		var pack, func, hmac;
		if (key === undefined) {
			key = null;
		}
		if(key===null) {
			key=this.getValidationKey();
		}
		hmac = new sjcl.misc.hmac(key);
		return php.md5(hmac.encrypt(data).join(""));		
		
};

