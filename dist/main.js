/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js"); // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js"); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
  var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  return config;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function deepMerge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/batch.js":
/*!**************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/batch.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Batch =
/** @class */
function () {
  function Batch(req) {
    var _this = this;
    /** returns balance sheet data. Available quarterly or annually with the default being the last available quarter
     * `Data Weight: 3000`
     */


    this.balanceSheet = function () {
      _this.batching = _this.batching.concat(["balance-sheet"]);
      return _this;
    };
    /**
     * returns book value for a given stock
     * `Data Weight: 1 per quote returned`
     */


    this.book = function () {
      _this.batching = _this.batching.concat(["book"]);
      return _this;
    };
    /**
     * returns cash flow data. Available quarterly or annually, with the default being the last available quarter.
     * `Data Weight: 1,000 per symbol per period`
     */


    this.cashFlow = function () {
      _this.batching = _this.batching.concat(["cash-flow"]);
      return _this;
    };
    /**
     * Returns adjusted and unadjusted historical data for up to 15 years.
     * `Data Weight: 1,000 per symbol per period`
     */


    this.chart = function () {
      _this.batching = _this.batching.concat(["chart"]);
      return _this;
    };

    this.ceoCompensation = function () {
      _this.batching = _this.batching.concat(["ceo-compensation"]);
      return _this;
    };
    /** returns data on a given company
     *  `Data Weight: 1 per symbol` */


    this.company = function () {
      _this.batching = _this.batching.concat(["company"]);
      return _this;
    };

    this.delayedQuote = function () {
      _this.batching = _this.batching.concat(["delayed-quote"]);
      return _this;
    };

    this.dividends = function () {
      _this.batching = _this.batching.concat(["dividends"]);
      return _this;
    };
    /** Returns earnings data for a given company including the actual EPS, consensus, and fiscal period. Earnings are available quarterly (last 4 quarters).
     */


    this.earnings = function () {
      _this.batching = _this.batching.concat(["earnings"]);
      return _this;
    };
    /** Provides the latest consensus estimate for the next fiscal period */


    this.estimates = function () {
      _this.batching = _this.batching.concat(["estimates"]);
      return _this;
    };
    /** Pulls income statement, balance sheet, and cash flow data from the most recent reported quarter. */


    this.financials = function () {
      _this.batching = _this.batching.concat(["financials"]);
      return _this;
    };
    /** Returns latest news for a give stock symbol */


    this.news = function () {
      _this.batching = _this.batching.concat(["news"]);
      return _this;
    };
    /**
     * Returns the top 10 fund holders, meaning any firm not defined as buy-side or sell-side such as mutual funds, pension funds, endowments, investment firms, and other large entities that manage funds on behalf of others.
     */


    this.fundOwnership = function () {
      _this.batching = _this.batching.concat(["fund-ownership"]);
      return _this;
    };
    /** Pulls income statement data. Available quarterly or annually with the default being the last available quarter. */


    this.income = function () {
      _this.batching = _this.batching.concat(["income"]);
      return _this;
    };
    /** Returns the top 10 insiders, with the most recent information. */


    this.insiderRoster = function () {
      _this.batching = _this.batching.concat(["inside-roster"]);
      return _this;
    };
    /** Returns aggregated insiders summary data for the last 6 months. */


    this.insiderSummary = function () {
      _this.batching = _this.batching.concat(["inside-summary"]);
      return _this;
    };

    this.insiderTransactions = function () {
      _this.batching = _this.batching.concat(["inside-transactions"]);
      return _this;
    };
    /**
    Returns the top 10 institutional holders, defined as buy-side or sell-side firms. */


    this.institutionalOwnership = function () {
      _this.batching = _this.batching.concat(["institutionalOwnership"]);
      return _this;
    };
    /** This is a helper function, but the google APIs url is standardized.  */


    this.logo = function () {
      _this.batching = _this.batching.concat(["logo"]);
      return _this;
    };
    /** This endpoint will return aggregated intraday prices in one minute buckets */


    this.intradayPrices = function () {
      _this.batching = _this.batching.concat(["intraday-prices"]);
      return _this;
    };
    /**  This returns 15 minute delayed, last sale eligible trades. */


    this.largestTrades = function () {
      _this.batching = _this.batching.concat(["largest-trades"]);
      return _this;
    };
    /** Returns end of day options data */


    this.options = function () {
      _this.batching = _this.batching.concat(["options"]);
      return _this;
    };
    /** Returns peer group */


    this.peers = function () {
      _this.batching = _this.batching.concat(["peers"]);
      return _this;
    };
    /** Returns previous day adjusted price data for one or more stocks. */


    this.previous = function () {
      _this.batching = _this.batching.concat(["previous"]);
      return _this;
    };
    /** Returns price of a stock */


    this.price = function () {
      _this.batching = _this.batching.concat(["price"]);
      return _this;
    };
    /** Provides the latest avg, high, and low analyst price target for a symbol. */


    this.priceTarget = function () {
      _this.batching = _this.batching.concat(["price-target"]);
      return _this;
    };
    /** Returns the official open and close for a give symbol. The official open is available as soon as 9:45am ET and the official close as soon as 4:15pm ET. Some stocks can report late open or close prices. */


    this.ohlc = function () {
      _this.batching = _this.batching.concat(["ohlc"]);
      return _this;
    };
    /** This endpoint provides social sentiment data from StockTwits. Data can be viewed as a daily value, or by minute for a given date. */


    this.sentiment = function () {
      _this.batching = _this.batching.concat(["sentiment"]);
      return _this;
    };

    this.quote = function () {
      _this.batching = _this.batching.concat(["quote"]);
      return _this;
    };
    /** Pulls data from the last four months. */


    this.recommendationTrends = function () {
      _this.batching = _this.batching.concat(["recommendation-trends"]);
      return _this;
    };

    this.stats = function () {
      _this.batching = _this.batching.concat(["stats"]);
      return _this;
    };

    this.splits = function () {
      _this.batching = _this.batching.concat(["splits"]);
      return _this;
    };
    /** This returns 15 minute delayed and 30 day average consolidated volume percentage of a stock, by market. This call will always return 13 values, and will be sorted in ascending order by current day trading volume percentage. */


    this.volumeByVenue = function () {
      _this.batching = _this.batching.concat(["volume-by-venue"]);
      return _this;
    };
    /** return batch requests using the range method */


    this.range = function (range, last) {
      return _this.req.response(_this.req.batchParams, _this.batching, "&range=" + (range ? range : "1m") + "&last=" + (last ? last : 0));
    };

    this.req = req;
    this.batching = [];
  }

  return Batch;
}();

exports.default = Batch;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/crypto.js":
/*!***************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/crypto.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Crypto =
/** @class */
function () {
  function Crypto(req) {
    var _this = this;

    this.book = function () {
      return _this.req.request("book");
    };

    this.price = function () {
      return _this.req.request("price");
    };

    this.quote = function () {
      return _this.req.request("quote");
    };

    this.events = function () {
      return _this.req.request("cryptoEvents");
    };

    this.req = req;
  }

  return Crypto;
}();

exports.default = Crypto;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/dataPoints.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/dataPoints.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DataPoints =
/** @class */
function () {
  function DataPoints(req) {
    this.req = req;
  }

  DataPoints.prototype.market = function () {
    return this.req.request("market/" + this.req.stockSymbol);
  };

  DataPoints.prototype.treasury = function () {
    return this.req.request("market/" + this.req.stockSymbol);
  };

  DataPoints.prototype.energy = function () {
    return this.req.request("energy/" + this.req.stockSymbol);
  };

  return DataPoints;
}();

exports.default = DataPoints;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/deep.js":
/*!*************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/deep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Deep =
/** @class */
function () {
  function Deep(req) {
    var _this = this;

    this.symbol = function () {
      return _this.req.request("");
    };
    /** DEEP broadcasts an Auction Information Message every one second between the Lock-in Time and the auction match for Opening and Closing Auctions, and during the Display Only Period for IPO, Halt, and Volatility Auctions. Only IEX listed securities are eligible for IEX Auctions. */


    this.auction = function () {
      return _this.req.request("auction");
    };

    this.book = function () {
      return _this.req.request("book");
    };

    this.opHaltStatus = function () {
      return _this.req.request("op-halt-status");
    };

    this.officialPrice = function () {
      return _this.req.request("official-price");
    };

    this.securityEvent = function () {
      return _this.req.request("security-event");
    };
    /** In association with Rule 201 of Regulation SHO, the Short Sale Price Test message is used to indicate when a Short Sale Price Test restriction is in effect for a security.
    */


    this.ssrStatus = function () {
      return _this.req.request("ssr-status");
    };
    /** The System Event message is used to indicate events that apply to the market or the data feed. */


    this.systemEvent = function () {
      return _this.req.request("ssr-status");
    };
    /** Trade report messages are sent when an order on the IEX Order Book is executed in whole or in part. DEEP sends a Trade report message for every individual fill. */


    this.trades = function () {
      return _this.req.request("trades");
    };
    /** Trade break messages are sent when an execution on IEX is broken on that same trading day. Trade breaks are rare and only affect applications that rely upon IEX execution based data. */


    this.tradeBreaks = function () {
      return _this.req.request("trade-breaks");
    };
    /** The Trading status message is used to indicate the current trading status of a security. For IEX-listed securities, IEX acts as the primary market and has the authority to institute a trading halt or trading pause in a security due to news dissemination or regulatory reasons. For non-IEX-listed securities, IEX abides by any regulatory trading halts and trading pauses instituted by the primary or listing market, as applicable. */


    this.tradingStatus = function () {
      return _this.req.request("trading-status");
    };

    this.req = req;
  }

  return Deep;
}();

exports.default = Deep;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/forex.js":
/*!**************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/forex.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Forex =
/** @class */
function () {
  function Forex(req) {
    var _this = this;
    /** This endpoint provides an end of day exchange rate of a given currency pair */


    this.rate = function (params) {
      return _this.req.request("rate/" + params.from + "/" + params.to);
    };
    /** This endpoint returns real-time foreign currency exchange rates data updated every 250 milliseconds. */


    this.latest = function () {
      return _this.req.request("latest?symbols=" + _this.req.stockSymbols);
    };

    this.convert = function (_a) {
      var amount = _a.amount,
          symbols = _a.symbols;
      return _this.req.request("convert?symbols=" + (symbols ? symbols : _this.req.stockSymbols) + (amount ? "&amount=" + amount : ""));
    };

    this.historical = function (_a) {
      var from = _a.from,
          to = _a.to,
          on = _a.on,
          first = _a.first,
          filter = _a.filter,
          symbols = _a.symbols,
          last = _a.last;
      return _this.req.request("historical?symbols=" + _this.req.stockSymbols + (last ? "&last=" + last : "") + (from ? "&from=" + from : "") + (to ? "&to=" + to : "") + (on ? "&on=" : "") + (first ? "&first=" : "") + (filter ? "&filter=" + filter : ""));
    };

    this.req = req;
  }

  return Forex;
}();

exports.default = Forex;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/iexCloudClient.js":
/*!***********************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/iexCloudClient.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var crypto_1 = __webpack_require__(/*! ./crypto */ "./node_modules/node-iex-cloud/lib/crypto.js");

var stock_1 = __webpack_require__(/*! ./stock */ "./node_modules/node-iex-cloud/lib/stock.js");

var stocks_1 = __webpack_require__(/*! ./stocks */ "./node_modules/node-iex-cloud/lib/stocks.js");

var market_1 = __webpack_require__(/*! ./market */ "./node_modules/node-iex-cloud/lib/market.js");

var reference_1 = __webpack_require__(/*! ./reference */ "./node_modules/node-iex-cloud/lib/reference.js");

var dataPoints_1 = __webpack_require__(/*! ./dataPoints */ "./node_modules/node-iex-cloud/lib/dataPoints.js");

var timeSeries_1 = __webpack_require__(/*! ./timeSeries */ "./node_modules/node-iex-cloud/lib/timeSeries.js");

var stats_1 = __webpack_require__(/*! ./stats */ "./node_modules/node-iex-cloud/lib/stats.js");

var request_1 = __webpack_require__(/*! ./request */ "./node_modules/node-iex-cloud/lib/request.js");

var forex_1 = __webpack_require__(/*! ./forex */ "./node_modules/node-iex-cloud/lib/forex.js");

var IEXCloudClient =
/** @class */
function () {
  function IEXCloudClient(f, config) {
    var _this = this;
    /**  Takes in a stock symbol, a unique series of letters assigned to a security   */


    this.symbol = function (symbol) {
      _this.req.stockSymbol = symbol;
      return new stock_1.default(_this.req);
    };
    /** Takes in multiple stock symbols, and batches them to a single request  */


    this.batchSymbols = function () {
      var symbols = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        symbols[_i] = arguments[_i];
      }

      _this.req.datatype = "stock/market/batch";
      _this.req.stockSymbols = symbols;
      return new stocks_1.default(_this.req);
    };
    /** Takes in multiple stock symbols, and batches them to a single request  */


    this.symbols = function () {
      var symbols = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        symbols[_i] = arguments[_i];
      }

      _this.req.datatype = "stock/market/batch";
      console.warn("This method will be deprecated please use batchSymbols to batch multiple stock symbols together");
      _this.req.stockSymbols = symbols;
      return new stocks_1.default(_this.req);
    };

    this.tops = function () {
      _this.req.datatype = "tops";
      return _this.req.request("");
    };
    /**  Takes in a crypto currency   */


    this.crypto = function (crypto) {
      _this.req.datatype = "crypto";
      _this.req.cryptoCurrency = crypto;
      return new crypto_1.default(_this.req);
    };

    this.market = function () {
      _this.req.datatype = "stock/market";
      return new market_1.default(_this.req);
    };

    this.forex = function () {
      _this.req.datatype = "fx";
      return new forex_1.default(_this.req);
    };

    this.refData = function () {
      _this.req.datatype = "ref-data";
      return new reference_1.default(_this.req);
    };

    this.dataPoints = function () {
      _this.req.datatype = "data-points";
      return new dataPoints_1.default(_this.req);
    };

    this.stats = function () {
      _this.req.datatype = "stats";
      return new stats_1.default(_this.req);
    };

    this.timeSeries = function () {
      _this.req.datatype = "time-series";
      return new timeSeries_1.default(_this.req);
    };
    /**  Returns an array of symbols up to the top 10 matches.
     * Results will be sorted for relevancy. Search currently defaults to equities only, where the symbol returned is supported by endpoints listed under the Stocks category.
     * @params search by symbol or security name.
     */


    this.search = function (symbol) {
      _this.req.datatype = "search";
      return _this.req.request(symbol);
    };

    this.req = new request_1.default(f.bind(this), config);
  }

  return IEXCloudClient;
}();

exports.default = IEXCloudClient;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var iexCloudClient_1 = __webpack_require__(/*! ./iexCloudClient */ "./node_modules/node-iex-cloud/lib/iexCloudClient.js");

exports.IEXCloudClient = iexCloudClient_1.default;
exports.default = iexCloudClient_1.default;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/market.js":
/*!***************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/market.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Market =
/** @class */
function () {
  function Market(req) {
    var _this = this;
    /** Returns an array of quote objects for a given collection type. Currently supported collection types are sector, tag, and list */


    this.collection = function (_a) {
      var param = _a.param,
          collectionName = _a.collectionName;
      return _this.req.request("collection/" + param + "?collectionName=" + collectionName);
    };
    /** Returns earnings that will be reported today as three arrays: before the open bto, after market close amc and during the trading day other. Each array contains an object with all keys from earnings, a quote object, and a headline key. */


    this.todayEarnings = function () {
      return _this.req.request("today-earnings");
    };
    /** This returns a list of upcoming IPOs scheduled for the current and next month. The response is split into two structures: rawData and viewData. rawData represents all available data for an IPO. viewData represents data structured for display to a user. */


    this.upcomingIPOs = function () {
      return _this.req.request("upcoming-ipos");
    };
    /** This returns a list of today IPOs scheduled for the current and next month. The response is split into two structures: rawData and viewData. rawData represents all available data for an IPO. viewData represents data structured for display to a user. */


    this.todayIPOs = function () {
      return _this.req.request("today-ipos");
    };
    /** This endpoint returns real time traded volume on U.S. markets. */


    this.volume = function () {
      return _this.req.request("volume");
    };
    /** This returns an array of each sector and performance for the current trading day. Performance is based on each sector ETF. */


    this.sectorPerformance = function () {
      return _this.req.request("sector-performance");
    };
    /** Returns an array of quotes for the top 10 symbols in a specified list. */


    this.list = function (listType, _a) {
      var displayPercent = _a.displayPercent,
          listLimit = _a.listLimit;
      return _this.req.request("list" + listType);
    };

    this.req = req;
  }

  return Market;
}();

exports.default = Market;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/reference.js":
/*!******************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/reference.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ReferenceData =
/** @class */
function () {
  function ReferenceData(req) {
    var _this = this;
    /** This call returns an array of symbols that IEX Cloud supports for API calls. */


    this.symbols = function () {
      return _this.req.request("symbols");
    };
    /** Returns an array of tags. Tags can be found on each company. */


    this.tags = function () {
      return _this.req.request("tags");
    };

    this.cryptoSymbols = function () {
      return _this.req.request("crypto/symbols");
    };

    this.fxSymbols = function () {
      _this.req.datatype = "ref-data";
      return _this.req.request("fx/symbols");
    };
    /** This call returns an array of symbols the Investors Exchange supports for trading. This list is updated daily as of 7:45 a.m. ET. Symbols may be added or removed by the Investors Exchange after the list was produced. */


    this.iexSymbols = function () {
      return _this.req.request("iex/symbols");
    };
    /** This call returns an array of international symbols that IEX Cloud supports for API calls. */


    this.internationalSymbols = function (region, exchange) {
      return _this.req.request(region ? "region/" + region + "/symbols" : "exchange/" + exchange + "/symbols");
    };
    /** Returns an array of exchanges. */


    this.exchanges = function () {
      return _this.req.request("exchanges");
    };
    /** This call returns an array of mutual fund symbols that IEX Cloud supports for API calls. */


    this.mutualFunds = function () {
      return _this.req.request("mutual-funds/symbols");
    };
    /** This call returns an object keyed by symbol with the value of each symbol being an array of available contract dates. */


    this.options = function () {
      return _this.req.request("options/symbols");
    };
    /** This call returns an array of OTC symbols that IEX Cloud supports for API calls. */


    this.otc = function () {
      return _this.req.request("otc/symbols");
    };
    /** Returns an array of sectors. */


    this.sectors = function () {
      return _this.req.request("sectors");
    };

    this.req = req;
  }

  return ReferenceData;
}();

exports.default = ReferenceData;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/request.js":
/*!****************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/request.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var IEXRequest =
/** @class */
function () {
  function IEXRequest(fetchFunc, _a) {
    var _this = this;

    var publishable = _a.publishable,
        _b = _a.sandbox,
        sandbox = _b === void 0 ? false : _b,
        _c = _a.version,
        version = _c === void 0 ? "beta" : _c;

    this.setToken = function (token) {
      return _this.sandbox && token[0] !== "T" ? "T" + token : token;
    };

    this.params = function (params) {
      if (params === void 0) {
        params = "";
      }

      var env = _this.sandbox ? "sandbox" : "cloud";
      var url = "https://" + env + ".iexapis.com/" + _this.version + "/" + _this.datatype;
      var operand = params.match(new RegExp("\\?", "g"));
      var q = operand && operand[0] === "?" ? "&" : "?";

      var pk = "token=" + _this.setToken(_this.publishable);

      var request = url + "/" + _this.stockSymbol + "/" + params + q + pk;

      if (_this.datatype === "deep") {
        var request_1 = url + "/" + params + "?symbols=" + _this.stockSymbol + "&" + pk;
        _this.datatype = "stock";
        _this.sandbox;
        return request_1;
      }

      if (_this.datatype === "stock/market/batch") {
        var request_2 = url + "?symbols=" + _this.stockSymbols.map(function (symbol) {
          return symbol;
        }) + "&types=" + params + "&" + pk;
        _this.datatype = "stock";
        _this.sandbox;
        return request_2;
      }

      if (_this.datatype === "crypto") {
        var request_3 = url + "/" + _this.cryptoCurrency + "/" + params + q + pk;
        _this.datatype = "stock";
        _this.sandbox;
        return request_3;
      }

      if (_this.datatype === "tops" || _this.datatype === "stock/market" || _this.datatype === "fx" || _this.datatype === "stats" || _this.datatype === "search" || _this.datatype === "time-series" || _this.datatype === "ref-data") {
        var request_4 = url + "/" + params + q + pk;
        _this.datatype = "stock";
        _this.sandbox;
        return request_4;
      }

      _this.sandbox;
      return request;
    };

    this.batchParams = function () {
      var types = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        types[_i] = arguments[_i];
      }

      var env = _this.sandbox ? "sandbox" : "cloud";
      var url = "https://" + env + ".iexapis.com/" + _this.version + "/" + _this.datatype;

      var symbols = "" + _this.stockSymbols.map(function (symbol) {
        return symbol;
      });

      var batchTypes = "types=" + types.map(function (type) {
        return type;
      }) + "&token=" + _this.setToken(_this.publishable);

      var request;

      if (_this.datatype === "stock/market/batch") {
        request = url + "/batch?symbols=" + symbols + "&" + batchTypes;
        _this.datatype = "stock";
        _this.sandbox;
        return request;
      }

      request = url + "/" + _this.stockSymbol + "/batch?" + batchTypes;
      _this.sandbox;
      return request;
    };

    this.request = function (params) {
      return _this.response(_this.params, params);
    };

    this.response = function (req, params, range) {
      return __awaiter(_this, void 0, void 0, function () {
        var n, res, contentType, error, err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 6,, 7]);

              n = range ? range : "";
              return [4
              /*yield*/
              , this.fetchFunc(req(params + n))];

            case 1:
              res = _a.sent();
              if (!(typeof res.headers.get === "function")) return [3
              /*break*/
              , 5];
              contentType = res.headers.get("content-type");
              if (!(contentType === "application/json; charset=utf-8")) return [3
              /*break*/
              , 3];
              return [4
              /*yield*/
              , res.json()];

            case 2:
              return [2
              /*return*/
              , _a.sent()];

            case 3:
              if (!(res.status >= 400)) return [3
              /*break*/
              , 5];
              return [4
              /*yield*/
              , res.text()];

            case 4:
              error = _a.sent();
              throw new Error(error);

            case 5:
              return [2
              /*return*/
              , res.data];

            case 6:
              err_1 = _a.sent();
              return [2
              /*return*/
              , err_1.response ? err_1.response.data : err_1];

            case 7:
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    this.fetchFunc = fetchFunc, this.publishable = publishable, this.version = version, this.sandbox = sandbox, this.datatype = "stock", this.cryptoCurrency = "", this.stockSymbol = "", this.stockSymbols = [], this.request = this.request;
  }

  return IEXRequest;
}();

exports.default = IEXRequest;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/stats.js":
/*!**************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/stats.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Statistics =
/** @class */
function () {
  function Statistics(req) {
    var _this = this;
    /** Returns daily stats for a given time frame */


    this.historical = function (date) {
      return _this.req.request("historical/" + (date ? "/" + date : ""));
    };

    this.intraday = function () {
      return _this.req.request("intraday");
    };

    this.recent = function () {
      return _this.req.request("recent");
    };

    this.records = function () {
      return _this.req.request("records");
    };

    this.req = req;
  }

  return Statistics;
}();

exports.default = Statistics;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/stock.js":
/*!**************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/stock.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var deep_1 = __webpack_require__(/*! ./deep */ "./node_modules/node-iex-cloud/lib/deep.js");

var timeSeries_1 = __webpack_require__(/*! ./timeSeries */ "./node_modules/node-iex-cloud/lib/timeSeries.js");

var forex_1 = __webpack_require__(/*! ./forex */ "./node_modules/node-iex-cloud/lib/forex.js");

var batch_1 = __webpack_require__(/*! ./batch */ "./node_modules/node-iex-cloud/lib/batch.js");

var Stock =
/** @class */
function () {
  function Stock(req) {
    var _this = this;
    /** returns balance sheet data. Available quarterly or annually with the default being the last available quarter
     * `Data Weight: 3000`
     */


    this.balanceSheet = function (period, last) {
      return _this.req.request("balance-sheet" + (period ? "?period=" + period : "") + (last ? "&last=" + last : ""));
    };
    /** batch returns multipe data-types for a give stock symbol */
    // public batch = (...params: any): Promise<any> => {
    //   return this.req.response(this.req.batchParams, params);
    // };

    /** batch returns multipe data-types for a give stock symbol */


    this.batch = function () {
      return _this.iexBatch;
    };

    this.deep = function () {
      _this.req.datatype = "deep";
      return _this.iexDeep;
    };

    this.timeSeries = function () {
      _this.req.datatype = "time-series";
      return _this.timeseries;
    };

    this.forex = function () {
      _this.req.datatype = "fx";
      return _this.iexForex;
    };
    /**
     * returns book value for a given stock
     * `Data Weight: 1 per quote returned`
     */


    this.book = function () {
      return _this.req.request("book");
    };
    /** TOPS provides IEX’s aggregated best quoted bid and offer position in near real time for all securities on IEX’s displayed limit order book. TOPS is ideal for developers needing both quote and trade data. */


    this.tops = function () {
      _this.req.datatype = "tops";
      return _this.req.request(_this.req.stockSymbols ? "?symbols=" + _this.req.stockSymbols : "");
    };
    /**
     * Returns adjusted and unadjusted historical data for up to 15 years.
     * `Data Weight: 1,000 per symbol per period`
     */


    this.chart = function (range, params) {
      // if range is 'date' & there's a 'date' param
      if (range === "date" && params && params.date) {
        var keys_1 = Object.keys(params);
        var paramsString = keys_1.length > 1 ? "?" + keys_1.reduce(function (str, key, i) {
          if (key !== "date") {
            return "" + str + key + "=" + params[key] + (i < keys_1.length - 1 ? "&" : "");
          }

          return str;
        }, "") : "";
        return _this.req.request("chart/" + range + "/" + params.date + paramsString);
      } // in any other case


      var values = params && Object.entries(params);
      return _this.req.request("chart/" + range + (params ? "?" + values.map(function (v) {
        return v[0] + "=" + v[1];
      }).join("&") : ""));
    };
    /**
     * returns cash flow data. Available quarterly or annually, with the default being the last available quarter.
     *
     * `Data Weight: 1,000 per symbol per period`
     */


    this.cashFlow = function (period, last) {
      if (period === void 0) {
        period = "quarterly";
      }

      return _this.req.request("cash-flow?period=" + period + "&last=" + last);
    };
    /** returns Ceo Compensation */


    this.ceoCompensation = function () {
      return _this.req.request("ceo-compensation");
    };
    /** returns data on a given company
     *  `Data Weight: 1 per symbol`
     */


    this.company = function () {
      return _this.req.request("company");
    };
    /**
     *  `Data Weight: 1 per symbol per quote`
     */


    this.delayedQuote = function () {
      return _this.req.request("delayed-quote");
    };
    /**
     * `Data Weight: 10 per symbol per period returned`
     */


    this.dividends = function (range) {
      return _this.req.request("dividends" + (range ? "/" + range : ""));
    };
    /** Returns earnings data for a given company including the actual EPS, consensus, and fiscal period. Earnings are available quarterly (last 4 quarters).
     *  `Data Weight: 1000 per symbol per period`
     */


    this.earnings = function (last, field) {
      return _this.req.request("earnings" + (last ? "/" + last : "") + (field ? "/" + field : ""));
    };
    /** Provides the latest consensus estimate for the next fiscal period */


    this.estimates = function () {
      return _this.req.request("estimates");
    };
    /** Pulls income statement, balance sheet, and cash flow data from the most recent reported quarter. */


    this.financials = function (period) {
      if (period === void 0) {
        period = "quarterly";
      }

      return _this.req.request("financials?period=" + period);
    };
    /** Returns latest news for a give stock symbol */


    this.news = function (last) {
      if (last === void 0) {
        last = 10;
      }

      return _this.req.request("news/last/" + last);
    };
    /**
     * Returns the top 10 fund holders, meaning any firm not defined as buy-side or sell-side such as mutual funds, pension funds, endowments, investment firms, and other large entities that manage funds on behalf of others.
     */


    this.fundOwnership = function () {
      return _this.req.request("fund-ownership");
    };
    /** Pulls income statement data. Available quarterly or annually with the default being the last available quarter. */


    this.income = function (period, last) {
      return _this.req.request("income" + (period ? "?period=" + period : "") + (last ? "&last=" + last : ""));
    };
    /** Returns the top 10 insiders, with the most recent information. */


    this.insiderRoster = function () {
      return _this.req.request("insider-roster");
    };
    /** Returns aggregated insiders summary data for the last 6 months. */


    this.insiderSummary = function () {
      return _this.req.request("insider-summary");
    };
    /** Returns insider transactions. */


    this.insiderTransactions = function () {
      return _this.req.request("insider-transactions");
    };
    /**
    Returns the top 10 institutional holders, defined as buy-side or sell-side firms. */


    this.institutionalOwnership = function () {
      return _this.req.request("institutional-ownership");
    };
    /** This endpoint will return aggregated intraday prices in one minute buckets */


    this.intradayPrices = function () {
      return _this.req.request("intraday-prices");
    };
    /** This is a helper function, but the google APIs url is standardized.  */


    this.logo = function () {
      return _this.req.request("logo");
    };
    /**  This returns 15 minute delayed, last sale eligible trades. */


    this.largestTrades = function () {
      return _this.req.request("largest-trades");
    };
    /** Returns end of day options data */


    this.options = function (expiration, optionSide) {
      if (expiration === void 0) {
        expiration = "";
      }

      return _this.req.request("options" + (expiration ? "/" + expiration : "") + (optionSide ? "/" + optionSide : ""));
    };
    /** Returns peer group */


    this.peers = function () {
      return _this.req.request("peers");
    };
    /** Returns previous day adjusted price data for one or more stocks. */


    this.previous = function () {
      return _this.req.request("previous");
    };
    /** Returns price of a stock */


    this.price = function () {
      return _this.req.request("price");
    };
    /** Provides the latest avg, high, and low analyst price target for a symbol. */


    this.priceTarget = function () {
      return _this.req.request("price-target");
    };
    /** Returns the official open and close for a give symbol. The official open is available as soon as 9:45am ET and the official close as soon as 4:15pm ET. Some stocks can report late open or close prices. */


    this.ohlc = function () {
      return _this.req.request("ohlc");
    };
    /**
    This endpoint provides social sentiment data from StockTwits. Data can be viewed as a daily value, or by minute for a given date. */


    this.sentiment = function (type, date) {
      if (type === void 0) {
        type = "daily";
      }

      if (date === void 0) {
        date = null;
      }

      return _this.req.request("sentiment/" + type + (date ? "/" + date : ""));
    };

    this.quote = function (field) {
      if (field === void 0) {
        field = "";
      }

      return _this.req.request("quote/" + (field ? field : ""));
    };
    /** Pulls data from the last four months. */


    this.recommendationTrends = function () {
      return _this.req.request("recommendation-trends");
    };

    this.stats = function (stat) {
      if (stat === void 0) {
        stat = "";
      }

      return _this.req.request("stats/" + stat);
    };

    this.upcomingEvents = function () {
      return _this.req.request("upcoming-events");
    };

    this.upcomingEarnings = function () {
      return _this.req.request("upcoming-earnings");
    };

    this.upcomingDividends = function () {
      return _this.req.request("upcoming-dividends");
    };

    this.upcomingSplits = function () {
      return _this.req.request("upcoming-splits");
    };

    this.upcomingIPOs = function () {
      return _this.req.request("upcoming-ipos");
    };

    this.splits = function (range) {
      if (range === void 0) {
        range = "1m";
      }

      return _this.req.request("splits/" + range);
    };

    this.shortInterest = function (date) {
      if (date === void 0) {
        date = "";
      }

      return _this.req.request("short-interest/" + date);
    };
    /** This returns 15 minute delayed and 30 day average consolidated volume percentage of a stock, by market. This call will always return 13 values, and will be sorted in ascending order by current day trading volume percentage. */


    this.volumeByVenue = function () {
      return _this.req.request("volume-by-venue");
    };

    this.req = req;
    this.iexDeep = new deep_1.default(req);
    this.timeseries = new timeSeries_1.default(req);
    this.iexForex = new forex_1.default(req);
    this.iexBatch = new batch_1.default(req);
  }

  return Stock;
}();

exports.default = Stock;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/stocks.js":
/*!***************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/stocks.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var forex_1 = __webpack_require__(/*! ./forex */ "./node_modules/node-iex-cloud/lib/forex.js");

var batch_1 = __webpack_require__(/*! ./batch */ "./node_modules/node-iex-cloud/lib/batch.js");

var Stocks =
/** @class */
function () {
  function Stocks(req) {
    var _this = this;
    /** returns balance sheet data. Available quarterly or annually with the default being the last available quarter
     * `Data Weight: 3000`
     */


    this.balanceSheet = function () {
      return _this.req.request("balance-sheet");
    };
    /** batch returns multipe data-types for a give stock symbol */


    this.batch = function () {
      return new batch_1.default(_this.req);
    };

    this.forex = function () {
      _this.req.datatype = "fx";
      return new forex_1.default(_this.req);
    };
    /**
     * returns book value for a given stock
     * `Data Weight: 1 per quote returned`
     */


    this.book = function () {
      return _this.req.request("book");
    };
    /**
     * Returns adjusted and unadjusted historical data for up to 15 years.
     * `Data Weight: 1,000 per symbol per period`
     */


    this.chart = function () {
      return _this.req.request("chart");
    };
    /**
     * returns cash flow data. Available quarterly or annually, with the default being the last available quarter.
     * `Data Weight: 1,000 per symbol per period`
     */


    this.cashFlow = function () {
      return _this.req.request("cash-flow");
    };
    /** returns Ceo Compensation */


    this.ceoCompensation = function () {
      return _this.req.request("ceo-compensation");
    };
    /** returns data on a given company
     *  `Data Weight: 1 per symbol` */


    this.company = function () {
      return _this.req.request("company");
    };
    /**
     *  `Data Weight: 1 per symbol per quote`
     */


    this.delayedQuote = function () {
      return _this.req.request("delayed-quote");
    };
    /**
     * `Data Weight: 10 per symbol per period returned`
     */


    this.dividends = function () {
      return _this.req.request("dividends");
    };
    /** Returns earnings data for a given company including the actual EPS, consensus, and fiscal period. Earnings are available quarterly (last 4 quarters).
     *  `Data Weight: 1000 per symbol per period`
     */


    this.earnings = function () {
      return _this.req.request("earnings");
    };
    /** Provides the latest consensus estimate for the next fiscal period */


    this.estimates = function () {
      return _this.req.request("estimates");
    };
    /** Pulls income statement, balance sheet, and cash flow data from the most recent reported quarter. */


    this.financials = function () {
      return _this.req.request("financials");
    };
    /** Returns latest news for a give stock symbol */


    this.news = function () {
      return _this.req.request("news");
    };
    /**
     * Returns the top 10 fund holders, meaning any firm not defined as buy-side or sell-side such as mutual funds, pension funds, endowments, investment firms, and other large entities that manage funds on behalf of others.
     */


    this.fundOwnership = function () {
      return _this.req.request("fund-ownership");
    };
    /** Pulls income statement data. Available quarterly or annually with the default being the last available quarter. */


    this.income = function () {
      return _this.req.request("income");
    };
    /** Returns the top 10 insiders, with the most recent information. */


    this.insiderRoster = function () {
      return _this.req.request("insider-roster");
    };
    /** Returns aggregated insiders summary data for the last 6 months. */


    this.insiderSummary = function () {
      return _this.req.request("insider-summary");
    };
    /** Returns insider transactions. */


    this.insiderTransactions = function () {
      return _this.req.request("insider-transactions");
    };
    /**
    Returns the top 10 institutional holders, defined as buy-side or sell-side firms. */


    this.institutionalOwnership = function () {
      return _this.req.request("institutional-ownership");
    };
    /** This endpoint will return aggregated intraday prices in one minute buckets */


    this.intradayPrices = function () {
      return _this.req.request("intraday-prices");
    };
    /** This is a helper function, but the google APIs url is standardized.  */


    this.logo = function () {
      return _this.req.request("logo");
    };
    /**  This returns 15 minute delayed, last sale eligible trades. */


    this.largestTrades = function () {
      return _this.req.request("largest-trades");
    };
    /** Returns end of day options data */


    this.options = function () {
      return _this.req.request("options");
    };
    /** Returns peer group */


    this.peers = function () {
      return _this.req.request("peers");
    };
    /** Returns previous day adjusted price data for one or more stocks. */


    this.previous = function () {
      return _this.req.request("previous");
    };
    /** Returns price of a stock */


    this.price = function () {
      return _this.req.request("price");
    };
    /** Provides the latest avg, high, and low analyst price target for a symbol. */


    this.priceTarget = function () {
      return _this.req.request("price-target");
    };
    /** Returns the official open and close for a give symbol. The official open is available as soon as 9:45am ET and the official close as soon as 4:15pm ET. Some stocks can report late open or close prices. */


    this.ohlc = function () {
      return _this.req.request("ohlc");
    };
    /**
      This endpoint provides social sentiment data from StockTwits. Data can be viewed as a daily value, or by minute for a given date. */


    this.sentiment = function () {
      return _this.req.request("sentiment");
    };

    this.quote = function () {
      return _this.req.request("quote");
    };
    /** Pulls data from the last four months. */


    this.recommendationTrends = function () {
      return _this.req.request("recommendation-trends");
    };

    this.stats = function () {
      return _this.req.request("stats");
    };

    this.upcomingEvents = function () {
      return _this.req.request("upcoming-events");
    };

    this.upcomingEarnings = function () {
      return _this.req.request("upcoming-earnings");
    };

    this.upcomingDividends = function () {
      return _this.req.request("upcoming-dividends");
    };

    this.upcomingSplits = function () {
      return _this.req.request("upcoming-splits");
    };

    this.upcomingIPOs = function () {
      return _this.req.request("upcoming-ipos");
    };

    this.splits = function () {
      return _this.req.request("splits");
    };

    this.shortInterest = function () {
      return _this.req.request("short-interest");
    };
    /** This returns 15 minute delayed and 30 day average consolidated volume percentage of a stock, by market. This call will always return 13 values, and will be sorted in ascending order by current day trading volume percentage. */


    this.volumeByVenue = function () {
      return _this.req.request("volume-by-venue");
    };

    this.req = req;
  }

  return Stocks;
}();

exports.default = Stocks;

/***/ }),

/***/ "./node_modules/node-iex-cloud/lib/timeSeries.js":
/*!*******************************************************!*\
  !*** ./node_modules/node-iex-cloud/lib/timeSeries.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var TimeSeries =
/** @class */
function () {
  function TimeSeries(req) {
    this.req = req;
    this.p = "PREMIUM_WALLSTREETHORIZON_";
  }
  /** This is a meeting where company executives provide information about the company’s performance and its future prospects. */


  TimeSeries.prototype.analystDay = function (refId) {
    return this.req.request(this.p + "ANALYST_DAY/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.boardOfDirectorsMeeting = function (refId) {
    return this.req.request(this.p + "BOARD_OF_DIRECTORS_MEETING/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.businessUpdate = function (refId) {
    return this.req.request(this.p + "BUSINESS_UPDATE/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.buyBack = function (refId) {
    return this.req.request(this.p + "BUYBACK/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.capitalMarketsDay = function (refId) {
    return this.req.request(this.p + "CAPITAL_MARKETS_DAY/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedDistribution = function (refId) {
    return this.req.request("advanced_distribution/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedDividends = function (refId) {
    return this.req.request("advanced_dividends/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedReturnOnCapital = function (refId) {
    return this.req.request("advanced_return_of_capital/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedRights = function (refId) {
    return this.req.request("advanced_rights/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedRightsToPurchase = function (refId) {
    return this.req.request("advanced_right_to_purchase/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedSecurityReclassification = function (refId) {
    return this.req.request("advanced_security_reclassification/" + this.req.stockSymbol + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedSecuritySwap = function (refId) {
    return this.req.request("advanced_security_swap/" + this.req.stockSymbol + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedSpinOff = function (refId) {
    return this.req.request("advanced_spinoff/" + this.req.stockSymbol + "/" + (refId ? refId : ""));
  };

  TimeSeries.prototype.advancedSplits = function (refId) {
    return this.req.request("advanced_splits/" + (this.req.stockSymbol || this.req.stockSymbols) + "/" + (refId ? refId : ""));
  };

  return TimeSeries;
}();

exports.default = TimeSeries;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var node_iex_cloud__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-iex-cloud */ "./node_modules/node-iex-cloud/lib/index.js");
/* harmony import */ var node_iex_cloud__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_iex_cloud__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var iex = new node_iex_cloud__WEBPACK_IMPORTED_MODULE_0__["IEXCloudClient"](fetch, {
  sandbox: true,
  publishable: "pk_16c53f86dc16458ea7482e9a864f0a99",
  version: "stable"
});
axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('https://cloud.iexapis.com/stable/stock/SQ/chart/1m?&filter=changePercent,date&token=pk_16c53f86dc16458ea7482e9a864f0a99').then(function (response) {
  var monday = ["2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22"];
  var tuesday = ["2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23"];
  var wednesday = ["2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24"];
  var thursday = ["2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25"];
  var friday = ["2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26"];
  var mondayChange = 0;
  var tuesdayChange = 0;
  var wednesdayChange = 0;
  var thursdayChange = 0;
  var fridayChange = 0;
  var mondayCount = 0;
  var mondayMonthlyTotal = 0;
  var sqData = response.data;
  sqData.forEach(function (el) {
    var dailyChange = el.changePercent;
    var quoteDate = el.date;

    if (monday.includes(el.date)) {
      mondayCount += 1;
      mondayChange += dailyChange;
      console.log(dailyChange, el.date);
    }
  });
});
var monday = ["2020-06-01", "2020-06-08", "2020-06-15", "2020-06-22"];
var tuesday = ["2020-06-02", "2020-06-09", "2020-06-16", "2020-06-23"];
var wednesday = ["2020-06-03", "2020-06-10", "2020-06-17", "2020-06-24"];
var thursday = ["2020-06-04", "2020-06-11", "2020-06-18", "2020-06-25"];
var friday = ["2020-06-05", "2020-06-12", "2020-06-19", "2020-06-26"];
var mondayChange = 0;
var tuesdayChange = 0;
var wednesdayChange = 0;
var thursdayChange = 0;
var fridayChange = 0;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9iYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2NyeXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2RhdGFQb2ludHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9kZWVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvZm9yZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9pZXhDbG91ZENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvbWFya2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvcmVmZXJlbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL3N0YXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvc3RvY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9zdG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi90aW1lU2VyaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlleCIsIklFWENsb3VkQ2xpZW50IiwiZmV0Y2giLCJzYW5kYm94IiwicHVibGlzaGFibGUiLCJ2ZXJzaW9uIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJtb25kYXkiLCJ0dWVzZGF5Iiwid2VkbmVzZGF5IiwidGh1cnNkYXkiLCJmcmlkYXkiLCJtb25kYXlDaGFuZ2UiLCJ0dWVzZGF5Q2hhbmdlIiwid2VkbmVzZGF5Q2hhbmdlIiwidGh1cnNkYXlDaGFuZ2UiLCJmcmlkYXlDaGFuZ2UiLCJtb25kYXlDb3VudCIsIm1vbmRheU1vbnRobHlUb3RhbCIsInNxRGF0YSIsImRhdGEiLCJmb3JFYWNoIiwiZWwiLCJkYWlseUNoYW5nZSIsImNoYW5nZVBlcmNlbnQiLCJxdW90ZURhdGUiLCJkYXRlIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjs7QUFFdkMsZUFBZSxtQkFBTyxDQUFDLDJFQUF1Qjs7QUFFOUMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXVCOztBQUVuRCxtQkFBbUIsbUJBQU8sQ0FBQyxtRkFBMkI7O0FBRXRELHNCQUFzQixtQkFBTyxDQUFDLHlGQUE4Qjs7QUFFNUQsa0JBQWtCLG1CQUFPLENBQUMseUVBQXFCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFF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QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUMvV2E7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7Ozs7QUNsUWE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQseUI7Ozs7Ozs7Ozs7OztBQ2xDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELDZCOzs7Ozs7Ozs7Ozs7QUM1QmE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsdUI7Ozs7Ozs7Ozs7OztBQzNFYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCx3Qjs7Ozs7Ozs7Ozs7O0FDL0NhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVELGVBQWUsbUJBQU8sQ0FBQyw2REFBVTs7QUFFakMsY0FBYyxtQkFBTyxDQUFDLDJEQUFTOztBQUUvQixlQUFlLG1CQUFPLENBQUMsNkRBQVU7O0FBRWpDLGVBQWUsbUJBQU8sQ0FBQyw2REFBVTs7QUFFakMsa0JBQWtCLG1CQUFPLENBQUMsbUVBQWE7O0FBRXZDLG1CQUFtQixtQkFBTyxDQUFDLHFFQUFjOztBQUV6QyxtQkFBbUIsbUJBQU8sQ0FBQyxxRUFBYzs7QUFFekMsY0FBYyxtQkFBTyxDQUFDLDJEQUFTOztBQUUvQixnQkFBZ0IsbUJBQU8sQ0FBQywrREFBVzs7QUFFbkMsY0FBYyxtQkFBTyxDQUFDLDJEQUFTOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxpQzs7Ozs7Ozs7Ozs7O0FDL0hhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVELHVCQUF1QixtQkFBTyxDQUFDLDZFQUFrQjs7QUFFakQ7QUFDQSwyQzs7Ozs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCx5Qjs7Ozs7Ozs7Ozs7O0FDaEVhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELGdDOzs7Ozs7Ozs7Ozs7QUNqRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELDZCOzs7Ozs7Ozs7Ozs7QUN4VGE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsNkI7Ozs7Ozs7Ozs7OztBQ3BDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxhQUFhLG1CQUFPLENBQUMseURBQVE7O0FBRTdCLG1CQUFtQixtQkFBTyxDQUFDLHFFQUFjOztBQUV6QyxjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CLGNBQWMsbUJBQU8sQ0FBQywyREFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87OztBQUdQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7Ozs7QUN4V2E7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQsY0FBYyxtQkFBTyxDQUFDLDJEQUFTOztBQUUvQixjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQseUI7Ozs7Ozs7Ozs7OztBQy9RYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCw2Qjs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FB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QXJCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLENBQW5CLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xuXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcblxudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcblxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcblxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG5cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpOyAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7IC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcblxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuXG5cbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG5cblxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuXG5cbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcblxuXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIHRpbWVvdXRcblxuXG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuXG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cblxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7IC8vIEFkZCB4c3JmIGhlYWRlclxuXG5cbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgPyBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH0gLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcblxuXG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9IC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9IC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9IC8vIFNlbmQgdGhlIHJlcXVlc3RcblxuXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xuXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTsgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcblxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7IC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn0gLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5cblxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpOyAvLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcblxuYXhpb3MuQXhpb3MgPSBBeGlvczsgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTsgLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5cblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7IC8vIEV4cG9zZSBhbGwvc3ByZWFkXG5cbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBheGlvczsgLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvczsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuXG5cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcblxudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG5cbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5cblxuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuXG5cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTsgLy8gU2V0IGNvbmZpZy5tZXRob2RcblxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH0gLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuXG5cbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07IC8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xuXG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBBeGlvczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcblxudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xuXG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTsgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShjb25maWcuZGF0YSwgY29uZmlnLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0KTsgLy8gRmxhdHRlbiBoZWFkZXJzXG5cbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LCBjb25maWcuaGVhZGVycyk7XG4gIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICB9KTtcbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZWFzb24ucmVzcG9uc2UuZGF0YSwgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuXG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBlcnJvcjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbJ2Jhc2VVUkwnLCAndXJsJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJywgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLCAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJ107XG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cykuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKTtcbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdC5rZXlzKGNvbmZpZzIpLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIGZ1bmN0aW9uIG90aGVyS2V5c0RlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbmZpZztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG5cbiAgaWYgKCF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmNvbmZpZywgbnVsbCwgcmVzcG9uc2UucmVxdWVzdCwgcmVzcG9uc2UpKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuXG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fCB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8IHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8IHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8IHV0aWxzLmlzRmlsZShkYXRhKSB8fCB1dGlscy5pc0Jsb2IoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogSWdub3JlICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0czsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5yZXBsYWNlKC8lNDAvZ2ksICdAJykucmVwbGFjZSgvJTNBL2dpLCAnOicpLnJlcGxhY2UoLyUyNC9nLCAnJCcpLnJlcGxhY2UoLyUyQy9naSwgJywnKS5yZXBsYWNlKC8lMjAvZywgJysnKS5yZXBsYWNlKC8lNUIvZ2ksICdbJykucmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkwgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJykgOiBiYXNlVVJMO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID8gLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiB7XG4gICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gbWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID8gLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4vLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbmZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIHZhciBvcmlnaW5VUkw7XG4gIC8qKlxuICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICovXG5cbiAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgIGlmIChtc2llKSB7XG4gICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgIH1cblxuICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpOyAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG5cbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICBwYXRobmFtZTogdXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycgPyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6ICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgfTtcbiAgfVxuXG4gIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAvKipcbiAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAqL1xuXG4gIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgIHZhciBwYXJzZWQgPSB1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgIHJldHVybiBwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJiBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3Q7XG4gIH07XG59KCkgOiAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTsgLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcblxuXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJywgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLCAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXTtcbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykge1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBwYXJzZWQ7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgdmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fCBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfSAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcblxuXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5cblxuZnVuY3Rpb24gbWVyZ2UoKVxuLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovXG57XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBkZWVwTWVyZ2UoKVxuLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovXG57XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuXG5cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZGVlcE1lcmdlOiBkZWVwTWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQmF0Y2ggPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCYXRjaChyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiByZXR1cm5zIGJhbGFuY2Ugc2hlZXQgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyXG4gICAgICogYERhdGEgV2VpZ2h0OiAzMDAwYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmJhbGFuY2VTaGVldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImJhbGFuY2Utc2hlZXRcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBib29rIHZhbHVlIGZvciBhIGdpdmVuIHN0b2NrXG4gICAgICogYERhdGEgV2VpZ2h0OiAxIHBlciBxdW90ZSByZXR1cm5lZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5ib29rID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiYm9va1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGNhc2ggZmxvdyBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5LCB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyLlxuICAgICAqIGBEYXRhIFdlaWdodDogMSwwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNhc2hGbG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiY2FzaC1mbG93XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWRqdXN0ZWQgYW5kIHVuYWRqdXN0ZWQgaGlzdG9yaWNhbCBkYXRhIGZvciB1cCB0byAxNSB5ZWFycy5cbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEsMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jaGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImNoYXJ0XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5jZW9Db21wZW5zYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJjZW8tY29tcGVuc2F0aW9uXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiByZXR1cm5zIGRhdGEgb24gYSBnaXZlbiBjb21wYW55XG4gICAgICogIGBEYXRhIFdlaWdodDogMSBwZXIgc3ltYm9sYCAqL1xuXG5cbiAgICB0aGlzLmNvbXBhbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJjb21wYW55XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxheWVkUXVvdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJkZWxheWVkLXF1b3RlXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5kaXZpZGVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJkaXZpZGVuZHNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZWFybmluZ3MgZGF0YSBmb3IgYSBnaXZlbiBjb21wYW55IGluY2x1ZGluZyB0aGUgYWN0dWFsIEVQUywgY29uc2Vuc3VzLCBhbmQgZmlzY2FsIHBlcmlvZC4gRWFybmluZ3MgYXJlIGF2YWlsYWJsZSBxdWFydGVybHkgKGxhc3QgNCBxdWFydGVycykuXG4gICAgICovXG5cblxuICAgIHRoaXMuZWFybmluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJlYXJuaW5nc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUHJvdmlkZXMgdGhlIGxhdGVzdCBjb25zZW5zdXMgZXN0aW1hdGUgZm9yIHRoZSBuZXh0IGZpc2NhbCBwZXJpb2QgKi9cblxuXG4gICAgdGhpcy5lc3RpbWF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJlc3RpbWF0ZXNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGluY29tZSBzdGF0ZW1lbnQsIGJhbGFuY2Ugc2hlZXQsIGFuZCBjYXNoIGZsb3cgZGF0YSBmcm9tIHRoZSBtb3N0IHJlY2VudCByZXBvcnRlZCBxdWFydGVyLiAqL1xuXG5cbiAgICB0aGlzLmZpbmFuY2lhbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJmaW5hbmNpYWxzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGxhdGVzdCBuZXdzIGZvciBhIGdpdmUgc3RvY2sgc3ltYm9sICovXG5cblxuICAgIHRoaXMubmV3cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcIm5ld3NcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdG9wIDEwIGZ1bmQgaG9sZGVycywgbWVhbmluZyBhbnkgZmlybSBub3QgZGVmaW5lZCBhcyBidXktc2lkZSBvciBzZWxsLXNpZGUgc3VjaCBhcyBtdXR1YWwgZnVuZHMsIHBlbnNpb24gZnVuZHMsIGVuZG93bWVudHMsIGludmVzdG1lbnQgZmlybXMsIGFuZCBvdGhlciBsYXJnZSBlbnRpdGllcyB0aGF0IG1hbmFnZSBmdW5kcyBvbiBiZWhhbGYgb2Ygb3RoZXJzLlxuICAgICAqL1xuXG5cbiAgICB0aGlzLmZ1bmRPd25lcnNoaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJmdW5kLW93bmVyc2hpcFwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgaW5jb21lIHN0YXRlbWVudCBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5IHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXIuICovXG5cblxuICAgIHRoaXMuaW5jb21lID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiaW5jb21lXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHRoZSB0b3AgMTAgaW5zaWRlcnMsIHdpdGggdGhlIG1vc3QgcmVjZW50IGluZm9ybWF0aW9uLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJSb3N0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJpbnNpZGUtcm9zdGVyXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFnZ3JlZ2F0ZWQgaW5zaWRlcnMgc3VtbWFyeSBkYXRhIGZvciB0aGUgbGFzdCA2IG1vbnRocy4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyU3VtbWFyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImluc2lkZS1zdW1tYXJ5XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5pbnNpZGVyVHJhbnNhY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiaW5zaWRlLXRyYW5zYWN0aW9uc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICBSZXR1cm5zIHRoZSB0b3AgMTAgaW5zdGl0dXRpb25hbCBob2xkZXJzLCBkZWZpbmVkIGFzIGJ1eS1zaWRlIG9yIHNlbGwtc2lkZSBmaXJtcy4gKi9cblxuXG4gICAgdGhpcy5pbnN0aXR1dGlvbmFsT3duZXJzaGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiaW5zdGl0dXRpb25hbE93bmVyc2hpcFwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogVGhpcyBpcyBhIGhlbHBlciBmdW5jdGlvbiwgYnV0IHRoZSBnb29nbGUgQVBJcyB1cmwgaXMgc3RhbmRhcmRpemVkLiAgKi9cblxuXG4gICAgdGhpcy5sb2dvID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wibG9nb1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogVGhpcyBlbmRwb2ludCB3aWxsIHJldHVybiBhZ2dyZWdhdGVkIGludHJhZGF5IHByaWNlcyBpbiBvbmUgbWludXRlIGJ1Y2tldHMgKi9cblxuXG4gICAgdGhpcy5pbnRyYWRheVByaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImludHJhZGF5LXByaWNlc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogIFRoaXMgcmV0dXJucyAxNSBtaW51dGUgZGVsYXllZCwgbGFzdCBzYWxlIGVsaWdpYmxlIHRyYWRlcy4gKi9cblxuXG4gICAgdGhpcy5sYXJnZXN0VHJhZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wibGFyZ2VzdC10cmFkZXNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZW5kIG9mIGRheSBvcHRpb25zIGRhdGEgKi9cblxuXG4gICAgdGhpcy5vcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wib3B0aW9uc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwZWVyIGdyb3VwICovXG5cblxuICAgIHRoaXMucGVlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJwZWVyc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwcmV2aW91cyBkYXkgYWRqdXN0ZWQgcHJpY2UgZGF0YSBmb3Igb25lIG9yIG1vcmUgc3RvY2tzLiAqL1xuXG5cbiAgICB0aGlzLnByZXZpb3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wicHJldmlvdXNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcHJpY2Ugb2YgYSBzdG9jayAqL1xuXG5cbiAgICB0aGlzLnByaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wicHJpY2VcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFByb3ZpZGVzIHRoZSBsYXRlc3QgYXZnLCBoaWdoLCBhbmQgbG93IGFuYWx5c3QgcHJpY2UgdGFyZ2V0IGZvciBhIHN5bWJvbC4gKi9cblxuXG4gICAgdGhpcy5wcmljZVRhcmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInByaWNlLXRhcmdldFwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyB0aGUgb2ZmaWNpYWwgb3BlbiBhbmQgY2xvc2UgZm9yIGEgZ2l2ZSBzeW1ib2wuIFRoZSBvZmZpY2lhbCBvcGVuIGlzIGF2YWlsYWJsZSBhcyBzb29uIGFzIDk6NDVhbSBFVCBhbmQgdGhlIG9mZmljaWFsIGNsb3NlIGFzIHNvb24gYXMgNDoxNXBtIEVULiBTb21lIHN0b2NrcyBjYW4gcmVwb3J0IGxhdGUgb3BlbiBvciBjbG9zZSBwcmljZXMuICovXG5cblxuICAgIHRoaXMub2hsYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcIm9obGNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgcHJvdmlkZXMgc29jaWFsIHNlbnRpbWVudCBkYXRhIGZyb20gU3RvY2tUd2l0cy4gRGF0YSBjYW4gYmUgdmlld2VkIGFzIGEgZGFpbHkgdmFsdWUsIG9yIGJ5IG1pbnV0ZSBmb3IgYSBnaXZlbiBkYXRlLiAqL1xuXG5cbiAgICB0aGlzLnNlbnRpbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInNlbnRpbWVudFwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMucXVvdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJxdW90ZVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgZGF0YSBmcm9tIHRoZSBsYXN0IGZvdXIgbW9udGhzLiAqL1xuXG5cbiAgICB0aGlzLnJlY29tbWVuZGF0aW9uVHJlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wicmVjb21tZW5kYXRpb24tdHJlbmRzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInN0YXRzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5zcGxpdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJzcGxpdHNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFRoaXMgcmV0dXJucyAxNSBtaW51dGUgZGVsYXllZCBhbmQgMzAgZGF5IGF2ZXJhZ2UgY29uc29saWRhdGVkIHZvbHVtZSBwZXJjZW50YWdlIG9mIGEgc3RvY2ssIGJ5IG1hcmtldC4gVGhpcyBjYWxsIHdpbGwgYWx3YXlzIHJldHVybiAxMyB2YWx1ZXMsIGFuZCB3aWxsIGJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgY3VycmVudCBkYXkgdHJhZGluZyB2b2x1bWUgcGVyY2VudGFnZS4gKi9cblxuXG4gICAgdGhpcy52b2x1bWVCeVZlbnVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1widm9sdW1lLWJ5LXZlbnVlXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiByZXR1cm4gYmF0Y2ggcmVxdWVzdHMgdXNpbmcgdGhlIHJhbmdlIG1ldGhvZCAqL1xuXG5cbiAgICB0aGlzLnJhbmdlID0gZnVuY3Rpb24gKHJhbmdlLCBsYXN0KSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlc3BvbnNlKF90aGlzLnJlcS5iYXRjaFBhcmFtcywgX3RoaXMuYmF0Y2hpbmcsIFwiJnJhbmdlPVwiICsgKHJhbmdlID8gcmFuZ2UgOiBcIjFtXCIpICsgXCImbGFzdD1cIiArIChsYXN0ID8gbGFzdCA6IDApKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gICAgdGhpcy5iYXRjaGluZyA9IFtdO1xuICB9XG5cbiAgcmV0dXJuIEJhdGNoO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCYXRjaDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIENyeXB0byA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENyeXB0byhyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5ib29rID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYm9va1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5wcmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByaWNlXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnF1b3RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicXVvdGVcIik7XG4gICAgfTtcblxuICAgIHRoaXMuZXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY3J5cHRvRXZlbnRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBDcnlwdG87XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENyeXB0bzsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIERhdGFQb2ludHMgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBEYXRhUG9pbnRzKHJlcSkge1xuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgRGF0YVBvaW50cy5wcm90b3R5cGUubWFya2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwibWFya2V0L1wiICsgdGhpcy5yZXEuc3RvY2tTeW1ib2wpO1xuICB9O1xuXG4gIERhdGFQb2ludHMucHJvdG90eXBlLnRyZWFzdXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwibWFya2V0L1wiICsgdGhpcy5yZXEuc3RvY2tTeW1ib2wpO1xuICB9O1xuXG4gIERhdGFQb2ludHMucHJvdG90eXBlLmVuZXJneSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImVuZXJneS9cIiArIHRoaXMucmVxLnN0b2NrU3ltYm9sKTtcbiAgfTtcblxuICByZXR1cm4gRGF0YVBvaW50cztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRGF0YVBvaW50czsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIERlZXAgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBEZWVwKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnN5bWJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIlwiKTtcbiAgICB9O1xuICAgIC8qKiBERUVQIGJyb2FkY2FzdHMgYW4gQXVjdGlvbiBJbmZvcm1hdGlvbiBNZXNzYWdlIGV2ZXJ5IG9uZSBzZWNvbmQgYmV0d2VlbiB0aGUgTG9jay1pbiBUaW1lIGFuZCB0aGUgYXVjdGlvbiBtYXRjaCBmb3IgT3BlbmluZyBhbmQgQ2xvc2luZyBBdWN0aW9ucywgYW5kIGR1cmluZyB0aGUgRGlzcGxheSBPbmx5IFBlcmlvZCBmb3IgSVBPLCBIYWx0LCBhbmQgVm9sYXRpbGl0eSBBdWN0aW9ucy4gT25seSBJRVggbGlzdGVkIHNlY3VyaXRpZXMgYXJlIGVsaWdpYmxlIGZvciBJRVggQXVjdGlvbnMuICovXG5cblxuICAgIHRoaXMuYXVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImF1Y3Rpb25cIik7XG4gICAgfTtcblxuICAgIHRoaXMuYm9vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImJvb2tcIik7XG4gICAgfTtcblxuICAgIHRoaXMub3BIYWx0U3RhdHVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib3AtaGFsdC1zdGF0dXNcIik7XG4gICAgfTtcblxuICAgIHRoaXMub2ZmaWNpYWxQcmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9mZmljaWFsLXByaWNlXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlY3VyaXR5RXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzZWN1cml0eS1ldmVudFwiKTtcbiAgICB9O1xuICAgIC8qKiBJbiBhc3NvY2lhdGlvbiB3aXRoIFJ1bGUgMjAxIG9mIFJlZ3VsYXRpb24gU0hPLCB0aGUgU2hvcnQgU2FsZSBQcmljZSBUZXN0IG1lc3NhZ2UgaXMgdXNlZCB0byBpbmRpY2F0ZSB3aGVuIGEgU2hvcnQgU2FsZSBQcmljZSBUZXN0IHJlc3RyaWN0aW9uIGlzIGluIGVmZmVjdCBmb3IgYSBzZWN1cml0eS5cbiAgICAqL1xuXG5cbiAgICB0aGlzLnNzclN0YXR1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNzci1zdGF0dXNcIik7XG4gICAgfTtcbiAgICAvKiogVGhlIFN5c3RlbSBFdmVudCBtZXNzYWdlIGlzIHVzZWQgdG8gaW5kaWNhdGUgZXZlbnRzIHRoYXQgYXBwbHkgdG8gdGhlIG1hcmtldCBvciB0aGUgZGF0YSBmZWVkLiAqL1xuXG5cbiAgICB0aGlzLnN5c3RlbUV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3NyLXN0YXR1c1wiKTtcbiAgICB9O1xuICAgIC8qKiBUcmFkZSByZXBvcnQgbWVzc2FnZXMgYXJlIHNlbnQgd2hlbiBhbiBvcmRlciBvbiB0aGUgSUVYIE9yZGVyIEJvb2sgaXMgZXhlY3V0ZWQgaW4gd2hvbGUgb3IgaW4gcGFydC4gREVFUCBzZW5kcyBhIFRyYWRlIHJlcG9ydCBtZXNzYWdlIGZvciBldmVyeSBpbmRpdmlkdWFsIGZpbGwuICovXG5cblxuICAgIHRoaXMudHJhZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidHJhZGVzXCIpO1xuICAgIH07XG4gICAgLyoqIFRyYWRlIGJyZWFrIG1lc3NhZ2VzIGFyZSBzZW50IHdoZW4gYW4gZXhlY3V0aW9uIG9uIElFWCBpcyBicm9rZW4gb24gdGhhdCBzYW1lIHRyYWRpbmcgZGF5LiBUcmFkZSBicmVha3MgYXJlIHJhcmUgYW5kIG9ubHkgYWZmZWN0IGFwcGxpY2F0aW9ucyB0aGF0IHJlbHkgdXBvbiBJRVggZXhlY3V0aW9uIGJhc2VkIGRhdGEuICovXG5cblxuICAgIHRoaXMudHJhZGVCcmVha3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ0cmFkZS1icmVha3NcIik7XG4gICAgfTtcbiAgICAvKiogVGhlIFRyYWRpbmcgc3RhdHVzIG1lc3NhZ2UgaXMgdXNlZCB0byBpbmRpY2F0ZSB0aGUgY3VycmVudCB0cmFkaW5nIHN0YXR1cyBvZiBhIHNlY3VyaXR5LiBGb3IgSUVYLWxpc3RlZCBzZWN1cml0aWVzLCBJRVggYWN0cyBhcyB0aGUgcHJpbWFyeSBtYXJrZXQgYW5kIGhhcyB0aGUgYXV0aG9yaXR5IHRvIGluc3RpdHV0ZSBhIHRyYWRpbmcgaGFsdCBvciB0cmFkaW5nIHBhdXNlIGluIGEgc2VjdXJpdHkgZHVlIHRvIG5ld3MgZGlzc2VtaW5hdGlvbiBvciByZWd1bGF0b3J5IHJlYXNvbnMuIEZvciBub24tSUVYLWxpc3RlZCBzZWN1cml0aWVzLCBJRVggYWJpZGVzIGJ5IGFueSByZWd1bGF0b3J5IHRyYWRpbmcgaGFsdHMgYW5kIHRyYWRpbmcgcGF1c2VzIGluc3RpdHV0ZWQgYnkgdGhlIHByaW1hcnkgb3IgbGlzdGluZyBtYXJrZXQsIGFzIGFwcGxpY2FibGUuICovXG5cblxuICAgIHRoaXMudHJhZGluZ1N0YXR1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInRyYWRpbmctc3RhdHVzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBEZWVwO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEZWVwOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgRm9yZXggPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGb3JleChyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHByb3ZpZGVzIGFuIGVuZCBvZiBkYXkgZXhjaGFuZ2UgcmF0ZSBvZiBhIGdpdmVuIGN1cnJlbmN5IHBhaXIgKi9cblxuXG4gICAgdGhpcy5yYXRlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicmF0ZS9cIiArIHBhcmFtcy5mcm9tICsgXCIvXCIgKyBwYXJhbXMudG8pO1xuICAgIH07XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgcmV0dXJucyByZWFsLXRpbWUgZm9yZWlnbiBjdXJyZW5jeSBleGNoYW5nZSByYXRlcyBkYXRhIHVwZGF0ZWQgZXZlcnkgMjUwIG1pbGxpc2Vjb25kcy4gKi9cblxuXG4gICAgdGhpcy5sYXRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJsYXRlc3Q/c3ltYm9scz1cIiArIF90aGlzLnJlcS5zdG9ja1N5bWJvbHMpO1xuICAgIH07XG5cbiAgICB0aGlzLmNvbnZlcnQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgIHZhciBhbW91bnQgPSBfYS5hbW91bnQsXG4gICAgICAgICAgc3ltYm9scyA9IF9hLnN5bWJvbHM7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjb252ZXJ0P3N5bWJvbHM9XCIgKyAoc3ltYm9scyA/IHN5bWJvbHMgOiBfdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIChhbW91bnQgPyBcIiZhbW91bnQ9XCIgKyBhbW91bnQgOiBcIlwiKSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlzdG9yaWNhbCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgdmFyIGZyb20gPSBfYS5mcm9tLFxuICAgICAgICAgIHRvID0gX2EudG8sXG4gICAgICAgICAgb24gPSBfYS5vbixcbiAgICAgICAgICBmaXJzdCA9IF9hLmZpcnN0LFxuICAgICAgICAgIGZpbHRlciA9IF9hLmZpbHRlcixcbiAgICAgICAgICBzeW1ib2xzID0gX2Euc3ltYm9scyxcbiAgICAgICAgICBsYXN0ID0gX2EubGFzdDtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImhpc3RvcmljYWw/c3ltYm9scz1cIiArIF90aGlzLnJlcS5zdG9ja1N5bWJvbHMgKyAobGFzdCA/IFwiJmxhc3Q9XCIgKyBsYXN0IDogXCJcIikgKyAoZnJvbSA/IFwiJmZyb209XCIgKyBmcm9tIDogXCJcIikgKyAodG8gPyBcIiZ0bz1cIiArIHRvIDogXCJcIikgKyAob24gPyBcIiZvbj1cIiA6IFwiXCIpICsgKGZpcnN0ID8gXCImZmlyc3Q9XCIgOiBcIlwiKSArIChmaWx0ZXIgPyBcIiZmaWx0ZXI9XCIgKyBmaWx0ZXIgOiBcIlwiKSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIEZvcmV4O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb3JleDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGNyeXB0b18xID0gcmVxdWlyZShcIi4vY3J5cHRvXCIpO1xuXG52YXIgc3RvY2tfMSA9IHJlcXVpcmUoXCIuL3N0b2NrXCIpO1xuXG52YXIgc3RvY2tzXzEgPSByZXF1aXJlKFwiLi9zdG9ja3NcIik7XG5cbnZhciBtYXJrZXRfMSA9IHJlcXVpcmUoXCIuL21hcmtldFwiKTtcblxudmFyIHJlZmVyZW5jZV8xID0gcmVxdWlyZShcIi4vcmVmZXJlbmNlXCIpO1xuXG52YXIgZGF0YVBvaW50c18xID0gcmVxdWlyZShcIi4vZGF0YVBvaW50c1wiKTtcblxudmFyIHRpbWVTZXJpZXNfMSA9IHJlcXVpcmUoXCIuL3RpbWVTZXJpZXNcIik7XG5cbnZhciBzdGF0c18xID0gcmVxdWlyZShcIi4vc3RhdHNcIik7XG5cbnZhciByZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi9yZXF1ZXN0XCIpO1xuXG52YXIgZm9yZXhfMSA9IHJlcXVpcmUoXCIuL2ZvcmV4XCIpO1xuXG52YXIgSUVYQ2xvdWRDbGllbnQgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJRVhDbG91ZENsaWVudChmLCBjb25maWcpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiAgVGFrZXMgaW4gYSBzdG9jayBzeW1ib2wsIGEgdW5pcXVlIHNlcmllcyBvZiBsZXR0ZXJzIGFzc2lnbmVkIHRvIGEgc2VjdXJpdHkgICAqL1xuXG5cbiAgICB0aGlzLnN5bWJvbCA9IGZ1bmN0aW9uIChzeW1ib2wpIHtcbiAgICAgIF90aGlzLnJlcS5zdG9ja1N5bWJvbCA9IHN5bWJvbDtcbiAgICAgIHJldHVybiBuZXcgc3RvY2tfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcbiAgICAvKiogVGFrZXMgaW4gbXVsdGlwbGUgc3RvY2sgc3ltYm9scywgYW5kIGJhdGNoZXMgdGhlbSB0byBhIHNpbmdsZSByZXF1ZXN0ICAqL1xuXG5cbiAgICB0aGlzLmJhdGNoU3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzeW1ib2xzID0gW107XG5cbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN5bWJvbHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJzdG9jay9tYXJrZXQvYmF0Y2hcIjtcbiAgICAgIF90aGlzLnJlcS5zdG9ja1N5bWJvbHMgPSBzeW1ib2xzO1xuICAgICAgcmV0dXJuIG5ldyBzdG9ja3NfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcbiAgICAvKiogVGFrZXMgaW4gbXVsdGlwbGUgc3RvY2sgc3ltYm9scywgYW5kIGJhdGNoZXMgdGhlbSB0byBhIHNpbmdsZSByZXF1ZXN0ICAqL1xuXG5cbiAgICB0aGlzLnN5bWJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzeW1ib2xzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICB9XG5cbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwic3RvY2svbWFya2V0L2JhdGNoXCI7XG4gICAgICBjb25zb2xlLndhcm4oXCJUaGlzIG1ldGhvZCB3aWxsIGJlIGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBiYXRjaFN5bWJvbHMgdG8gYmF0Y2ggbXVsdGlwbGUgc3RvY2sgc3ltYm9scyB0b2dldGhlclwiKTtcbiAgICAgIF90aGlzLnJlcS5zdG9ja1N5bWJvbHMgPSBzeW1ib2xzO1xuICAgICAgcmV0dXJuIG5ldyBzdG9ja3NfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMudG9wcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwidG9wc1wiO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiXCIpO1xuICAgIH07XG4gICAgLyoqICBUYWtlcyBpbiBhIGNyeXB0byBjdXJyZW5jeSAgICovXG5cblxuICAgIHRoaXMuY3J5cHRvID0gZnVuY3Rpb24gKGNyeXB0bykge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJjcnlwdG9cIjtcbiAgICAgIF90aGlzLnJlcS5jcnlwdG9DdXJyZW5jeSA9IGNyeXB0bztcbiAgICAgIHJldHVybiBuZXcgY3J5cHRvXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLm1hcmtldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwic3RvY2svbWFya2V0XCI7XG4gICAgICByZXR1cm4gbmV3IG1hcmtldF8xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwiZnhcIjtcbiAgICAgIHJldHVybiBuZXcgZm9yZXhfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVmRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwicmVmLWRhdGFcIjtcbiAgICAgIHJldHVybiBuZXcgcmVmZXJlbmNlXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLmRhdGFQb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcImRhdGEtcG9pbnRzXCI7XG4gICAgICByZXR1cm4gbmV3IGRhdGFQb2ludHNfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInN0YXRzXCI7XG4gICAgICByZXR1cm4gbmV3IHN0YXRzXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLnRpbWVTZXJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInRpbWUtc2VyaWVzXCI7XG4gICAgICByZXR1cm4gbmV3IHRpbWVTZXJpZXNfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcbiAgICAvKiogIFJldHVybnMgYW4gYXJyYXkgb2Ygc3ltYm9scyB1cCB0byB0aGUgdG9wIDEwIG1hdGNoZXMuXG4gICAgICogUmVzdWx0cyB3aWxsIGJlIHNvcnRlZCBmb3IgcmVsZXZhbmN5LiBTZWFyY2ggY3VycmVudGx5IGRlZmF1bHRzIHRvIGVxdWl0aWVzIG9ubHksIHdoZXJlIHRoZSBzeW1ib2wgcmV0dXJuZWQgaXMgc3VwcG9ydGVkIGJ5IGVuZHBvaW50cyBsaXN0ZWQgdW5kZXIgdGhlIFN0b2NrcyBjYXRlZ29yeS5cbiAgICAgKiBAcGFyYW1zIHNlYXJjaCBieSBzeW1ib2wgb3Igc2VjdXJpdHkgbmFtZS5cbiAgICAgKi9cblxuXG4gICAgdGhpcy5zZWFyY2ggPSBmdW5jdGlvbiAoc3ltYm9sKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInNlYXJjaFwiO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KHN5bWJvbCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gbmV3IHJlcXVlc3RfMS5kZWZhdWx0KGYuYmluZCh0aGlzKSwgY29uZmlnKTtcbiAgfVxuXG4gIHJldHVybiBJRVhDbG91ZENsaWVudDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gSUVYQ2xvdWRDbGllbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBpZXhDbG91ZENsaWVudF8xID0gcmVxdWlyZShcIi4vaWV4Q2xvdWRDbGllbnRcIik7XG5cbmV4cG9ydHMuSUVYQ2xvdWRDbGllbnQgPSBpZXhDbG91ZENsaWVudF8xLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHQgPSBpZXhDbG91ZENsaWVudF8xLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBNYXJrZXQgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNYXJrZXQocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogUmV0dXJucyBhbiBhcnJheSBvZiBxdW90ZSBvYmplY3RzIGZvciBhIGdpdmVuIGNvbGxlY3Rpb24gdHlwZS4gQ3VycmVudGx5IHN1cHBvcnRlZCBjb2xsZWN0aW9uIHR5cGVzIGFyZSBzZWN0b3IsIHRhZywgYW5kIGxpc3QgKi9cblxuXG4gICAgdGhpcy5jb2xsZWN0aW9uID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICB2YXIgcGFyYW0gPSBfYS5wYXJhbSxcbiAgICAgICAgICBjb2xsZWN0aW9uTmFtZSA9IF9hLmNvbGxlY3Rpb25OYW1lO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY29sbGVjdGlvbi9cIiArIHBhcmFtICsgXCI/Y29sbGVjdGlvbk5hbWU9XCIgKyBjb2xsZWN0aW9uTmFtZSk7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlYXJuaW5ncyB0aGF0IHdpbGwgYmUgcmVwb3J0ZWQgdG9kYXkgYXMgdGhyZWUgYXJyYXlzOiBiZWZvcmUgdGhlIG9wZW4gYnRvLCBhZnRlciBtYXJrZXQgY2xvc2UgYW1jIGFuZCBkdXJpbmcgdGhlIHRyYWRpbmcgZGF5IG90aGVyLiBFYWNoIGFycmF5IGNvbnRhaW5zIGFuIG9iamVjdCB3aXRoIGFsbCBrZXlzIGZyb20gZWFybmluZ3MsIGEgcXVvdGUgb2JqZWN0LCBhbmQgYSBoZWFkbGluZSBrZXkuICovXG5cblxuICAgIHRoaXMudG9kYXlFYXJuaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInRvZGF5LWVhcm5pbmdzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgcmV0dXJucyBhIGxpc3Qgb2YgdXBjb21pbmcgSVBPcyBzY2hlZHVsZWQgZm9yIHRoZSBjdXJyZW50IGFuZCBuZXh0IG1vbnRoLiBUaGUgcmVzcG9uc2UgaXMgc3BsaXQgaW50byB0d28gc3RydWN0dXJlczogcmF3RGF0YSBhbmQgdmlld0RhdGEuIHJhd0RhdGEgcmVwcmVzZW50cyBhbGwgYXZhaWxhYmxlIGRhdGEgZm9yIGFuIElQTy4gdmlld0RhdGEgcmVwcmVzZW50cyBkYXRhIHN0cnVjdHVyZWQgZm9yIGRpc3BsYXkgdG8gYSB1c2VyLiAqL1xuXG5cbiAgICB0aGlzLnVwY29taW5nSVBPcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWlwb3NcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyByZXR1cm5zIGEgbGlzdCBvZiB0b2RheSBJUE9zIHNjaGVkdWxlZCBmb3IgdGhlIGN1cnJlbnQgYW5kIG5leHQgbW9udGguIFRoZSByZXNwb25zZSBpcyBzcGxpdCBpbnRvIHR3byBzdHJ1Y3R1cmVzOiByYXdEYXRhIGFuZCB2aWV3RGF0YS4gcmF3RGF0YSByZXByZXNlbnRzIGFsbCBhdmFpbGFibGUgZGF0YSBmb3IgYW4gSVBPLiB2aWV3RGF0YSByZXByZXNlbnRzIGRhdGEgc3RydWN0dXJlZCBmb3IgZGlzcGxheSB0byBhIHVzZXIuICovXG5cblxuICAgIHRoaXMudG9kYXlJUE9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidG9kYXktaXBvc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHJldHVybnMgcmVhbCB0aW1lIHRyYWRlZCB2b2x1bWUgb24gVS5TLiBtYXJrZXRzLiAqL1xuXG5cbiAgICB0aGlzLnZvbHVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInZvbHVtZVwiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIHJldHVybnMgYW4gYXJyYXkgb2YgZWFjaCBzZWN0b3IgYW5kIHBlcmZvcm1hbmNlIGZvciB0aGUgY3VycmVudCB0cmFkaW5nIGRheS4gUGVyZm9ybWFuY2UgaXMgYmFzZWQgb24gZWFjaCBzZWN0b3IgRVRGLiAqL1xuXG5cbiAgICB0aGlzLnNlY3RvclBlcmZvcm1hbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2VjdG9yLXBlcmZvcm1hbmNlXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYW4gYXJyYXkgb2YgcXVvdGVzIGZvciB0aGUgdG9wIDEwIHN5bWJvbHMgaW4gYSBzcGVjaWZpZWQgbGlzdC4gKi9cblxuXG4gICAgdGhpcy5saXN0ID0gZnVuY3Rpb24gKGxpc3RUeXBlLCBfYSkge1xuICAgICAgdmFyIGRpc3BsYXlQZXJjZW50ID0gX2EuZGlzcGxheVBlcmNlbnQsXG4gICAgICAgICAgbGlzdExpbWl0ID0gX2EubGlzdExpbWl0O1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibGlzdFwiICsgbGlzdFR5cGUpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBNYXJrZXQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1hcmtldDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIFJlZmVyZW5jZURhdGEgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZWZlcmVuY2VEYXRhKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIFRoaXMgY2FsbCByZXR1cm5zIGFuIGFycmF5IG9mIHN5bWJvbHMgdGhhdCBJRVggQ2xvdWQgc3VwcG9ydHMgZm9yIEFQSSBjYWxscy4gKi9cblxuXG4gICAgdGhpcy5zeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFuIGFycmF5IG9mIHRhZ3MuIFRhZ3MgY2FuIGJlIGZvdW5kIG9uIGVhY2ggY29tcGFueS4gKi9cblxuXG4gICAgdGhpcy50YWdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidGFnc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcnlwdG9TeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY3J5cHRvL3N5bWJvbHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMuZnhTeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJyZWYtZGF0YVwiO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZngvc3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGNhbGwgcmV0dXJucyBhbiBhcnJheSBvZiBzeW1ib2xzIHRoZSBJbnZlc3RvcnMgRXhjaGFuZ2Ugc3VwcG9ydHMgZm9yIHRyYWRpbmcuIFRoaXMgbGlzdCBpcyB1cGRhdGVkIGRhaWx5IGFzIG9mIDc6NDUgYS5tLiBFVC4gU3ltYm9scyBtYXkgYmUgYWRkZWQgb3IgcmVtb3ZlZCBieSB0aGUgSW52ZXN0b3JzIEV4Y2hhbmdlIGFmdGVyIHRoZSBsaXN0IHdhcyBwcm9kdWNlZC4gKi9cblxuXG4gICAgdGhpcy5pZXhTeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaWV4L3N5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBjYWxsIHJldHVybnMgYW4gYXJyYXkgb2YgaW50ZXJuYXRpb25hbCBzeW1ib2xzIHRoYXQgSUVYIENsb3VkIHN1cHBvcnRzIGZvciBBUEkgY2FsbHMuICovXG5cblxuICAgIHRoaXMuaW50ZXJuYXRpb25hbFN5bWJvbHMgPSBmdW5jdGlvbiAocmVnaW9uLCBleGNoYW5nZSkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KHJlZ2lvbiA/IFwicmVnaW9uL1wiICsgcmVnaW9uICsgXCIvc3ltYm9sc1wiIDogXCJleGNoYW5nZS9cIiArIGV4Y2hhbmdlICsgXCIvc3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFuIGFycmF5IG9mIGV4Y2hhbmdlcy4gKi9cblxuXG4gICAgdGhpcy5leGNoYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJleGNoYW5nZXNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBjYWxsIHJldHVybnMgYW4gYXJyYXkgb2YgbXV0dWFsIGZ1bmQgc3ltYm9scyB0aGF0IElFWCBDbG91ZCBzdXBwb3J0cyBmb3IgQVBJIGNhbGxzLiAqL1xuXG5cbiAgICB0aGlzLm11dHVhbEZ1bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibXV0dWFsLWZ1bmRzL3N5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBjYWxsIHJldHVybnMgYW4gb2JqZWN0IGtleWVkIGJ5IHN5bWJvbCB3aXRoIHRoZSB2YWx1ZSBvZiBlYWNoIHN5bWJvbCBiZWluZyBhbiBhcnJheSBvZiBhdmFpbGFibGUgY29udHJhY3QgZGF0ZXMuICovXG5cblxuICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9wdGlvbnMvc3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGNhbGwgcmV0dXJucyBhbiBhcnJheSBvZiBPVEMgc3ltYm9scyB0aGF0IElFWCBDbG91ZCBzdXBwb3J0cyBmb3IgQVBJIGNhbGxzLiAqL1xuXG5cbiAgICB0aGlzLm90YyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm90Yy9zeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYW4gYXJyYXkgb2Ygc2VjdG9ycy4gKi9cblxuXG4gICAgdGhpcy5zZWN0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2VjdG9yc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gUmVmZXJlbmNlRGF0YTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVmZXJlbmNlRGF0YTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9fYXdhaXRlciA9IHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkge1xuICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHJlc3VsdC52YWx1ZSk7XG4gICAgICB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpO1xuICAgIH1cblxuICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59O1xuXG52YXIgX19nZW5lcmF0b3IgPSB0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7XG4gICAgbGFiZWw6IDAsXG4gICAgc2VudDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdO1xuICAgICAgcmV0dXJuIHRbMV07XG4gICAgfSxcbiAgICB0cnlzOiBbXSxcbiAgICBvcHM6IFtdXG4gIH0sXG4gICAgICBmLFxuICAgICAgeSxcbiAgICAgIHQsXG4gICAgICBnO1xuICByZXR1cm4gZyA9IHtcbiAgICBuZXh0OiB2ZXJiKDApLFxuICAgIFwidGhyb3dcIjogdmVyYigxKSxcbiAgICBcInJldHVyblwiOiB2ZXJiKDIpXG4gIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZztcblxuICBmdW5jdGlvbiB2ZXJiKG4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiBzdGVwKFtuLCB2XSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG5cbiAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcblxuICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0ID0gb3A7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIF8ubGFiZWwrKztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IG9wWzFdLFxuICAgICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICBfLmxhYmVsKys7XG4gICAgICAgICAgeSA9IG9wWzFdO1xuICAgICAgICAgIG9wID0gWzBdO1xuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICBvcCA9IF8ub3BzLnBvcCgpO1xuXG4gICAgICAgICAgXy50cnlzLnBvcCgpO1xuXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkge1xuICAgICAgICAgICAgXyA9IDA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSB7XG4gICAgICAgICAgICBfLmxhYmVsID0gb3BbMV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHtcbiAgICAgICAgICAgIF8ubGFiZWwgPSB0WzFdO1xuICAgICAgICAgICAgdCA9IG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHtcbiAgICAgICAgICAgIF8ubGFiZWwgPSB0WzJdO1xuXG4gICAgICAgICAgICBfLm9wcy5wdXNoKG9wKTtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuXG4gICAgICAgICAgXy50cnlzLnBvcCgpO1xuXG4gICAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG9wID0gWzYsIGVdO1xuICAgICAgeSA9IDA7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGYgPSB0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsXG4gICAgICBkb25lOiB0cnVlXG4gICAgfTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIElFWFJlcXVlc3QgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJRVhSZXF1ZXN0KGZldGNoRnVuYywgX2EpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHB1Ymxpc2hhYmxlID0gX2EucHVibGlzaGFibGUsXG4gICAgICAgIF9iID0gX2Euc2FuZGJveCxcbiAgICAgICAgc2FuZGJveCA9IF9iID09PSB2b2lkIDAgPyBmYWxzZSA6IF9iLFxuICAgICAgICBfYyA9IF9hLnZlcnNpb24sXG4gICAgICAgIHZlcnNpb24gPSBfYyA9PT0gdm9pZCAwID8gXCJiZXRhXCIgOiBfYztcblxuICAgIHRoaXMuc2V0VG9rZW4gPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgIHJldHVybiBfdGhpcy5zYW5kYm94ICYmIHRva2VuWzBdICE9PSBcIlRcIiA/IFwiVFwiICsgdG9rZW4gOiB0b2tlbjtcbiAgICB9O1xuXG4gICAgdGhpcy5wYXJhbXMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICBpZiAocGFyYW1zID09PSB2b2lkIDApIHtcbiAgICAgICAgcGFyYW1zID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgdmFyIGVudiA9IF90aGlzLnNhbmRib3ggPyBcInNhbmRib3hcIiA6IFwiY2xvdWRcIjtcbiAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vXCIgKyBlbnYgKyBcIi5pZXhhcGlzLmNvbS9cIiArIF90aGlzLnZlcnNpb24gKyBcIi9cIiArIF90aGlzLmRhdGF0eXBlO1xuICAgICAgdmFyIG9wZXJhbmQgPSBwYXJhbXMubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFw/XCIsIFwiZ1wiKSk7XG4gICAgICB2YXIgcSA9IG9wZXJhbmQgJiYgb3BlcmFuZFswXSA9PT0gXCI/XCIgPyBcIiZcIiA6IFwiP1wiO1xuXG4gICAgICB2YXIgcGsgPSBcInRva2VuPVwiICsgX3RoaXMuc2V0VG9rZW4oX3RoaXMucHVibGlzaGFibGUpO1xuXG4gICAgICB2YXIgcmVxdWVzdCA9IHVybCArIFwiL1wiICsgX3RoaXMuc3RvY2tTeW1ib2wgKyBcIi9cIiArIHBhcmFtcyArIHEgKyBwaztcblxuICAgICAgaWYgKF90aGlzLmRhdGF0eXBlID09PSBcImRlZXBcIikge1xuICAgICAgICB2YXIgcmVxdWVzdF8xID0gdXJsICsgXCIvXCIgKyBwYXJhbXMgKyBcIj9zeW1ib2xzPVwiICsgX3RoaXMuc3RvY2tTeW1ib2wgKyBcIiZcIiArIHBrO1xuICAgICAgICBfdGhpcy5kYXRhdHlwZSA9IFwic3RvY2tcIjtcbiAgICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RfMTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLmRhdGF0eXBlID09PSBcInN0b2NrL21hcmtldC9iYXRjaFwiKSB7XG4gICAgICAgIHZhciByZXF1ZXN0XzIgPSB1cmwgKyBcIj9zeW1ib2xzPVwiICsgX3RoaXMuc3RvY2tTeW1ib2xzLm1hcChmdW5jdGlvbiAoc3ltYm9sKSB7XG4gICAgICAgICAgcmV0dXJuIHN5bWJvbDtcbiAgICAgICAgfSkgKyBcIiZ0eXBlcz1cIiArIHBhcmFtcyArIFwiJlwiICsgcGs7XG4gICAgICAgIF90aGlzLmRhdGF0eXBlID0gXCJzdG9ja1wiO1xuICAgICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgICByZXR1cm4gcmVxdWVzdF8yO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuZGF0YXR5cGUgPT09IFwiY3J5cHRvXCIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RfMyA9IHVybCArIFwiL1wiICsgX3RoaXMuY3J5cHRvQ3VycmVuY3kgKyBcIi9cIiArIHBhcmFtcyArIHEgKyBwaztcbiAgICAgICAgX3RoaXMuZGF0YXR5cGUgPSBcInN0b2NrXCI7XG4gICAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICAgIHJldHVybiByZXF1ZXN0XzM7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5kYXRhdHlwZSA9PT0gXCJ0b3BzXCIgfHwgX3RoaXMuZGF0YXR5cGUgPT09IFwic3RvY2svbWFya2V0XCIgfHwgX3RoaXMuZGF0YXR5cGUgPT09IFwiZnhcIiB8fCBfdGhpcy5kYXRhdHlwZSA9PT0gXCJzdGF0c1wiIHx8IF90aGlzLmRhdGF0eXBlID09PSBcInNlYXJjaFwiIHx8IF90aGlzLmRhdGF0eXBlID09PSBcInRpbWUtc2VyaWVzXCIgfHwgX3RoaXMuZGF0YXR5cGUgPT09IFwicmVmLWRhdGFcIikge1xuICAgICAgICB2YXIgcmVxdWVzdF80ID0gdXJsICsgXCIvXCIgKyBwYXJhbXMgKyBxICsgcGs7XG4gICAgICAgIF90aGlzLmRhdGF0eXBlID0gXCJzdG9ja1wiO1xuICAgICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgICByZXR1cm4gcmVxdWVzdF80O1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfTtcblxuICAgIHRoaXMuYmF0Y2hQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdHlwZXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdHlwZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVudiA9IF90aGlzLnNhbmRib3ggPyBcInNhbmRib3hcIiA6IFwiY2xvdWRcIjtcbiAgICAgIHZhciB1cmwgPSBcImh0dHBzOi8vXCIgKyBlbnYgKyBcIi5pZXhhcGlzLmNvbS9cIiArIF90aGlzLnZlcnNpb24gKyBcIi9cIiArIF90aGlzLmRhdGF0eXBlO1xuXG4gICAgICB2YXIgc3ltYm9scyA9IFwiXCIgKyBfdGhpcy5zdG9ja1N5bWJvbHMubWFwKGZ1bmN0aW9uIChzeW1ib2wpIHtcbiAgICAgICAgcmV0dXJuIHN5bWJvbDtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYmF0Y2hUeXBlcyA9IFwidHlwZXM9XCIgKyB0eXBlcy5tYXAoZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9KSArIFwiJnRva2VuPVwiICsgX3RoaXMuc2V0VG9rZW4oX3RoaXMucHVibGlzaGFibGUpO1xuXG4gICAgICB2YXIgcmVxdWVzdDtcblxuICAgICAgaWYgKF90aGlzLmRhdGF0eXBlID09PSBcInN0b2NrL21hcmtldC9iYXRjaFwiKSB7XG4gICAgICAgIHJlcXVlc3QgPSB1cmwgKyBcIi9iYXRjaD9zeW1ib2xzPVwiICsgc3ltYm9scyArIFwiJlwiICsgYmF0Y2hUeXBlcztcbiAgICAgICAgX3RoaXMuZGF0YXR5cGUgPSBcInN0b2NrXCI7XG4gICAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0ID0gdXJsICsgXCIvXCIgKyBfdGhpcy5zdG9ja1N5bWJvbCArIFwiL2JhdGNoP1wiICsgYmF0Y2hUeXBlcztcbiAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXF1ZXN0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgcmV0dXJuIF90aGlzLnJlc3BvbnNlKF90aGlzLnBhcmFtcywgcGFyYW1zKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNwb25zZSA9IGZ1bmN0aW9uIChyZXEsIHBhcmFtcywgcmFuZ2UpIHtcbiAgICAgIHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuLCByZXMsIGNvbnRlbnRUeXBlLCBlcnJvciwgZXJyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgNiwsIDddKTtcblxuICAgICAgICAgICAgICBuID0gcmFuZ2UgPyByYW5nZSA6IFwiXCI7XG4gICAgICAgICAgICAgIHJldHVybiBbNFxuICAgICAgICAgICAgICAvKnlpZWxkKi9cbiAgICAgICAgICAgICAgLCB0aGlzLmZldGNoRnVuYyhyZXEocGFyYW1zICsgbikpXTtcblxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgIGlmICghKHR5cGVvZiByZXMuaGVhZGVycy5nZXQgPT09IFwiZnVuY3Rpb25cIikpIHJldHVybiBbM1xuICAgICAgICAgICAgICAvKmJyZWFrKi9cbiAgICAgICAgICAgICAgLCA1XTtcbiAgICAgICAgICAgICAgY29udGVudFR5cGUgPSByZXMuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik7XG4gICAgICAgICAgICAgIGlmICghKGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIikpIHJldHVybiBbM1xuICAgICAgICAgICAgICAvKmJyZWFrKi9cbiAgICAgICAgICAgICAgLCAzXTtcbiAgICAgICAgICAgICAgcmV0dXJuIFs0XG4gICAgICAgICAgICAgIC8qeWllbGQqL1xuICAgICAgICAgICAgICAsIHJlcy5qc29uKCldO1xuXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHJldHVybiBbMlxuICAgICAgICAgICAgICAvKnJldHVybiovXG4gICAgICAgICAgICAgICwgX2Euc2VudCgpXTtcblxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBpZiAoIShyZXMuc3RhdHVzID49IDQwMCkpIHJldHVybiBbM1xuICAgICAgICAgICAgICAvKmJyZWFrKi9cbiAgICAgICAgICAgICAgLCA1XTtcbiAgICAgICAgICAgICAgcmV0dXJuIFs0XG4gICAgICAgICAgICAgIC8qeWllbGQqL1xuICAgICAgICAgICAgICAsIHJlcy50ZXh0KCldO1xuXG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGVycm9yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIHJldHVybiBbMlxuICAgICAgICAgICAgICAvKnJldHVybiovXG4gICAgICAgICAgICAgICwgcmVzLmRhdGFdO1xuXG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgIGVycl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICByZXR1cm4gWzJcbiAgICAgICAgICAgICAgLypyZXR1cm4qL1xuICAgICAgICAgICAgICAsIGVycl8xLnJlc3BvbnNlID8gZXJyXzEucmVzcG9uc2UuZGF0YSA6IGVycl8xXTtcblxuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICByZXR1cm4gWzJcbiAgICAgICAgICAgICAgLypyZXR1cm4qL1xuICAgICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5mZXRjaEZ1bmMgPSBmZXRjaEZ1bmMsIHRoaXMucHVibGlzaGFibGUgPSBwdWJsaXNoYWJsZSwgdGhpcy52ZXJzaW9uID0gdmVyc2lvbiwgdGhpcy5zYW5kYm94ID0gc2FuZGJveCwgdGhpcy5kYXRhdHlwZSA9IFwic3RvY2tcIiwgdGhpcy5jcnlwdG9DdXJyZW5jeSA9IFwiXCIsIHRoaXMuc3RvY2tTeW1ib2wgPSBcIlwiLCB0aGlzLnN0b2NrU3ltYm9scyA9IFtdLCB0aGlzLnJlcXVlc3QgPSB0aGlzLnJlcXVlc3Q7XG4gIH1cblxuICByZXR1cm4gSUVYUmVxdWVzdDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gSUVYUmVxdWVzdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIFN0YXRpc3RpY3MgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdGF0aXN0aWNzKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIFJldHVybnMgZGFpbHkgc3RhdHMgZm9yIGEgZ2l2ZW4gdGltZSBmcmFtZSAqL1xuXG5cbiAgICB0aGlzLmhpc3RvcmljYWwgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaGlzdG9yaWNhbC9cIiArIChkYXRlID8gXCIvXCIgKyBkYXRlIDogXCJcIikpO1xuICAgIH07XG5cbiAgICB0aGlzLmludHJhZGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW50cmFkYXlcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVjZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicmVjZW50XCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlY29yZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJyZWNvcmRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBTdGF0aXN0aWNzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTdGF0aXN0aWNzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgZGVlcF8xID0gcmVxdWlyZShcIi4vZGVlcFwiKTtcblxudmFyIHRpbWVTZXJpZXNfMSA9IHJlcXVpcmUoXCIuL3RpbWVTZXJpZXNcIik7XG5cbnZhciBmb3JleF8xID0gcmVxdWlyZShcIi4vZm9yZXhcIik7XG5cbnZhciBiYXRjaF8xID0gcmVxdWlyZShcIi4vYmF0Y2hcIik7XG5cbnZhciBTdG9jayA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0b2NrKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIHJldHVybnMgYmFsYW5jZSBzaGVldCBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5IHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXJcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDMwMDBgXG4gICAgICovXG5cblxuICAgIHRoaXMuYmFsYW5jZVNoZWV0ID0gZnVuY3Rpb24gKHBlcmlvZCwgbGFzdCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYmFsYW5jZS1zaGVldFwiICsgKHBlcmlvZCA/IFwiP3BlcmlvZD1cIiArIHBlcmlvZCA6IFwiXCIpICsgKGxhc3QgPyBcIiZsYXN0PVwiICsgbGFzdCA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKiBiYXRjaCByZXR1cm5zIG11bHRpcGUgZGF0YS10eXBlcyBmb3IgYSBnaXZlIHN0b2NrIHN5bWJvbCAqL1xuICAgIC8vIHB1YmxpYyBiYXRjaCA9ICguLi5wYXJhbXM6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgLy8gICByZXR1cm4gdGhpcy5yZXEucmVzcG9uc2UodGhpcy5yZXEuYmF0Y2hQYXJhbXMsIHBhcmFtcyk7XG4gICAgLy8gfTtcblxuICAgIC8qKiBiYXRjaCByZXR1cm5zIG11bHRpcGUgZGF0YS10eXBlcyBmb3IgYSBnaXZlIHN0b2NrIHN5bWJvbCAqL1xuXG5cbiAgICB0aGlzLmJhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLmlleEJhdGNoO1xuICAgIH07XG5cbiAgICB0aGlzLmRlZXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcImRlZXBcIjtcbiAgICAgIHJldHVybiBfdGhpcy5pZXhEZWVwO1xuICAgIH07XG5cbiAgICB0aGlzLnRpbWVTZXJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInRpbWUtc2VyaWVzXCI7XG4gICAgICByZXR1cm4gX3RoaXMudGltZXNlcmllcztcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwiZnhcIjtcbiAgICAgIHJldHVybiBfdGhpcy5pZXhGb3JleDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgYm9vayB2YWx1ZSBmb3IgYSBnaXZlbiBzdG9ja1xuICAgICAqIGBEYXRhIFdlaWdodDogMSBwZXIgcXVvdGUgcmV0dXJuZWRgXG4gICAgICovXG5cblxuICAgIHRoaXMuYm9vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImJvb2tcIik7XG4gICAgfTtcbiAgICAvKiogVE9QUyBwcm92aWRlcyBJRVjigJlzIGFnZ3JlZ2F0ZWQgYmVzdCBxdW90ZWQgYmlkIGFuZCBvZmZlciBwb3NpdGlvbiBpbiBuZWFyIHJlYWwgdGltZSBmb3IgYWxsIHNlY3VyaXRpZXMgb24gSUVY4oCZcyBkaXNwbGF5ZWQgbGltaXQgb3JkZXIgYm9vay4gVE9QUyBpcyBpZGVhbCBmb3IgZGV2ZWxvcGVycyBuZWVkaW5nIGJvdGggcXVvdGUgYW5kIHRyYWRlIGRhdGEuICovXG5cblxuICAgIHRoaXMudG9wcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwidG9wc1wiO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KF90aGlzLnJlcS5zdG9ja1N5bWJvbHMgPyBcIj9zeW1ib2xzPVwiICsgX3RoaXMucmVxLnN0b2NrU3ltYm9scyA6IFwiXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhZGp1c3RlZCBhbmQgdW5hZGp1c3RlZCBoaXN0b3JpY2FsIGRhdGEgZm9yIHVwIHRvIDE1IHllYXJzLlxuICAgICAqIGBEYXRhIFdlaWdodDogMSwwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNoYXJ0ID0gZnVuY3Rpb24gKHJhbmdlLCBwYXJhbXMpIHtcbiAgICAgIC8vIGlmIHJhbmdlIGlzICdkYXRlJyAmIHRoZXJlJ3MgYSAnZGF0ZScgcGFyYW1cbiAgICAgIGlmIChyYW5nZSA9PT0gXCJkYXRlXCIgJiYgcGFyYW1zICYmIHBhcmFtcy5kYXRlKSB7XG4gICAgICAgIHZhciBrZXlzXzEgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuICAgICAgICB2YXIgcGFyYW1zU3RyaW5nID0ga2V5c18xLmxlbmd0aCA+IDEgPyBcIj9cIiArIGtleXNfMS5yZWR1Y2UoZnVuY3Rpb24gKHN0ciwga2V5LCBpKSB7XG4gICAgICAgICAgaWYgKGtleSAhPT0gXCJkYXRlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgc3RyICsga2V5ICsgXCI9XCIgKyBwYXJhbXNba2V5XSArIChpIDwga2V5c18xLmxlbmd0aCAtIDEgPyBcIiZcIiA6IFwiXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH0sIFwiXCIpIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2hhcnQvXCIgKyByYW5nZSArIFwiL1wiICsgcGFyYW1zLmRhdGUgKyBwYXJhbXNTdHJpbmcpO1xuICAgICAgfSAvLyBpbiBhbnkgb3RoZXIgY2FzZVxuXG5cbiAgICAgIHZhciB2YWx1ZXMgPSBwYXJhbXMgJiYgT2JqZWN0LmVudHJpZXMocGFyYW1zKTtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNoYXJ0L1wiICsgcmFuZ2UgKyAocGFyYW1zID8gXCI/XCIgKyB2YWx1ZXMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2WzBdICsgXCI9XCIgKyB2WzFdO1xuICAgICAgfSkuam9pbihcIiZcIikgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGNhc2ggZmxvdyBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5LCB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyLlxuICAgICAqXG4gICAgICogYERhdGEgV2VpZ2h0OiAxLDAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuY2FzaEZsb3cgPSBmdW5jdGlvbiAocGVyaW9kLCBsYXN0KSB7XG4gICAgICBpZiAocGVyaW9kID09PSB2b2lkIDApIHtcbiAgICAgICAgcGVyaW9kID0gXCJxdWFydGVybHlcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2FzaC1mbG93P3BlcmlvZD1cIiArIHBlcmlvZCArIFwiJmxhc3Q9XCIgKyBsYXN0KTtcbiAgICB9O1xuICAgIC8qKiByZXR1cm5zIENlbyBDb21wZW5zYXRpb24gKi9cblxuXG4gICAgdGhpcy5jZW9Db21wZW5zYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjZW8tY29tcGVuc2F0aW9uXCIpO1xuICAgIH07XG4gICAgLyoqIHJldHVybnMgZGF0YSBvbiBhIGdpdmVuIGNvbXBhbnlcbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxIHBlciBzeW1ib2xgXG4gICAgICovXG5cblxuICAgIHRoaXMuY29tcGFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNvbXBhbnlcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxIHBlciBzeW1ib2wgcGVyIHF1b3RlYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmRlbGF5ZWRRdW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImRlbGF5ZWQtcXVvdGVcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEwIHBlciBzeW1ib2wgcGVyIHBlcmlvZCByZXR1cm5lZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5kaXZpZGVuZHMgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImRpdmlkZW5kc1wiICsgKHJhbmdlID8gXCIvXCIgKyByYW5nZSA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVhcm5pbmdzIGRhdGEgZm9yIGEgZ2l2ZW4gY29tcGFueSBpbmNsdWRpbmcgdGhlIGFjdHVhbCBFUFMsIGNvbnNlbnN1cywgYW5kIGZpc2NhbCBwZXJpb2QuIEVhcm5pbmdzIGFyZSBhdmFpbGFibGUgcXVhcnRlcmx5IChsYXN0IDQgcXVhcnRlcnMpLlxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmVhcm5pbmdzID0gZnVuY3Rpb24gKGxhc3QsIGZpZWxkKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJlYXJuaW5nc1wiICsgKGxhc3QgPyBcIi9cIiArIGxhc3QgOiBcIlwiKSArIChmaWVsZCA/IFwiL1wiICsgZmllbGQgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKiogUHJvdmlkZXMgdGhlIGxhdGVzdCBjb25zZW5zdXMgZXN0aW1hdGUgZm9yIHRoZSBuZXh0IGZpc2NhbCBwZXJpb2QgKi9cblxuXG4gICAgdGhpcy5lc3RpbWF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJlc3RpbWF0ZXNcIik7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgaW5jb21lIHN0YXRlbWVudCwgYmFsYW5jZSBzaGVldCwgYW5kIGNhc2ggZmxvdyBkYXRhIGZyb20gdGhlIG1vc3QgcmVjZW50IHJlcG9ydGVkIHF1YXJ0ZXIuICovXG5cblxuICAgIHRoaXMuZmluYW5jaWFscyA9IGZ1bmN0aW9uIChwZXJpb2QpIHtcbiAgICAgIGlmIChwZXJpb2QgPT09IHZvaWQgMCkge1xuICAgICAgICBwZXJpb2QgPSBcInF1YXJ0ZXJseVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJmaW5hbmNpYWxzP3BlcmlvZD1cIiArIHBlcmlvZCk7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBsYXRlc3QgbmV3cyBmb3IgYSBnaXZlIHN0b2NrIHN5bWJvbCAqL1xuXG5cbiAgICB0aGlzLm5ld3MgPSBmdW5jdGlvbiAobGFzdCkge1xuICAgICAgaWYgKGxhc3QgPT09IHZvaWQgMCkge1xuICAgICAgICBsYXN0ID0gMTA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm5ld3MvbGFzdC9cIiArIGxhc3QpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdG9wIDEwIGZ1bmQgaG9sZGVycywgbWVhbmluZyBhbnkgZmlybSBub3QgZGVmaW5lZCBhcyBidXktc2lkZSBvciBzZWxsLXNpZGUgc3VjaCBhcyBtdXR1YWwgZnVuZHMsIHBlbnNpb24gZnVuZHMsIGVuZG93bWVudHMsIGludmVzdG1lbnQgZmlybXMsIGFuZCBvdGhlciBsYXJnZSBlbnRpdGllcyB0aGF0IG1hbmFnZSBmdW5kcyBvbiBiZWhhbGYgb2Ygb3RoZXJzLlxuICAgICAqL1xuXG5cbiAgICB0aGlzLmZ1bmRPd25lcnNoaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJmdW5kLW93bmVyc2hpcFwiKTtcbiAgICB9O1xuICAgIC8qKiBQdWxscyBpbmNvbWUgc3RhdGVtZW50IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHkgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlci4gKi9cblxuXG4gICAgdGhpcy5pbmNvbWUgPSBmdW5jdGlvbiAocGVyaW9kLCBsYXN0KSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbmNvbWVcIiArIChwZXJpb2QgPyBcIj9wZXJpb2Q9XCIgKyBwZXJpb2QgOiBcIlwiKSArIChsYXN0ID8gXCImbGFzdD1cIiArIGxhc3QgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyB0aGUgdG9wIDEwIGluc2lkZXJzLCB3aXRoIHRoZSBtb3N0IHJlY2VudCBpbmZvcm1hdGlvbi4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyUm9zdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zaWRlci1yb3N0ZXJcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhZ2dyZWdhdGVkIGluc2lkZXJzIHN1bW1hcnkgZGF0YSBmb3IgdGhlIGxhc3QgNiBtb250aHMuICovXG5cblxuICAgIHRoaXMuaW5zaWRlclN1bW1hcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnNpZGVyLXN1bW1hcnlcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBpbnNpZGVyIHRyYW5zYWN0aW9ucy4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyVHJhbnNhY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zaWRlci10cmFuc2FjdGlvbnNcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICBSZXR1cm5zIHRoZSB0b3AgMTAgaW5zdGl0dXRpb25hbCBob2xkZXJzLCBkZWZpbmVkIGFzIGJ1eS1zaWRlIG9yIHNlbGwtc2lkZSBmaXJtcy4gKi9cblxuXG4gICAgdGhpcy5pbnN0aXR1dGlvbmFsT3duZXJzaGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zdGl0dXRpb25hbC1vd25lcnNoaXBcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBlbmRwb2ludCB3aWxsIHJldHVybiBhZ2dyZWdhdGVkIGludHJhZGF5IHByaWNlcyBpbiBvbmUgbWludXRlIGJ1Y2tldHMgKi9cblxuXG4gICAgdGhpcy5pbnRyYWRheVByaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImludHJhZGF5LXByaWNlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uLCBidXQgdGhlIGdvb2dsZSBBUElzIHVybCBpcyBzdGFuZGFyZGl6ZWQuICAqL1xuXG5cbiAgICB0aGlzLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJsb2dvXCIpO1xuICAgIH07XG4gICAgLyoqICBUaGlzIHJldHVybnMgMTUgbWludXRlIGRlbGF5ZWQsIGxhc3Qgc2FsZSBlbGlnaWJsZSB0cmFkZXMuICovXG5cblxuICAgIHRoaXMubGFyZ2VzdFRyYWRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImxhcmdlc3QtdHJhZGVzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZW5kIG9mIGRheSBvcHRpb25zIGRhdGEgKi9cblxuXG4gICAgdGhpcy5vcHRpb25zID0gZnVuY3Rpb24gKGV4cGlyYXRpb24sIG9wdGlvblNpZGUpIHtcbiAgICAgIGlmIChleHBpcmF0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgZXhwaXJhdGlvbiA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9wdGlvbnNcIiArIChleHBpcmF0aW9uID8gXCIvXCIgKyBleHBpcmF0aW9uIDogXCJcIikgKyAob3B0aW9uU2lkZSA/IFwiL1wiICsgb3B0aW9uU2lkZSA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHBlZXIgZ3JvdXAgKi9cblxuXG4gICAgdGhpcy5wZWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInBlZXJzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcHJldmlvdXMgZGF5IGFkanVzdGVkIHByaWNlIGRhdGEgZm9yIG9uZSBvciBtb3JlIHN0b2Nrcy4gKi9cblxuXG4gICAgdGhpcy5wcmV2aW91cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByZXZpb3VzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcHJpY2Ugb2YgYSBzdG9jayAqL1xuXG5cbiAgICB0aGlzLnByaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJpY2VcIik7XG4gICAgfTtcbiAgICAvKiogUHJvdmlkZXMgdGhlIGxhdGVzdCBhdmcsIGhpZ2gsIGFuZCBsb3cgYW5hbHlzdCBwcmljZSB0YXJnZXQgZm9yIGEgc3ltYm9sLiAqL1xuXG5cbiAgICB0aGlzLnByaWNlVGFyZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJpY2UtdGFyZ2V0XCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIG9mZmljaWFsIG9wZW4gYW5kIGNsb3NlIGZvciBhIGdpdmUgc3ltYm9sLiBUaGUgb2ZmaWNpYWwgb3BlbiBpcyBhdmFpbGFibGUgYXMgc29vbiBhcyA5OjQ1YW0gRVQgYW5kIHRoZSBvZmZpY2lhbCBjbG9zZSBhcyBzb29uIGFzIDQ6MTVwbSBFVC4gU29tZSBzdG9ja3MgY2FuIHJlcG9ydCBsYXRlIG9wZW4gb3IgY2xvc2UgcHJpY2VzLiAqL1xuXG5cbiAgICB0aGlzLm9obGMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvaGxjXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgVGhpcyBlbmRwb2ludCBwcm92aWRlcyBzb2NpYWwgc2VudGltZW50IGRhdGEgZnJvbSBTdG9ja1R3aXRzLiBEYXRhIGNhbiBiZSB2aWV3ZWQgYXMgYSBkYWlseSB2YWx1ZSwgb3IgYnkgbWludXRlIGZvciBhIGdpdmVuIGRhdGUuICovXG5cblxuICAgIHRoaXMuc2VudGltZW50ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGUpIHtcbiAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHtcbiAgICAgICAgdHlwZSA9IFwiZGFpbHlcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICBkYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2VudGltZW50L1wiICsgdHlwZSArIChkYXRlID8gXCIvXCIgKyBkYXRlIDogXCJcIikpO1xuICAgIH07XG5cbiAgICB0aGlzLnF1b3RlID0gZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICBpZiAoZmllbGQgPT09IHZvaWQgMCkge1xuICAgICAgICBmaWVsZCA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInF1b3RlL1wiICsgKGZpZWxkID8gZmllbGQgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgZGF0YSBmcm9tIHRoZSBsYXN0IGZvdXIgbW9udGhzLiAqL1xuXG5cbiAgICB0aGlzLnJlY29tbWVuZGF0aW9uVHJlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicmVjb21tZW5kYXRpb24tdHJlbmRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXRzID0gZnVuY3Rpb24gKHN0YXQpIHtcbiAgICAgIGlmIChzdGF0ID09PSB2b2lkIDApIHtcbiAgICAgICAgc3RhdCA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInN0YXRzL1wiICsgc3RhdCk7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1ldmVudHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdFYXJuaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWVhcm5pbmdzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nRGl2aWRlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctZGl2aWRlbmRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nU3BsaXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctc3BsaXRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nSVBPcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWlwb3NcIik7XG4gICAgfTtcblxuICAgIHRoaXMuc3BsaXRzID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICBpZiAocmFuZ2UgPT09IHZvaWQgMCkge1xuICAgICAgICByYW5nZSA9IFwiMW1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3BsaXRzL1wiICsgcmFuZ2UpO1xuICAgIH07XG5cbiAgICB0aGlzLnNob3J0SW50ZXJlc3QgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgaWYgKGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICBkYXRlID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2hvcnQtaW50ZXJlc3QvXCIgKyBkYXRlKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIHJldHVybnMgMTUgbWludXRlIGRlbGF5ZWQgYW5kIDMwIGRheSBhdmVyYWdlIGNvbnNvbGlkYXRlZCB2b2x1bWUgcGVyY2VudGFnZSBvZiBhIHN0b2NrLCBieSBtYXJrZXQuIFRoaXMgY2FsbCB3aWxsIGFsd2F5cyByZXR1cm4gMTMgdmFsdWVzLCBhbmQgd2lsbCBiZSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGN1cnJlbnQgZGF5IHRyYWRpbmcgdm9sdW1lIHBlcmNlbnRhZ2UuICovXG5cblxuICAgIHRoaXMudm9sdW1lQnlWZW51ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInZvbHVtZS1ieS12ZW51ZVwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gICAgdGhpcy5pZXhEZWVwID0gbmV3IGRlZXBfMS5kZWZhdWx0KHJlcSk7XG4gICAgdGhpcy50aW1lc2VyaWVzID0gbmV3IHRpbWVTZXJpZXNfMS5kZWZhdWx0KHJlcSk7XG4gICAgdGhpcy5pZXhGb3JleCA9IG5ldyBmb3JleF8xLmRlZmF1bHQocmVxKTtcbiAgICB0aGlzLmlleEJhdGNoID0gbmV3IGJhdGNoXzEuZGVmYXVsdChyZXEpO1xuICB9XG5cbiAgcmV0dXJuIFN0b2NrO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTdG9jazsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGZvcmV4XzEgPSByZXF1aXJlKFwiLi9mb3JleFwiKTtcblxudmFyIGJhdGNoXzEgPSByZXF1aXJlKFwiLi9iYXRjaFwiKTtcblxudmFyIFN0b2NrcyA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0b2NrcyhyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiByZXR1cm5zIGJhbGFuY2Ugc2hlZXQgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyXG4gICAgICogYERhdGEgV2VpZ2h0OiAzMDAwYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmJhbGFuY2VTaGVldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImJhbGFuY2Utc2hlZXRcIik7XG4gICAgfTtcbiAgICAvKiogYmF0Y2ggcmV0dXJucyBtdWx0aXBlIGRhdGEtdHlwZXMgZm9yIGEgZ2l2ZSBzdG9jayBzeW1ib2wgKi9cblxuXG4gICAgdGhpcy5iYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgYmF0Y2hfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMuZm9yZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcImZ4XCI7XG4gICAgICByZXR1cm4gbmV3IGZvcmV4XzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBib29rIHZhbHVlIGZvciBhIGdpdmVuIHN0b2NrXG4gICAgICogYERhdGEgV2VpZ2h0OiAxIHBlciBxdW90ZSByZXR1cm5lZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5ib29rID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYm9va1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWRqdXN0ZWQgYW5kIHVuYWRqdXN0ZWQgaGlzdG9yaWNhbCBkYXRhIGZvciB1cCB0byAxNSB5ZWFycy5cbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEsMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jaGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNoYXJ0XCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBjYXNoIGZsb3cgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSwgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlci5cbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEsMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jYXNoRmxvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNhc2gtZmxvd1wiKTtcbiAgICB9O1xuICAgIC8qKiByZXR1cm5zIENlbyBDb21wZW5zYXRpb24gKi9cblxuXG4gICAgdGhpcy5jZW9Db21wZW5zYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjZW8tY29tcGVuc2F0aW9uXCIpO1xuICAgIH07XG4gICAgLyoqIHJldHVybnMgZGF0YSBvbiBhIGdpdmVuIGNvbXBhbnlcbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxIHBlciBzeW1ib2xgICovXG5cblxuICAgIHRoaXMuY29tcGFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNvbXBhbnlcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxIHBlciBzeW1ib2wgcGVyIHF1b3RlYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmRlbGF5ZWRRdW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImRlbGF5ZWQtcXVvdGVcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEwIHBlciBzeW1ib2wgcGVyIHBlcmlvZCByZXR1cm5lZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5kaXZpZGVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJkaXZpZGVuZHNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlYXJuaW5ncyBkYXRhIGZvciBhIGdpdmVuIGNvbXBhbnkgaW5jbHVkaW5nIHRoZSBhY3R1YWwgRVBTLCBjb25zZW5zdXMsIGFuZCBmaXNjYWwgcGVyaW9kLiBFYXJuaW5ncyBhcmUgYXZhaWxhYmxlIHF1YXJ0ZXJseSAobGFzdCA0IHF1YXJ0ZXJzKS5cbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5lYXJuaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImVhcm5pbmdzXCIpO1xuICAgIH07XG4gICAgLyoqIFByb3ZpZGVzIHRoZSBsYXRlc3QgY29uc2Vuc3VzIGVzdGltYXRlIGZvciB0aGUgbmV4dCBmaXNjYWwgcGVyaW9kICovXG5cblxuICAgIHRoaXMuZXN0aW1hdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZXN0aW1hdGVzXCIpO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGluY29tZSBzdGF0ZW1lbnQsIGJhbGFuY2Ugc2hlZXQsIGFuZCBjYXNoIGZsb3cgZGF0YSBmcm9tIHRoZSBtb3N0IHJlY2VudCByZXBvcnRlZCBxdWFydGVyLiAqL1xuXG5cbiAgICB0aGlzLmZpbmFuY2lhbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJmaW5hbmNpYWxzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgbGF0ZXN0IG5ld3MgZm9yIGEgZ2l2ZSBzdG9jayBzeW1ib2wgKi9cblxuXG4gICAgdGhpcy5uZXdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibmV3c1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRvcCAxMCBmdW5kIGhvbGRlcnMsIG1lYW5pbmcgYW55IGZpcm0gbm90IGRlZmluZWQgYXMgYnV5LXNpZGUgb3Igc2VsbC1zaWRlIHN1Y2ggYXMgbXV0dWFsIGZ1bmRzLCBwZW5zaW9uIGZ1bmRzLCBlbmRvd21lbnRzLCBpbnZlc3RtZW50IGZpcm1zLCBhbmQgb3RoZXIgbGFyZ2UgZW50aXRpZXMgdGhhdCBtYW5hZ2UgZnVuZHMgb24gYmVoYWxmIG9mIG90aGVycy5cbiAgICAgKi9cblxuXG4gICAgdGhpcy5mdW5kT3duZXJzaGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZnVuZC1vd25lcnNoaXBcIik7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgaW5jb21lIHN0YXRlbWVudCBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5IHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXIuICovXG5cblxuICAgIHRoaXMuaW5jb21lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5jb21lXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIHRvcCAxMCBpbnNpZGVycywgd2l0aCB0aGUgbW9zdCByZWNlbnQgaW5mb3JtYXRpb24uICovXG5cblxuICAgIHRoaXMuaW5zaWRlclJvc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc2lkZXItcm9zdGVyXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYWdncmVnYXRlZCBpbnNpZGVycyBzdW1tYXJ5IGRhdGEgZm9yIHRoZSBsYXN0IDYgbW9udGhzLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJTdW1tYXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zaWRlci1zdW1tYXJ5XCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgaW5zaWRlciB0cmFuc2FjdGlvbnMuICovXG5cblxuICAgIHRoaXMuaW5zaWRlclRyYW5zYWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc2lkZXItdHJhbnNhY3Rpb25zXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgUmV0dXJucyB0aGUgdG9wIDEwIGluc3RpdHV0aW9uYWwgaG9sZGVycywgZGVmaW5lZCBhcyBidXktc2lkZSBvciBzZWxsLXNpZGUgZmlybXMuICovXG5cblxuICAgIHRoaXMuaW5zdGl0dXRpb25hbE93bmVyc2hpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc3RpdHV0aW9uYWwtb3duZXJzaGlwXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgd2lsbCByZXR1cm4gYWdncmVnYXRlZCBpbnRyYWRheSBwcmljZXMgaW4gb25lIG1pbnV0ZSBidWNrZXRzICovXG5cblxuICAgIHRoaXMuaW50cmFkYXlQcmljZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnRyYWRheS1wcmljZXNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBpcyBhIGhlbHBlciBmdW5jdGlvbiwgYnV0IHRoZSBnb29nbGUgQVBJcyB1cmwgaXMgc3RhbmRhcmRpemVkLiAgKi9cblxuXG4gICAgdGhpcy5sb2dvID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibG9nb1wiKTtcbiAgICB9O1xuICAgIC8qKiAgVGhpcyByZXR1cm5zIDE1IG1pbnV0ZSBkZWxheWVkLCBsYXN0IHNhbGUgZWxpZ2libGUgdHJhZGVzLiAqL1xuXG5cbiAgICB0aGlzLmxhcmdlc3RUcmFkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJsYXJnZXN0LXRyYWRlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVuZCBvZiBkYXkgb3B0aW9ucyBkYXRhICovXG5cblxuICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9wdGlvbnNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwZWVyIGdyb3VwICovXG5cblxuICAgIHRoaXMucGVlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwZWVyc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHByZXZpb3VzIGRheSBhZGp1c3RlZCBwcmljZSBkYXRhIGZvciBvbmUgb3IgbW9yZSBzdG9ja3MuICovXG5cblxuICAgIHRoaXMucHJldmlvdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmV2aW91c1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHByaWNlIG9mIGEgc3RvY2sgKi9cblxuXG4gICAgdGhpcy5wcmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByaWNlXCIpO1xuICAgIH07XG4gICAgLyoqIFByb3ZpZGVzIHRoZSBsYXRlc3QgYXZnLCBoaWdoLCBhbmQgbG93IGFuYWx5c3QgcHJpY2UgdGFyZ2V0IGZvciBhIHN5bWJvbC4gKi9cblxuXG4gICAgdGhpcy5wcmljZVRhcmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByaWNlLXRhcmdldFwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHRoZSBvZmZpY2lhbCBvcGVuIGFuZCBjbG9zZSBmb3IgYSBnaXZlIHN5bWJvbC4gVGhlIG9mZmljaWFsIG9wZW4gaXMgYXZhaWxhYmxlIGFzIHNvb24gYXMgOTo0NWFtIEVUIGFuZCB0aGUgb2ZmaWNpYWwgY2xvc2UgYXMgc29vbiBhcyA0OjE1cG0gRVQuIFNvbWUgc3RvY2tzIGNhbiByZXBvcnQgbGF0ZSBvcGVuIG9yIGNsb3NlIHByaWNlcy4gKi9cblxuXG4gICAgdGhpcy5vaGxjID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib2hsY1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAgVGhpcyBlbmRwb2ludCBwcm92aWRlcyBzb2NpYWwgc2VudGltZW50IGRhdGEgZnJvbSBTdG9ja1R3aXRzLiBEYXRhIGNhbiBiZSB2aWV3ZWQgYXMgYSBkYWlseSB2YWx1ZSwgb3IgYnkgbWludXRlIGZvciBhIGdpdmVuIGRhdGUuICovXG5cblxuICAgIHRoaXMuc2VudGltZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2VudGltZW50XCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnF1b3RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicXVvdGVcIik7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgZGF0YSBmcm9tIHRoZSBsYXN0IGZvdXIgbW9udGhzLiAqL1xuXG5cbiAgICB0aGlzLnJlY29tbWVuZGF0aW9uVHJlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicmVjb21tZW5kYXRpb24tdHJlbmRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3RhdHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1ldmVudHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdFYXJuaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWVhcm5pbmdzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nRGl2aWRlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctZGl2aWRlbmRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nU3BsaXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctc3BsaXRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nSVBPcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWlwb3NcIik7XG4gICAgfTtcblxuICAgIHRoaXMuc3BsaXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3BsaXRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnNob3J0SW50ZXJlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzaG9ydC1pbnRlcmVzdFwiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIHJldHVybnMgMTUgbWludXRlIGRlbGF5ZWQgYW5kIDMwIGRheSBhdmVyYWdlIGNvbnNvbGlkYXRlZCB2b2x1bWUgcGVyY2VudGFnZSBvZiBhIHN0b2NrLCBieSBtYXJrZXQuIFRoaXMgY2FsbCB3aWxsIGFsd2F5cyByZXR1cm4gMTMgdmFsdWVzLCBhbmQgd2lsbCBiZSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGN1cnJlbnQgZGF5IHRyYWRpbmcgdm9sdW1lIHBlcmNlbnRhZ2UuICovXG5cblxuICAgIHRoaXMudm9sdW1lQnlWZW51ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInZvbHVtZS1ieS12ZW51ZVwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gU3RvY2tzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTdG9ja3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBUaW1lU2VyaWVzID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVGltZVNlcmllcyhyZXEpIHtcbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgICB0aGlzLnAgPSBcIlBSRU1JVU1fV0FMTFNUUkVFVEhPUklaT05fXCI7XG4gIH1cbiAgLyoqIFRoaXMgaXMgYSBtZWV0aW5nIHdoZXJlIGNvbXBhbnkgZXhlY3V0aXZlcyBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjb21wYW554oCZcyBwZXJmb3JtYW5jZSBhbmQgaXRzIGZ1dHVyZSBwcm9zcGVjdHMuICovXG5cblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hbmFseXN0RGF5ID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QodGhpcy5wICsgXCJBTkFMWVNUX0RBWS9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5ib2FyZE9mRGlyZWN0b3JzTWVldGluZyA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KHRoaXMucCArIFwiQk9BUkRfT0ZfRElSRUNUT1JTX01FRVRJTkcvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYnVzaW5lc3NVcGRhdGUgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdCh0aGlzLnAgKyBcIkJVU0lORVNTX1VQREFURS9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5idXlCYWNrID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QodGhpcy5wICsgXCJCVVlCQUNLL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmNhcGl0YWxNYXJrZXRzRGF5ID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QodGhpcy5wICsgXCJDQVBJVEFMX01BUktFVFNfREFZL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkRGlzdHJpYnV0aW9uID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9kaXN0cmlidXRpb24vXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWREaXZpZGVuZHMgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX2RpdmlkZW5kcy9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFJldHVybk9uQ2FwaXRhbCA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfcmV0dXJuX29mX2NhcGl0YWwvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRSaWdodHMgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3JpZ2h0cy9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFJpZ2h0c1RvUHVyY2hhc2UgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3JpZ2h0X3RvX3B1cmNoYXNlL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkU2VjdXJpdHlSZWNsYXNzaWZpY2F0aW9uID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9zZWN1cml0eV9yZWNsYXNzaWZpY2F0aW9uL1wiICsgdGhpcy5yZXEuc3RvY2tTeW1ib2wgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkU2VjdXJpdHlTd2FwID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9zZWN1cml0eV9zd2FwL1wiICsgdGhpcy5yZXEuc3RvY2tTeW1ib2wgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkU3Bpbk9mZiA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfc3Bpbm9mZi9cIiArIHRoaXMucmVxLnN0b2NrU3ltYm9sICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFNwbGl0cyA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfc3BsaXRzL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIHJldHVybiBUaW1lU2VyaWVzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUaW1lU2VyaWVzOyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9OyAvLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICB9XG59KSgpO1xuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRyYWluaW5nID0gZmFsc2U7XG5cbiAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgfVxuXG4gIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICBkcmFpblF1ZXVlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgaWYgKGRyYWluaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gIGRyYWluaW5nID0gdHJ1ZTtcbiAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblxuICB3aGlsZSAobGVuKSB7XG4gICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgcXVldWUgPSBbXTtcblxuICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIH1cblxuICBjdXJyZW50UXVldWUgPSBudWxsO1xuICBkcmFpbmluZyA9IGZhbHNlO1xuICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICB9XG5cbiAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcblxuICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gIH1cbn07IC8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcblxuXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgdGhpcy5mdW4gPSBmdW47XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cblxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gW107XG59O1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICcvJztcbn07XG5cbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gMDtcbn07IiwiaW1wb3J0IHsgSUVYQ2xvdWRDbGllbnQgfSBmcm9tIFwibm9kZS1pZXgtY2xvdWRcIjtcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcblxuY29uc3QgaWV4ID0gbmV3IElFWENsb3VkQ2xpZW50KGZldGNoLCB7XG4gICAgc2FuZGJveDogdHJ1ZSxcbiAgICBwdWJsaXNoYWJsZTogXCJwa18xNmM1M2Y4NmRjMTY0NThlYTc0ODJlOWE4NjRmMGE5OVwiLFxuICAgIHZlcnNpb246IFwic3RhYmxlXCJcbn0pO1xuXG5cbmF4aW9zLmdldCgnaHR0cHM6Ly9jbG91ZC5pZXhhcGlzLmNvbS9zdGFibGUvc3RvY2svU1EvY2hhcnQvMW0/JmZpbHRlcj1jaGFuZ2VQZXJjZW50LGRhdGUmdG9rZW49cGtfMTZjNTNmODZkYzE2NDU4ZWE3NDgyZTlhODY0ZjBhOTknKVxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG5cbiAgICAgICAgY29uc3QgbW9uZGF5ID0gW1wiMjAyMC0wNi0wMVwiLCBcIjIwMjAtMDYtMDhcIiwgXCIyMDIwLTA2LTE1XCIsIFwiMjAyMC0wNi0yMlwiXVxuICAgICAgICBjb25zdCB0dWVzZGF5ID0gW1wiMjAyMC0wNi0wMlwiLCBcIjIwMjAtMDYtMDlcIiwgXCIyMDIwLTA2LTE2XCIsIFwiMjAyMC0wNi0yM1wiXVxuICAgICAgICBjb25zdCB3ZWRuZXNkYXkgPSBbXCIyMDIwLTA2LTAzXCIsIFwiMjAyMC0wNi0xMFwiLCBcIjIwMjAtMDYtMTdcIiwgXCIyMDIwLTA2LTI0XCJdXG4gICAgICAgIGNvbnN0IHRodXJzZGF5ID0gW1wiMjAyMC0wNi0wNFwiLCBcIjIwMjAtMDYtMTFcIiwgXCIyMDIwLTA2LTE4XCIsIFwiMjAyMC0wNi0yNVwiXVxuICAgICAgICBjb25zdCBmcmlkYXkgPSBbXCIyMDIwLTA2LTA1XCIsIFwiMjAyMC0wNi0xMlwiLCBcIjIwMjAtMDYtMTlcIiwgXCIyMDIwLTA2LTI2XCJdXG5cblxuICAgICAgICBsZXQgbW9uZGF5Q2hhbmdlID0gMFxuICAgICAgICBsZXQgdHVlc2RheUNoYW5nZSA9IDBcbiAgICAgICAgbGV0IHdlZG5lc2RheUNoYW5nZSA9IDBcbiAgICAgICAgbGV0IHRodXJzZGF5Q2hhbmdlID0gMFxuICAgICAgICBsZXQgZnJpZGF5Q2hhbmdlID0gMFxuICAgICAgICBcbiAgICAgICAgbGV0IG1vbmRheUNvdW50ID0gMFxuXG4gICAgICAgIGxldCBtb25kYXlNb250aGx5VG90YWwgPSAwXG5cbiAgICAgIGxldCBzcURhdGEgPSByZXNwb25zZS5kYXRhXG4gICAgICBcbiAgICAgIHNxRGF0YS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBsZXQgZGFpbHlDaGFuZ2UgPSBlbC5jaGFuZ2VQZXJjZW50XG4gICAgICAgICAgbGV0IHF1b3RlRGF0ZSA9IGVsLmRhdGVcbiAgICAgICAgICBcbiAgICAgICAgICBpZihtb25kYXkuaW5jbHVkZXMoZWwuZGF0ZSkpe1xuICAgICAgICAgICAgICBtb25kYXlDb3VudCArPSAxXG4gICAgICAgICAgICAgIG1vbmRheUNoYW5nZSArPSBkYWlseUNoYW5nZVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYWlseUNoYW5nZSwgZWwuZGF0ZSlcbiAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgIFxuXG4gICAgICAgICAgXG4gICAgICB9KVxuICAgIH0pXG5cblxuXG5cblxuXG5cbmNvbnN0IG1vbmRheSA9IFtcIjIwMjAtMDYtMDFcIiwgXCIyMDIwLTA2LTA4XCIsIFwiMjAyMC0wNi0xNVwiLCBcIjIwMjAtMDYtMjJcIl1cbmNvbnN0IHR1ZXNkYXkgPSBbXCIyMDIwLTA2LTAyXCIsIFwiMjAyMC0wNi0wOVwiLCBcIjIwMjAtMDYtMTZcIiwgXCIyMDIwLTA2LTIzXCJdXG5jb25zdCB3ZWRuZXNkYXkgPSBbXCIyMDIwLTA2LTAzXCIsIFwiMjAyMC0wNi0xMFwiLCBcIjIwMjAtMDYtMTdcIiwgXCIyMDIwLTA2LTI0XCJdXG5jb25zdCB0aHVyc2RheSA9IFtcIjIwMjAtMDYtMDRcIiwgXCIyMDIwLTA2LTExXCIsIFwiMjAyMC0wNi0xOFwiLCBcIjIwMjAtMDYtMjVcIl1cbmNvbnN0IGZyaWRheSA9IFtcIjIwMjAtMDYtMDVcIiwgXCIyMDIwLTA2LTEyXCIsIFwiMjAyMC0wNi0xOVwiLCBcIjIwMjAtMDYtMjZcIl1cblxuXG5sZXQgbW9uZGF5Q2hhbmdlID0gMFxubGV0IHR1ZXNkYXlDaGFuZ2UgPSAwXG5sZXQgd2VkbmVzZGF5Q2hhbmdlID0gMFxubGV0IHRodXJzZGF5Q2hhbmdlID0gMFxubGV0IGZyaWRheUNoYW5nZSA9IDBcblxuXG5cblxuXG5cblxuXG5cbiAgICBcblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=