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
  var mondayMonthlyTotal = 0;
  var sqData = response.data;
  sqData.forEach(function (el) {
    var dailyChange = el.changePercent;
    var quoteDate = el.date;

    if (monday.includes(el.date)) {
      mondayCount += 1;
      mondayChange += dailyChange;
      var mondayMonthlyPercent = mondayChange / mondayCount; // console.log(mondayMonthlyPercent)
    } else if (tuesday.includes(el.date)) {
      tuesdayCount += 1;
      tuesdayChange += dailyChange;
      var tuesdayMonthlyPercent = tuesdayChange / tuesdayCount; // console.log(tuesdayMonthlyPercent)  
    } else if (wednesday.includes(el.date)) {
      wednesdayCount += 1;
      wednesdayChange += dailyChange;
      var wednesdayMonthlyPercent = wednesdayChange / wednesdayCount; // console.log(wednesdayMonthlyPercent)  
    } else if (thursday.includes(el.date)) {
      thursdayCount += 1;
      thursdayChange += dailyChange;
      var thursdayMonthlyPercent = thursdayChange / thursdayCount; // console.log(thursdayMonthlyPercent)  
    } else if (friday.includes(el.date)) {
      fridayCount += 1;
      fridayChange += dailyChange;
      var fridayMonthlyPercent = fridayChange / fridayCount;
    }
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9iYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2NyeXB0by5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2RhdGFQb2ludHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9kZWVwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvZm9yZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9pZXhDbG91ZENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvbWFya2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvcmVmZXJlbmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9kZS1pZXgtY2xvdWQvbGliL3N0YXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ub2RlLWlleC1jbG91ZC9saWIvc3RvY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi9zdG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtaWV4LWNsb3VkL2xpYi90aW1lU2VyaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImlleCIsIklFWENsb3VkQ2xpZW50IiwiZmV0Y2giLCJzYW5kYm94IiwicHVibGlzaGFibGUiLCJ2ZXJzaW9uIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJtb25kYXkiLCJ0dWVzZGF5Iiwid2VkbmVzZGF5IiwidGh1cnNkYXkiLCJmcmlkYXkiLCJtb25kYXlDaGFuZ2UiLCJ0dWVzZGF5Q2hhbmdlIiwid2VkbmVzZGF5Q2hhbmdlIiwidGh1cnNkYXlDaGFuZ2UiLCJmcmlkYXlDaGFuZ2UiLCJtb25kYXlDb3VudCIsInR1ZXNkYXlDb3VudCIsIndlZG5lc2RheUNvdW50IiwidGh1cnNkYXlDb3VudCIsImZyaWRheUNvdW50IiwibW9uZGF5TW9udGhseVRvdGFsIiwic3FEYXRhIiwiZGF0YSIsImZvckVhY2giLCJlbCIsImRhaWx5Q2hhbmdlIiwiY2hhbmdlUGVyY2VudCIsInF1b3RlRGF0ZSIsImRhdGUiLCJpbmNsdWRlcyIsIm1vbmRheU1vbnRobHlQZXJjZW50IiwidHVlc2RheU1vbnRobHlQZXJjZW50Iiwid2VkbmVzZGF5TW9udGhseVBlcmNlbnQiLCJ0aHVyc2RheU1vbnRobHlQZXJjZW50IiwiZnJpZGF5TW9udGhseVBlcmNlbnQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxpQkFBaUIsbUJBQU8sQ0FBQyxzREFBYSxFOzs7Ozs7Ozs7Ozs7QUNBekI7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCOztBQUV2QyxlQUFlLG1CQUFP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bkM7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxX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QTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsd0I7Ozs7Ozs7Ozs7OztBQ2xRYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCx5Qjs7Ozs7Ozs7Ozs7O0FDbENhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsNkI7Ozs7Ozs7Ozs7OztBQzVCYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCx1Qjs7Ozs7Ozs7Ozs7O0FDM0VhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELHdCOzs7Ozs7Ozs7Ozs7QUMvQ2E7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQsZUFBZSxtQkFBTyxDQUFDLDZEQUFVOztBQUVqQyxjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CLGVBQWUsbUJBQU8sQ0FBQyw2REFBVTs7QUFFakMsZUFBZSxtQkFBTyxDQUFDLDZEQUFVOztBQUVqQyxrQkFBa0IsbUJBQU8sQ0FBQyxtRUFBYTs7QUFFdkMsbUJBQW1CLG1CQUFPLENBQUMscUVBQWM7O0FBRXpDLG1CQUFtQixtQkFBTyxDQUFDLHFFQUFjOztBQUV6QyxjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CLGdCQUFnQixtQkFBTyxDQUFDLCtEQUFXOztBQUVuQyxjQUFjLG1CQUFPLENBQUMsMkRBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELGlDOzs7Ozs7Ozs7Ozs7QUMvSGE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQsdUJBQXVCLG1CQUFPLENBQUMsNkVBQWtCOztBQUVqRDtBQUNBLDJDOzs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELHlCOzs7Ozs7Ozs7Ozs7QUNoRWE7O0FBRWI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsZ0M7Ozs7Ozs7Ozs7OztBQ2pGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsNkI7Ozs7Ozs7Ozs7OztBQ3hUYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCw2Qjs7Ozs7Ozs7Ozs7O0FDcENh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Q0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCx5Qjs7Ozs7Ozs7Ozs7O0FDL1FhOztBQUViO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELDZCOzs7Ozs7Ozs7OztBQzNFQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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VixDQUFtQkwsRUFBRSxDQUFDSSxJQUF0QixDQUFILEVBQStCO0FBQ2xDWCxvQkFBYyxJQUFJLENBQWxCO0FBQ0FMLHFCQUFlLElBQUlhLFdBQW5CO0FBQ0EsVUFBTU8sdUJBQXVCLEdBQUlwQixlQUFlLEdBQUdLLGNBQW5ELENBSGtDLENBSWxDO0FBQ0gsS0FMTSxNQUtBLElBQUdULFFBQVEsQ0FBQ3FCLFFBQVQsQ0FBa0JMLEVBQUUsQ0FBQ0ksSUFBckIsQ0FBSCxFQUE4QjtBQUNqQ1YsbUJBQWEsSUFBSSxDQUFqQjtBQUNBTCxvQkFBYyxJQUFJWSxXQUFsQjtBQUNBLFVBQU1RLHNCQUFzQixHQUFJcEIsY0FBYyxHQUFHSyxhQUFqRCxDQUhpQyxDQUlqQztBQUNILEtBTE0sTUFLQSxJQUFHVCxNQUFNLENBQUNvQixRQUFQLENBQWdCTCxFQUFFLENBQUNJLElBQW5CLENBQUgsRUFBNEI7QUFDL0JULGlCQUFXLElBQUksQ0FBZjtBQUNBTCxrQkFBWSxJQUFJVyxXQUFoQjtBQUNBLFVBQU1TLG9CQUFvQixHQUFJcEIsWUFBWSxHQUFHSyxXQUE3QztBQUVIO0FBQ0osR0E5QkQ7QUErQkgsQ0ExREQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xuXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7IC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG5cbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDsgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG5cblxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcblxuXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG5cblxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuXG5cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgdGltZW91dFxuXG5cbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG5cbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTsgLy8gQWRkIHhzcmYgaGVhZGVyXG5cblxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/IGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfSAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuXG5cbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG5cblxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH0gLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH0gLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH0gLy8gU2VuZCB0aGUgcmVxdWVzdFxuXG5cbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpOyAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTsgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufSAvLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcblxuXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7IC8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuXG5heGlvcy5BeGlvcyA9IEF4aW9zOyAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5cbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59OyAvLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cblxuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTsgLy8gRXhwb3NlIGFsbC9zcHJlYWRcblxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zOyAvLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcblxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cblxuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5cblxuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcblxudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cblxuXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5cblxuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpOyAvLyBTZXQgY29uZmlnLm1ldGhvZFxuXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfSAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG5cblxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTsgLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG5cblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xuXG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG5cbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcblxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9OyAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG5cbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKGNvbmZpZy5kYXRhLCBjb25maWcuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3QpOyAvLyBGbGF0dGVuIGhlYWRlcnNcblxuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSwgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sIGNvbmZpZy5oZWFkZXJzKTtcbiAgdXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSwgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gIH0pO1xuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVzcG9uc2UuZGF0YSwgcmVzcG9uc2UuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlYXNvbi5yZXNwb25zZS5kYXRhLCByZWFzb24ucmVzcG9uc2UuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG5cbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGVycm9yO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFsnYmFzZVVSTCcsICd1cmwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJywgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJywgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLCAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXTtcbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXMuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKS5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpO1xuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0LmtleXMoY29uZmlnMikuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgZnVuY3Rpb24gb3RoZXJLZXlzRGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29uZmlnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcblxuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuY29uZmlnLCBudWxsLCByZXNwb25zZS5yZXF1ZXN0LCByZXNwb25zZSkpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG5cbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHwgdXRpbHMuaXNGaWxlKGRhdGEpIHx8IHV0aWxzLmlzQmxvYihkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBJZ25vcmUgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLnJlcGxhY2UoLyU0MC9naSwgJ0AnKS5yZXBsYWNlKC8lM0EvZ2ksICc6JykucmVwbGFjZSgvJTI0L2csICckJykucmVwbGFjZSgvJTJDL2dpLCAnLCcpLnJlcGxhY2UoLyUyMC9nLCAnKycpLnJlcGxhY2UoLyU1Qi9naSwgJ1snKS5yZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTCA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKSA6IGJhc2VVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbmZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICB2YXIgY29va2llID0gW107XG4gICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH07XG59KCkgOiAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiB7XG4gICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgdmFyIG9yaWdpblVSTDtcbiAgLyoqXG4gICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICogQHJldHVybnMge09iamVjdH1cbiAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgaWYgKG1zaWUpIHtcbiAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgfVxuXG4gICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7IC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcblxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgIHBhdGhuYW1lOiB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDogJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICB9O1xuICB9XG5cbiAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIC8qKlxuICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICovXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgdmFyIHBhcnNlZCA9IHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgcmV0dXJuIHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdDtcbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpOyAvLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuXG5cbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFsnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLCAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJywgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCddO1xuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcikgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgRm9ybURhdGE7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB2YWwgJiYgdmFsLmJ1ZmZlciAmJiB2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5cblxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5cblxuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5cblxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuXG5cbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIGRlZXBNZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5cblxuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBCYXRjaCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJhdGNoKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIHJldHVybnMgYmFsYW5jZSBzaGVldCBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5IHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXJcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDMwMDBgXG4gICAgICovXG5cblxuICAgIHRoaXMuYmFsYW5jZVNoZWV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiYmFsYW5jZS1zaGVldFwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGJvb2sgdmFsdWUgZm9yIGEgZ2l2ZW4gc3RvY2tcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEgcGVyIHF1b3RlIHJldHVybmVkYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmJvb2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJib29rXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgY2FzaCBmbG93IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHksIHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXIuXG4gICAgICogYERhdGEgV2VpZ2h0OiAxLDAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuY2FzaEZsb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJjYXNoLWZsb3dcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhZGp1c3RlZCBhbmQgdW5hZGp1c3RlZCBoaXN0b3JpY2FsIGRhdGEgZm9yIHVwIHRvIDE1IHllYXJzLlxuICAgICAqIGBEYXRhIFdlaWdodDogMSwwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNoYXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiY2hhcnRcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLmNlb0NvbXBlbnNhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImNlby1jb21wZW5zYXRpb25cIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIHJldHVybnMgZGF0YSBvbiBhIGdpdmVuIGNvbXBhbnlcbiAgICAgKiAgYERhdGEgV2VpZ2h0OiAxIHBlciBzeW1ib2xgICovXG5cblxuICAgIHRoaXMuY29tcGFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImNvbXBhbnlcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGF5ZWRRdW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImRlbGF5ZWQtcXVvdGVcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLmRpdmlkZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImRpdmlkZW5kc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlYXJuaW5ncyBkYXRhIGZvciBhIGdpdmVuIGNvbXBhbnkgaW5jbHVkaW5nIHRoZSBhY3R1YWwgRVBTLCBjb25zZW5zdXMsIGFuZCBmaXNjYWwgcGVyaW9kLiBFYXJuaW5ncyBhcmUgYXZhaWxhYmxlIHF1YXJ0ZXJseSAobGFzdCA0IHF1YXJ0ZXJzKS5cbiAgICAgKi9cblxuXG4gICAgdGhpcy5lYXJuaW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImVhcm5pbmdzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBQcm92aWRlcyB0aGUgbGF0ZXN0IGNvbnNlbnN1cyBlc3RpbWF0ZSBmb3IgdGhlIG5leHQgZmlzY2FsIHBlcmlvZCAqL1xuXG5cbiAgICB0aGlzLmVzdGltYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImVzdGltYXRlc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgaW5jb21lIHN0YXRlbWVudCwgYmFsYW5jZSBzaGVldCwgYW5kIGNhc2ggZmxvdyBkYXRhIGZyb20gdGhlIG1vc3QgcmVjZW50IHJlcG9ydGVkIHF1YXJ0ZXIuICovXG5cblxuICAgIHRoaXMuZmluYW5jaWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImZpbmFuY2lhbHNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgbGF0ZXN0IG5ld3MgZm9yIGEgZ2l2ZSBzdG9jayBzeW1ib2wgKi9cblxuXG4gICAgdGhpcy5uZXdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wibmV3c1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0b3AgMTAgZnVuZCBob2xkZXJzLCBtZWFuaW5nIGFueSBmaXJtIG5vdCBkZWZpbmVkIGFzIGJ1eS1zaWRlIG9yIHNlbGwtc2lkZSBzdWNoIGFzIG11dHVhbCBmdW5kcywgcGVuc2lvbiBmdW5kcywgZW5kb3dtZW50cywgaW52ZXN0bWVudCBmaXJtcywgYW5kIG90aGVyIGxhcmdlIGVudGl0aWVzIHRoYXQgbWFuYWdlIGZ1bmRzIG9uIGJlaGFsZiBvZiBvdGhlcnMuXG4gICAgICovXG5cblxuICAgIHRoaXMuZnVuZE93bmVyc2hpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImZ1bmQtb3duZXJzaGlwXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBQdWxscyBpbmNvbWUgc3RhdGVtZW50IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHkgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlci4gKi9cblxuXG4gICAgdGhpcy5pbmNvbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJpbmNvbWVcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIHRvcCAxMCBpbnNpZGVycywgd2l0aCB0aGUgbW9zdCByZWNlbnQgaW5mb3JtYXRpb24uICovXG5cblxuICAgIHRoaXMuaW5zaWRlclJvc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcImluc2lkZS1yb3N0ZXJcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYWdncmVnYXRlZCBpbnNpZGVycyBzdW1tYXJ5IGRhdGEgZm9yIHRoZSBsYXN0IDYgbW9udGhzLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJTdW1tYXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiaW5zaWRlLXN1bW1hcnlcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLmluc2lkZXJUcmFuc2FjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJpbnNpZGUtdHJhbnNhY3Rpb25zXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgIFJldHVybnMgdGhlIHRvcCAxMCBpbnN0aXR1dGlvbmFsIGhvbGRlcnMsIGRlZmluZWQgYXMgYnV5LXNpZGUgb3Igc2VsbC1zaWRlIGZpcm1zLiAqL1xuXG5cbiAgICB0aGlzLmluc3RpdHV0aW9uYWxPd25lcnNoaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJpbnN0aXR1dGlvbmFsT3duZXJzaGlwXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uLCBidXQgdGhlIGdvb2dsZSBBUElzIHVybCBpcyBzdGFuZGFyZGl6ZWQuICAqL1xuXG5cbiAgICB0aGlzLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJsb2dvXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHdpbGwgcmV0dXJuIGFnZ3JlZ2F0ZWQgaW50cmFkYXkgcHJpY2VzIGluIG9uZSBtaW51dGUgYnVja2V0cyAqL1xuXG5cbiAgICB0aGlzLmludHJhZGF5UHJpY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wiaW50cmFkYXktcHJpY2VzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiAgVGhpcyByZXR1cm5zIDE1IG1pbnV0ZSBkZWxheWVkLCBsYXN0IHNhbGUgZWxpZ2libGUgdHJhZGVzLiAqL1xuXG5cbiAgICB0aGlzLmxhcmdlc3RUcmFkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJsYXJnZXN0LXRyYWRlc1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlbmQgb2YgZGF5IG9wdGlvbnMgZGF0YSAqL1xuXG5cbiAgICB0aGlzLm9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJvcHRpb25zXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHBlZXIgZ3JvdXAgKi9cblxuXG4gICAgdGhpcy5wZWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInBlZXJzXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHByZXZpb3VzIGRheSBhZGp1c3RlZCBwcmljZSBkYXRhIGZvciBvbmUgb3IgbW9yZSBzdG9ja3MuICovXG5cblxuICAgIHRoaXMucHJldmlvdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJwcmV2aW91c1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwcmljZSBvZiBhIHN0b2NrICovXG5cblxuICAgIHRoaXMucHJpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJwcmljZVwiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogUHJvdmlkZXMgdGhlIGxhdGVzdCBhdmcsIGhpZ2gsIGFuZCBsb3cgYW5hbHlzdCBwcmljZSB0YXJnZXQgZm9yIGEgc3ltYm9sLiAqL1xuXG5cbiAgICB0aGlzLnByaWNlVGFyZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wicHJpY2UtdGFyZ2V0XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHRoZSBvZmZpY2lhbCBvcGVuIGFuZCBjbG9zZSBmb3IgYSBnaXZlIHN5bWJvbC4gVGhlIG9mZmljaWFsIG9wZW4gaXMgYXZhaWxhYmxlIGFzIHNvb24gYXMgOTo0NWFtIEVUIGFuZCB0aGUgb2ZmaWNpYWwgY2xvc2UgYXMgc29vbiBhcyA0OjE1cG0gRVQuIFNvbWUgc3RvY2tzIGNhbiByZXBvcnQgbGF0ZSBvcGVuIG9yIGNsb3NlIHByaWNlcy4gKi9cblxuXG4gICAgdGhpcy5vaGxjID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wib2hsY1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogVGhpcyBlbmRwb2ludCBwcm92aWRlcyBzb2NpYWwgc2VudGltZW50IGRhdGEgZnJvbSBTdG9ja1R3aXRzLiBEYXRhIGNhbiBiZSB2aWV3ZWQgYXMgYSBkYWlseSB2YWx1ZSwgb3IgYnkgbWludXRlIGZvciBhIGdpdmVuIGRhdGUuICovXG5cblxuICAgIHRoaXMuc2VudGltZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wic2VudGltZW50XCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuXG4gICAgdGhpcy5xdW90ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInF1b3RlXCJdKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9O1xuICAgIC8qKiBQdWxscyBkYXRhIGZyb20gdGhlIGxhc3QgZm91ciBtb250aHMuICovXG5cblxuICAgIHRoaXMucmVjb21tZW5kYXRpb25UcmVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJyZWNvbW1lbmRhdGlvbi10cmVuZHNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYmF0Y2hpbmcgPSBfdGhpcy5iYXRjaGluZy5jb25jYXQoW1wic3RhdHNcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLnNwbGl0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJhdGNoaW5nID0gX3RoaXMuYmF0Y2hpbmcuY29uY2F0KFtcInNwbGl0c1wiXSk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfTtcbiAgICAvKiogVGhpcyByZXR1cm5zIDE1IG1pbnV0ZSBkZWxheWVkIGFuZCAzMCBkYXkgYXZlcmFnZSBjb25zb2xpZGF0ZWQgdm9sdW1lIHBlcmNlbnRhZ2Ugb2YgYSBzdG9jaywgYnkgbWFya2V0LiBUaGlzIGNhbGwgd2lsbCBhbHdheXMgcmV0dXJuIDEzIHZhbHVlcywgYW5kIHdpbGwgYmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlciBieSBjdXJyZW50IGRheSB0cmFkaW5nIHZvbHVtZSBwZXJjZW50YWdlLiAqL1xuXG5cbiAgICB0aGlzLnZvbHVtZUJ5VmVudWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iYXRjaGluZyA9IF90aGlzLmJhdGNoaW5nLmNvbmNhdChbXCJ2b2x1bWUtYnktdmVudWVcIl0pO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH07XG4gICAgLyoqIHJldHVybiBiYXRjaCByZXF1ZXN0cyB1c2luZyB0aGUgcmFuZ2UgbWV0aG9kICovXG5cblxuICAgIHRoaXMucmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UsIGxhc3QpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVzcG9uc2UoX3RoaXMucmVxLmJhdGNoUGFyYW1zLCBfdGhpcy5iYXRjaGluZywgXCImcmFuZ2U9XCIgKyAocmFuZ2UgPyByYW5nZSA6IFwiMW1cIikgKyBcIiZsYXN0PVwiICsgKGxhc3QgPyBsYXN0IDogMCkpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgICB0aGlzLmJhdGNoaW5nID0gW107XG4gIH1cblxuICByZXR1cm4gQmF0Y2g7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJhdGNoOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgQ3J5cHRvID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ3J5cHRvKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLmJvb2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJib29rXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnByaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJpY2VcIik7XG4gICAgfTtcblxuICAgIHRoaXMucXVvdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJxdW90ZVwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5ldmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjcnlwdG9FdmVudHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIENyeXB0bztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ3J5cHRvOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgRGF0YVBvaW50cyA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIERhdGFQb2ludHMocmVxKSB7XG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICBEYXRhUG9pbnRzLnByb3RvdHlwZS5tYXJrZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJtYXJrZXQvXCIgKyB0aGlzLnJlcS5zdG9ja1N5bWJvbCk7XG4gIH07XG5cbiAgRGF0YVBvaW50cy5wcm90b3R5cGUudHJlYXN1cnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJtYXJrZXQvXCIgKyB0aGlzLnJlcS5zdG9ja1N5bWJvbCk7XG4gIH07XG5cbiAgRGF0YVBvaW50cy5wcm90b3R5cGUuZW5lcmd5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiZW5lcmd5L1wiICsgdGhpcy5yZXEuc3RvY2tTeW1ib2wpO1xuICB9O1xuXG4gIHJldHVybiBEYXRhUG9pbnRzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEYXRhUG9pbnRzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgRGVlcCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIERlZXAocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuc3ltYm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiXCIpO1xuICAgIH07XG4gICAgLyoqIERFRVAgYnJvYWRjYXN0cyBhbiBBdWN0aW9uIEluZm9ybWF0aW9uIE1lc3NhZ2UgZXZlcnkgb25lIHNlY29uZCBiZXR3ZWVuIHRoZSBMb2NrLWluIFRpbWUgYW5kIHRoZSBhdWN0aW9uIG1hdGNoIGZvciBPcGVuaW5nIGFuZCBDbG9zaW5nIEF1Y3Rpb25zLCBhbmQgZHVyaW5nIHRoZSBEaXNwbGF5IE9ubHkgUGVyaW9kIGZvciBJUE8sIEhhbHQsIGFuZCBWb2xhdGlsaXR5IEF1Y3Rpb25zLiBPbmx5IElFWCBsaXN0ZWQgc2VjdXJpdGllcyBhcmUgZWxpZ2libGUgZm9yIElFWCBBdWN0aW9ucy4gKi9cblxuXG4gICAgdGhpcy5hdWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYXVjdGlvblwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5ib29rID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYm9va1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vcEhhbHRTdGF0dXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvcC1oYWx0LXN0YXR1c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vZmZpY2lhbFByaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib2ZmaWNpYWwtcHJpY2VcIik7XG4gICAgfTtcblxuICAgIHRoaXMuc2VjdXJpdHlFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNlY3VyaXR5LWV2ZW50XCIpO1xuICAgIH07XG4gICAgLyoqIEluIGFzc29jaWF0aW9uIHdpdGggUnVsZSAyMDEgb2YgUmVndWxhdGlvbiBTSE8sIHRoZSBTaG9ydCBTYWxlIFByaWNlIFRlc3QgbWVzc2FnZSBpcyB1c2VkIHRvIGluZGljYXRlIHdoZW4gYSBTaG9ydCBTYWxlIFByaWNlIFRlc3QgcmVzdHJpY3Rpb24gaXMgaW4gZWZmZWN0IGZvciBhIHNlY3VyaXR5LlxuICAgICovXG5cblxuICAgIHRoaXMuc3NyU3RhdHVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3NyLXN0YXR1c1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGUgU3lzdGVtIEV2ZW50IG1lc3NhZ2UgaXMgdXNlZCB0byBpbmRpY2F0ZSBldmVudHMgdGhhdCBhcHBseSB0byB0aGUgbWFya2V0IG9yIHRoZSBkYXRhIGZlZWQuICovXG5cblxuICAgIHRoaXMuc3lzdGVtRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzc3Itc3RhdHVzXCIpO1xuICAgIH07XG4gICAgLyoqIFRyYWRlIHJlcG9ydCBtZXNzYWdlcyBhcmUgc2VudCB3aGVuIGFuIG9yZGVyIG9uIHRoZSBJRVggT3JkZXIgQm9vayBpcyBleGVjdXRlZCBpbiB3aG9sZSBvciBpbiBwYXJ0LiBERUVQIHNlbmRzIGEgVHJhZGUgcmVwb3J0IG1lc3NhZ2UgZm9yIGV2ZXJ5IGluZGl2aWR1YWwgZmlsbC4gKi9cblxuXG4gICAgdGhpcy50cmFkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ0cmFkZXNcIik7XG4gICAgfTtcbiAgICAvKiogVHJhZGUgYnJlYWsgbWVzc2FnZXMgYXJlIHNlbnQgd2hlbiBhbiBleGVjdXRpb24gb24gSUVYIGlzIGJyb2tlbiBvbiB0aGF0IHNhbWUgdHJhZGluZyBkYXkuIFRyYWRlIGJyZWFrcyBhcmUgcmFyZSBhbmQgb25seSBhZmZlY3QgYXBwbGljYXRpb25zIHRoYXQgcmVseSB1cG9uIElFWCBleGVjdXRpb24gYmFzZWQgZGF0YS4gKi9cblxuXG4gICAgdGhpcy50cmFkZUJyZWFrcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInRyYWRlLWJyZWFrc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGUgVHJhZGluZyBzdGF0dXMgbWVzc2FnZSBpcyB1c2VkIHRvIGluZGljYXRlIHRoZSBjdXJyZW50IHRyYWRpbmcgc3RhdHVzIG9mIGEgc2VjdXJpdHkuIEZvciBJRVgtbGlzdGVkIHNlY3VyaXRpZXMsIElFWCBhY3RzIGFzIHRoZSBwcmltYXJ5IG1hcmtldCBhbmQgaGFzIHRoZSBhdXRob3JpdHkgdG8gaW5zdGl0dXRlIGEgdHJhZGluZyBoYWx0IG9yIHRyYWRpbmcgcGF1c2UgaW4gYSBzZWN1cml0eSBkdWUgdG8gbmV3cyBkaXNzZW1pbmF0aW9uIG9yIHJlZ3VsYXRvcnkgcmVhc29ucy4gRm9yIG5vbi1JRVgtbGlzdGVkIHNlY3VyaXRpZXMsIElFWCBhYmlkZXMgYnkgYW55IHJlZ3VsYXRvcnkgdHJhZGluZyBoYWx0cyBhbmQgdHJhZGluZyBwYXVzZXMgaW5zdGl0dXRlZCBieSB0aGUgcHJpbWFyeSBvciBsaXN0aW5nIG1hcmtldCwgYXMgYXBwbGljYWJsZS4gKi9cblxuXG4gICAgdGhpcy50cmFkaW5nU3RhdHVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidHJhZGluZy1zdGF0dXNcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIERlZXA7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERlZXA7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBGb3JleCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEZvcmV4KHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgcHJvdmlkZXMgYW4gZW5kIG9mIGRheSBleGNoYW5nZSByYXRlIG9mIGEgZ2l2ZW4gY3VycmVuY3kgcGFpciAqL1xuXG5cbiAgICB0aGlzLnJhdGUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJyYXRlL1wiICsgcGFyYW1zLmZyb20gKyBcIi9cIiArIHBhcmFtcy50byk7XG4gICAgfTtcbiAgICAvKiogVGhpcyBlbmRwb2ludCByZXR1cm5zIHJlYWwtdGltZSBmb3JlaWduIGN1cnJlbmN5IGV4Y2hhbmdlIHJhdGVzIGRhdGEgdXBkYXRlZCBldmVyeSAyNTAgbWlsbGlzZWNvbmRzLiAqL1xuXG5cbiAgICB0aGlzLmxhdGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImxhdGVzdD9zeW1ib2xzPVwiICsgX3RoaXMucmVxLnN0b2NrU3ltYm9scyk7XG4gICAgfTtcblxuICAgIHRoaXMuY29udmVydCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgdmFyIGFtb3VudCA9IF9hLmFtb3VudCxcbiAgICAgICAgICBzeW1ib2xzID0gX2Euc3ltYm9scztcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNvbnZlcnQ/c3ltYm9scz1cIiArIChzeW1ib2xzID8gc3ltYm9scyA6IF90aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgKGFtb3VudCA/IFwiJmFtb3VudD1cIiArIGFtb3VudCA6IFwiXCIpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaXN0b3JpY2FsID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICB2YXIgZnJvbSA9IF9hLmZyb20sXG4gICAgICAgICAgdG8gPSBfYS50byxcbiAgICAgICAgICBvbiA9IF9hLm9uLFxuICAgICAgICAgIGZpcnN0ID0gX2EuZmlyc3QsXG4gICAgICAgICAgZmlsdGVyID0gX2EuZmlsdGVyLFxuICAgICAgICAgIHN5bWJvbHMgPSBfYS5zeW1ib2xzLFxuICAgICAgICAgIGxhc3QgPSBfYS5sYXN0O1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaGlzdG9yaWNhbD9zeW1ib2xzPVwiICsgX3RoaXMucmVxLnN0b2NrU3ltYm9scyArIChsYXN0ID8gXCImbGFzdD1cIiArIGxhc3QgOiBcIlwiKSArIChmcm9tID8gXCImZnJvbT1cIiArIGZyb20gOiBcIlwiKSArICh0byA/IFwiJnRvPVwiICsgdG8gOiBcIlwiKSArIChvbiA/IFwiJm9uPVwiIDogXCJcIikgKyAoZmlyc3QgPyBcIiZmaXJzdD1cIiA6IFwiXCIpICsgKGZpbHRlciA/IFwiJmZpbHRlcj1cIiArIGZpbHRlciA6IFwiXCIpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSByZXE7XG4gIH1cblxuICByZXR1cm4gRm9yZXg7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZvcmV4OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgY3J5cHRvXzEgPSByZXF1aXJlKFwiLi9jcnlwdG9cIik7XG5cbnZhciBzdG9ja18xID0gcmVxdWlyZShcIi4vc3RvY2tcIik7XG5cbnZhciBzdG9ja3NfMSA9IHJlcXVpcmUoXCIuL3N0b2Nrc1wiKTtcblxudmFyIG1hcmtldF8xID0gcmVxdWlyZShcIi4vbWFya2V0XCIpO1xuXG52YXIgcmVmZXJlbmNlXzEgPSByZXF1aXJlKFwiLi9yZWZlcmVuY2VcIik7XG5cbnZhciBkYXRhUG9pbnRzXzEgPSByZXF1aXJlKFwiLi9kYXRhUG9pbnRzXCIpO1xuXG52YXIgdGltZVNlcmllc18xID0gcmVxdWlyZShcIi4vdGltZVNlcmllc1wiKTtcblxudmFyIHN0YXRzXzEgPSByZXF1aXJlKFwiLi9zdGF0c1wiKTtcblxudmFyIHJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuL3JlcXVlc3RcIik7XG5cbnZhciBmb3JleF8xID0gcmVxdWlyZShcIi4vZm9yZXhcIik7XG5cbnZhciBJRVhDbG91ZENsaWVudCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIElFWENsb3VkQ2xpZW50KGYsIGNvbmZpZykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqICBUYWtlcyBpbiBhIHN0b2NrIHN5bWJvbCwgYSB1bmlxdWUgc2VyaWVzIG9mIGxldHRlcnMgYXNzaWduZWQgdG8gYSBzZWN1cml0eSAgICovXG5cblxuICAgIHRoaXMuc3ltYm9sID0gZnVuY3Rpb24gKHN5bWJvbCkge1xuICAgICAgX3RoaXMucmVxLnN0b2NrU3ltYm9sID0gc3ltYm9sO1xuICAgICAgcmV0dXJuIG5ldyBzdG9ja18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuICAgIC8qKiBUYWtlcyBpbiBtdWx0aXBsZSBzdG9jayBzeW1ib2xzLCBhbmQgYmF0Y2hlcyB0aGVtIHRvIGEgc2luZ2xlIHJlcXVlc3QgICovXG5cblxuICAgIHRoaXMuYmF0Y2hTeW1ib2xzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN5bWJvbHMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc3ltYm9sc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInN0b2NrL21hcmtldC9iYXRjaFwiO1xuICAgICAgX3RoaXMucmVxLnN0b2NrU3ltYm9scyA9IHN5bWJvbHM7XG4gICAgICByZXR1cm4gbmV3IHN0b2Nrc18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuICAgIC8qKiBUYWtlcyBpbiBtdWx0aXBsZSBzdG9jayBzeW1ib2xzLCBhbmQgYmF0Y2hlcyB0aGVtIHRvIGEgc2luZ2xlIHJlcXVlc3QgICovXG5cblxuICAgIHRoaXMuc3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzeW1ib2xzID0gW107XG5cbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHN5bWJvbHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJzdG9jay9tYXJrZXQvYmF0Y2hcIjtcbiAgICAgIGNvbnNvbGUud2FybihcIlRoaXMgbWV0aG9kIHdpbGwgYmUgZGVwcmVjYXRlZCBwbGVhc2UgdXNlIGJhdGNoU3ltYm9scyB0byBiYXRjaCBtdWx0aXBsZSBzdG9jayBzeW1ib2xzIHRvZ2V0aGVyXCIpO1xuICAgICAgX3RoaXMucmVxLnN0b2NrU3ltYm9scyA9IHN5bWJvbHM7XG4gICAgICByZXR1cm4gbmV3IHN0b2Nrc18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy50b3BzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJ0b3BzXCI7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJcIik7XG4gICAgfTtcbiAgICAvKiogIFRha2VzIGluIGEgY3J5cHRvIGN1cnJlbmN5ICAgKi9cblxuXG4gICAgdGhpcy5jcnlwdG8gPSBmdW5jdGlvbiAoY3J5cHRvKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcImNyeXB0b1wiO1xuICAgICAgX3RoaXMucmVxLmNyeXB0b0N1cnJlbmN5ID0gY3J5cHRvO1xuICAgICAgcmV0dXJuIG5ldyBjcnlwdG9fMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMubWFya2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJzdG9jay9tYXJrZXRcIjtcbiAgICAgIHJldHVybiBuZXcgbWFya2V0XzEuZGVmYXVsdChfdGhpcy5yZXEpO1xuICAgIH07XG5cbiAgICB0aGlzLmZvcmV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJmeFwiO1xuICAgICAgcmV0dXJuIG5ldyBmb3JleF8xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWZEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJyZWYtZGF0YVwiO1xuICAgICAgcmV0dXJuIG5ldyByZWZlcmVuY2VfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGF0YVBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwiZGF0YS1wb2ludHNcIjtcbiAgICAgIHJldHVybiBuZXcgZGF0YVBvaW50c18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwic3RhdHNcIjtcbiAgICAgIHJldHVybiBuZXcgc3RhdHNfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcblxuICAgIHRoaXMudGltZVNlcmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwidGltZS1zZXJpZXNcIjtcbiAgICAgIHJldHVybiBuZXcgdGltZVNlcmllc18xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuICAgIC8qKiAgUmV0dXJucyBhbiBhcnJheSBvZiBzeW1ib2xzIHVwIHRvIHRoZSB0b3AgMTAgbWF0Y2hlcy5cbiAgICAgKiBSZXN1bHRzIHdpbGwgYmUgc29ydGVkIGZvciByZWxldmFuY3kuIFNlYXJjaCBjdXJyZW50bHkgZGVmYXVsdHMgdG8gZXF1aXRpZXMgb25seSwgd2hlcmUgdGhlIHN5bWJvbCByZXR1cm5lZCBpcyBzdXBwb3J0ZWQgYnkgZW5kcG9pbnRzIGxpc3RlZCB1bmRlciB0aGUgU3RvY2tzIGNhdGVnb3J5LlxuICAgICAqIEBwYXJhbXMgc2VhcmNoIGJ5IHN5bWJvbCBvciBzZWN1cml0eSBuYW1lLlxuICAgICAqL1xuXG5cbiAgICB0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uIChzeW1ib2wpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwic2VhcmNoXCI7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3Qoc3ltYm9sKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXEgPSBuZXcgcmVxdWVzdF8xLmRlZmF1bHQoZi5iaW5kKHRoaXMpLCBjb25maWcpO1xuICB9XG5cbiAgcmV0dXJuIElFWENsb3VkQ2xpZW50O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBJRVhDbG91ZENsaWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIGlleENsb3VkQ2xpZW50XzEgPSByZXF1aXJlKFwiLi9pZXhDbG91ZENsaWVudFwiKTtcblxuZXhwb3J0cy5JRVhDbG91ZENsaWVudCA9IGlleENsb3VkQ2xpZW50XzEuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdCA9IGlleENsb3VkQ2xpZW50XzEuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIE1hcmtldCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1hcmtldChyZXEpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiBSZXR1cm5zIGFuIGFycmF5IG9mIHF1b3RlIG9iamVjdHMgZm9yIGEgZ2l2ZW4gY29sbGVjdGlvbiB0eXBlLiBDdXJyZW50bHkgc3VwcG9ydGVkIGNvbGxlY3Rpb24gdHlwZXMgYXJlIHNlY3RvciwgdGFnLCBhbmQgbGlzdCAqL1xuXG5cbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgIHZhciBwYXJhbSA9IF9hLnBhcmFtLFxuICAgICAgICAgIGNvbGxlY3Rpb25OYW1lID0gX2EuY29sbGVjdGlvbk5hbWU7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjb2xsZWN0aW9uL1wiICsgcGFyYW0gKyBcIj9jb2xsZWN0aW9uTmFtZT1cIiArIGNvbGxlY3Rpb25OYW1lKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVhcm5pbmdzIHRoYXQgd2lsbCBiZSByZXBvcnRlZCB0b2RheSBhcyB0aHJlZSBhcnJheXM6IGJlZm9yZSB0aGUgb3BlbiBidG8sIGFmdGVyIG1hcmtldCBjbG9zZSBhbWMgYW5kIGR1cmluZyB0aGUgdHJhZGluZyBkYXkgb3RoZXIuIEVhY2ggYXJyYXkgY29udGFpbnMgYW4gb2JqZWN0IHdpdGggYWxsIGtleXMgZnJvbSBlYXJuaW5ncywgYSBxdW90ZSBvYmplY3QsIGFuZCBhIGhlYWRsaW5lIGtleS4gKi9cblxuXG4gICAgdGhpcy50b2RheUVhcm5pbmdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidG9kYXktZWFybmluZ3NcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyByZXR1cm5zIGEgbGlzdCBvZiB1cGNvbWluZyBJUE9zIHNjaGVkdWxlZCBmb3IgdGhlIGN1cnJlbnQgYW5kIG5leHQgbW9udGguIFRoZSByZXNwb25zZSBpcyBzcGxpdCBpbnRvIHR3byBzdHJ1Y3R1cmVzOiByYXdEYXRhIGFuZCB2aWV3RGF0YS4gcmF3RGF0YSByZXByZXNlbnRzIGFsbCBhdmFpbGFibGUgZGF0YSBmb3IgYW4gSVBPLiB2aWV3RGF0YSByZXByZXNlbnRzIGRhdGEgc3RydWN0dXJlZCBmb3IgZGlzcGxheSB0byBhIHVzZXIuICovXG5cblxuICAgIHRoaXMudXBjb21pbmdJUE9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctaXBvc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIHJldHVybnMgYSBsaXN0IG9mIHRvZGF5IElQT3Mgc2NoZWR1bGVkIGZvciB0aGUgY3VycmVudCBhbmQgbmV4dCBtb250aC4gVGhlIHJlc3BvbnNlIGlzIHNwbGl0IGludG8gdHdvIHN0cnVjdHVyZXM6IHJhd0RhdGEgYW5kIHZpZXdEYXRhLiByYXdEYXRhIHJlcHJlc2VudHMgYWxsIGF2YWlsYWJsZSBkYXRhIGZvciBhbiBJUE8uIHZpZXdEYXRhIHJlcHJlc2VudHMgZGF0YSBzdHJ1Y3R1cmVkIGZvciBkaXNwbGF5IHRvIGEgdXNlci4gKi9cblxuXG4gICAgdGhpcy50b2RheUlQT3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ0b2RheS1pcG9zXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgZW5kcG9pbnQgcmV0dXJucyByZWFsIHRpbWUgdHJhZGVkIHZvbHVtZSBvbiBVLlMuIG1hcmtldHMuICovXG5cblxuICAgIHRoaXMudm9sdW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidm9sdW1lXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgcmV0dXJucyBhbiBhcnJheSBvZiBlYWNoIHNlY3RvciBhbmQgcGVyZm9ybWFuY2UgZm9yIHRoZSBjdXJyZW50IHRyYWRpbmcgZGF5LiBQZXJmb3JtYW5jZSBpcyBiYXNlZCBvbiBlYWNoIHNlY3RvciBFVEYuICovXG5cblxuICAgIHRoaXMuc2VjdG9yUGVyZm9ybWFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzZWN0b3ItcGVyZm9ybWFuY2VcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhbiBhcnJheSBvZiBxdW90ZXMgZm9yIHRoZSB0b3AgMTAgc3ltYm9scyBpbiBhIHNwZWNpZmllZCBsaXN0LiAqL1xuXG5cbiAgICB0aGlzLmxpc3QgPSBmdW5jdGlvbiAobGlzdFR5cGUsIF9hKSB7XG4gICAgICB2YXIgZGlzcGxheVBlcmNlbnQgPSBfYS5kaXNwbGF5UGVyY2VudCxcbiAgICAgICAgICBsaXN0TGltaXQgPSBfYS5saXN0TGltaXQ7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJsaXN0XCIgKyBsaXN0VHlwZSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIE1hcmtldDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTWFya2V0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgUmVmZXJlbmNlRGF0YSA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFJlZmVyZW5jZURhdGEocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogVGhpcyBjYWxsIHJldHVybnMgYW4gYXJyYXkgb2Ygc3ltYm9scyB0aGF0IElFWCBDbG91ZCBzdXBwb3J0cyBmb3IgQVBJIGNhbGxzLiAqL1xuXG5cbiAgICB0aGlzLnN5bWJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYW4gYXJyYXkgb2YgdGFncy4gVGFncyBjYW4gYmUgZm91bmQgb24gZWFjaCBjb21wYW55LiAqL1xuXG5cbiAgICB0aGlzLnRhZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ0YWdzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyeXB0b1N5bWJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjcnlwdG8vc3ltYm9sc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5meFN5bWJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5yZXEuZGF0YXR5cGUgPSBcInJlZi1kYXRhXCI7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJmeC9zeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgY2FsbCByZXR1cm5zIGFuIGFycmF5IG9mIHN5bWJvbHMgdGhlIEludmVzdG9ycyBFeGNoYW5nZSBzdXBwb3J0cyBmb3IgdHJhZGluZy4gVGhpcyBsaXN0IGlzIHVwZGF0ZWQgZGFpbHkgYXMgb2YgNzo0NSBhLm0uIEVULiBTeW1ib2xzIG1heSBiZSBhZGRlZCBvciByZW1vdmVkIGJ5IHRoZSBJbnZlc3RvcnMgRXhjaGFuZ2UgYWZ0ZXIgdGhlIGxpc3Qgd2FzIHByb2R1Y2VkLiAqL1xuXG5cbiAgICB0aGlzLmlleFN5bWJvbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpZXgvc3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGNhbGwgcmV0dXJucyBhbiBhcnJheSBvZiBpbnRlcm5hdGlvbmFsIHN5bWJvbHMgdGhhdCBJRVggQ2xvdWQgc3VwcG9ydHMgZm9yIEFQSSBjYWxscy4gKi9cblxuXG4gICAgdGhpcy5pbnRlcm5hdGlvbmFsU3ltYm9scyA9IGZ1bmN0aW9uIChyZWdpb24sIGV4Y2hhbmdlKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QocmVnaW9uID8gXCJyZWdpb24vXCIgKyByZWdpb24gKyBcIi9zeW1ib2xzXCIgOiBcImV4Y2hhbmdlL1wiICsgZXhjaGFuZ2UgKyBcIi9zeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgYW4gYXJyYXkgb2YgZXhjaGFuZ2VzLiAqL1xuXG5cbiAgICB0aGlzLmV4Y2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImV4Y2hhbmdlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGNhbGwgcmV0dXJucyBhbiBhcnJheSBvZiBtdXR1YWwgZnVuZCBzeW1ib2xzIHRoYXQgSUVYIENsb3VkIHN1cHBvcnRzIGZvciBBUEkgY2FsbHMuICovXG5cblxuICAgIHRoaXMubXV0dWFsRnVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJtdXR1YWwtZnVuZHMvc3ltYm9sc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGNhbGwgcmV0dXJucyBhbiBvYmplY3Qga2V5ZWQgYnkgc3ltYm9sIHdpdGggdGhlIHZhbHVlIG9mIGVhY2ggc3ltYm9sIGJlaW5nIGFuIGFycmF5IG9mIGF2YWlsYWJsZSBjb250cmFjdCBkYXRlcy4gKi9cblxuXG4gICAgdGhpcy5vcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib3B0aW9ucy9zeW1ib2xzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgY2FsbCByZXR1cm5zIGFuIGFycmF5IG9mIE9UQyBzeW1ib2xzIHRoYXQgSUVYIENsb3VkIHN1cHBvcnRzIGZvciBBUEkgY2FsbHMuICovXG5cblxuICAgIHRoaXMub3RjID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib3RjL3N5bWJvbHNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhbiBhcnJheSBvZiBzZWN0b3JzLiAqL1xuXG5cbiAgICB0aGlzLnNlY3RvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzZWN0b3JzXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBSZWZlcmVuY2VEYXRhO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWZlcmVuY2VEYXRhOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX19hd2FpdGVyID0gdGhpcyAmJiB0aGlzLl9fYXdhaXRlciB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7XG4gICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUocmVzdWx0LnZhbHVlKTtcbiAgICAgIH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7XG4gICAgfVxuXG4gICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn07XG5cbnZhciBfX2dlbmVyYXRvciA9IHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvciB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHtcbiAgICBsYWJlbDogMCxcbiAgICBzZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodFswXSAmIDEpIHRocm93IHRbMV07XG4gICAgICByZXR1cm4gdFsxXTtcbiAgICB9LFxuICAgIHRyeXM6IFtdLFxuICAgIG9wczogW11cbiAgfSxcbiAgICAgIGYsXG4gICAgICB5LFxuICAgICAgdCxcbiAgICAgIGc7XG4gIHJldHVybiBnID0ge1xuICAgIG5leHQ6IHZlcmIoMCksXG4gICAgXCJ0aHJvd1wiOiB2ZXJiKDEpLFxuICAgIFwicmV0dXJuXCI6IHZlcmIoMilcbiAgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBnO1xuXG4gIGZ1bmN0aW9uIHZlcmIobikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHN0ZXAoW24sIHZdKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcblxuICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuXG4gICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHQgPSBvcDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgXy5sYWJlbCsrO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogb3BbMV0sXG4gICAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIF8ubGFiZWwrKztcbiAgICAgICAgICB5ID0gb3BbMV07XG4gICAgICAgICAgb3AgPSBbMF07XG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgIG9wID0gXy5vcHMucG9wKCk7XG5cbiAgICAgICAgICBfLnRyeXMucG9wKCk7XG5cbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7XG4gICAgICAgICAgICBfID0gMDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgb3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpIHtcbiAgICAgICAgICAgIF8ubGFiZWwgPSBvcFsxXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkge1xuICAgICAgICAgICAgXy5sYWJlbCA9IHRbMV07XG4gICAgICAgICAgICB0ID0gb3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkge1xuICAgICAgICAgICAgXy5sYWJlbCA9IHRbMl07XG5cbiAgICAgICAgICAgIF8ub3BzLnB1c2gob3ApO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG5cbiAgICAgICAgICBfLnRyeXMucG9wKCk7XG5cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgb3AgPSBbNiwgZV07XG4gICAgICB5ID0gMDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZiA9IHQgPSAwO1xuICAgIH1cblxuICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCxcbiAgICAgIGRvbmU6IHRydWVcbiAgICB9O1xuICB9XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgSUVYUmVxdWVzdCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIElFWFJlcXVlc3QoZmV0Y2hGdW5jLCBfYSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcHVibGlzaGFibGUgPSBfYS5wdWJsaXNoYWJsZSxcbiAgICAgICAgX2IgPSBfYS5zYW5kYm94LFxuICAgICAgICBzYW5kYm94ID0gX2IgPT09IHZvaWQgMCA/IGZhbHNlIDogX2IsXG4gICAgICAgIF9jID0gX2EudmVyc2lvbixcbiAgICAgICAgdmVyc2lvbiA9IF9jID09PSB2b2lkIDAgPyBcImJldGFcIiA6IF9jO1xuXG4gICAgdGhpcy5zZXRUb2tlbiA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgcmV0dXJuIF90aGlzLnNhbmRib3ggJiYgdG9rZW5bMF0gIT09IFwiVFwiID8gXCJUXCIgKyB0b2tlbiA6IHRva2VuO1xuICAgIH07XG5cbiAgICB0aGlzLnBhcmFtcyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMgPT09IHZvaWQgMCkge1xuICAgICAgICBwYXJhbXMgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICB2YXIgZW52ID0gX3RoaXMuc2FuZGJveCA/IFwic2FuZGJveFwiIDogXCJjbG91ZFwiO1xuICAgICAgdmFyIHVybCA9IFwiaHR0cHM6Ly9cIiArIGVudiArIFwiLmlleGFwaXMuY29tL1wiICsgX3RoaXMudmVyc2lvbiArIFwiL1wiICsgX3RoaXMuZGF0YXR5cGU7XG4gICAgICB2YXIgb3BlcmFuZCA9IHBhcmFtcy5tYXRjaChuZXcgUmVnRXhwKFwiXFxcXD9cIiwgXCJnXCIpKTtcbiAgICAgIHZhciBxID0gb3BlcmFuZCAmJiBvcGVyYW5kWzBdID09PSBcIj9cIiA/IFwiJlwiIDogXCI/XCI7XG5cbiAgICAgIHZhciBwayA9IFwidG9rZW49XCIgKyBfdGhpcy5zZXRUb2tlbihfdGhpcy5wdWJsaXNoYWJsZSk7XG5cbiAgICAgIHZhciByZXF1ZXN0ID0gdXJsICsgXCIvXCIgKyBfdGhpcy5zdG9ja1N5bWJvbCArIFwiL1wiICsgcGFyYW1zICsgcSArIHBrO1xuXG4gICAgICBpZiAoX3RoaXMuZGF0YXR5cGUgPT09IFwiZGVlcFwiKSB7XG4gICAgICAgIHZhciByZXF1ZXN0XzEgPSB1cmwgKyBcIi9cIiArIHBhcmFtcyArIFwiP3N5bWJvbHM9XCIgKyBfdGhpcy5zdG9ja1N5bWJvbCArIFwiJlwiICsgcGs7XG4gICAgICAgIF90aGlzLmRhdGF0eXBlID0gXCJzdG9ja1wiO1xuICAgICAgICBfdGhpcy5zYW5kYm94O1xuICAgICAgICByZXR1cm4gcmVxdWVzdF8xO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuZGF0YXR5cGUgPT09IFwic3RvY2svbWFya2V0L2JhdGNoXCIpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RfMiA9IHVybCArIFwiP3N5bWJvbHM9XCIgKyBfdGhpcy5zdG9ja1N5bWJvbHMubWFwKGZ1bmN0aW9uIChzeW1ib2wpIHtcbiAgICAgICAgICByZXR1cm4gc3ltYm9sO1xuICAgICAgICB9KSArIFwiJnR5cGVzPVwiICsgcGFyYW1zICsgXCImXCIgKyBwaztcbiAgICAgICAgX3RoaXMuZGF0YXR5cGUgPSBcInN0b2NrXCI7XG4gICAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICAgIHJldHVybiByZXF1ZXN0XzI7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5kYXRhdHlwZSA9PT0gXCJjcnlwdG9cIikge1xuICAgICAgICB2YXIgcmVxdWVzdF8zID0gdXJsICsgXCIvXCIgKyBfdGhpcy5jcnlwdG9DdXJyZW5jeSArIFwiL1wiICsgcGFyYW1zICsgcSArIHBrO1xuICAgICAgICBfdGhpcy5kYXRhdHlwZSA9IFwic3RvY2tcIjtcbiAgICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RfMztcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLmRhdGF0eXBlID09PSBcInRvcHNcIiB8fCBfdGhpcy5kYXRhdHlwZSA9PT0gXCJzdG9jay9tYXJrZXRcIiB8fCBfdGhpcy5kYXRhdHlwZSA9PT0gXCJmeFwiIHx8IF90aGlzLmRhdGF0eXBlID09PSBcInN0YXRzXCIgfHwgX3RoaXMuZGF0YXR5cGUgPT09IFwic2VhcmNoXCIgfHwgX3RoaXMuZGF0YXR5cGUgPT09IFwidGltZS1zZXJpZXNcIiB8fCBfdGhpcy5kYXRhdHlwZSA9PT0gXCJyZWYtZGF0YVwiKSB7XG4gICAgICAgIHZhciByZXF1ZXN0XzQgPSB1cmwgKyBcIi9cIiArIHBhcmFtcyArIHEgKyBwaztcbiAgICAgICAgX3RoaXMuZGF0YXR5cGUgPSBcInN0b2NrXCI7XG4gICAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICAgIHJldHVybiByZXF1ZXN0XzQ7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLnNhbmRib3g7XG4gICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9O1xuXG4gICAgdGhpcy5iYXRjaFBhcmFtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0eXBlcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB0eXBlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgfVxuXG4gICAgICB2YXIgZW52ID0gX3RoaXMuc2FuZGJveCA/IFwic2FuZGJveFwiIDogXCJjbG91ZFwiO1xuICAgICAgdmFyIHVybCA9IFwiaHR0cHM6Ly9cIiArIGVudiArIFwiLmlleGFwaXMuY29tL1wiICsgX3RoaXMudmVyc2lvbiArIFwiL1wiICsgX3RoaXMuZGF0YXR5cGU7XG5cbiAgICAgIHZhciBzeW1ib2xzID0gXCJcIiArIF90aGlzLnN0b2NrU3ltYm9scy5tYXAoZnVuY3Rpb24gKHN5bWJvbCkge1xuICAgICAgICByZXR1cm4gc3ltYm9sO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBiYXRjaFR5cGVzID0gXCJ0eXBlcz1cIiArIHR5cGVzLm1hcChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH0pICsgXCImdG9rZW49XCIgKyBfdGhpcy5zZXRUb2tlbihfdGhpcy5wdWJsaXNoYWJsZSk7XG5cbiAgICAgIHZhciByZXF1ZXN0O1xuXG4gICAgICBpZiAoX3RoaXMuZGF0YXR5cGUgPT09IFwic3RvY2svbWFya2V0L2JhdGNoXCIpIHtcbiAgICAgICAgcmVxdWVzdCA9IHVybCArIFwiL2JhdGNoP3N5bWJvbHM9XCIgKyBzeW1ib2xzICsgXCImXCIgKyBiYXRjaFR5cGVzO1xuICAgICAgICBfdGhpcy5kYXRhdHlwZSA9IFwic3RvY2tcIjtcbiAgICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QgPSB1cmwgKyBcIi9cIiArIF90aGlzLnN0b2NrU3ltYm9sICsgXCIvYmF0Y2g/XCIgKyBiYXRjaFR5cGVzO1xuICAgICAgX3RoaXMuc2FuZGJveDtcbiAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH07XG5cbiAgICB0aGlzLnJlcXVlc3QgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVzcG9uc2UoX3RoaXMucGFyYW1zLCBwYXJhbXMpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc3BvbnNlID0gZnVuY3Rpb24gKHJlcSwgcGFyYW1zLCByYW5nZSkge1xuICAgICAgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG4sIHJlcywgY29udGVudFR5cGUsIGVycm9yLCBlcnJfMTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCA2LCwgN10pO1xuXG4gICAgICAgICAgICAgIG4gPSByYW5nZSA/IHJhbmdlIDogXCJcIjtcbiAgICAgICAgICAgICAgcmV0dXJuIFs0XG4gICAgICAgICAgICAgIC8qeWllbGQqL1xuICAgICAgICAgICAgICAsIHRoaXMuZmV0Y2hGdW5jKHJlcShwYXJhbXMgKyBuKSldO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIHJlcy5oZWFkZXJzLmdldCA9PT0gXCJmdW5jdGlvblwiKSkgcmV0dXJuIFszXG4gICAgICAgICAgICAgIC8qYnJlYWsqL1xuICAgICAgICAgICAgICAsIDVdO1xuICAgICAgICAgICAgICBjb250ZW50VHlwZSA9IHJlcy5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKTtcbiAgICAgICAgICAgICAgaWYgKCEoY29udGVudFR5cGUgPT09IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKSkgcmV0dXJuIFszXG4gICAgICAgICAgICAgIC8qYnJlYWsqL1xuICAgICAgICAgICAgICAsIDNdO1xuICAgICAgICAgICAgICByZXR1cm4gWzRcbiAgICAgICAgICAgICAgLyp5aWVsZCovXG4gICAgICAgICAgICAgICwgcmVzLmpzb24oKV07XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIFsyXG4gICAgICAgICAgICAgIC8qcmV0dXJuKi9cbiAgICAgICAgICAgICAgLCBfYS5zZW50KCldO1xuXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGlmICghKHJlcy5zdGF0dXMgPj0gNDAwKSkgcmV0dXJuIFszXG4gICAgICAgICAgICAgIC8qYnJlYWsqL1xuICAgICAgICAgICAgICAsIDVdO1xuICAgICAgICAgICAgICByZXR1cm4gWzRcbiAgICAgICAgICAgICAgLyp5aWVsZCovXG4gICAgICAgICAgICAgICwgcmVzLnRleHQoKV07XG5cbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgZXJyb3IgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG5cbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgcmV0dXJuIFsyXG4gICAgICAgICAgICAgIC8qcmV0dXJuKi9cbiAgICAgICAgICAgICAgLCByZXMuZGF0YV07XG5cbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgZXJyXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgIHJldHVybiBbMlxuICAgICAgICAgICAgICAvKnJldHVybiovXG4gICAgICAgICAgICAgICwgZXJyXzEucmVzcG9uc2UgPyBlcnJfMS5yZXNwb25zZS5kYXRhIDogZXJyXzFdO1xuXG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgIHJldHVybiBbMlxuICAgICAgICAgICAgICAvKnJldHVybiovXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmZldGNoRnVuYyA9IGZldGNoRnVuYywgdGhpcy5wdWJsaXNoYWJsZSA9IHB1Ymxpc2hhYmxlLCB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uLCB0aGlzLnNhbmRib3ggPSBzYW5kYm94LCB0aGlzLmRhdGF0eXBlID0gXCJzdG9ja1wiLCB0aGlzLmNyeXB0b0N1cnJlbmN5ID0gXCJcIiwgdGhpcy5zdG9ja1N5bWJvbCA9IFwiXCIsIHRoaXMuc3RvY2tTeW1ib2xzID0gW10sIHRoaXMucmVxdWVzdCA9IHRoaXMucmVxdWVzdDtcbiAgfVxuXG4gIHJldHVybiBJRVhSZXF1ZXN0O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBJRVhSZXF1ZXN0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgU3RhdGlzdGljcyA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0YXRpc3RpY3MocmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogUmV0dXJucyBkYWlseSBzdGF0cyBmb3IgYSBnaXZlbiB0aW1lIGZyYW1lICovXG5cblxuICAgIHRoaXMuaGlzdG9yaWNhbCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJoaXN0b3JpY2FsL1wiICsgKGRhdGUgPyBcIi9cIiArIGRhdGUgOiBcIlwiKSk7XG4gICAgfTtcblxuICAgIHRoaXMuaW50cmFkYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnRyYWRheVwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZWNlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJyZWNlbnRcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVjb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInJlY29yZHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMucmVxID0gcmVxO1xuICB9XG5cbiAgcmV0dXJuIFN0YXRpc3RpY3M7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0YXRpc3RpY3M7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBkZWVwXzEgPSByZXF1aXJlKFwiLi9kZWVwXCIpO1xuXG52YXIgdGltZVNlcmllc18xID0gcmVxdWlyZShcIi4vdGltZVNlcmllc1wiKTtcblxudmFyIGZvcmV4XzEgPSByZXF1aXJlKFwiLi9mb3JleFwiKTtcblxudmFyIGJhdGNoXzEgPSByZXF1aXJlKFwiLi9iYXRjaFwiKTtcblxudmFyIFN0b2NrID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RvY2socmVxKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogcmV0dXJucyBiYWxhbmNlIHNoZWV0IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHkgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlclxuICAgICAqIGBEYXRhIFdlaWdodDogMzAwMGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5iYWxhbmNlU2hlZXQgPSBmdW5jdGlvbiAocGVyaW9kLCBsYXN0KSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJiYWxhbmNlLXNoZWV0XCIgKyAocGVyaW9kID8gXCI/cGVyaW9kPVwiICsgcGVyaW9kIDogXCJcIikgKyAobGFzdCA/IFwiJmxhc3Q9XCIgKyBsYXN0IDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqIGJhdGNoIHJldHVybnMgbXVsdGlwZSBkYXRhLXR5cGVzIGZvciBhIGdpdmUgc3RvY2sgc3ltYm9sICovXG4gICAgLy8gcHVibGljIGJhdGNoID0gKC4uLnBhcmFtczogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAvLyAgIHJldHVybiB0aGlzLnJlcS5yZXNwb25zZSh0aGlzLnJlcS5iYXRjaFBhcmFtcywgcGFyYW1zKTtcbiAgICAvLyB9O1xuXG4gICAgLyoqIGJhdGNoIHJldHVybnMgbXVsdGlwZSBkYXRhLXR5cGVzIGZvciBhIGdpdmUgc3RvY2sgc3ltYm9sICovXG5cblxuICAgIHRoaXMuYmF0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMuaWV4QmF0Y2g7XG4gICAgfTtcblxuICAgIHRoaXMuZGVlcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwiZGVlcFwiO1xuICAgICAgcmV0dXJuIF90aGlzLmlleERlZXA7XG4gICAgfTtcblxuICAgIHRoaXMudGltZVNlcmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwidGltZS1zZXJpZXNcIjtcbiAgICAgIHJldHVybiBfdGhpcy50aW1lc2VyaWVzO1xuICAgIH07XG5cbiAgICB0aGlzLmZvcmV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJmeFwiO1xuICAgICAgcmV0dXJuIF90aGlzLmlleEZvcmV4O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogcmV0dXJucyBib29rIHZhbHVlIGZvciBhIGdpdmVuIHN0b2NrXG4gICAgICogYERhdGEgV2VpZ2h0OiAxIHBlciBxdW90ZSByZXR1cm5lZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5ib29rID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYm9va1wiKTtcbiAgICB9O1xuICAgIC8qKiBUT1BTIHByb3ZpZGVzIElFWOKAmXMgYWdncmVnYXRlZCBiZXN0IHF1b3RlZCBiaWQgYW5kIG9mZmVyIHBvc2l0aW9uIGluIG5lYXIgcmVhbCB0aW1lIGZvciBhbGwgc2VjdXJpdGllcyBvbiBJRVjigJlzIGRpc3BsYXllZCBsaW1pdCBvcmRlciBib29rLiBUT1BTIGlzIGlkZWFsIGZvciBkZXZlbG9wZXJzIG5lZWRpbmcgYm90aCBxdW90ZSBhbmQgdHJhZGUgZGF0YS4gKi9cblxuXG4gICAgdGhpcy50b3BzID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMucmVxLmRhdGF0eXBlID0gXCJ0b3BzXCI7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoX3RoaXMucmVxLnN0b2NrU3ltYm9scyA/IFwiP3N5bWJvbHM9XCIgKyBfdGhpcy5yZXEuc3RvY2tTeW1ib2xzIDogXCJcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFkanVzdGVkIGFuZCB1bmFkanVzdGVkIGhpc3RvcmljYWwgZGF0YSBmb3IgdXAgdG8gMTUgeWVhcnMuXG4gICAgICogYERhdGEgV2VpZ2h0OiAxLDAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuY2hhcnQgPSBmdW5jdGlvbiAocmFuZ2UsIHBhcmFtcykge1xuICAgICAgLy8gaWYgcmFuZ2UgaXMgJ2RhdGUnICYgdGhlcmUncyBhICdkYXRlJyBwYXJhbVxuICAgICAgaWYgKHJhbmdlID09PSBcImRhdGVcIiAmJiBwYXJhbXMgJiYgcGFyYW1zLmRhdGUpIHtcbiAgICAgICAgdmFyIGtleXNfMSA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG4gICAgICAgIHZhciBwYXJhbXNTdHJpbmcgPSBrZXlzXzEubGVuZ3RoID4gMSA/IFwiP1wiICsga2V5c18xLnJlZHVjZShmdW5jdGlvbiAoc3RyLCBrZXksIGkpIHtcbiAgICAgICAgICBpZiAoa2V5ICE9PSBcImRhdGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBzdHIgKyBrZXkgKyBcIj1cIiArIHBhcmFtc1trZXldICsgKGkgPCBrZXlzXzEubGVuZ3RoIC0gMSA/IFwiJlwiIDogXCJcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfSwgXCJcIikgOiBcIlwiO1xuICAgICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjaGFydC9cIiArIHJhbmdlICsgXCIvXCIgKyBwYXJhbXMuZGF0ZSArIHBhcmFtc1N0cmluZyk7XG4gICAgICB9IC8vIGluIGFueSBvdGhlciBjYXNlXG5cblxuICAgICAgdmFyIHZhbHVlcyA9IHBhcmFtcyAmJiBPYmplY3QuZW50cmllcyhwYXJhbXMpO1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2hhcnQvXCIgKyByYW5nZSArIChwYXJhbXMgPyBcIj9cIiArIHZhbHVlcy5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHZbMF0gKyBcIj1cIiArIHZbMV07XG4gICAgICB9KS5qb2luKFwiJlwiKSA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgY2FzaCBmbG93IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHksIHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXIuXG4gICAgICpcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEsMDAwIHBlciBzeW1ib2wgcGVyIHBlcmlvZGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jYXNoRmxvdyA9IGZ1bmN0aW9uIChwZXJpb2QsIGxhc3QpIHtcbiAgICAgIGlmIChwZXJpb2QgPT09IHZvaWQgMCkge1xuICAgICAgICBwZXJpb2QgPSBcInF1YXJ0ZXJseVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJjYXNoLWZsb3c/cGVyaW9kPVwiICsgcGVyaW9kICsgXCImbGFzdD1cIiArIGxhc3QpO1xuICAgIH07XG4gICAgLyoqIHJldHVybnMgQ2VvIENvbXBlbnNhdGlvbiAqL1xuXG5cbiAgICB0aGlzLmNlb0NvbXBlbnNhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNlby1jb21wZW5zYXRpb25cIik7XG4gICAgfTtcbiAgICAvKiogcmV0dXJucyBkYXRhIG9uIGEgZ2l2ZW4gY29tcGFueVxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEgcGVyIHN5bWJvbGBcbiAgICAgKi9cblxuXG4gICAgdGhpcy5jb21wYW55ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY29tcGFueVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEgcGVyIHN5bWJvbCBwZXIgcXVvdGVgXG4gICAgICovXG5cblxuICAgIHRoaXMuZGVsYXllZFF1b3RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZGVsYXllZC1xdW90ZVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGBEYXRhIFdlaWdodDogMTAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kIHJldHVybmVkYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmRpdmlkZW5kcyA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZGl2aWRlbmRzXCIgKyAocmFuZ2UgPyBcIi9cIiArIHJhbmdlIDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZWFybmluZ3MgZGF0YSBmb3IgYSBnaXZlbiBjb21wYW55IGluY2x1ZGluZyB0aGUgYWN0dWFsIEVQUywgY29uc2Vuc3VzLCBhbmQgZmlzY2FsIHBlcmlvZC4gRWFybmluZ3MgYXJlIGF2YWlsYWJsZSBxdWFydGVybHkgKGxhc3QgNCBxdWFydGVycykuXG4gICAgICogIGBEYXRhIFdlaWdodDogMTAwMCBwZXIgc3ltYm9sIHBlciBwZXJpb2RgXG4gICAgICovXG5cblxuICAgIHRoaXMuZWFybmluZ3MgPSBmdW5jdGlvbiAobGFzdCwgZmllbGQpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImVhcm5pbmdzXCIgKyAobGFzdCA/IFwiL1wiICsgbGFzdCA6IFwiXCIpICsgKGZpZWxkID8gXCIvXCIgKyBmaWVsZCA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKiBQcm92aWRlcyB0aGUgbGF0ZXN0IGNvbnNlbnN1cyBlc3RpbWF0ZSBmb3IgdGhlIG5leHQgZmlzY2FsIHBlcmlvZCAqL1xuXG5cbiAgICB0aGlzLmVzdGltYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImVzdGltYXRlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBQdWxscyBpbmNvbWUgc3RhdGVtZW50LCBiYWxhbmNlIHNoZWV0LCBhbmQgY2FzaCBmbG93IGRhdGEgZnJvbSB0aGUgbW9zdCByZWNlbnQgcmVwb3J0ZWQgcXVhcnRlci4gKi9cblxuXG4gICAgdGhpcy5maW5hbmNpYWxzID0gZnVuY3Rpb24gKHBlcmlvZCkge1xuICAgICAgaWYgKHBlcmlvZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHBlcmlvZCA9IFwicXVhcnRlcmx5XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImZpbmFuY2lhbHM/cGVyaW9kPVwiICsgcGVyaW9kKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGxhdGVzdCBuZXdzIGZvciBhIGdpdmUgc3RvY2sgc3ltYm9sICovXG5cblxuICAgIHRoaXMubmV3cyA9IGZ1bmN0aW9uIChsYXN0KSB7XG4gICAgICBpZiAobGFzdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGxhc3QgPSAxMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibmV3cy9sYXN0L1wiICsgbGFzdCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0b3AgMTAgZnVuZCBob2xkZXJzLCBtZWFuaW5nIGFueSBmaXJtIG5vdCBkZWZpbmVkIGFzIGJ1eS1zaWRlIG9yIHNlbGwtc2lkZSBzdWNoIGFzIG11dHVhbCBmdW5kcywgcGVuc2lvbiBmdW5kcywgZW5kb3dtZW50cywgaW52ZXN0bWVudCBmaXJtcywgYW5kIG90aGVyIGxhcmdlIGVudGl0aWVzIHRoYXQgbWFuYWdlIGZ1bmRzIG9uIGJlaGFsZiBvZiBvdGhlcnMuXG4gICAgICovXG5cblxuICAgIHRoaXMuZnVuZE93bmVyc2hpcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImZ1bmQtb3duZXJzaGlwXCIpO1xuICAgIH07XG4gICAgLyoqIFB1bGxzIGluY29tZSBzdGF0ZW1lbnQgZGF0YS4gQXZhaWxhYmxlIHF1YXJ0ZXJseSBvciBhbm51YWxseSB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyLiAqL1xuXG5cbiAgICB0aGlzLmluY29tZSA9IGZ1bmN0aW9uIChwZXJpb2QsIGxhc3QpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluY29tZVwiICsgKHBlcmlvZCA/IFwiP3BlcmlvZD1cIiArIHBlcmlvZCA6IFwiXCIpICsgKGxhc3QgPyBcIiZsYXN0PVwiICsgbGFzdCA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHRoZSB0b3AgMTAgaW5zaWRlcnMsIHdpdGggdGhlIG1vc3QgcmVjZW50IGluZm9ybWF0aW9uLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJSb3N0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnNpZGVyLXJvc3RlclwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGFnZ3JlZ2F0ZWQgaW5zaWRlcnMgc3VtbWFyeSBkYXRhIGZvciB0aGUgbGFzdCA2IG1vbnRocy4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyU3VtbWFyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImluc2lkZXItc3VtbWFyeVwiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGluc2lkZXIgdHJhbnNhY3Rpb25zLiAqL1xuXG5cbiAgICB0aGlzLmluc2lkZXJUcmFuc2FjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnNpZGVyLXRyYW5zYWN0aW9uc1wiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgIFJldHVybnMgdGhlIHRvcCAxMCBpbnN0aXR1dGlvbmFsIGhvbGRlcnMsIGRlZmluZWQgYXMgYnV5LXNpZGUgb3Igc2VsbC1zaWRlIGZpcm1zLiAqL1xuXG5cbiAgICB0aGlzLmluc3RpdHV0aW9uYWxPd25lcnNoaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnN0aXR1dGlvbmFsLW93bmVyc2hpcFwiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGVuZHBvaW50IHdpbGwgcmV0dXJuIGFnZ3JlZ2F0ZWQgaW50cmFkYXkgcHJpY2VzIGluIG9uZSBtaW51dGUgYnVja2V0cyAqL1xuXG5cbiAgICB0aGlzLmludHJhZGF5UHJpY2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW50cmFkYXktcHJpY2VzXCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgaXMgYSBoZWxwZXIgZnVuY3Rpb24sIGJ1dCB0aGUgZ29vZ2xlIEFQSXMgdXJsIGlzIHN0YW5kYXJkaXplZC4gICovXG5cblxuICAgIHRoaXMubG9nbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImxvZ29cIik7XG4gICAgfTtcbiAgICAvKiogIFRoaXMgcmV0dXJucyAxNSBtaW51dGUgZGVsYXllZCwgbGFzdCBzYWxlIGVsaWdpYmxlIHRyYWRlcy4gKi9cblxuXG4gICAgdGhpcy5sYXJnZXN0VHJhZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwibGFyZ2VzdC10cmFkZXNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBlbmQgb2YgZGF5IG9wdGlvbnMgZGF0YSAqL1xuXG5cbiAgICB0aGlzLm9wdGlvbnMgPSBmdW5jdGlvbiAoZXhwaXJhdGlvbiwgb3B0aW9uU2lkZSkge1xuICAgICAgaWYgKGV4cGlyYXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICBleHBpcmF0aW9uID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib3B0aW9uc1wiICsgKGV4cGlyYXRpb24gPyBcIi9cIiArIGV4cGlyYXRpb24gOiBcIlwiKSArIChvcHRpb25TaWRlID8gXCIvXCIgKyBvcHRpb25TaWRlIDogXCJcIikpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcGVlciBncm91cCAqL1xuXG5cbiAgICB0aGlzLnBlZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicGVlcnNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwcmV2aW91cyBkYXkgYWRqdXN0ZWQgcHJpY2UgZGF0YSBmb3Igb25lIG9yIG1vcmUgc3RvY2tzLiAqL1xuXG5cbiAgICB0aGlzLnByZXZpb3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJldmlvdXNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBwcmljZSBvZiBhIHN0b2NrICovXG5cblxuICAgIHRoaXMucHJpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmljZVwiKTtcbiAgICB9O1xuICAgIC8qKiBQcm92aWRlcyB0aGUgbGF0ZXN0IGF2ZywgaGlnaCwgYW5kIGxvdyBhbmFseXN0IHByaWNlIHRhcmdldCBmb3IgYSBzeW1ib2wuICovXG5cblxuICAgIHRoaXMucHJpY2VUYXJnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJwcmljZS10YXJnZXRcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyB0aGUgb2ZmaWNpYWwgb3BlbiBhbmQgY2xvc2UgZm9yIGEgZ2l2ZSBzeW1ib2wuIFRoZSBvZmZpY2lhbCBvcGVuIGlzIGF2YWlsYWJsZSBhcyBzb29uIGFzIDk6NDVhbSBFVCBhbmQgdGhlIG9mZmljaWFsIGNsb3NlIGFzIHNvb24gYXMgNDoxNXBtIEVULiBTb21lIHN0b2NrcyBjYW4gcmVwb3J0IGxhdGUgb3BlbiBvciBjbG9zZSBwcmljZXMuICovXG5cblxuICAgIHRoaXMub2hsYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcIm9obGNcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICBUaGlzIGVuZHBvaW50IHByb3ZpZGVzIHNvY2lhbCBzZW50aW1lbnQgZGF0YSBmcm9tIFN0b2NrVHdpdHMuIERhdGEgY2FuIGJlIHZpZXdlZCBhcyBhIGRhaWx5IHZhbHVlLCBvciBieSBtaW51dGUgZm9yIGEgZ2l2ZW4gZGF0ZS4gKi9cblxuXG4gICAgdGhpcy5zZW50aW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgZGF0ZSkge1xuICAgICAgaWYgKHR5cGUgPT09IHZvaWQgMCkge1xuICAgICAgICB0eXBlID0gXCJkYWlseVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzZW50aW1lbnQvXCIgKyB0eXBlICsgKGRhdGUgPyBcIi9cIiArIGRhdGUgOiBcIlwiKSk7XG4gICAgfTtcblxuICAgIHRoaXMucXVvdGUgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgIGlmIChmaWVsZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGZpZWxkID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicXVvdGUvXCIgKyAoZmllbGQgPyBmaWVsZCA6IFwiXCIpKTtcbiAgICB9O1xuICAgIC8qKiBQdWxscyBkYXRhIGZyb20gdGhlIGxhc3QgZm91ciBtb250aHMuICovXG5cblxuICAgIHRoaXMucmVjb21tZW5kYXRpb25UcmVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJyZWNvbW1lbmRhdGlvbi10cmVuZHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhdHMgPSBmdW5jdGlvbiAoc3RhdCkge1xuICAgICAgaWYgKHN0YXQgPT09IHZvaWQgMCkge1xuICAgICAgICBzdGF0ID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwic3RhdHMvXCIgKyBzdGF0KTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWV2ZW50c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0Vhcm5pbmdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctZWFybmluZ3NcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdEaXZpZGVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1kaXZpZGVuZHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdTcGxpdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1zcGxpdHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdJUE9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctaXBvc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zcGxpdHMgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgIGlmIChyYW5nZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJhbmdlID0gXCIxbVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzcGxpdHMvXCIgKyByYW5nZSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2hvcnRJbnRlcmVzdCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICBpZiAoZGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGUgPSBcIlwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzaG9ydC1pbnRlcmVzdC9cIiArIGRhdGUpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgcmV0dXJucyAxNSBtaW51dGUgZGVsYXllZCBhbmQgMzAgZGF5IGF2ZXJhZ2UgY29uc29saWRhdGVkIHZvbHVtZSBwZXJjZW50YWdlIG9mIGEgc3RvY2ssIGJ5IG1hcmtldC4gVGhpcyBjYWxsIHdpbGwgYWx3YXlzIHJldHVybiAxMyB2YWx1ZXMsIGFuZCB3aWxsIGJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgY3VycmVudCBkYXkgdHJhZGluZyB2b2x1bWUgcGVyY2VudGFnZS4gKi9cblxuXG4gICAgdGhpcy52b2x1bWVCeVZlbnVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidm9sdW1lLWJ5LXZlbnVlXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgICB0aGlzLmlleERlZXAgPSBuZXcgZGVlcF8xLmRlZmF1bHQocmVxKTtcbiAgICB0aGlzLnRpbWVzZXJpZXMgPSBuZXcgdGltZVNlcmllc18xLmRlZmF1bHQocmVxKTtcbiAgICB0aGlzLmlleEZvcmV4ID0gbmV3IGZvcmV4XzEuZGVmYXVsdChyZXEpO1xuICAgIHRoaXMuaWV4QmF0Y2ggPSBuZXcgYmF0Y2hfMS5kZWZhdWx0KHJlcSk7XG4gIH1cblxuICByZXR1cm4gU3RvY2s7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0b2NrOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgZm9yZXhfMSA9IHJlcXVpcmUoXCIuL2ZvcmV4XCIpO1xuXG52YXIgYmF0Y2hfMSA9IHJlcXVpcmUoXCIuL2JhdGNoXCIpO1xuXG52YXIgU3RvY2tzID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RvY2tzKHJlcSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLyoqIHJldHVybnMgYmFsYW5jZSBzaGVldCBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5IHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgdGhlIGxhc3QgYXZhaWxhYmxlIHF1YXJ0ZXJcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDMwMDBgXG4gICAgICovXG5cblxuICAgIHRoaXMuYmFsYW5jZVNoZWV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiYmFsYW5jZS1zaGVldFwiKTtcbiAgICB9O1xuICAgIC8qKiBiYXRjaCByZXR1cm5zIG11bHRpcGUgZGF0YS10eXBlcyBmb3IgYSBnaXZlIHN0b2NrIHN5bWJvbCAqL1xuXG5cbiAgICB0aGlzLmJhdGNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBiYXRjaF8xLmRlZmF1bHQoX3RoaXMucmVxKTtcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnJlcS5kYXRhdHlwZSA9IFwiZnhcIjtcbiAgICAgIHJldHVybiBuZXcgZm9yZXhfMS5kZWZhdWx0KF90aGlzLnJlcSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGJvb2sgdmFsdWUgZm9yIGEgZ2l2ZW4gc3RvY2tcbiAgICAgKiBgRGF0YSBXZWlnaHQ6IDEgcGVyIHF1b3RlIHJldHVybmVkYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmJvb2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJib29rXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhZGp1c3RlZCBhbmQgdW5hZGp1c3RlZCBoaXN0b3JpY2FsIGRhdGEgZm9yIHVwIHRvIDE1IHllYXJzLlxuICAgICAqIGBEYXRhIFdlaWdodDogMSwwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNoYXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2hhcnRcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGNhc2ggZmxvdyBkYXRhLiBBdmFpbGFibGUgcXVhcnRlcmx5IG9yIGFubnVhbGx5LCB3aXRoIHRoZSBkZWZhdWx0IGJlaW5nIHRoZSBsYXN0IGF2YWlsYWJsZSBxdWFydGVyLlxuICAgICAqIGBEYXRhIFdlaWdodDogMSwwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmNhc2hGbG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY2FzaC1mbG93XCIpO1xuICAgIH07XG4gICAgLyoqIHJldHVybnMgQ2VvIENvbXBlbnNhdGlvbiAqL1xuXG5cbiAgICB0aGlzLmNlb0NvbXBlbnNhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImNlby1jb21wZW5zYXRpb25cIik7XG4gICAgfTtcbiAgICAvKiogcmV0dXJucyBkYXRhIG9uIGEgZ2l2ZW4gY29tcGFueVxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEgcGVyIHN5bWJvbGAgKi9cblxuXG4gICAgdGhpcy5jb21wYW55ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiY29tcGFueVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEgcGVyIHN5bWJvbCBwZXIgcXVvdGVgXG4gICAgICovXG5cblxuICAgIHRoaXMuZGVsYXllZFF1b3RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZGVsYXllZC1xdW90ZVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGBEYXRhIFdlaWdodDogMTAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kIHJldHVybmVkYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmRpdmlkZW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImRpdmlkZW5kc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIGVhcm5pbmdzIGRhdGEgZm9yIGEgZ2l2ZW4gY29tcGFueSBpbmNsdWRpbmcgdGhlIGFjdHVhbCBFUFMsIGNvbnNlbnN1cywgYW5kIGZpc2NhbCBwZXJpb2QuIEVhcm5pbmdzIGFyZSBhdmFpbGFibGUgcXVhcnRlcmx5IChsYXN0IDQgcXVhcnRlcnMpLlxuICAgICAqICBgRGF0YSBXZWlnaHQ6IDEwMDAgcGVyIHN5bWJvbCBwZXIgcGVyaW9kYFxuICAgICAqL1xuXG5cbiAgICB0aGlzLmVhcm5pbmdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiZWFybmluZ3NcIik7XG4gICAgfTtcbiAgICAvKiogUHJvdmlkZXMgdGhlIGxhdGVzdCBjb25zZW5zdXMgZXN0aW1hdGUgZm9yIHRoZSBuZXh0IGZpc2NhbCBwZXJpb2QgKi9cblxuXG4gICAgdGhpcy5lc3RpbWF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJlc3RpbWF0ZXNcIik7XG4gICAgfTtcbiAgICAvKiogUHVsbHMgaW5jb21lIHN0YXRlbWVudCwgYmFsYW5jZSBzaGVldCwgYW5kIGNhc2ggZmxvdyBkYXRhIGZyb20gdGhlIG1vc3QgcmVjZW50IHJlcG9ydGVkIHF1YXJ0ZXIuICovXG5cblxuICAgIHRoaXMuZmluYW5jaWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImZpbmFuY2lhbHNcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBsYXRlc3QgbmV3cyBmb3IgYSBnaXZlIHN0b2NrIHN5bWJvbCAqL1xuXG5cbiAgICB0aGlzLm5ld3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJuZXdzXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdG9wIDEwIGZ1bmQgaG9sZGVycywgbWVhbmluZyBhbnkgZmlybSBub3QgZGVmaW5lZCBhcyBidXktc2lkZSBvciBzZWxsLXNpZGUgc3VjaCBhcyBtdXR1YWwgZnVuZHMsIHBlbnNpb24gZnVuZHMsIGVuZG93bWVudHMsIGludmVzdG1lbnQgZmlybXMsIGFuZCBvdGhlciBsYXJnZSBlbnRpdGllcyB0aGF0IG1hbmFnZSBmdW5kcyBvbiBiZWhhbGYgb2Ygb3RoZXJzLlxuICAgICAqL1xuXG5cbiAgICB0aGlzLmZ1bmRPd25lcnNoaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJmdW5kLW93bmVyc2hpcFwiKTtcbiAgICB9O1xuICAgIC8qKiBQdWxscyBpbmNvbWUgc3RhdGVtZW50IGRhdGEuIEF2YWlsYWJsZSBxdWFydGVybHkgb3IgYW5udWFsbHkgd2l0aCB0aGUgZGVmYXVsdCBiZWluZyB0aGUgbGFzdCBhdmFpbGFibGUgcXVhcnRlci4gKi9cblxuXG4gICAgdGhpcy5pbmNvbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbmNvbWVcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyB0aGUgdG9wIDEwIGluc2lkZXJzLCB3aXRoIHRoZSBtb3N0IHJlY2VudCBpbmZvcm1hdGlvbi4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyUm9zdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zaWRlci1yb3N0ZXJcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBhZ2dyZWdhdGVkIGluc2lkZXJzIHN1bW1hcnkgZGF0YSBmb3IgdGhlIGxhc3QgNiBtb250aHMuICovXG5cblxuICAgIHRoaXMuaW5zaWRlclN1bW1hcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJpbnNpZGVyLXN1bW1hcnlcIik7XG4gICAgfTtcbiAgICAvKiogUmV0dXJucyBpbnNpZGVyIHRyYW5zYWN0aW9ucy4gKi9cblxuXG4gICAgdGhpcy5pbnNpZGVyVHJhbnNhY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zaWRlci10cmFuc2FjdGlvbnNcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICBSZXR1cm5zIHRoZSB0b3AgMTAgaW5zdGl0dXRpb25hbCBob2xkZXJzLCBkZWZpbmVkIGFzIGJ1eS1zaWRlIG9yIHNlbGwtc2lkZSBmaXJtcy4gKi9cblxuXG4gICAgdGhpcy5pbnN0aXR1dGlvbmFsT3duZXJzaGlwID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwiaW5zdGl0dXRpb25hbC1vd25lcnNoaXBcIik7XG4gICAgfTtcbiAgICAvKiogVGhpcyBlbmRwb2ludCB3aWxsIHJldHVybiBhZ2dyZWdhdGVkIGludHJhZGF5IHByaWNlcyBpbiBvbmUgbWludXRlIGJ1Y2tldHMgKi9cblxuXG4gICAgdGhpcy5pbnRyYWRheVByaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImludHJhZGF5LXByaWNlc1wiKTtcbiAgICB9O1xuICAgIC8qKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uLCBidXQgdGhlIGdvb2dsZSBBUElzIHVybCBpcyBzdGFuZGFyZGl6ZWQuICAqL1xuXG5cbiAgICB0aGlzLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJsb2dvXCIpO1xuICAgIH07XG4gICAgLyoqICBUaGlzIHJldHVybnMgMTUgbWludXRlIGRlbGF5ZWQsIGxhc3Qgc2FsZSBlbGlnaWJsZSB0cmFkZXMuICovXG5cblxuICAgIHRoaXMubGFyZ2VzdFRyYWRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcImxhcmdlc3QtdHJhZGVzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgZW5kIG9mIGRheSBvcHRpb25zIGRhdGEgKi9cblxuXG4gICAgdGhpcy5vcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwib3B0aW9uc1wiKTtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm5zIHBlZXIgZ3JvdXAgKi9cblxuXG4gICAgdGhpcy5wZWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInBlZXJzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcHJldmlvdXMgZGF5IGFkanVzdGVkIHByaWNlIGRhdGEgZm9yIG9uZSBvciBtb3JlIHN0b2Nrcy4gKi9cblxuXG4gICAgdGhpcy5wcmV2aW91cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInByZXZpb3VzXCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgcHJpY2Ugb2YgYSBzdG9jayAqL1xuXG5cbiAgICB0aGlzLnByaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJpY2VcIik7XG4gICAgfTtcbiAgICAvKiogUHJvdmlkZXMgdGhlIGxhdGVzdCBhdmcsIGhpZ2gsIGFuZCBsb3cgYW5hbHlzdCBwcmljZSB0YXJnZXQgZm9yIGEgc3ltYm9sLiAqL1xuXG5cbiAgICB0aGlzLnByaWNlVGFyZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwicHJpY2UtdGFyZ2V0XCIpO1xuICAgIH07XG4gICAgLyoqIFJldHVybnMgdGhlIG9mZmljaWFsIG9wZW4gYW5kIGNsb3NlIGZvciBhIGdpdmUgc3ltYm9sLiBUaGUgb2ZmaWNpYWwgb3BlbiBpcyBhdmFpbGFibGUgYXMgc29vbiBhcyA5OjQ1YW0gRVQgYW5kIHRoZSBvZmZpY2lhbCBjbG9zZSBhcyBzb29uIGFzIDQ6MTVwbSBFVC4gU29tZSBzdG9ja3MgY2FuIHJlcG9ydCBsYXRlIG9wZW4gb3IgY2xvc2UgcHJpY2VzLiAqL1xuXG5cbiAgICB0aGlzLm9obGMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJvaGxjXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICBUaGlzIGVuZHBvaW50IHByb3ZpZGVzIHNvY2lhbCBzZW50aW1lbnQgZGF0YSBmcm9tIFN0b2NrVHdpdHMuIERhdGEgY2FuIGJlIHZpZXdlZCBhcyBhIGRhaWx5IHZhbHVlLCBvciBieSBtaW51dGUgZm9yIGEgZ2l2ZW4gZGF0ZS4gKi9cblxuXG4gICAgdGhpcy5zZW50aW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzZW50aW1lbnRcIik7XG4gICAgfTtcblxuICAgIHRoaXMucXVvdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJxdW90ZVwiKTtcbiAgICB9O1xuICAgIC8qKiBQdWxscyBkYXRhIGZyb20gdGhlIGxhc3QgZm91ciBtb250aHMuICovXG5cblxuICAgIHRoaXMucmVjb21tZW5kYXRpb25UcmVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJyZWNvbW1lbmRhdGlvbi10cmVuZHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzdGF0c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInVwY29taW5nLWV2ZW50c1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGNvbWluZ0Vhcm5pbmdzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctZWFybmluZ3NcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdEaXZpZGVuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1kaXZpZGVuZHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdTcGxpdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJ1cGNvbWluZy1zcGxpdHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMudXBjb21pbmdJUE9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidXBjb21pbmctaXBvc1wiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zcGxpdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucmVxLnJlcXVlc3QoXCJzcGxpdHNcIik7XG4gICAgfTtcblxuICAgIHRoaXMuc2hvcnRJbnRlcmVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5yZXEucmVxdWVzdChcInNob3J0LWludGVyZXN0XCIpO1xuICAgIH07XG4gICAgLyoqIFRoaXMgcmV0dXJucyAxNSBtaW51dGUgZGVsYXllZCBhbmQgMzAgZGF5IGF2ZXJhZ2UgY29uc29saWRhdGVkIHZvbHVtZSBwZXJjZW50YWdlIG9mIGEgc3RvY2ssIGJ5IG1hcmtldC4gVGhpcyBjYWxsIHdpbGwgYWx3YXlzIHJldHVybiAxMyB2YWx1ZXMsIGFuZCB3aWxsIGJlIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgY3VycmVudCBkYXkgdHJhZGluZyB2b2x1bWUgcGVyY2VudGFnZS4gKi9cblxuXG4gICAgdGhpcy52b2x1bWVCeVZlbnVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnJlcS5yZXF1ZXN0KFwidm9sdW1lLWJ5LXZlbnVlXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlcSA9IHJlcTtcbiAgfVxuXG4gIHJldHVybiBTdG9ja3M7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN0b2NrczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIFRpbWVTZXJpZXMgPVxuLyoqIEBjbGFzcyAqL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUaW1lU2VyaWVzKHJlcSkge1xuICAgIHRoaXMucmVxID0gcmVxO1xuICAgIHRoaXMucCA9IFwiUFJFTUlVTV9XQUxMU1RSRUVUSE9SSVpPTl9cIjtcbiAgfVxuICAvKiogVGhpcyBpcyBhIG1lZXRpbmcgd2hlcmUgY29tcGFueSBleGVjdXRpdmVzIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNvbXBhbnnigJlzIHBlcmZvcm1hbmNlIGFuZCBpdHMgZnV0dXJlIHByb3NwZWN0cy4gKi9cblxuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFuYWx5c3REYXkgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdCh0aGlzLnAgKyBcIkFOQUxZU1RfREFZL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmJvYXJkT2ZEaXJlY3RvcnNNZWV0aW5nID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QodGhpcy5wICsgXCJCT0FSRF9PRl9ESVJFQ1RPUlNfTUVFVElORy9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5idXNpbmVzc1VwZGF0ZSA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KHRoaXMucCArIFwiQlVTSU5FU1NfVVBEQVRFL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmJ1eUJhY2sgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdCh0aGlzLnAgKyBcIkJVWUJBQ0svXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuY2FwaXRhbE1hcmtldHNEYXkgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdCh0aGlzLnAgKyBcIkNBUElUQUxfTUFSS0VUU19EQVkvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWREaXN0cmlidXRpb24gPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX2Rpc3RyaWJ1dGlvbi9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZERpdmlkZW5kcyA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfZGl2aWRlbmRzL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkUmV0dXJuT25DYXBpdGFsID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9yZXR1cm5fb2ZfY2FwaXRhbC9cIiArICh0aGlzLnJlcS5zdG9ja1N5bWJvbCB8fCB0aGlzLnJlcS5zdG9ja1N5bWJvbHMpICsgXCIvXCIgKyAocmVmSWQgPyByZWZJZCA6IFwiXCIpKTtcbiAgfTtcblxuICBUaW1lU2VyaWVzLnByb3RvdHlwZS5hZHZhbmNlZFJpZ2h0cyA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfcmlnaHRzL1wiICsgKHRoaXMucmVxLnN0b2NrU3ltYm9sIHx8IHRoaXMucmVxLnN0b2NrU3ltYm9scykgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkUmlnaHRzVG9QdXJjaGFzZSA9IGZ1bmN0aW9uIChyZWZJZCkge1xuICAgIHJldHVybiB0aGlzLnJlcS5yZXF1ZXN0KFwiYWR2YW5jZWRfcmlnaHRfdG9fcHVyY2hhc2UvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRTZWN1cml0eVJlY2xhc3NpZmljYXRpb24gPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3NlY3VyaXR5X3JlY2xhc3NpZmljYXRpb24vXCIgKyB0aGlzLnJlcS5zdG9ja1N5bWJvbCArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRTZWN1cml0eVN3YXAgPSBmdW5jdGlvbiAocmVmSWQpIHtcbiAgICByZXR1cm4gdGhpcy5yZXEucmVxdWVzdChcImFkdmFuY2VkX3NlY3VyaXR5X3N3YXAvXCIgKyB0aGlzLnJlcS5zdG9ja1N5bWJvbCArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgVGltZVNlcmllcy5wcm90b3R5cGUuYWR2YW5jZWRTcGluT2ZmID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9zcGlub2ZmL1wiICsgdGhpcy5yZXEuc3RvY2tTeW1ib2wgKyBcIi9cIiArIChyZWZJZCA/IHJlZklkIDogXCJcIikpO1xuICB9O1xuXG4gIFRpbWVTZXJpZXMucHJvdG90eXBlLmFkdmFuY2VkU3BsaXRzID0gZnVuY3Rpb24gKHJlZklkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLnJlcXVlc3QoXCJhZHZhbmNlZF9zcGxpdHMvXCIgKyAodGhpcy5yZXEuc3RvY2tTeW1ib2wgfHwgdGhpcy5yZXEuc3RvY2tTeW1ib2xzKSArIFwiL1wiICsgKHJlZklkID8gcmVmSWQgOiBcIlwiKSk7XG4gIH07XG5cbiAgcmV0dXJuIFRpbWVTZXJpZXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRpbWVTZXJpZXM7IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307IC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZHJhaW5pbmcgPSBmYWxzZTtcblxuICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICB9XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgIGRyYWluUXVldWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICBpZiAoZHJhaW5pbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW4pIHtcbiAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICBxdWV1ZSA9IFtdO1xuXG4gICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcXVldWVJbmRleCA9IC0xO1xuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuXG4gIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cblxuICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuXG4gIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgfVxufTsgLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuXG5cbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICB0aGlzLmZ1biA9IGZ1bjtcbiAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcblxucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJy8nO1xufTtcblxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAwO1xufTsiLCJpbXBvcnQgeyBJRVhDbG91ZENsaWVudCB9IGZyb20gXCJub2RlLWlleC1jbG91ZFwiO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5jb25zdCBpZXggPSBuZXcgSUVYQ2xvdWRDbGllbnQoZmV0Y2gsIHtcbiAgICBzYW5kYm94OiB0cnVlLFxuICAgIHB1Ymxpc2hhYmxlOiBcInBrXzE2YzUzZjg2ZGMxNjQ1OGVhNzQ4MmU5YTg2NGYwYTk5XCIsXG4gICAgdmVyc2lvbjogXCJzdGFibGVcIlxufSk7XG5cblxuYXhpb3MuZ2V0KCdodHRwczovL2Nsb3VkLmlleGFwaXMuY29tL3N0YWJsZS9zdG9jay9TUS9jaGFydC8xbT8mZmlsdGVyPWNoYW5nZVBlcmNlbnQsZGF0ZSZ0b2tlbj1wa18xNmM1M2Y4NmRjMTY0NThlYTc0ODJlOWE4NjRmMGE5OScpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cblxuICAgICAgICBjb25zdCBtb25kYXkgPSBbXCIyMDIwLTA2LTAxXCIsIFwiMjAyMC0wNi0wOFwiLCBcIjIwMjAtMDYtMTVcIiwgXCIyMDIwLTA2LTIyXCJdXG4gICAgICAgIGNvbnN0IHR1ZXNkYXkgPSBbXCIyMDIwLTA2LTAyXCIsIFwiMjAyMC0wNi0wOVwiLCBcIjIwMjAtMDYtMTZcIiwgXCIyMDIwLTA2LTIzXCJdXG4gICAgICAgIGNvbnN0IHdlZG5lc2RheSA9IFtcIjIwMjAtMDYtMDNcIiwgXCIyMDIwLTA2LTEwXCIsIFwiMjAyMC0wNi0xN1wiLCBcIjIwMjAtMDYtMjRcIl1cbiAgICAgICAgY29uc3QgdGh1cnNkYXkgPSBbXCIyMDIwLTA2LTA0XCIsIFwiMjAyMC0wNi0xMVwiLCBcIjIwMjAtMDYtMThcIiwgXCIyMDIwLTA2LTI1XCJdXG4gICAgICAgIGNvbnN0IGZyaWRheSA9IFtcIjIwMjAtMDYtMDVcIiwgXCIyMDIwLTA2LTEyXCIsIFwiMjAyMC0wNi0xOVwiLCBcIjIwMjAtMDYtMjZcIl1cblxuXG4gICAgbGV0IG1vbmRheUNoYW5nZSA9IDBcbiAgICBsZXQgdHVlc2RheUNoYW5nZSA9IDBcbiAgICBsZXQgd2VkbmVzZGF5Q2hhbmdlID0gMFxuICAgIGxldCB0aHVyc2RheUNoYW5nZSA9IDBcbiAgICBsZXQgZnJpZGF5Q2hhbmdlID0gMFxuXG4gICAgbGV0IG1vbmRheUNvdW50ID0gMFxuICAgIGxldCB0dWVzZGF5Q291bnQgPSAwXG4gICAgbGV0IHdlZG5lc2RheUNvdW50ID0gMFxuICAgIGxldCB0aHVyc2RheUNvdW50ID0gMFxuICAgIGxldCBmcmlkYXlDb3VudCA9IDBcblxuICAgIGxldCBtb25kYXlNb250aGx5VG90YWwgPSAwXG5cbiAgICBsZXQgc3FEYXRhID0gcmVzcG9uc2UuZGF0YVxuICAgICAgXG4gICAgc3FEYXRhLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBsZXQgZGFpbHlDaGFuZ2UgPSBlbC5jaGFuZ2VQZXJjZW50XG4gICAgICAgIGxldCBxdW90ZURhdGUgPSBlbC5kYXRlXG4gICAgICAgICAgXG4gICAgICAgIGlmKG1vbmRheS5pbmNsdWRlcyhlbC5kYXRlKSl7XG4gICAgICAgICAgICBtb25kYXlDb3VudCArPSAxXG4gICAgICAgICAgICBtb25kYXlDaGFuZ2UgKz0gZGFpbHlDaGFuZ2VcbiAgICAgICAgICAgIGNvbnN0IG1vbmRheU1vbnRobHlQZXJjZW50ID0gKG1vbmRheUNoYW5nZSAvIG1vbmRheUNvdW50KSBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vbmRheU1vbnRobHlQZXJjZW50KVxuICAgICAgICB9IGVsc2UgaWYodHVlc2RheS5pbmNsdWRlcyhlbC5kYXRlKSl7XG4gICAgICAgICAgICB0dWVzZGF5Q291bnQgKz0gMVxuICAgICAgICAgICAgdHVlc2RheUNoYW5nZSArPSBkYWlseUNoYW5nZVxuICAgICAgICAgICAgY29uc3QgdHVlc2RheU1vbnRobHlQZXJjZW50ID0gKHR1ZXNkYXlDaGFuZ2UgLyB0dWVzZGF5Q291bnQpICBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR1ZXNkYXlNb250aGx5UGVyY2VudCkgIFxuICAgICAgICB9IGVsc2UgaWYod2VkbmVzZGF5LmluY2x1ZGVzKGVsLmRhdGUpKXtcbiAgICAgICAgICAgIHdlZG5lc2RheUNvdW50ICs9IDFcbiAgICAgICAgICAgIHdlZG5lc2RheUNoYW5nZSArPSBkYWlseUNoYW5nZVxuICAgICAgICAgICAgY29uc3Qgd2VkbmVzZGF5TW9udGhseVBlcmNlbnQgPSAod2VkbmVzZGF5Q2hhbmdlIC8gd2VkbmVzZGF5Q291bnQpICBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlZG5lc2RheU1vbnRobHlQZXJjZW50KSAgXG4gICAgICAgIH0gZWxzZSBpZih0aHVyc2RheS5pbmNsdWRlcyhlbC5kYXRlKSl7XG4gICAgICAgICAgICB0aHVyc2RheUNvdW50ICs9IDFcbiAgICAgICAgICAgIHRodXJzZGF5Q2hhbmdlICs9IGRhaWx5Q2hhbmdlXG4gICAgICAgICAgICBjb25zdCB0aHVyc2RheU1vbnRobHlQZXJjZW50ID0gKHRodXJzZGF5Q2hhbmdlIC8gdGh1cnNkYXlDb3VudCkgIFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGh1cnNkYXlNb250aGx5UGVyY2VudCkgIFxuICAgICAgICB9IGVsc2UgaWYoZnJpZGF5LmluY2x1ZGVzKGVsLmRhdGUpKXtcbiAgICAgICAgICAgIGZyaWRheUNvdW50ICs9IDFcbiAgICAgICAgICAgIGZyaWRheUNoYW5nZSArPSBkYWlseUNoYW5nZVxuICAgICAgICAgICAgY29uc3QgZnJpZGF5TW9udGhseVBlcmNlbnQgPSAoZnJpZGF5Q2hhbmdlIC8gZnJpZGF5Q291bnQpXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gICAgXG5cblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9