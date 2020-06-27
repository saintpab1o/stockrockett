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
  var tuesdayCount = 0;
  var wednesdayCount = 0;
  var thursdayCount = 0;
  var fridayCount = 0;
  var mondayMonthlyPercent = 0;
  var tuesdayMonthlyPercent = 0;
  var wednesdayMonthlyPercent = 0;
  var thursdayMonthlyPercent = 0;
  var fridayMonthlyPercent = 0;
  var sqData = response.data;
  sqData.forEach(function (el) {
    var dailyChange = el.changePercent;
    var quoteDate = el.date;

    if (monday.includes(el.date)) {
      mondayCount += 1;
      mondayChange += dailyChange;
      mondayMonthlyPercent = mondayChange / mondayCount;
    } else if (tuesday.includes(el.date)) {
      tuesdayCount += 1;
      tuesdayChange += dailyChange;
      tuesdayMonthlyPercent = tuesdayChange / tuesdayCount;
    } else if (wednesday.includes(el.date)) {
      wednesdayCount += 1;
      wednesdayChange += dailyChange;
      wednesdayMonthlyPercent = wednesdayChange / wednesdayCount;
    } else if (thursday.includes(el.date)) {
      thursdayCount += 1;
      thursdayChange += dailyChange;
      thursdayMonthlyPercent = thursdayChange / thursdayCount;
    } else if (friday.includes(el.date)) {
      fridayCount += 1;
      fridayChange += dailyChange;
      fridayMonthlyPercent = fridayChange / fridayCount;
    }
  });
  console.log(mondayMonthlyPercent);
  console.log(tuesdayMonthlyPercent);
  console.log(wednesdayMonthlyPercent);
  console.log(thursdayMonthlyPercent);
  console.log(fridayMonthlyPercent);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9iYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2NyeXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2RhdGFQb2ludHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9kZWVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvZm9yZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9pZXhDbG91ZENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvbWFya2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvcmVmZXJlbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL3N0YXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvc3RvY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9zdG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi90aW1lU2VyaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlleCIsIklFWENsb3VkQ2xpZW50IiwiZmV0Y2giLCJzYW5kYm94IiwicHVibGlzaGFibGUiLCJ2ZXJzaW9uIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJtb25kYXkiLCJ0dWVzZGF5Iiwid2VkbmVzZGF5IiwidGh1cnNkYXkiLCJmcmlkYXkiLCJtb25kYXlDaGFuZ2UiLCJ0dWVzZGF5Q2hhbmdlIiwid2VkbmVzZGF5Q2hhbmdlIiwidGh1cnNkYXlDaGFuZ2UiLCJmcmlkYXlDaGFuZ2UiLCJtb25kYXlDb3VudCIsInR1ZXNkYXlDb3VudCIsIndlZG5lc2RheUNvdW50IiwidGh1cnNkYXlDb3VudCIsImZyaWRheUNvdW50IiwibW9uZGF5TW9udGhseVBlcmNlbnQiLCJ0dWVzZGF5TW9udGhseVBlcmNlbnQiLCJ3ZWRuZXNkYXlNb250aGx5UGVyY2VudCIsInRodXJzZGF5TW9udGhseVBlcmNlbnQiLCJmcmlkYXlNb250aGx5UGVyY2VudCIsInNxRGF0YSIsImRhdGEiLCJmb3JFYWNoIiwiZWwiLCJkYWlseUNoYW5nZSIsImNoYW5nZVBlcmNlbnQiLCJxdW90ZURhdGUiLCJkYXRlIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjs7QUFFdkMsZUFBZSxtQkFBTyxDQUFD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Q0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUMvV2E7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7Ozs7QUNsUWE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQseUI7Ozs7Ozs7Ozs7OztBQ2xDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELDZCOzs7Ozs7Ozs7Ozs7QUM1QmE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELGdDOzs7Ozs7Ozs7Ozs7QUNqRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELDZCOzs7Ozs7Ozs7Ozs7QUN4VGE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsNkI7Ozs7Ozs7Ozs7OztBQ3BDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxhQUFhLG1CQUFPLENBQUMseURBQVE7O0FBRTdCLG1CQUFtQixtQkFBTyxDQUFDLHFFQUFjOztBQUV6QyxjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CLGNBQWMsbUJBQU8sQ0FBQywyREFBUzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87OztBQUdQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7Ozs7QUN4V2E7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQsY0FBYyxtQkFBTyxDQUFDLDJEQUFTOztBQUUvQixjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQseUI7Ozs7Ozs7Ozs7OztBQy9RYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCw2Qjs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFF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LFdBQWpCO0FBQ0FSLDJCQUFxQixHQUFJVixhQUFhLEdBQUdLLFlBQXpDO0FBRUgsS0FMTSxNQUtBLElBQUdULFNBQVMsQ0FBQzBCLFFBQVYsQ0FBbUJMLEVBQUUsQ0FBQ0ksSUFBdEIsQ0FBSCxFQUErQjtBQUNsQ2Ysb0JBQWMsSUFBSSxDQUFsQjtBQUNBTCxxQkFBZSxJQUFJaUIsV0FBbkI7QUFDQVAsNkJBQXVCLEdBQUlWLGVBQWUsR0FBR0ssY0FBN0M7QUFFSCxLQUxNLE1BS0EsSUFBR1QsUUFBUSxDQUFDeUIsUUFBVCxDQUFrQkwsRUFBRSxDQUFDSSxJQUFyQixDQUFILEVBQThCO0FBQ2pDZCxtQkFBYSxJQUFJLENBQWpCO0FBQ0FMLG9CQUFjLElBQUlnQixXQUFsQjtBQUNBTiw0QkFBc0IsR0FBSVYsY0FBYyxHQUFHSyxhQUEzQztBQUVILEtBTE0sTUFLQSxJQUFHVCxNQUFNLENBQUN3QixRQUFQLENBQWdCTCxFQUFFLENBQUNJLElBQW5CLENBQUgsRUFBNEI7QUFDL0JiLGlCQUFXLElBQUksQ0FBZjtBQUNBTCxrQkFBWSxJQUFJZSxXQUFoQjtBQUNBTCwwQkFBb0IsR0FBSVYsWUFBWSxHQUFHSyxXQUF2QztBQUVIO0FBRUosR0FoQ0Q7QUFpQ0llLFNBQU8sQ0FBQ0MsR0FBUixDQUFZZixvQkFBWjtBQUNBYyxTQUFPLENBQUNDLEdBQVIsQ0FBWWQscUJBQVo7QUFDQWEsU0FBTyxDQUFDQyxHQUFSLENBQVliLHVCQUFaO0FBQ0FZLFNBQU8sQ0FBQ0MsR0FBUixDQUFZWixzQkFBWjtBQUNBVyxTQUFPLENBQUNDLEdBQVIsQ0FBWVgsb0JBQVo7QUFDUCxDQXRFRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG5cbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG5cbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTsgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcblxuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0OyAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG5cbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcblxuXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuXG5cbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcblxuXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG5cblxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSB0aW1lb3V0XG5cblxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcblxuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpOyAvLyBBZGQgeHNyZiBoZWFkZXJcblxuXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID8gY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9IC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG5cblxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfSAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG5cblxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfSAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfSAvLyBTZW5kIHRoZSByZXF1ZXN0XG5cblxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcblxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7IC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpOyAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcblxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuICByZXR1cm4gaW5zdGFuY2U7XG59IC8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuXG5cbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTsgLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5cbmF4aW9zLkF4aW9zID0gQXhpb3M7IC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcblxuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07IC8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuXG5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpOyAvLyBFeHBvc2UgYWxsL3NwcmVhZFxuXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7IC8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxuXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xuXG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuXG5cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cblxuXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7IC8vIFNldCBjb25maWcubWV0aG9kXG5cbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9IC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcblxuXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59OyAvLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcblxuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG5cbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcblxudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuXG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307IC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcblxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoY29uZmlnLmRhdGEsIGNvbmZpZy5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVxdWVzdCk7IC8vIEZsYXR0ZW4gaGVhZGVyc1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LCBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSwgY29uZmlnLmhlYWRlcnMpO1xuICB1dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLCBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgfSk7XG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZXNwb25zZS5kYXRhLCByZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVhc29uLnJlc3BvbnNlLmRhdGEsIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcblxuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gZXJyb3I7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gWydiYXNlVVJMJywgJ3VybCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLCAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLCAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnbWF4Q29udGVudExlbmd0aCcsICd2YWxpZGF0ZVN0YXR1cycsICdtYXhSZWRpcmVjdHMnLCAnaHR0cEFnZW50JywgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCddO1xuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5cy5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cyk7XG4gIHZhciBvdGhlcktleXMgPSBPYmplY3Qua2V5cyhjb25maWcyKS5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgfSk7XG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBmdW5jdGlvbiBvdGhlcktleXNEZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb25maWc7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuXG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5jb25maWcsIG51bGwsIHJlc3BvbnNlLnJlcXVlc3QsIHJlc3BvbnNlKSk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcblxuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fCB1dGlscy5pc1N0cmVhbShkYXRhKSB8fCB1dGlscy5pc0ZpbGUoZGF0YSkgfHwgdXRpbHMuaXNCbG9iKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIElnbm9yZSAqL1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csICcrJykucmVwbGFjZSgvJTVCL2dpLCAnWycpLnJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpIDogYmFzZVVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB2YXIgb3JpZ2luVVJMO1xuICAvKipcbiAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICBpZiAobXNpZSkge1xuICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICB9XG5cbiAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTsgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgcGF0aG5hbWU6IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOiAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgIH07XG4gIH1cblxuICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgLyoqXG4gICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgKi9cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICB2YXIgcGFyc2VkID0gdXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICByZXR1cm4gcGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiYgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0O1xuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7IC8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5cblxudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gWydhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJywgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLCAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J107XG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcGFyc2VkO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKSAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHZhbCAmJiB2YWwuYnVmZmVyICYmIHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cblxuXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fCBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cblxuXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG5cblxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1lcmdlKClcbi8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqL1xue1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEZ1bmN0aW9uIGVxdWFsIHRvIG1lcmdlIHdpdGggdGhlIGRpZmZlcmVuY2UgYmVpbmcgdGhhdCBubyByZWZlcmVuY2VcbiAqIHRvIG9yaWdpbmFsIG9iamVjdHMgaXMga2VwdC5cbiAqXG4gKiBAc2VlIG1lcmdlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5cblxuZnVuY3Rpb24gZGVlcE1lcmdlKClcbi8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqL1xue1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cblxuXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEJhdGNoID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQmF0Y2gocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogcmV0dXJucyBiYWxhbmNlIHNoZWV0IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHkgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlclxuICAgICAqIGBEYXRhIFdlaWdodDogMzAwMGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5iYWxhbmNlU2hlZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJiYWxhbmNlLXNoZWV0XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgYm9vayB2YWx1ZSBmb3IgYSBnaXZlbiBzdG9ja1xuICAgICAqIGBEYXRhIFdlaWdodDogMSBwZXIgcXVvdGUgcmV0dXJuZWRgXG4gICAgICovXG5cblxuICAgIHRoaXMuYm9vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImJvb2tcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBjYXNoIGZsb3cgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSwgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlci5cbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEsMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jYXNoRmxvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImNhc2gtZmxvd1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFkanVzdGVkIGFuZCB1bmFkanVzdGVkIGhpc3RvcmljYWwgZGF0YSBmb3IgdXAgdG8gMTUgeWVhcnMuXG4gICAgICogYERhdGEgV2VpZ2h0OiAxLDAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuY2hhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJjaGFydFwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuY2VvQ29tcGVuc2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiY2VvLWNvbXBlbnNhdGlvblwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogcmV0dXJucyBkYXRhIG9uIGEgZ2l2ZW4gY29tcGFueVxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEgcGVyIHN5bWJvbGAgKi9cblxuXG4gICAgdGhpcy5jb21wYW55ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiY29tcGFueVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsYXllZFF1b3RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiZGVsYXllZC1xdW90ZVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuZGl2aWRlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiZGl2aWRlbmRzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVhcm5pbmdzIGRhdGEgZm9yIGEgZ2l2ZW4gY29tcGFueSBpbmNsdWRpbmcgdGhlIGFjdHVhbCBFUFMsIGNvbnNlbnN1cywgYW5kIGZpc2NhbCBwZXJpb2QuIEVhcm5pbmdzIGFyZSBhdmFpbGFibGUgcXVhcnRlcmx5IChsYXN0IDQgcXVhcnRlcnMpLlxuICAgICAqL1xuXG5cbiAgICB0aGlzLmVhcm5pbmdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiZWFybmluZ3NcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFByb3ZpZGVzIHRoZSBsYXRlc3QgY29uc2Vuc3VzIGVzdGltYXRlIGZvciB0aGUgbmV4dCBmaXNjYWwgcGVyaW9kICovXG5cblxuICAgIHRoaXMuZXN0aW1hdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiZXN0aW1hdGVzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBQdWxscyBpbmNvbWUgc3RhdGVtZW50LCBiYWxhbmNlIHNoZWV0LCBhbmQgY2FzaCBmbG93IGRhdGEgZnJvbSB0aGUgbW9zdCByZWNlbnQgcmVwb3J0ZWQgcXVhcnRlci4gKi9cblxuXG4gICAgdGhpcy5maW5hbmNpYWxzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiZmluYW5jaWFsc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBsYXRlc3QgbmV3cyBmb3IgYSBnaXZlIHN0b2NrIHN5bWJvbCAqL1xuXG5cbiAgICB0aGlzLm5ld3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJuZXdzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRvcCAxMCBmdW5kIGhvbGRlcnMsIG1lYW5pbmcgYW55IGZpcm0gbm90IGRlZmluZWQgYXMgYnV5LXNpZGUgb3Igc2VsbC1zaWRlIHN1Y2ggYXMgbXV0dWFsIGZ1bmRzLCBwZW5zaW9uIGZ1bmRzLCBlbmRvd21lbnRzLCBpbnZlc3RtZW50IGZpcm1zLCBhbmQgb3RoZXIgbGFyZ2UgZW50aXRpZXMgdGhhdCBtYW5hZ2UgZnVuZHMgb24gYmVoYWxmIG9mIG90aGVycy5cbiAgICAgKi9cblxuXG4gICAgdGhpcy5mdW5kT3duZXJzaGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiZnVuZC1vd25lcnNoaXBcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGluY29tZSBzdGF0ZW1lbnQgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyLiAqL1xuXG5cbiAgICB0aGlzLmluY29tZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImluY29tZVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyB0aGUgdG9wIDEwIGluc2lkZXJzLCB3aXRoIHRoZSBtb3N0IHJlY2VudCBpbmZvcm1hdGlvbi4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyUm9zdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiaW5zaWRlLXJvc3RlclwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhZ2dyZWdhdGVkIGluc2lkZXJzIHN1bW1hcnkgZGF0YSBmb3IgdGhlIGxhc3QgNiBtb250aHMuICovXG5cblxuICAgIHRoaXMuaW5zaWRlclN1bW1hcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJpbnNpZGUtc3VtbWFyeVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuaW5zaWRlclRyYW5zYWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImluc2lkZS10cmFuc2FjdGlvbnNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgUmV0dXJucyB0aGUgdG9wIDEwIGluc3RpdHV0aW9uYWwgaG9sZGVycywgZGVmaW5lZCBhcyBidXktc2lkZSBvciBzZWxsLXNpZGUgZmlybXMuICovXG5cblxuICAgIHRoaXMuaW5zdGl0dXRpb25hbE93bmVyc2hpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImluc3RpdHV0aW9uYWxPd25lcnNoaXBcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24sIGJ1dCB0aGUgZ29vZ2xlIEFQSXMgdXJsIGlzIHN0YW5kYXJkaXplZC4gICovXG5cblxuICAgIHRoaXMubG9nbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImxvZ29cIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgd2lsbCByZXR1cm4gYWdncmVnYXRlZCBpbnRyYWRheSBwcmljZXMgaW4gb25lIG1pbnV0ZSBidWNrZXRzICovXG5cblxuICAgIHRoaXMuaW50cmFkYXlQcmljZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJpbnRyYWRheS1wcmljZXNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqICBUaGlzIHJldHVybnMgMTUgbWludXRlIGRlbGF5ZWQsIGxhc3Qgc2FsZSBlbGlnaWJsZSB0cmFkZXMuICovXG5cblxuICAgIHRoaXMubGFyZ2VzdFRyYWRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImxhcmdlc3QtdHJhZGVzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVuZCBvZiBkYXkgb3B0aW9ucyBkYXRhICovXG5cblxuICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcIm9wdGlvbnNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcGVlciBncm91cCAqL1xuXG5cbiAgICB0aGlzLnBlZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wicGVlcnNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcHJldmlvdXMgZGF5IGFkanVzdGVkIHByaWNlIGRhdGEgZm9yIG9uZSBvciBtb3JlIHN0b2Nrcy4gKi9cblxuXG4gICAgdGhpcy5wcmV2aW91cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInByZXZpb3VzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHByaWNlIG9mIGEgc3RvY2sgKi9cblxuXG4gICAgdGhpcy5wcmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInByaWNlXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBQcm92aWRlcyB0aGUgbGF0ZXN0IGF2ZywgaGlnaCwgYW5kIGxvdyBhbmFseXN0IHByaWNlIHRhcmdldCBmb3IgYSBzeW1ib2wuICovXG5cblxuICAgIHRoaXMucHJpY2VUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJwcmljZS10YXJnZXRcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIG9mZmljaWFsIG9wZW4gYW5kIGNsb3NlIGZvciBhIGdpdmUgc3ltYm9sLiBUaGUgb2ZmaWNpYWwgb3BlbiBpcyBhdmFpbGFibGUgYXMgc29vbiBhcyA5OjQ1YW0gRVQgYW5kIHRoZSBvZmZpY2lhbCBjbG9zZSBhcyBzb29uIGFzIDQ6MTVwbSBFVC4gU29tZSBzdG9ja3MgY2FuIHJlcG9ydCBsYXRlIG9wZW4gb3IgY2xvc2UgcHJpY2VzLiAqL1xuXG5cbiAgICB0aGlzLm9obGMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJvaGxjXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHByb3ZpZGVzIHNvY2lhbCBzZW50aW1lbnQgZGF0YSBmcm9tIFN0b2NrVHdpdHMuIERhdGEgY2FuIGJlIHZpZXdlZCBhcyBhIGRhaWx5IHZhbHVlLCBvciBieSBtaW51dGUgZm9yIGEgZ2l2ZW4gZGF0ZS4gKi9cblxuXG4gICAgdGhpcy5zZW50aW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJzZW50aW1lbnRcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLnF1b3RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wicXVvdGVcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGRhdGEgZnJvbSB0aGUgbGFzdCBmb3VyIG1vbnRocy4gKi9cblxuXG4gICAgdGhpcy5yZWNvbW1lbmRhdGlvblRyZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInJlY29tbWVuZGF0aW9uLXRyZW5kc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJzdGF0c1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcblxuICAgIHRoaXMuc3BsaXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wic3BsaXRzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBUaGlzIHJldHVybnMgMTUgbWludXRlIGRlbGF5ZWQgYW5kIDMwIGRheSBhdmVyYWdlIGNvbnNvbGlkYXRlZCB2b2x1bWUgcGVyY2VudGFnZSBvZiBhIHN0b2NrLCBieSBtYXJrZXQuIFRoaXMgY2FsbCB3aWxsIGFsd2F5cyByZXR1cm4gMTMgdmFsdWVzLCBhbmQgd2lsbCBiZSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGN1cnJlbnQgZGF5IHRyYWRpbmcgdm9sdW1lIHBlcmNlbnRhZ2UuICovXG5cblxuICAgIHRoaXMudm9sdW1lQnlWZW51ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInZvbHVtZS1ieS12ZW51ZVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogcmV0dXJuIGJhdGNoIHJlcXVlc3RzIHVzaW5nIHRoZSByYW5nZSBtZXRob2QgKi9cblxuXG4gICAgdGhpcy5yYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSwgbGFzdCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXNwb25zZShfdGhpcy5yZXEuYmF0Y2hQYXJhbXMsIF90aGlzLmJhdGNoaW5nLCBcIiZyYW5nZT1cIiArIChyYW5nZSA/IHJhbmdlIDogXCIxbVwiKSArIFwiJmxhc3Q9XCIgKyAobGFzdCA/IGxhc3QgOiAwKSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICAgIHRoaXMuYmF0Y2hpbmcgPSBbXTtcbiAgfVxuXG4gIHJldHVybiBCYXRjaDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQmF0Y2g7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBDcnlwdG8gPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDcnlwdG8ocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuYm9vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImJvb2tcIik7XG4gICAgfTtcblxuICAgIHRoaXMucHJpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmljZVwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5xdW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInF1b3RlXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLmV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNyeXB0b0V2ZW50c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gQ3J5cHRvO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDcnlwdG87IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBEYXRhUG9pbnRzID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRGF0YVBvaW50cyhyZXEpIHtcbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIERhdGFQb2ludHMucHJvdG90eXBlLm1hcmtldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcIm1hcmtldC9cIiArIHRoaXMucmVxLnN0b2NrU3ltYm9sKTtcbiAgfTtcblxuICBEYXRhUG9pbnRzLnByb3RvdHlwZS50cmVhc3VyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcIm1hcmtldC9cIiArIHRoaXMucmVxLnN0b2NrU3ltYm9sKTtcbiAgfTtcblxuICBEYXRhUG9pbnRzLnByb3RvdHlwZS5lbmVyZ3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJlbmVyZ3kvXCIgKyB0aGlzLnJlcS5zdG9ja1N5bWJvbCk7XG4gIH07XG5cbiAgcmV0dXJuIERhdGFQb2ludHM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERhdGFQb2ludHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBEZWVwID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRGVlcChyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5zeW1ib2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJcIik7XG4gICAgfTtcbiAgICAvKiogREVFUCBicm9hZGNhc3RzIGFuIEF1Y3Rpb24gSW5mb3JtYXRpb24gTWVzc2FnZSBldmVyeSBvbmUgc2Vjb25kIGJldHdlZW4gdGhlIExvY2staW4gVGltZSBhbmQgdGhlIGF1Y3Rpb24gbWF0Y2ggZm9yIE9wZW5pbmcgYW5kIENsb3NpbmcgQXVjdGlvbnMsIGFuZCBkdXJpbmcgdGhlIERpc3BsYXkgT25seSBQZXJpb2QgZm9yIElQTywgSGFsdCwgYW5kIFZvbGF0aWxpdHkgQXVjdGlvbnMuIE9ubHkgSUVYIGxpc3RlZCBzZWN1cml0aWVzIGFyZSBlbGlnaWJsZSBmb3IgSUVYIEF1Y3Rpb25zLiAqL1xuXG5cbiAgICB0aGlzLmF1Y3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJhdWN0aW9uXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLmJvb2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJib29rXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLm9wSGFsdFN0YXR1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9wLWhhbHQtc3RhdHVzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLm9mZmljaWFsUHJpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvZmZpY2lhbC1wcmljZVwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZWN1cml0eUV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2VjdXJpdHktZXZlbnRcIik7XG4gICAgfTtcbiAgICAvKiogSW4gYXNzb2NpYXRpb24gd2l0aCBSdWxlIDIwMSBvZiBSZWd1bGF0aW9uIFNITywgdGhlIFNob3J0IFNhbGUgUHJpY2UgVGVzdCBtZXNzYWdlIGlzIHVzZWQgdG8gaW5kaWNhdGUgd2hlbiBhIFNob3J0IFNhbGUgUHJpY2UgVGVzdCByZXN0cmljdGlvbiBpcyBpbiBlZmZlY3QgZm9yIGEgc2VjdXJpdHkuXG4gICAgKi9cblxuXG4gICAgdGhpcy5zc3JTdGF0dXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzc3Itc3RhdHVzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoZSBTeXN0ZW0gRXZlbnQgbWVzc2FnZSBpcyB1c2VkIHRvIGluZGljYXRlIGV2ZW50cyB0aGF0IGFwcGx5IHRvIHRoZSBtYXJrZXQgb3IgdGhlIGRhdGEgZmVlZC4gKi9cblxuXG4gICAgdGhpcy5zeXN0ZW1FdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNzci1zdGF0dXNcIik7XG4gICAgfTtcbiAgICAvKiogVHJhZGUgcmVwb3J0IG1lc3NhZ2VzIGFyZSBzZW50IHdoZW4gYW4gb3JkZXIgb24gdGhlIElFWCBPcmRlciBCb29rIGlzIGV4ZWN1dGVkIGluIHdob2xlIG9yIGluIHBhcnQuIERFRVAgc2VuZHMgYSBUcmFkZSByZXBvcnQgbWVzc2FnZSBmb3IgZXZlcnkgaW5kaXZpZHVhbCBmaWxsLiAqL1xuXG5cbiAgICB0aGlzLnRyYWRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInRyYWRlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUcmFkZSBicmVhayBtZXNzYWdlcyBhcmUgc2VudCB3aGVuIGFuIGV4ZWN1dGlvbiBvbiBJRVggaXMgYnJva2VuIG9uIHRoYXQgc2FtZSB0cmFkaW5nIGRheS4gVHJhZGUgYnJlYWtzIGFyZSByYXJlIGFuZCBvbmx5IGFmZmVjdCBhcHBsaWNhdGlvbnMgdGhhdCByZWx5IHVwb24gSUVYIGV4ZWN1dGlvbiBiYXNlZCBkYXRhLiAqL1xuXG5cbiAgICB0aGlzLnRyYWRlQnJlYWtzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidHJhZGUtYnJlYWtzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoZSBUcmFkaW5nIHN0YXR1cyBtZXNzYWdlIGlzIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGN1cnJlbnQgdHJhZGluZyBzdGF0dXMgb2YgYSBzZWN1cml0eS4gRm9yIElFWC1saXN0ZWQgc2VjdXJpdGllcywgSUVYIGFjdHMgYXMgdGhlIHByaW1hcnkgbWFya2V0IGFuZCBoYXMgdGhlIGF1dGhvcml0eSB0byBpbnN0aXR1dGUgYSB0cmFkaW5nIGhhbHQgb3IgdHJhZGluZyBwYXVzZSBpbiBhIHNlY3VyaXR5IGR1ZSB0byBuZXdzIGRpc3NlbWluYXRpb24gb3IgcmVndWxhdG9yeSByZWFzb25zLiBGb3Igbm9uLUlFWC1saXN0ZWQgc2VjdXJpdGllcywgSUVYIGFiaWRlcyBieSBhbnkgcmVndWxhdG9yeSB0cmFkaW5nIGhhbHRzIGFuZCB0cmFkaW5nIHBhdXNlcyBpbnN0aXR1dGVkIGJ5IHRoZSBwcmltYXJ5IG9yIGxpc3RpbmcgbWFya2V0LCBhcyBhcHBsaWNhYmxlLiAqL1xuXG5cbiAgICB0aGlzLnRyYWRpbmdTdGF0dXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ0cmFkaW5nLXN0YXR1c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gRGVlcDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRGVlcDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIEZvcmV4ID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRm9yZXgocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogVGhpcyBlbmRwb2ludCBwcm92aWRlcyBhbiBlbmQgb2YgZGF5IGV4Y2hhbmdlIHJhdGUgb2YgYSBnaXZlbiBjdXJyZW5jeSBwYWlyICovXG5cblxuICAgIHRoaXMucmF0ZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInJhdGUvXCIgKyBwYXJhbXMuZnJvbSArIFwiL1wiICsgcGFyYW1zLnRvKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHJldHVybnMgcmVhbC10aW1lIGZvcmVpZ24gY3VycmVuY3kgZXhjaGFuZ2UgcmF0ZXMgZGF0YSB1cGRhdGVkIGV2ZXJ5IDI1MCBtaWxsaXNlY29uZHMuICovXG5cblxuICAgIHRoaXMubGF0ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibGF0ZXN0P3N5bWJvbHM9XCIgKyBfdGhpcy5yZXEuc3RvY2tTeW1ib2xzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jb252ZXJ0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICB2YXIgYW1vdW50ID0gX2EuYW1vdW50LFxuICAgICAgICAgIHN5bWJvbHMgPSBfYS5zeW1ib2xzO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY29udmVydD9zeW1ib2xzPVwiICsgKHN5bWJvbHMgPyBzeW1ib2xzIDogX3RoaXMucmVxLnN0b2NrU3ltYm9scykgKyAoYW1vdW50ID8gXCImYW1vdW50PVwiICsgYW1vdW50IDogXCJcIikpO1xuICAgIH07XG5cbiAgICB0aGlzLmhpc3RvcmljYWwgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgIHZhciBmcm9tID0gX2EuZnJvbSxcbiAgICAgICAgICB0byA9IF9hLnRvLFxuICAgICAgICAgIG9uID0gX2Eub24sXG4gICAgICAgICAgZmlyc3QgPSBfYS5maXJzdCxcbiAgICAgICAgICBmaWx0ZXIgPSBfYS5maWx0ZXIsXG4gICAgICAgICAgc3ltYm9scyA9IF9hLnN5bWJvbHMsXG4gICAgICAgICAgbGFzdCA9IF9hLmxhc3Q7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJoaXN0b3JpY2FsP3N5bWJvbHM9XCIgKyBfdGhpcy5yZXEuc3RvY2tTeW1ib2xzICsgKGxhc3QgPyBcIiZsYXN0PVwiICsgbGFzdCA6IFwiXCIpICsgKGZyb20gPyBcIiZmcm9tPVwiICsgZnJvbSA6IFwiXCIpICsgKHRvID8gXCImdG89XCIgKyB0byA6IFwiXCIpICsgKG9uID8gXCImb249XCIgOiBcIlwiKSArIChmaXJzdCA/IFwiJmZpcnN0PVwiIDogXCJcIikgKyAoZmlsdGVyID8gXCImZmlsdGVyPVwiICsgZmlsdGVyIDogXCJcIikpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBGb3JleDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRm9yZXg7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBjcnlwdG9fMSA9IHJlcXVpcmUoXCIuL2NyeXB0b1wiKTtcblxudmFyIHN0b2NrXzEgPSByZXF1aXJlKFwiLi9zdG9ja1wiKTtcblxudmFyIHN0b2Nrc18xID0gcmVxdWlyZShcIi4vc3RvY2tzXCIpO1xuXG52YXIgbWFya2V0XzEgPSByZXF1aXJlKFwiLi9tYXJrZXRcIik7XG5cbnZhciByZWZlcmVuY2VfMSA9IHJlcXVpcmUoXCIuL3JlZmVyZW5jZVwiKTtcblxudmFyIGRhdGFQb2ludHNfMSA9IHJlcXVpcmUoXCIuL2RhdGFQb2ludHNcIik7XG5cbnZhciB0aW1lU2VyaWVzXzEgPSByZXF1aXJlKFwiLi90aW1lU2VyaWVzXCIpO1xuXG52YXIgc3RhdHNfMSA9IHJlcXVpcmUoXCIuL3N0YXRzXCIpO1xuXG52YXIgcmVxdWVzdF8xID0gcmVxdWlyZShcIi4vcmVxdWVzdFwiKTtcblxudmFyIGZvcmV4XzEgPSByZXF1aXJlKFwiLi9mb3JleFwiKTtcblxudmFyIElFWENsb3VkQ2xpZW50ID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSUVYQ2xvdWRDbGllbnQoZiwgY29uZmlnKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogIFRha2VzIGluIGEgc3RvY2sgc3ltYm9sLCBhIHVuaXF1ZSBzZXJpZXMgb2YgbGV0dGVycyBhc3NpZ25lZCB0byBhIHNlY3VyaXR5ICAgKi9cblxuXG4gICAgdGhpcy5zeW1ib2wgPSBmdW5jdGlvbiAoc3ltYm9sKSB7XG4gICAgICBfdGhpcy5yZXEuc3RvY2tTeW1ib2wgPSBzeW1ib2w7XG4gICAgICByZXR1cm4gbmV3IHN0b2NrXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG4gICAgLyoqIFRha2VzIGluIG11bHRpcGxlIHN0b2NrIHN5bWJvbHMsIGFuZCBiYXRjaGVzIHRoZW0gdG8gYSBzaW5nbGUgcmVxdWVzdCAgKi9cblxuXG4gICAgdGhpcy5iYXRjaFN5bWJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzeW1ib2xzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICB9XG5cbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwic3RvY2svbWFya2V0L2JhdGNoXCI7XG4gICAgICBfdGhpcy5yZXEuc3RvY2tTeW1ib2xzID0gc3ltYm9scztcbiAgICAgIHJldHVybiBuZXcgc3RvY2tzXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG4gICAgLyoqIFRha2VzIGluIG11bHRpcGxlIHN0b2NrIHN5bWJvbHMsIGFuZCBiYXRjaGVzIHRoZW0gdG8gYSBzaW5nbGUgcmVxdWVzdCAgKi9cblxuXG4gICAgdGhpcy5zeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN5bWJvbHMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3ltYm9sc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInN0b2NrL21hcmtldC9iYXRjaFwiO1xuICAgICAgY29uc29sZS53YXJuKFwiVGhpcyBtZXRob2Qgd2lsbCBiZSBkZXByZWNhdGVkIHBsZWFzZSB1c2UgYmF0Y2hTeW1ib2xzIHRvIGJhdGNoIG11bHRpcGxlIHN0b2NrIHN5bWJvbHMgdG9nZXRoZXJcIik7XG4gICAgICBfdGhpcy5yZXEuc3RvY2tTeW1ib2xzID0gc3ltYm9scztcbiAgICAgIHJldHVybiBuZXcgc3RvY2tzXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLnRvcHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInRvcHNcIjtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIlwiKTtcbiAgICB9O1xuICAgIC8qKiAgVGFrZXMgaW4gYSBjcnlwdG8gY3VycmVuY3kgICAqL1xuXG5cbiAgICB0aGlzLmNyeXB0byA9IGZ1bmN0aW9uIChjcnlwdG8pIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwiY3J5cHRvXCI7XG4gICAgICBfdGhpcy5yZXEuY3J5cHRvQ3VycmVuY3kgPSBjcnlwdG87XG4gICAgICByZXR1cm4gbmV3IGNyeXB0b18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tYXJrZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInN0b2NrL21hcmtldFwiO1xuICAgICAgcmV0dXJuIG5ldyBtYXJrZXRfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMuZm9yZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcImZ4XCI7XG4gICAgICByZXR1cm4gbmV3IGZvcmV4XzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlZkRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInJlZi1kYXRhXCI7XG4gICAgICByZXR1cm4gbmV3IHJlZmVyZW5jZV8xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy5kYXRhUG9pbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJkYXRhLXBvaW50c1wiO1xuICAgICAgcmV0dXJuIG5ldyBkYXRhUG9pbnRzXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJzdGF0c1wiO1xuICAgICAgcmV0dXJuIG5ldyBzdGF0c18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy50aW1lU2VyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJ0aW1lLXNlcmllc1wiO1xuICAgICAgcmV0dXJuIG5ldyB0aW1lU2VyaWVzXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG4gICAgLyoqICBSZXR1cm5zIGFuIGFycmF5IG9mIHN5bWJvbHMgdXAgdG8gdGhlIHRvcCAxMCBtYXRjaGVzLlxuICAgICAqIFJlc3VsdHMgd2lsbCBiZSBzb3J0ZWQgZm9yIHJlbGV2YW5jeS4gU2VhcmNoIGN1cnJlbnRseSBkZWZhdWx0cyB0byBlcXVpdGllcyBvbmx5LCB3aGVyZSB0aGUgc3ltYm9sIHJldHVybmVkIGlzIHN1cHBvcnRlZCBieSBlbmRwb2ludHMgbGlzdGVkIHVuZGVyIHRoZSBTdG9ja3MgY2F0ZWdvcnkuXG4gICAgICogQHBhcmFtcyBzZWFyY2ggYnkgc3ltYm9sIG9yIHNlY3VyaXR5IG5hbWUuXG4gICAgICovXG5cblxuICAgIHRoaXMuc2VhcmNoID0gZnVuY3Rpb24gKHN5bWJvbCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJzZWFyY2hcIjtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChzeW1ib2wpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IG5ldyByZXF1ZXN0XzEuZGVmYXVsdChmLmJpbmQodGhpcyksIGNvbmZpZyk7XG4gIH1cblxuICByZXR1cm4gSUVYQ2xvdWRDbGllbnQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IElFWENsb3VkQ2xpZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgaWV4Q2xvdWRDbGllbnRfMSA9IHJlcXVpcmUoXCIuL2lleENsb3VkQ2xpZW50XCIpO1xuXG5leHBvcnRzLklFWENsb3VkQ2xpZW50ID0gaWV4Q2xvdWRDbGllbnRfMS5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0ID0gaWV4Q2xvdWRDbGllbnRfMS5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgTWFya2V0ID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWFya2V0KHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIFJldHVybnMgYW4gYXJyYXkgb2YgcXVvdGUgb2JqZWN0cyBmb3IgYSBnaXZlbiBjb2xsZWN0aW9uIHR5cGUuIEN1cnJlbnRseSBzdXBwb3J0ZWQgY29sbGVjdGlvbiB0eXBlcyBhcmUgc2VjdG9yLCB0YWcsIGFuZCBsaXN0ICovXG5cblxuICAgIHRoaXMuY29sbGVjdGlvbiA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgdmFyIHBhcmFtID0gX2EucGFyYW0sXG4gICAgICAgICAgY29sbGVjdGlvbk5hbWUgPSBfYS5jb2xsZWN0aW9uTmFtZTtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNvbGxlY3Rpb24vXCIgKyBwYXJhbSArIFwiP2NvbGxlY3Rpb25OYW1lPVwiICsgY29sbGVjdGlvbk5hbWUpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZWFybmluZ3MgdGhhdCB3aWxsIGJlIHJlcG9ydGVkIHRvZGF5IGFzIHRocmVlIGFycmF5czogYmVmb3JlIHRoZSBvcGVuIGJ0bywgYWZ0ZXIgbWFya2V0IGNsb3NlIGFtYyBhbmQgZHVyaW5nIHRoZSB0cmFkaW5nIGRheSBvdGhlci4gRWFjaCBhcnJheSBjb250YWlucyBhbiBvYmplY3Qgd2l0aCBhbGwga2V5cyBmcm9tIGVhcm5pbmdzLCBhIHF1b3RlIG9iamVjdCwgYW5kIGEgaGVhZGxpbmUga2V5LiAqL1xuXG5cbiAgICB0aGlzLnRvZGF5RWFybmluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ0b2RheS1lYXJuaW5nc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIHJldHVybnMgYSBsaXN0IG9mIHVwY29taW5nIElQT3Mgc2NoZWR1bGVkIGZvciB0aGUgY3VycmVudCBhbmQgbmV4dCBtb250aC4gVGhlIHJlc3BvbnNlIGlzIHNwbGl0IGludG8gdHdvIHN0cnVjdHVyZXM6IHJhd0RhdGEgYW5kIHZpZXdEYXRhLiByYXdEYXRhIHJlcHJlc2VudHMgYWxsIGF2YWlsYWJsZSBkYXRhIGZvciBhbiBJUE8uIHZpZXdEYXRhIHJlcHJlc2VudHMgZGF0YSBzdHJ1Y3R1cmVkIGZvciBkaXNwbGF5IHRvIGEgdXNlci4gKi9cblxuXG4gICAgdGhpcy51cGNvbWluZ0lQT3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1pcG9zXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgcmV0dXJucyBhIGxpc3Qgb2YgdG9kYXkgSVBPcyBzY2hlZHVsZWQgZm9yIHRoZSBjdXJyZW50IGFuZCBuZXh0IG1vbnRoLiBUaGUgcmVzcG9uc2UgaXMgc3BsaXQgaW50byB0d28gc3RydWN0dXJlczogcmF3RGF0YSBhbmQgdmlld0RhdGEuIHJhd0RhdGEgcmVwcmVzZW50cyBhbGwgYXZhaWxhYmxlIGRhdGEgZm9yIGFuIElQTy4gdmlld0RhdGEgcmVwcmVzZW50cyBkYXRhIHN0cnVjdHVyZWQgZm9yIGRpc3BsYXkgdG8gYSB1c2VyLiAqL1xuXG5cbiAgICB0aGlzLnRvZGF5SVBPcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInRvZGF5LWlwb3NcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBlbmRwb2ludCByZXR1cm5zIHJlYWwgdGltZSB0cmFkZWQgdm9sdW1lIG9uIFUuUy4gbWFya2V0cy4gKi9cblxuXG4gICAgdGhpcy52b2x1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ2b2x1bWVcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyByZXR1cm5zIGFuIGFycmF5IG9mIGVhY2ggc2VjdG9yIGFuZCBwZXJmb3JtYW5jZSBmb3IgdGhlIGN1cnJlbnQgdHJhZGluZyBkYXkuIFBlcmZvcm1hbmNlIGlzIGJhc2VkIG9uIGVhY2ggc2VjdG9yIEVURi4gKi9cblxuXG4gICAgdGhpcy5zZWN0b3JQZXJmb3JtYW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNlY3Rvci1wZXJmb3JtYW5jZVwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFuIGFycmF5IG9mIHF1b3RlcyBmb3IgdGhlIHRvcCAxMCBzeW1ib2xzIGluIGEgc3BlY2lmaWVkIGxpc3QuICovXG5cblxuICAgIHRoaXMubGlzdCA9IGZ1bmN0aW9uIChsaXN0VHlwZSwgX2EpIHtcbiAgICAgIHZhciBkaXNwbGF5UGVyY2VudCA9IF9hLmRpc3BsYXlQZXJjZW50LFxuICAgICAgICAgIGxpc3RMaW1pdCA9IF9hLmxpc3RMaW1pdDtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImxpc3RcIiArIGxpc3RUeXBlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gTWFya2V0O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNYXJrZXQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBSZWZlcmVuY2VEYXRhID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUmVmZXJlbmNlRGF0YShyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiBUaGlzIGNhbGwgcmV0dXJucyBhbiBhcnJheSBvZiBzeW1ib2xzIHRoYXQgSUVYIENsb3VkIHN1cHBvcnRzIGZvciBBUEkgY2FsbHMuICovXG5cblxuICAgIHRoaXMuc3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInN5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhbiBhcnJheSBvZiB0YWdzLiBUYWdzIGNhbiBiZSBmb3VuZCBvbiBlYWNoIGNvbXBhbnkuICovXG5cblxuICAgIHRoaXMudGFncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInRhZ3NcIik7XG4gICAgfTtcblxuICAgIHRoaXMuY3J5cHRvU3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNyeXB0by9zeW1ib2xzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLmZ4U3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwicmVmLWRhdGFcIjtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImZ4L3N5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBjYWxsIHJldHVybnMgYW4gYXJyYXkgb2Ygc3ltYm9scyB0aGUgSW52ZXN0b3JzIEV4Y2hhbmdlIHN1cHBvcnRzIGZvciB0cmFkaW5nLiBUaGlzIGxpc3QgaXMgdXBkYXRlZCBkYWlseSBhcyBvZiA3OjQ1IGEubS4gRVQuIFN5bWJvbHMgbWF5IGJlIGFkZGVkIG9yIHJlbW92ZWQgYnkgdGhlIEludmVzdG9ycyBFeGNoYW5nZSBhZnRlciB0aGUgbGlzdCB3YXMgcHJvZHVjZWQuICovXG5cblxuICAgIHRoaXMuaWV4U3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImlleC9zeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgY2FsbCByZXR1cm5zIGFuIGFycmF5IG9mIGludGVybmF0aW9uYWwgc3ltYm9scyB0aGF0IElFWCBDbG91ZCBzdXBwb3J0cyBmb3IgQVBJIGNhbGxzLiAqL1xuXG5cbiAgICB0aGlzLmludGVybmF0aW9uYWxTeW1ib2xzID0gZnVuY3Rpb24gKHJlZ2lvbiwgZXhjaGFuZ2UpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChyZWdpb24gPyBcInJlZ2lvbi9cIiArIHJlZ2lvbiArIFwiL3N5bWJvbHNcIiA6IFwiZXhjaGFuZ2UvXCIgKyBleGNoYW5nZSArIFwiL3N5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhbiBhcnJheSBvZiBleGNoYW5nZXMuICovXG5cblxuICAgIHRoaXMuZXhjaGFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZXhjaGFuZ2VzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgY2FsbCByZXR1cm5zIGFuIGFycmF5IG9mIG11dHVhbCBmdW5kIHN5bWJvbHMgdGhhdCBJRVggQ2xvdWQgc3VwcG9ydHMgZm9yIEFQSSBjYWxscy4gKi9cblxuXG4gICAgdGhpcy5tdXR1YWxGdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm11dHVhbC1mdW5kcy9zeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgY2FsbCByZXR1cm5zIGFuIG9iamVjdCBrZXllZCBieSBzeW1ib2wgd2l0aCB0aGUgdmFsdWUgb2YgZWFjaCBzeW1ib2wgYmVpbmcgYW4gYXJyYXkgb2YgYXZhaWxhYmxlIGNvbnRyYWN0IGRhdGVzLiAqL1xuXG5cbiAgICB0aGlzLm9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvcHRpb25zL3N5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBjYWxsIHJldHVybnMgYW4gYXJyYXkgb2YgT1RDIHN5bWJvbHMgdGhhdCBJRVggQ2xvdWQgc3VwcG9ydHMgZm9yIEFQSSBjYWxscy4gKi9cblxuXG4gICAgdGhpcy5vdGMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvdGMvc3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFuIGFycmF5IG9mIHNlY3RvcnMuICovXG5cblxuICAgIHRoaXMuc2VjdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNlY3RvcnNcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIFJlZmVyZW5jZURhdGE7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlZmVyZW5jZURhdGE7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfX2F3YWl0ZXIgPSB0aGlzICYmIHRoaXMuX19hd2FpdGVyIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHtcbiAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQudmFsdWUpO1xuICAgICAgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTtcbiAgICB9XG5cbiAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufTtcblxudmFyIF9fZ2VuZXJhdG9yID0gdGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0ge1xuICAgIGxhYmVsOiAwLFxuICAgIHNlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTtcbiAgICAgIHJldHVybiB0WzFdO1xuICAgIH0sXG4gICAgdHJ5czogW10sXG4gICAgb3BzOiBbXVxuICB9LFxuICAgICAgZixcbiAgICAgIHksXG4gICAgICB0LFxuICAgICAgZztcbiAgcmV0dXJuIGcgPSB7XG4gICAgbmV4dDogdmVyYigwKSxcbiAgICBcInRocm93XCI6IHZlcmIoMSksXG4gICAgXCJyZXR1cm5cIjogdmVyYigyKVxuICB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGc7XG5cbiAgZnVuY3Rpb24gdmVyYihuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gc3RlcChbbiwgdl0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuXG4gICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG5cbiAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgdCA9IG9wO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBfLmxhYmVsKys7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBvcFsxXSxcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgfTtcblxuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgXy5sYWJlbCsrO1xuICAgICAgICAgIHkgPSBvcFsxXTtcbiAgICAgICAgICBvcCA9IFswXTtcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgb3AgPSBfLm9wcy5wb3AoKTtcblxuICAgICAgICAgIF8udHJ5cy5wb3AoKTtcblxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHtcbiAgICAgICAgICAgIF8gPSAwO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCBvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkge1xuICAgICAgICAgICAgXy5sYWJlbCA9IG9wWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7XG4gICAgICAgICAgICBfLmxhYmVsID0gdFsxXTtcbiAgICAgICAgICAgIHQgPSBvcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7XG4gICAgICAgICAgICBfLmxhYmVsID0gdFsyXTtcblxuICAgICAgICAgICAgXy5vcHMucHVzaChvcCk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcblxuICAgICAgICAgIF8udHJ5cy5wb3AoKTtcblxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBvcCA9IFs2LCBlXTtcbiAgICAgIHkgPSAwO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBmID0gdCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLFxuICAgICAgZG9uZTogdHJ1ZVxuICAgIH07XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBJRVhSZXF1ZXN0ID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSUVYUmVxdWVzdChmZXRjaEZ1bmMsIF9hKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBwdWJsaXNoYWJsZSA9IF9hLnB1Ymxpc2hhYmxlLFxuICAgICAgICBfYiA9IF9hLnNhbmRib3gsXG4gICAgICAgIHNhbmRib3ggPSBfYiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfYixcbiAgICAgICAgX2MgPSBfYS52ZXJzaW9uLFxuICAgICAgICB2ZXJzaW9uID0gX2MgPT09IHZvaWQgMCA/IFwiYmV0YVwiIDogX2M7XG5cbiAgICB0aGlzLnNldFRva2VuID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICByZXR1cm4gX3RoaXMuc2FuZGJveCAmJiB0b2tlblswXSAhPT0gXCJUXCIgPyBcIlRcIiArIHRva2VuIDogdG9rZW47XG4gICAgfTtcblxuICAgIHRoaXMucGFyYW1zID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHBhcmFtcyA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbnYgPSBfdGhpcy5zYW5kYm94ID8gXCJzYW5kYm94XCIgOiBcImNsb3VkXCI7XG4gICAgICB2YXIgdXJsID0gXCJodHRwczovL1wiICsgZW52ICsgXCIuaWV4YXBpcy5jb20vXCIgKyBfdGhpcy52ZXJzaW9uICsgXCIvXCIgKyBfdGhpcy5kYXRhdHlwZTtcbiAgICAgIHZhciBvcGVyYW5kID0gcGFyYW1zLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcP1wiLCBcImdcIikpO1xuICAgICAgdmFyIHEgPSBvcGVyYW5kICYmIG9wZXJhbmRbMF0gPT09IFwiP1wiID8gXCImXCIgOiBcIj9cIjtcblxuICAgICAgdmFyIHBrID0gXCJ0b2tlbj1cIiArIF90aGlzLnNldFRva2VuKF90aGlzLnB1Ymxpc2hhYmxlKTtcblxuICAgICAgdmFyIHJlcXVlc3QgPSB1cmwgKyBcIi9cIiArIF90aGlzLnN0b2NrU3ltYm9sICsgXCIvXCIgKyBwYXJhbXMgKyBxICsgcGs7XG5cbiAgICAgIGlmIChfdGhpcy5kYXRhdHlwZSA9PT0gXCJkZWVwXCIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RfMSA9IHVybCArIFwiL1wiICsgcGFyYW1zICsgXCI/c3ltYm9scz1cIiArIF90aGlzLnN0b2NrU3ltYm9sICsgXCImXCIgKyBwaztcbiAgICAgICAgX3RoaXMuZGF0YXR5cGUgPSBcInN0b2NrXCI7XG4gICAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICAgIHJldHVybiByZXF1ZXN0XzE7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5kYXRhdHlwZSA9PT0gXCJzdG9jay9tYXJrZXQvYmF0Y2hcIikge1xuICAgICAgICB2YXIgcmVxdWVzdF8yID0gdXJsICsgXCI/c3ltYm9scz1cIiArIF90aGlzLnN0b2NrU3ltYm9scy5tYXAoZnVuY3Rpb24gKHN5bWJvbCkge1xuICAgICAgICAgIHJldHVybiBzeW1ib2w7XG4gICAgICAgIH0pICsgXCImdHlwZXM9XCIgKyBwYXJhbXMgKyBcIiZcIiArIHBrO1xuICAgICAgICBfdGhpcy5kYXRhdHlwZSA9IFwic3RvY2tcIjtcbiAgICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RfMjtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLmRhdGF0eXBlID09PSBcImNyeXB0b1wiKSB7XG4gICAgICAgIHZhciByZXF1ZXN0XzMgPSB1cmwgKyBcIi9cIiArIF90aGlzLmNyeXB0b0N1cnJlbmN5ICsgXCIvXCIgKyBwYXJhbXMgKyBxICsgcGs7XG4gICAgICAgIF90aGlzLmRhdGF0eXBlID0gXCJzdG9ja1wiO1xuICAgICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgICByZXR1cm4gcmVxdWVzdF8zO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuZGF0YXR5cGUgPT09IFwidG9wc1wiIHx8IF90aGlzLmRhdGF0eXBlID09PSBcInN0b2NrL21hcmtldFwiIHx8IF90aGlzLmRhdGF0eXBlID09PSBcImZ4XCIgfHwgX3RoaXMuZGF0YXR5cGUgPT09IFwic3RhdHNcIiB8fCBfdGhpcy5kYXRhdHlwZSA9PT0gXCJzZWFyY2hcIiB8fCBfdGhpcy5kYXRhdHlwZSA9PT0gXCJ0aW1lLXNlcmllc1wiIHx8IF90aGlzLmRhdGF0eXBlID09PSBcInJlZi1kYXRhXCIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RfNCA9IHVybCArIFwiL1wiICsgcGFyYW1zICsgcSArIHBrO1xuICAgICAgICBfdGhpcy5kYXRhdHlwZSA9IFwic3RvY2tcIjtcbiAgICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RfNDtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH07XG5cbiAgICB0aGlzLmJhdGNoUGFyYW1zID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHR5cGVzID0gW107XG5cbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHR5cGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICB9XG5cbiAgICAgIHZhciBlbnYgPSBfdGhpcy5zYW5kYm94ID8gXCJzYW5kYm94XCIgOiBcImNsb3VkXCI7XG4gICAgICB2YXIgdXJsID0gXCJodHRwczovL1wiICsgZW52ICsgXCIuaWV4YXBpcy5jb20vXCIgKyBfdGhpcy52ZXJzaW9uICsgXCIvXCIgKyBfdGhpcy5kYXRhdHlwZTtcblxuICAgICAgdmFyIHN5bWJvbHMgPSBcIlwiICsgX3RoaXMuc3RvY2tTeW1ib2xzLm1hcChmdW5jdGlvbiAoc3ltYm9sKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2w7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGJhdGNoVHlwZXMgPSBcInR5cGVzPVwiICsgdHlwZXMubWFwKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfSkgKyBcIiZ0b2tlbj1cIiArIF90aGlzLnNldFRva2VuKF90aGlzLnB1Ymxpc2hhYmxlKTtcblxuICAgICAgdmFyIHJlcXVlc3Q7XG5cbiAgICAgIGlmIChfdGhpcy5kYXRhdHlwZSA9PT0gXCJzdG9jay9tYXJrZXQvYmF0Y2hcIikge1xuICAgICAgICByZXF1ZXN0ID0gdXJsICsgXCIvYmF0Y2g/c3ltYm9scz1cIiArIHN5bWJvbHMgKyBcIiZcIiArIGJhdGNoVHlwZXM7XG4gICAgICAgIF90aGlzLmRhdGF0eXBlID0gXCJzdG9ja1wiO1xuICAgICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdCA9IHVybCArIFwiL1wiICsgX3RoaXMuc3RvY2tTeW1ib2wgKyBcIi9iYXRjaD9cIiArIGJhdGNoVHlwZXM7XG4gICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgfTtcblxuICAgIHRoaXMucmVxdWVzdCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXNwb25zZShfdGhpcy5wYXJhbXMsIHBhcmFtcyk7XG4gICAgfTtcblxuICAgIHRoaXMucmVzcG9uc2UgPSBmdW5jdGlvbiAocmVxLCBwYXJhbXMsIHJhbmdlKSB7XG4gICAgICByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbiwgcmVzLCBjb250ZW50VHlwZSwgZXJyb3IsIGVycl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDYsLCA3XSk7XG5cbiAgICAgICAgICAgICAgbiA9IHJhbmdlID8gcmFuZ2UgOiBcIlwiO1xuICAgICAgICAgICAgICByZXR1cm4gWzRcbiAgICAgICAgICAgICAgLyp5aWVsZCovXG4gICAgICAgICAgICAgICwgdGhpcy5mZXRjaEZ1bmMocmVxKHBhcmFtcyArIG4pKV07XG5cbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICBpZiAoISh0eXBlb2YgcmVzLmhlYWRlcnMuZ2V0ID09PSBcImZ1bmN0aW9uXCIpKSByZXR1cm4gWzNcbiAgICAgICAgICAgICAgLypicmVhayovXG4gICAgICAgICAgICAgICwgNV07XG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gcmVzLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuICAgICAgICAgICAgICBpZiAoIShjb250ZW50VHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpKSByZXR1cm4gWzNcbiAgICAgICAgICAgICAgLypicmVhayovXG4gICAgICAgICAgICAgICwgM107XG4gICAgICAgICAgICAgIHJldHVybiBbNFxuICAgICAgICAgICAgICAvKnlpZWxkKi9cbiAgICAgICAgICAgICAgLCByZXMuanNvbigpXTtcblxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gWzJcbiAgICAgICAgICAgICAgLypyZXR1cm4qL1xuICAgICAgICAgICAgICAsIF9hLnNlbnQoKV07XG5cbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgaWYgKCEocmVzLnN0YXR1cyA+PSA0MDApKSByZXR1cm4gWzNcbiAgICAgICAgICAgICAgLypicmVhayovXG4gICAgICAgICAgICAgICwgNV07XG4gICAgICAgICAgICAgIHJldHVybiBbNFxuICAgICAgICAgICAgICAvKnlpZWxkKi9cbiAgICAgICAgICAgICAgLCByZXMudGV4dCgpXTtcblxuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBlcnJvciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICByZXR1cm4gWzJcbiAgICAgICAgICAgICAgLypyZXR1cm4qL1xuICAgICAgICAgICAgICAsIHJlcy5kYXRhXTtcblxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFsyXG4gICAgICAgICAgICAgIC8qcmV0dXJuKi9cbiAgICAgICAgICAgICAgLCBlcnJfMS5yZXNwb25zZSA/IGVycl8xLnJlc3BvbnNlLmRhdGEgOiBlcnJfMV07XG5cbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgcmV0dXJuIFsyXG4gICAgICAgICAgICAgIC8qcmV0dXJuKi9cbiAgICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZmV0Y2hGdW5jID0gZmV0Y2hGdW5jLCB0aGlzLnB1Ymxpc2hhYmxlID0gcHVibGlzaGFibGUsIHRoaXMudmVyc2lvbiA9IHZlcnNpb24sIHRoaXMuc2FuZGJveCA9IHNhbmRib3gsIHRoaXMuZGF0YXR5cGUgPSBcInN0b2NrXCIsIHRoaXMuY3J5cHRvQ3VycmVuY3kgPSBcIlwiLCB0aGlzLnN0b2NrU3ltYm9sID0gXCJcIiwgdGhpcy5zdG9ja1N5bWJvbHMgPSBbXSwgdGhpcy5yZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0O1xuICB9XG5cbiAgcmV0dXJuIElFWFJlcXVlc3Q7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IElFWFJlcXVlc3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBTdGF0aXN0aWNzID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RhdGlzdGljcyhyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiBSZXR1cm5zIGRhaWx5IHN0YXRzIGZvciBhIGdpdmVuIHRpbWUgZnJhbWUgKi9cblxuXG4gICAgdGhpcy5oaXN0b3JpY2FsID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImhpc3RvcmljYWwvXCIgKyAoZGF0ZSA/IFwiL1wiICsgZGF0ZSA6IFwiXCIpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbnRyYWRheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImludHJhZGF5XCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlY2VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInJlY2VudFwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWNvcmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicmVjb3Jkc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gU3RhdGlzdGljcztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGlzdGljczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGRlZXBfMSA9IHJlcXVpcmUoXCIuL2RlZXBcIik7XG5cbnZhciB0aW1lU2VyaWVzXzEgPSByZXF1aXJlKFwiLi90aW1lU2VyaWVzXCIpO1xuXG52YXIgZm9yZXhfMSA9IHJlcXVpcmUoXCIuL2ZvcmV4XCIpO1xuXG52YXIgYmF0Y2hfMSA9IHJlcXVpcmUoXCIuL2JhdGNoXCIpO1xuXG52YXIgU3RvY2sgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdG9jayhyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiByZXR1cm5zIGJhbGFuY2Ugc2hlZXQgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyXG4gICAgICogYERhdGEgV2VpZ2h0OiAzMDAwYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmJhbGFuY2VTaGVldCA9IGZ1bmN0aW9uIChwZXJpb2QsIGxhc3QpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImJhbGFuY2Utc2hlZXRcIiArIChwZXJpb2QgPyBcIj9wZXJpb2Q9XCIgKyBwZXJpb2QgOiBcIlwiKSArIChsYXN0ID8gXCImbGFzdD1cIiArIGxhc3QgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKiogYmF0Y2ggcmV0dXJucyBtdWx0aXBlIGRhdGEtdHlwZXMgZm9yIGEgZ2l2ZSBzdG9jayBzeW1ib2wgKi9cbiAgICAvLyBwdWJsaWMgYmF0Y2ggPSAoLi4ucGFyYW1zOiBhbnkpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIC8vICAgcmV0dXJuIHRoaXMucmVxLnJlc3BvbnNlKHRoaXMucmVxLmJhdGNoUGFyYW1zLCBwYXJhbXMpO1xuICAgIC8vIH07XG5cbiAgICAvKiogYmF0Y2ggcmV0dXJucyBtdWx0aXBlIGRhdGEtdHlwZXMgZm9yIGEgZ2l2ZSBzdG9jayBzeW1ib2wgKi9cblxuXG4gICAgdGhpcy5iYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5pZXhCYXRjaDtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJkZWVwXCI7XG4gICAgICByZXR1cm4gX3RoaXMuaWV4RGVlcDtcbiAgICB9O1xuXG4gICAgdGhpcy50aW1lU2VyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJ0aW1lLXNlcmllc1wiO1xuICAgICAgcmV0dXJuIF90aGlzLnRpbWVzZXJpZXM7XG4gICAgfTtcblxuICAgIHRoaXMuZm9yZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcImZ4XCI7XG4gICAgICByZXR1cm4gX3RoaXMuaWV4Rm9yZXg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGJvb2sgdmFsdWUgZm9yIGEgZ2l2ZW4gc3RvY2tcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEgcGVyIHF1b3RlIHJldHVybmVkYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmJvb2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJib29rXCIpO1xuICAgIH07XG4gICAgLyoqIFRPUFMgcHJvdmlkZXMgSUVY4oCZcyBhZ2dyZWdhdGVkIGJlc3QgcXVvdGVkIGJpZCBhbmQgb2ZmZXIgcG9zaXRpb24gaW4gbmVhciByZWFsIHRpbWUgZm9yIGFsbCBzZWN1cml0aWVzIG9uIElFWOKAmXMgZGlzcGxheWVkIGxpbWl0IG9yZGVyIGJvb2suIFRPUFMgaXMgaWRlYWwgZm9yIGRldmVsb3BlcnMgbmVlZGluZyBib3RoIHF1b3RlIGFuZCB0cmFkZSBkYXRhLiAqL1xuXG5cbiAgICB0aGlzLnRvcHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInRvcHNcIjtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChfdGhpcy5yZXEuc3RvY2tTeW1ib2xzID8gXCI/c3ltYm9scz1cIiArIF90aGlzLnJlcS5zdG9ja1N5bWJvbHMgOiBcIlwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWRqdXN0ZWQgYW5kIHVuYWRqdXN0ZWQgaGlzdG9yaWNhbCBkYXRhIGZvciB1cCB0byAxNSB5ZWFycy5cbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEsMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jaGFydCA9IGZ1bmN0aW9uIChyYW5nZSwgcGFyYW1zKSB7XG4gICAgICAvLyBpZiByYW5nZSBpcyAnZGF0ZScgJiB0aGVyZSdzIGEgJ2RhdGUnIHBhcmFtXG4gICAgICBpZiAocmFuZ2UgPT09IFwiZGF0ZVwiICYmIHBhcmFtcyAmJiBwYXJhbXMuZGF0ZSkge1xuICAgICAgICB2YXIga2V5c18xID0gT2JqZWN0LmtleXMocGFyYW1zKTtcbiAgICAgICAgdmFyIHBhcmFtc1N0cmluZyA9IGtleXNfMS5sZW5ndGggPiAxID8gXCI/XCIgKyBrZXlzXzEucmVkdWNlKGZ1bmN0aW9uIChzdHIsIGtleSwgaSkge1xuICAgICAgICAgIGlmIChrZXkgIT09IFwiZGF0ZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIHN0ciArIGtleSArIFwiPVwiICsgcGFyYW1zW2tleV0gKyAoaSA8IGtleXNfMS5sZW5ndGggLSAxID8gXCImXCIgOiBcIlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9LCBcIlwiKSA6IFwiXCI7XG4gICAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNoYXJ0L1wiICsgcmFuZ2UgKyBcIi9cIiArIHBhcmFtcy5kYXRlICsgcGFyYW1zU3RyaW5nKTtcbiAgICAgIH0gLy8gaW4gYW55IG90aGVyIGNhc2VcblxuXG4gICAgICB2YXIgdmFsdWVzID0gcGFyYW1zICYmIE9iamVjdC5lbnRyaWVzKHBhcmFtcyk7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjaGFydC9cIiArIHJhbmdlICsgKHBhcmFtcyA/IFwiP1wiICsgdmFsdWVzLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdlswXSArIFwiPVwiICsgdlsxXTtcbiAgICAgIH0pLmpvaW4oXCImXCIpIDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBjYXNoIGZsb3cgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSwgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlci5cbiAgICAgKlxuICAgICAqIGBEYXRhIFdlaWdodDogMSwwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNhc2hGbG93ID0gZnVuY3Rpb24gKHBlcmlvZCwgbGFzdCkge1xuICAgICAgaWYgKHBlcmlvZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHBlcmlvZCA9IFwicXVhcnRlcmx5XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNhc2gtZmxvdz9wZXJpb2Q9XCIgKyBwZXJpb2QgKyBcIiZsYXN0PVwiICsgbGFzdCk7XG4gICAgfTtcbiAgICAvKiogcmV0dXJucyBDZW8gQ29tcGVuc2F0aW9uICovXG5cblxuICAgIHRoaXMuY2VvQ29tcGVuc2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2VvLWNvbXBlbnNhdGlvblwiKTtcbiAgICB9O1xuICAgIC8qKiByZXR1cm5zIGRhdGEgb24gYSBnaXZlbiBjb21wYW55XG4gICAgICogIGBEYXRhIFdlaWdodDogMSBwZXIgc3ltYm9sYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNvbXBhbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjb21wYW55XCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIGBEYXRhIFdlaWdodDogMSBwZXIgc3ltYm9sIHBlciBxdW90ZWBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5kZWxheWVkUXVvdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJkZWxheWVkLXF1b3RlXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogYERhdGEgV2VpZ2h0OiAxMCBwZXIgc3ltYm9sIHBlciBwZXJpb2QgcmV0dXJuZWRgXG4gICAgICovXG5cblxuICAgIHRoaXMuZGl2aWRlbmRzID0gZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJkaXZpZGVuZHNcIiArIChyYW5nZSA/IFwiL1wiICsgcmFuZ2UgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlYXJuaW5ncyBkYXRhIGZvciBhIGdpdmVuIGNvbXBhbnkgaW5jbHVkaW5nIHRoZSBhY3R1YWwgRVBTLCBjb25zZW5zdXMsIGFuZCBmaXNjYWwgcGVyaW9kLiBFYXJuaW5ncyBhcmUgYXZhaWxhYmxlIHF1YXJ0ZXJseSAobGFzdCA0IHF1YXJ0ZXJzKS5cbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5lYXJuaW5ncyA9IGZ1bmN0aW9uIChsYXN0LCBmaWVsZCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZWFybmluZ3NcIiArIChsYXN0ID8gXCIvXCIgKyBsYXN0IDogXCJcIikgKyAoZmllbGQgPyBcIi9cIiArIGZpZWxkIDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqIFByb3ZpZGVzIHRoZSBsYXRlc3QgY29uc2Vuc3VzIGVzdGltYXRlIGZvciB0aGUgbmV4dCBmaXNjYWwgcGVyaW9kICovXG5cblxuICAgIHRoaXMuZXN0aW1hdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZXN0aW1hdGVzXCIpO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGluY29tZSBzdGF0ZW1lbnQsIGJhbGFuY2Ugc2hlZXQsIGFuZCBjYXNoIGZsb3cgZGF0YSBmcm9tIHRoZSBtb3N0IHJlY2VudCByZXBvcnRlZCBxdWFydGVyLiAqL1xuXG5cbiAgICB0aGlzLmZpbmFuY2lhbHMgPSBmdW5jdGlvbiAocGVyaW9kKSB7XG4gICAgICBpZiAocGVyaW9kID09PSB2b2lkIDApIHtcbiAgICAgICAgcGVyaW9kID0gXCJxdWFydGVybHlcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZmluYW5jaWFscz9wZXJpb2Q9XCIgKyBwZXJpb2QpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgbGF0ZXN0IG5ld3MgZm9yIGEgZ2l2ZSBzdG9jayBzeW1ib2wgKi9cblxuXG4gICAgdGhpcy5uZXdzID0gZnVuY3Rpb24gKGxhc3QpIHtcbiAgICAgIGlmIChsYXN0ID09PSB2b2lkIDApIHtcbiAgICAgICAgbGFzdCA9IDEwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJuZXdzL2xhc3QvXCIgKyBsYXN0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRvcCAxMCBmdW5kIGhvbGRlcnMsIG1lYW5pbmcgYW55IGZpcm0gbm90IGRlZmluZWQgYXMgYnV5LXNpZGUgb3Igc2VsbC1zaWRlIHN1Y2ggYXMgbXV0dWFsIGZ1bmRzLCBwZW5zaW9uIGZ1bmRzLCBlbmRvd21lbnRzLCBpbnZlc3RtZW50IGZpcm1zLCBhbmQgb3RoZXIgbGFyZ2UgZW50aXRpZXMgdGhhdCBtYW5hZ2UgZnVuZHMgb24gYmVoYWxmIG9mIG90aGVycy5cbiAgICAgKi9cblxuXG4gICAgdGhpcy5mdW5kT3duZXJzaGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZnVuZC1vd25lcnNoaXBcIik7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgaW5jb21lIHN0YXRlbWVudCBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5IHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXIuICovXG5cblxuICAgIHRoaXMuaW5jb21lID0gZnVuY3Rpb24gKHBlcmlvZCwgbGFzdCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5jb21lXCIgKyAocGVyaW9kID8gXCI/cGVyaW9kPVwiICsgcGVyaW9kIDogXCJcIikgKyAobGFzdCA/IFwiJmxhc3Q9XCIgKyBsYXN0IDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIHRvcCAxMCBpbnNpZGVycywgd2l0aCB0aGUgbW9zdCByZWNlbnQgaW5mb3JtYXRpb24uICovXG5cblxuICAgIHRoaXMuaW5zaWRlclJvc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc2lkZXItcm9zdGVyXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYWdncmVnYXRlZCBpbnNpZGVycyBzdW1tYXJ5IGRhdGEgZm9yIHRoZSBsYXN0IDYgbW9udGhzLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJTdW1tYXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zaWRlci1zdW1tYXJ5XCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgaW5zaWRlciB0cmFuc2FjdGlvbnMuICovXG5cblxuICAgIHRoaXMuaW5zaWRlclRyYW5zYWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc2lkZXItdHJhbnNhY3Rpb25zXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgUmV0dXJucyB0aGUgdG9wIDEwIGluc3RpdHV0aW9uYWwgaG9sZGVycywgZGVmaW5lZCBhcyBidXktc2lkZSBvciBzZWxsLXNpZGUgZmlybXMuICovXG5cblxuICAgIHRoaXMuaW5zdGl0dXRpb25hbE93bmVyc2hpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc3RpdHV0aW9uYWwtb3duZXJzaGlwXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgd2lsbCByZXR1cm4gYWdncmVnYXRlZCBpbnRyYWRheSBwcmljZXMgaW4gb25lIG1pbnV0ZSBidWNrZXRzICovXG5cblxuICAgIHRoaXMuaW50cmFkYXlQcmljZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnRyYWRheS1wcmljZXNcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBpcyBhIGhlbHBlciBmdW5jdGlvbiwgYnV0IHRoZSBnb29nbGUgQVBJcyB1cmwgaXMgc3RhbmRhcmRpemVkLiAgKi9cblxuXG4gICAgdGhpcy5sb2dvID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibG9nb1wiKTtcbiAgICB9O1xuICAgIC8qKiAgVGhpcyByZXR1cm5zIDE1IG1pbnV0ZSBkZWxheWVkLCBsYXN0IHNhbGUgZWxpZ2libGUgdHJhZGVzLiAqL1xuXG5cbiAgICB0aGlzLmxhcmdlc3RUcmFkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJsYXJnZXN0LXRyYWRlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVuZCBvZiBkYXkgb3B0aW9ucyBkYXRhICovXG5cblxuICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uIChleHBpcmF0aW9uLCBvcHRpb25TaWRlKSB7XG4gICAgICBpZiAoZXhwaXJhdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGV4cGlyYXRpb24gPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvcHRpb25zXCIgKyAoZXhwaXJhdGlvbiA/IFwiL1wiICsgZXhwaXJhdGlvbiA6IFwiXCIpICsgKG9wdGlvblNpZGUgPyBcIi9cIiArIG9wdGlvblNpZGUgOiBcIlwiKSk7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwZWVyIGdyb3VwICovXG5cblxuICAgIHRoaXMucGVlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwZWVyc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHByZXZpb3VzIGRheSBhZGp1c3RlZCBwcmljZSBkYXRhIGZvciBvbmUgb3IgbW9yZSBzdG9ja3MuICovXG5cblxuICAgIHRoaXMucHJldmlvdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmV2aW91c1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHByaWNlIG9mIGEgc3RvY2sgKi9cblxuXG4gICAgdGhpcy5wcmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByaWNlXCIpO1xuICAgIH07XG4gICAgLyoqIFByb3ZpZGVzIHRoZSBsYXRlc3QgYXZnLCBoaWdoLCBhbmQgbG93IGFuYWx5c3QgcHJpY2UgdGFyZ2V0IGZvciBhIHN5bWJvbC4gKi9cblxuXG4gICAgdGhpcy5wcmljZVRhcmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByaWNlLXRhcmdldFwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHRoZSBvZmZpY2lhbCBvcGVuIGFuZCBjbG9zZSBmb3IgYSBnaXZlIHN5bWJvbC4gVGhlIG9mZmljaWFsIG9wZW4gaXMgYXZhaWxhYmxlIGFzIHNvb24gYXMgOTo0NWFtIEVUIGFuZCB0aGUgb2ZmaWNpYWwgY2xvc2UgYXMgc29vbiBhcyA0OjE1cG0gRVQuIFNvbWUgc3RvY2tzIGNhbiByZXBvcnQgbGF0ZSBvcGVuIG9yIGNsb3NlIHByaWNlcy4gKi9cblxuXG4gICAgdGhpcy5vaGxjID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib2hsY1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgIFRoaXMgZW5kcG9pbnQgcHJvdmlkZXMgc29jaWFsIHNlbnRpbWVudCBkYXRhIGZyb20gU3RvY2tUd2l0cy4gRGF0YSBjYW4gYmUgdmlld2VkIGFzIGEgZGFpbHkgdmFsdWUsIG9yIGJ5IG1pbnV0ZSBmb3IgYSBnaXZlbiBkYXRlLiAqL1xuXG5cbiAgICB0aGlzLnNlbnRpbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHR5cGUgPSBcImRhaWx5XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgZGF0ZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNlbnRpbWVudC9cIiArIHR5cGUgKyAoZGF0ZSA/IFwiL1wiICsgZGF0ZSA6IFwiXCIpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5xdW90ZSA9IGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgaWYgKGZpZWxkID09PSB2b2lkIDApIHtcbiAgICAgICAgZmllbGQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJxdW90ZS9cIiArIChmaWVsZCA/IGZpZWxkIDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGRhdGEgZnJvbSB0aGUgbGFzdCBmb3VyIG1vbnRocy4gKi9cblxuXG4gICAgdGhpcy5yZWNvbW1lbmRhdGlvblRyZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInJlY29tbWVuZGF0aW9uLXRyZW5kc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0cyA9IGZ1bmN0aW9uIChzdGF0KSB7XG4gICAgICBpZiAoc3RhdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHN0YXQgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzdGF0cy9cIiArIHN0YXQpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctZXZlbnRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nRWFybmluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1lYXJuaW5nc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0RpdmlkZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWRpdmlkZW5kc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ1NwbGl0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLXNwbGl0c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0lQT3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1pcG9zXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnNwbGl0cyA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgaWYgKHJhbmdlID09PSB2b2lkIDApIHtcbiAgICAgICAgcmFuZ2UgPSBcIjFtXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNwbGl0cy9cIiArIHJhbmdlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaG9ydEludGVyZXN0ID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgIGlmIChkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgZGF0ZSA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNob3J0LWludGVyZXN0L1wiICsgZGF0ZSk7XG4gICAgfTtcbiAgICAvKiogVGhpcyByZXR1cm5zIDE1IG1pbnV0ZSBkZWxheWVkIGFuZCAzMCBkYXkgYXZlcmFnZSBjb25zb2xpZGF0ZWQgdm9sdW1lIHBlcmNlbnRhZ2Ugb2YgYSBzdG9jaywgYnkgbWFya2V0LiBUaGlzIGNhbGwgd2lsbCBhbHdheXMgcmV0dXJuIDEzIHZhbHVlcywgYW5kIHdpbGwgYmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlciBieSBjdXJyZW50IGRheSB0cmFkaW5nIHZvbHVtZSBwZXJjZW50YWdlLiAqL1xuXG5cbiAgICB0aGlzLnZvbHVtZUJ5VmVudWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ2b2x1bWUtYnktdmVudWVcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICAgIHRoaXMuaWV4RGVlcCA9IG5ldyBkZWVwXzEuZGVmYXVsdChyZXEpO1xuICAgIHRoaXMudGltZXNlcmllcyA9IG5ldyB0aW1lU2VyaWVzXzEuZGVmYXVsdChyZXEpO1xuICAgIHRoaXMuaWV4Rm9yZXggPSBuZXcgZm9yZXhfMS5kZWZhdWx0KHJlcSk7XG4gICAgdGhpcy5pZXhCYXRjaCA9IG5ldyBiYXRjaF8xLmRlZmF1bHQocmVxKTtcbiAgfVxuXG4gIHJldHVybiBTdG9jaztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3RvY2s7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBmb3JleF8xID0gcmVxdWlyZShcIi4vZm9yZXhcIik7XG5cbnZhciBiYXRjaF8xID0gcmVxdWlyZShcIi4vYmF0Y2hcIik7XG5cbnZhciBTdG9ja3MgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdG9ja3MocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogcmV0dXJucyBiYWxhbmNlIHNoZWV0IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHkgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlclxuICAgICAqIGBEYXRhIFdlaWdodDogMzAwMGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5iYWxhbmNlU2hlZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJiYWxhbmNlLXNoZWV0XCIpO1xuICAgIH07XG4gICAgLyoqIGJhdGNoIHJldHVybnMgbXVsdGlwZSBkYXRhLXR5cGVzIGZvciBhIGdpdmUgc3RvY2sgc3ltYm9sICovXG5cblxuICAgIHRoaXMuYmF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IGJhdGNoXzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLmZvcmV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJmeFwiO1xuICAgICAgcmV0dXJuIG5ldyBmb3JleF8xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgYm9vayB2YWx1ZSBmb3IgYSBnaXZlbiBzdG9ja1xuICAgICAqIGBEYXRhIFdlaWdodDogMSBwZXIgcXVvdGUgcmV0dXJuZWRgXG4gICAgICovXG5cblxuICAgIHRoaXMuYm9vayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImJvb2tcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFkanVzdGVkIGFuZCB1bmFkanVzdGVkIGhpc3RvcmljYWwgZGF0YSBmb3IgdXAgdG8gMTUgeWVhcnMuXG4gICAgICogYERhdGEgV2VpZ2h0OiAxLDAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuY2hhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjaGFydFwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgY2FzaCBmbG93IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHksIHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXIuXG4gICAgICogYERhdGEgV2VpZ2h0OiAxLDAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuY2FzaEZsb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjYXNoLWZsb3dcIik7XG4gICAgfTtcbiAgICAvKiogcmV0dXJucyBDZW8gQ29tcGVuc2F0aW9uICovXG5cblxuICAgIHRoaXMuY2VvQ29tcGVuc2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2VvLWNvbXBlbnNhdGlvblwiKTtcbiAgICB9O1xuICAgIC8qKiByZXR1cm5zIGRhdGEgb24gYSBnaXZlbiBjb21wYW55XG4gICAgICogIGBEYXRhIFdlaWdodDogMSBwZXIgc3ltYm9sYCAqL1xuXG5cbiAgICB0aGlzLmNvbXBhbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjb21wYW55XCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogIGBEYXRhIFdlaWdodDogMSBwZXIgc3ltYm9sIHBlciBxdW90ZWBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5kZWxheWVkUXVvdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJkZWxheWVkLXF1b3RlXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogYERhdGEgV2VpZ2h0OiAxMCBwZXIgc3ltYm9sIHBlciBwZXJpb2QgcmV0dXJuZWRgXG4gICAgICovXG5cblxuICAgIHRoaXMuZGl2aWRlbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZGl2aWRlbmRzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZWFybmluZ3MgZGF0YSBmb3IgYSBnaXZlbiBjb21wYW55IGluY2x1ZGluZyB0aGUgYWN0dWFsIEVQUywgY29uc2Vuc3VzLCBhbmQgZmlzY2FsIHBlcmlvZC4gRWFybmluZ3MgYXJlIGF2YWlsYWJsZSBxdWFydGVybHkgKGxhc3QgNCBxdWFydGVycykuXG4gICAgICogIGBEYXRhIFdlaWdodDogMTAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuZWFybmluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJlYXJuaW5nc1wiKTtcbiAgICB9O1xuICAgIC8qKiBQcm92aWRlcyB0aGUgbGF0ZXN0IGNvbnNlbnN1cyBlc3RpbWF0ZSBmb3IgdGhlIG5leHQgZmlzY2FsIHBlcmlvZCAqL1xuXG5cbiAgICB0aGlzLmVzdGltYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImVzdGltYXRlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBQdWxscyBpbmNvbWUgc3RhdGVtZW50LCBiYWxhbmNlIHNoZWV0LCBhbmQgY2FzaCBmbG93IGRhdGEgZnJvbSB0aGUgbW9zdCByZWNlbnQgcmVwb3J0ZWQgcXVhcnRlci4gKi9cblxuXG4gICAgdGhpcy5maW5hbmNpYWxzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZmluYW5jaWFsc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGxhdGVzdCBuZXdzIGZvciBhIGdpdmUgc3RvY2sgc3ltYm9sICovXG5cblxuICAgIHRoaXMubmV3cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm5ld3NcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0b3AgMTAgZnVuZCBob2xkZXJzLCBtZWFuaW5nIGFueSBmaXJtIG5vdCBkZWZpbmVkIGFzIGJ1eS1zaWRlIG9yIHNlbGwtc2lkZSBzdWNoIGFzIG11dHVhbCBmdW5kcywgcGVuc2lvbiBmdW5kcywgZW5kb3dtZW50cywgaW52ZXN0bWVudCBmaXJtcywgYW5kIG90aGVyIGxhcmdlIGVudGl0aWVzIHRoYXQgbWFuYWdlIGZ1bmRzIG9uIGJlaGFsZiBvZiBvdGhlcnMuXG4gICAgICovXG5cblxuICAgIHRoaXMuZnVuZE93bmVyc2hpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImZ1bmQtb3duZXJzaGlwXCIpO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGluY29tZSBzdGF0ZW1lbnQgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyLiAqL1xuXG5cbiAgICB0aGlzLmluY29tZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluY29tZVwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHRoZSB0b3AgMTAgaW5zaWRlcnMsIHdpdGggdGhlIG1vc3QgcmVjZW50IGluZm9ybWF0aW9uLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJSb3N0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnNpZGVyLXJvc3RlclwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFnZ3JlZ2F0ZWQgaW5zaWRlcnMgc3VtbWFyeSBkYXRhIGZvciB0aGUgbGFzdCA2IG1vbnRocy4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyU3VtbWFyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc2lkZXItc3VtbWFyeVwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGluc2lkZXIgdHJhbnNhY3Rpb25zLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJUcmFuc2FjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnNpZGVyLXRyYW5zYWN0aW9uc1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgIFJldHVybnMgdGhlIHRvcCAxMCBpbnN0aXR1dGlvbmFsIGhvbGRlcnMsIGRlZmluZWQgYXMgYnV5LXNpZGUgb3Igc2VsbC1zaWRlIGZpcm1zLiAqL1xuXG5cbiAgICB0aGlzLmluc3RpdHV0aW9uYWxPd25lcnNoaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnN0aXR1dGlvbmFsLW93bmVyc2hpcFwiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHdpbGwgcmV0dXJuIGFnZ3JlZ2F0ZWQgaW50cmFkYXkgcHJpY2VzIGluIG9uZSBtaW51dGUgYnVja2V0cyAqL1xuXG5cbiAgICB0aGlzLmludHJhZGF5UHJpY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW50cmFkYXktcHJpY2VzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24sIGJ1dCB0aGUgZ29vZ2xlIEFQSXMgdXJsIGlzIHN0YW5kYXJkaXplZC4gICovXG5cblxuICAgIHRoaXMubG9nbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImxvZ29cIik7XG4gICAgfTtcbiAgICAvKiogIFRoaXMgcmV0dXJucyAxNSBtaW51dGUgZGVsYXllZCwgbGFzdCBzYWxlIGVsaWdpYmxlIHRyYWRlcy4gKi9cblxuXG4gICAgdGhpcy5sYXJnZXN0VHJhZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibGFyZ2VzdC10cmFkZXNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlbmQgb2YgZGF5IG9wdGlvbnMgZGF0YSAqL1xuXG5cbiAgICB0aGlzLm9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvcHRpb25zXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcGVlciBncm91cCAqL1xuXG5cbiAgICB0aGlzLnBlZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicGVlcnNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwcmV2aW91cyBkYXkgYWRqdXN0ZWQgcHJpY2UgZGF0YSBmb3Igb25lIG9yIG1vcmUgc3RvY2tzLiAqL1xuXG5cbiAgICB0aGlzLnByZXZpb3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJldmlvdXNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwcmljZSBvZiBhIHN0b2NrICovXG5cblxuICAgIHRoaXMucHJpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmljZVwiKTtcbiAgICB9O1xuICAgIC8qKiBQcm92aWRlcyB0aGUgbGF0ZXN0IGF2ZywgaGlnaCwgYW5kIGxvdyBhbmFseXN0IHByaWNlIHRhcmdldCBmb3IgYSBzeW1ib2wuICovXG5cblxuICAgIHRoaXMucHJpY2VUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmljZS10YXJnZXRcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyB0aGUgb2ZmaWNpYWwgb3BlbiBhbmQgY2xvc2UgZm9yIGEgZ2l2ZSBzeW1ib2wuIFRoZSBvZmZpY2lhbCBvcGVuIGlzIGF2YWlsYWJsZSBhcyBzb29uIGFzIDk6NDVhbSBFVCBhbmQgdGhlIG9mZmljaWFsIGNsb3NlIGFzIHNvb24gYXMgNDoxNXBtIEVULiBTb21lIHN0b2NrcyBjYW4gcmVwb3J0IGxhdGUgb3BlbiBvciBjbG9zZSBwcmljZXMuICovXG5cblxuICAgIHRoaXMub2hsYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9obGNcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgIFRoaXMgZW5kcG9pbnQgcHJvdmlkZXMgc29jaWFsIHNlbnRpbWVudCBkYXRhIGZyb20gU3RvY2tUd2l0cy4gRGF0YSBjYW4gYmUgdmlld2VkIGFzIGEgZGFpbHkgdmFsdWUsIG9yIGJ5IG1pbnV0ZSBmb3IgYSBnaXZlbiBkYXRlLiAqL1xuXG5cbiAgICB0aGlzLnNlbnRpbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNlbnRpbWVudFwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5xdW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInF1b3RlXCIpO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGRhdGEgZnJvbSB0aGUgbGFzdCBmb3VyIG1vbnRocy4gKi9cblxuXG4gICAgdGhpcy5yZWNvbW1lbmRhdGlvblRyZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInJlY29tbWVuZGF0aW9uLXRyZW5kc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInN0YXRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctZXZlbnRzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwY29taW5nRWFybmluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1lYXJuaW5nc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0RpdmlkZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWRpdmlkZW5kc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ1NwbGl0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLXNwbGl0c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0lQT3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1pcG9zXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnNwbGl0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNwbGl0c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaG9ydEludGVyZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic2hvcnQtaW50ZXJlc3RcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyByZXR1cm5zIDE1IG1pbnV0ZSBkZWxheWVkIGFuZCAzMCBkYXkgYXZlcmFnZSBjb25zb2xpZGF0ZWQgdm9sdW1lIHBlcmNlbnRhZ2Ugb2YgYSBzdG9jaywgYnkgbWFya2V0LiBUaGlzIGNhbGwgd2lsbCBhbHdheXMgcmV0dXJuIDEzIHZhbHVlcywgYW5kIHdpbGwgYmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlciBieSBjdXJyZW50IGRheSB0cmFkaW5nIHZvbHVtZSBwZXJjZW50YWdlLiAqL1xuXG5cbiAgICB0aGlzLnZvbHVtZUJ5VmVudWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ2b2x1bWUtYnktdmVudWVcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIFN0b2Nrcztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3RvY2tzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgVGltZVNlcmllcyA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRpbWVTZXJpZXMocmVxKSB7XG4gICAgdGhpcy5yZXEgPSByZXE7XG4gICAgdGhpcy5wID0gXCJQUkVNSVVNX1dBTExTVFJFRVRIT1JJWk9OX1wiO1xuICB9XG4gIC8qKiBUaGlzIGlzIGEgbWVldGluZyB3aGVyZSBjb21wYW55IGV4ZWN1dGl2ZXMgcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29tcGFueeKAmXMgcGVyZm9ybWFuY2UgYW5kIGl0cyBmdXR1cmUgcHJvc3BlY3RzLiAqL1xuXG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYW5hbHlzdERheSA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KHRoaXMucCArIFwiQU5BTFlTVF9EQVkvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYm9hcmRPZkRpcmVjdG9yc01lZXRpbmcgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdCh0aGlzLnAgKyBcIkJPQVJEX09GX0RJUkVDVE9SU19NRUVUSU5HL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmJ1c2luZXNzVXBkYXRlID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QodGhpcy5wICsgXCJCVVNJTkVTU19VUERBVEUvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYnV5QmFjayA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KHRoaXMucCArIFwiQlVZQkFDSy9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5jYXBpdGFsTWFya2V0c0RheSA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KHRoaXMucCArIFwiQ0FQSVRBTF9NQVJLRVRTX0RBWS9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZERpc3RyaWJ1dGlvbiA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfZGlzdHJpYnV0aW9uL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkRGl2aWRlbmRzID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9kaXZpZGVuZHMvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRSZXR1cm5PbkNhcGl0YWwgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3JldHVybl9vZl9jYXBpdGFsL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkUmlnaHRzID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9yaWdodHMvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRSaWdodHNUb1B1cmNoYXNlID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9yaWdodF90b19wdXJjaGFzZS9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFNlY3VyaXR5UmVjbGFzc2lmaWNhdGlvbiA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfc2VjdXJpdHlfcmVjbGFzc2lmaWNhdGlvbi9cIiArIHRoaXMucmVxLnN0b2NrU3ltYm9sICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFNlY3VyaXR5U3dhcCA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfc2VjdXJpdHlfc3dhcC9cIiArIHRoaXMucmVxLnN0b2NrU3ltYm9sICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFNwaW5PZmYgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3NwaW5vZmYvXCIgKyB0aGlzLnJlcS5zdG9ja1N5bWJvbCArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRTcGxpdHMgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3NwbGl0cy9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICByZXR1cm4gVGltZVNlcmllcztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVGltZVNlcmllczsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTsgLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gIH1cblxuICB0cnkge1xuICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgfVxufSkoKTtcblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9IC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgfVxuICB9XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkcmFpbmluZyA9IGZhbHNlO1xuXG4gIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gIH1cblxuICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgZHJhaW5RdWV1ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gIGlmIChkcmFpbmluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICBkcmFpbmluZyA9IHRydWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbikge1xuICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG5cbiAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICB9XG5cbiAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICB9XG59OyAvLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5cblxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gIHRoaXMuZnVuID0gZnVuO1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIFtdO1xufTtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnLyc7XG59O1xuXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIDA7XG59OyIsImltcG9ydCB7IElFWENsb3VkQ2xpZW50IH0gZnJvbSBcIm5vZGUtaWV4LWNsb3VkXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbmNvbnN0IGlleCA9IG5ldyBJRVhDbG91ZENsaWVudChmZXRjaCwge1xuICAgIHNhbmRib3g6IHRydWUsXG4gICAgcHVibGlzaGFibGU6IFwicGtfMTZjNTNmODZkYzE2NDU4ZWE3NDgyZTlhODY0ZjBhOTlcIixcbiAgICB2ZXJzaW9uOiBcInN0YWJsZVwiXG59KTtcblxuXG5heGlvcy5nZXQoJ2h0dHBzOi8vY2xvdWQuaWV4YXBpcy5jb20vc3RhYmxlL3N0b2NrL1NRL2NoYXJ0LzFtPyZmaWx0ZXI9Y2hhbmdlUGVyY2VudCxkYXRlJnRva2VuPXBrXzE2YzUzZjg2ZGMxNjQ1OGVhNzQ4MmU5YTg2NGYwYTk5JylcbiAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuXG4gICAgICAgIGNvbnN0IG1vbmRheSA9IFtcIjIwMjAtMDYtMDFcIiwgXCIyMDIwLTA2LTA4XCIsIFwiMjAyMC0wNi0xNVwiLCBcIjIwMjAtMDYtMjJcIl1cbiAgICAgICAgY29uc3QgdHVlc2RheSA9IFtcIjIwMjAtMDYtMDJcIiwgXCIyMDIwLTA2LTA5XCIsIFwiMjAyMC0wNi0xNlwiLCBcIjIwMjAtMDYtMjNcIl1cbiAgICAgICAgY29uc3Qgd2VkbmVzZGF5ID0gW1wiMjAyMC0wNi0wM1wiLCBcIjIwMjAtMDYtMTBcIiwgXCIyMDIwLTA2LTE3XCIsIFwiMjAyMC0wNi0yNFwiXVxuICAgICAgICBjb25zdCB0aHVyc2RheSA9IFtcIjIwMjAtMDYtMDRcIiwgXCIyMDIwLTA2LTExXCIsIFwiMjAyMC0wNi0xOFwiLCBcIjIwMjAtMDYtMjVcIl1cbiAgICAgICAgY29uc3QgZnJpZGF5ID0gW1wiMjAyMC0wNi0wNVwiLCBcIjIwMjAtMDYtMTJcIiwgXCIyMDIwLTA2LTE5XCIsIFwiMjAyMC0wNi0yNlwiXVxuXG5cbiAgICBsZXQgbW9uZGF5Q2hhbmdlID0gMFxuICAgIGxldCB0dWVzZGF5Q2hhbmdlID0gMFxuICAgIGxldCB3ZWRuZXNkYXlDaGFuZ2UgPSAwXG4gICAgbGV0IHRodXJzZGF5Q2hhbmdlID0gMFxuICAgIGxldCBmcmlkYXlDaGFuZ2UgPSAwXG5cbiAgICBsZXQgbW9uZGF5Q291bnQgPSAwXG4gICAgbGV0IHR1ZXNkYXlDb3VudCA9IDBcbiAgICBsZXQgd2VkbmVzZGF5Q291bnQgPSAwXG4gICAgbGV0IHRodXJzZGF5Q291bnQgPSAwXG4gICAgbGV0IGZyaWRheUNvdW50ID0gMFxuXG4gICAgbGV0IG1vbmRheU1vbnRobHlQZXJjZW50ID0gMFxuICAgIGxldCB0dWVzZGF5TW9udGhseVBlcmNlbnQgPSAwXG4gICAgbGV0IHdlZG5lc2RheU1vbnRobHlQZXJjZW50ID0gMFxuICAgIGxldCB0aHVyc2RheU1vbnRobHlQZXJjZW50ID0gMFxuICAgIGxldCBmcmlkYXlNb250aGx5UGVyY2VudCA9IDBcbiAgIFxuXG4gICAgbGV0IHNxRGF0YSA9IHJlc3BvbnNlLmRhdGFcbiAgICAgIFxuICAgIHNxRGF0YS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgbGV0IGRhaWx5Q2hhbmdlID0gZWwuY2hhbmdlUGVyY2VudFxuICAgICAgICBsZXQgcXVvdGVEYXRlID0gZWwuZGF0ZVxuICAgICAgICAgIFxuICAgICAgICBpZihtb25kYXkuaW5jbHVkZXMoZWwuZGF0ZSkpe1xuICAgICAgICAgICAgbW9uZGF5Q291bnQgKz0gMVxuICAgICAgICAgICAgbW9uZGF5Q2hhbmdlICs9IGRhaWx5Q2hhbmdlXG4gICAgICAgICAgICBtb25kYXlNb250aGx5UGVyY2VudCA9IChtb25kYXlDaGFuZ2UgLyBtb25kYXlDb3VudCkgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYodHVlc2RheS5pbmNsdWRlcyhlbC5kYXRlKSl7XG4gICAgICAgICAgICB0dWVzZGF5Q291bnQgKz0gMVxuICAgICAgICAgICAgdHVlc2RheUNoYW5nZSArPSBkYWlseUNoYW5nZVxuICAgICAgICAgICAgdHVlc2RheU1vbnRobHlQZXJjZW50ID0gKHR1ZXNkYXlDaGFuZ2UgLyB0dWVzZGF5Q291bnQpICBcbiAgICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmKHdlZG5lc2RheS5pbmNsdWRlcyhlbC5kYXRlKSl7XG4gICAgICAgICAgICB3ZWRuZXNkYXlDb3VudCArPSAxXG4gICAgICAgICAgICB3ZWRuZXNkYXlDaGFuZ2UgKz0gZGFpbHlDaGFuZ2VcbiAgICAgICAgICAgIHdlZG5lc2RheU1vbnRobHlQZXJjZW50ID0gKHdlZG5lc2RheUNoYW5nZSAvIHdlZG5lc2RheUNvdW50KSAgXG4gICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZih0aHVyc2RheS5pbmNsdWRlcyhlbC5kYXRlKSl7XG4gICAgICAgICAgICB0aHVyc2RheUNvdW50ICs9IDFcbiAgICAgICAgICAgIHRodXJzZGF5Q2hhbmdlICs9IGRhaWx5Q2hhbmdlXG4gICAgICAgICAgICB0aHVyc2RheU1vbnRobHlQZXJjZW50ID0gKHRodXJzZGF5Q2hhbmdlIC8gdGh1cnNkYXlDb3VudCkgIFxuICAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYoZnJpZGF5LmluY2x1ZGVzKGVsLmRhdGUpKXtcbiAgICAgICAgICAgIGZyaWRheUNvdW50ICs9IDFcbiAgICAgICAgICAgIGZyaWRheUNoYW5nZSArPSBkYWlseUNoYW5nZVxuICAgICAgICAgICAgZnJpZGF5TW9udGhseVBlcmNlbnQgPSAoZnJpZGF5Q2hhbmdlIC8gZnJpZGF5Q291bnQpXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhtb25kYXlNb250aGx5UGVyY2VudClcbiAgICAgICAgY29uc29sZS5sb2codHVlc2RheU1vbnRobHlQZXJjZW50KSBcbiAgICAgICAgY29uc29sZS5sb2cod2VkbmVzZGF5TW9udGhseVBlcmNlbnQpIFxuICAgICAgICBjb25zb2xlLmxvZyh0aHVyc2RheU1vbnRobHlQZXJjZW50KSBcbiAgICAgICAgY29uc29sZS5sb2coZnJpZGF5TW9udGhseVBlcmNlbnQpICBcbn0pXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgICBcblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=