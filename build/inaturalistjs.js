(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  comments: __webpack_require__(1),
	  identifications: __webpack_require__(13),
	  observations: __webpack_require__(17),
	  observationFieldValues: __webpack_require__(20),
	  photos: __webpack_require__(22),
	  places: __webpack_require__(23),
	  projects: __webpack_require__(25),
	  taxa: __webpack_require__(27),
	  users: __webpack_require__(28),
	  Comment: __webpack_require__(12),
	  Identification: __webpack_require__(14),
	  Observation: __webpack_require__(18),
	  ObservationFieldValue: __webpack_require__(21),
	  Photo: __webpack_require__(16),
	  Place: __webpack_require__(24),
	  Taxon: __webpack_require__(15),
	  Project: __webpack_require__(26),
	  User: __webpack_require__(19)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    Comment = __webpack_require__(12);

	var comments = function () {
	  function comments() {
	    _classCallCheck(this, comments);
	  }

	  _createClass(comments, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("comments", params, options).then(Comment.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("comments/:id", params, options).then(Comment.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("comments/:id", params, options);
	    }
	  }]);

	  return comments;
	}();

	module.exports = comments;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _fetch = __webpack_require__(3),
	    querystring = __webpack_require__(5),
	    util = __webpack_require__(8),
	    iNaturalistAPIResponse = __webpack_require__(10);

	var iNaturalistAPI = function () {
	  function iNaturalistAPI() {
	    _classCallCheck(this, iNaturalistAPI);
	  }

	  _createClass(iNaturalistAPI, null, [{
	    key: "fetch",
	    value: function fetch(route, ids, params) {
	      if (!Array.isArray(ids)) {
	        ids = [ids];
	      }
	      var query = "";
	      if (params) {
	        query = "?" + querystring.stringify(params);
	      }
	      return _fetch("" + iNaturalistAPI.apiHostProtocol + iNaturalistAPI.apiHost + ("/" + route + "/" + ids.join(",") + query)).then(iNaturalistAPI.thenCheckStatus).then(iNaturalistAPI.thenText).then(iNaturalistAPI.thenJson).then(iNaturalistAPI.thenWrap);
	    }
	  }, {
	    key: "get",
	    value: function get(route, params) {
	      var query = "";
	      if (params) {
	        query = "?" + querystring.stringify(params);
	      }
	      return _fetch("" + iNaturalistAPI.apiHostProtocol + iNaturalistAPI.apiHost + ("/" + route + query)).then(iNaturalistAPI.thenCheckStatus).then(iNaturalistAPI.thenText).then(iNaturalistAPI.thenJson).then(iNaturalistAPI.thenWrap);
	    }
	  }, {
	    key: "post",
	    value: function post(route, params, options) {
	      options = options || {};
	      params = Object.assign({}, params);
	      // interpolate path params, e.g. /:id => /1
	      var interpolated = iNaturalistAPI.interpolateRouteParams(route, params);
	      if (interpolated.err) {
	        return interpolated.err;
	      }
	      var thisRoute = interpolated.route;
	      // set up request headers
	      var headers = {
	        Accept: "application/json",
	        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE, HEAD"
	      };
	      // set up authentication
	      var csrf = iNaturalistAPI.csrf();
	      var apiToken = iNaturalistAPI.apiToken(options);
	      if (apiToken) {
	        headers.Authorization = apiToken;
	      } else if (csrf) {
	        params[csrf.param] = csrf.token;
	      }
	      // get the right host to send requests
	      var host = iNaturalistAPI.methodHostPrefix(options);
	      // make the request
	      var body;
	      if (options.upload) {
	        body = new FormData();
	        for (var k in params) {
	          body.append(k, params[k]);
	        }
	      } else {
	        headers["Content-Type"] = "application/json";
	        body = JSON.stringify(params);
	      }
	      var fetchOpts = {
	        method: options.method || "post",
	        credentials: options.same_origin ? "same-origin" : undefined,
	        headers: headers
	      };
	      if (options.method !== "head") {
	        fetchOpts.body = body;
	      }
	      return _fetch(host + "/" + thisRoute, fetchOpts).then(iNaturalistAPI.thenCheckStatus).then(iNaturalistAPI.thenText).then(iNaturalistAPI.thenJson);
	    }

	    // a variant of post using the http PUT method

	  }, {
	    key: "head",
	    value: function head(route, params, options) {
	      options = Object.assign({}, options, { method: "head" });
	      return iNaturalistAPI.post(route, params, options);
	    }

	    // a variant of post using the http PUT method

	  }, {
	    key: "put",
	    value: function put(route, params, options) {
	      options = Object.assign({}, options, { method: "put" });
	      return iNaturalistAPI.post(route, params, options);
	    }

	    // a variant of post using the http DELETE method

	  }, {
	    key: "delete",
	    value: function _delete(route, params, options) {
	      options = Object.assign({}, options, { method: "delete" });
	      return iNaturalistAPI.post(route, params, options);
	    }
	  }, {
	    key: "upload",
	    value: function upload(route, params, options) {
	      options = Object.assign({}, options, { method: "post", upload: true });
	      return iNaturalistAPI.post(route, params, options);
	    }
	  }, {
	    key: "methodHostPrefix",
	    value: function methodHostPrefix(options) {
	      if (options.same_origin) {
	        return "";
	      }
	      return "" + iNaturalistAPI.writeHostProtocol + iNaturalistAPI.writeApiHost;
	    }
	  }, {
	    key: "csrf",
	    value: function csrf() {
	      var param = util.browserMetaTagContent("csrf-param");
	      var token = util.browserMetaTagContent("csrf-token");
	      if (param && token) {
	        return { param: param, token: token };
	      }
	    }
	  }, {
	    key: "apiToken",
	    value: function apiToken(options) {
	      var token = util.browserMetaTagContent("inaturalist-api-token");
	      if (token) {
	        return token;
	      }
	      return options.api_token;
	    }
	  }, {
	    key: "thenCheckStatus",
	    value: function thenCheckStatus(response) {
	      if (response.status >= 200 && response.status < 300) {
	        return response;
	      } else {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	    }
	  }, {
	    key: "thenText",
	    value: function thenText(response) {
	      // not using response.json( ) as there may be no JSON
	      return response.text();
	    }
	  }, {
	    key: "thenJson",
	    value: function thenJson(text) {
	      if (text) {
	        return JSON.parse(text);
	      }
	      return text;
	    }
	  }, {
	    key: "thenWrap",
	    value: function thenWrap(response) {
	      return new iNaturalistAPIResponse(response);
	    }
	  }, {
	    key: "setConfig",
	    value: function setConfig(config) {
	      config = config || {};
	      var envHostConfig = util.browserMetaTagContent("config:inaturalist_api_host") || util.nodeENV("API_HOST");
	      var envWriteHostConfig = util.browserMetaTagContent("config:inaturalist_write_api_host") || util.nodeENV("WRITE_API_HOST");
	      iNaturalistAPI.apiHost = config.apiHost || envHostConfig || "localhost:4000/v1";
	      iNaturalistAPI.writeApiHost = config.writeApiHost || envWriteHostConfig || "localhost:3000";
	      iNaturalistAPI.apiHostProtocol = config.apiHostSSL ? "https://" : "//";
	      iNaturalistAPI.writeHostProtocol = config.writeHostSSL ? "https://" : "//";
	    }
	  }, {
	    key: "interpolateRouteParams",
	    value: function interpolateRouteParams(route, params) {
	      var err,
	          matches = route.match(/(:[a-z]+)(?=\/|$)/g);
	      if (matches) {
	        matches.forEach(function (sym) {
	          if (err) {
	            return;
	          }
	          var v = sym.substring(1);
	          if (params && params[v]) {
	            route = route.replace(sym, params[v]);
	          } else {
	            err = new Promise(function (res, rej) {
	              rej(new Error(v + " required"));
	            });
	          }
	        });
	      }
	      return { route: route, err: err };
	    }
	  }]);

	  return iNaturalistAPI;
	}();

	iNaturalistAPI.setConfig();

	module.exports = iNaturalistAPI;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(4);
	module.exports = self.fetch.bind(self);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };

	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this);
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }

	      var xhr = new XMLHttpRequest();

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }

	        return;
	      }

	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(6);
	exports.encode = exports.stringify = __webpack_require__(7);

/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = function () {
	  function util() {
	    _classCallCheck(this, util);
	  }

	  _createClass(util, null, [{
	    key: "isBrowser",
	    value: function isBrowser() {
	      return typeof document !== "undefined" && typeof document.querySelector !== "undefined";
	    }
	  }, {
	    key: "isNode",
	    value: function isNode() {
	      return typeof process !== "undefined" && typeof process.env !== "undefined";
	    }
	  }, {
	    key: "browserMetaTagContent",
	    value: function browserMetaTagContent(metaTagName) {
	      if (util.isBrowser()) {
	        var element = document.querySelector("meta[name=\"" + metaTagName + "\"]");
	        return element && element.getAttribute("content");
	      }
	    }
	  }, {
	    key: "nodeENV",
	    value: function nodeENV(envVariableName) {
	      if (util.isNode()) {
	        return process.env[envVariableName];
	      }
	    }
	  }]);

	  return util;
	}();

	module.exports = util;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var iNaturalistAPIResponse = function (_Model) {
	  _inherits(iNaturalistAPIResponse, _Model);

	  function iNaturalistAPIResponse() {
	    _classCallCheck(this, iNaturalistAPIResponse);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(iNaturalistAPIResponse).apply(this, arguments));
	  }

	  return iNaturalistAPIResponse;
	}(Model);

	module.exports = iNaturalistAPIResponse;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	  function Model(attrs) {
	    _classCallCheck(this, Model);

	    Object.assign(this, attrs);
	  }

	  _createClass(Model, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response, type) {
	      return new type(response);
	    }
	  }, {
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response, type) {
	      if (type && response.results) {
	        response.results = response.results.map(function (r) {
	          return new type(r);
	        });
	      }
	      return response;
	    }
	  }]);

	  return Model;
	}();

	module.exports = Model;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var Comment = function (_Model) {
	  _inherits(Comment, _Model);

	  function Comment() {
	    _classCallCheck(this, Comment);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
	  }

	  _createClass(Comment, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Comment), "typifyInstanceResponse", this).call(this, response, Comment);
	    }
	  }]);

	  return Comment;
	}(Model);

	module.exports = Comment;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    Identification = __webpack_require__(14);

	var identifications = function () {
	  function identifications() {
	    _classCallCheck(this, identifications);
	  }

	  _createClass(identifications, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("identifications", params, options).then(Identification.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("identifications/:id", params, options).then(Identification.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("identifications/:id", params, options);
	    }
	  }]);

	  return identifications;
	}();

	module.exports = identifications;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11),
	    Taxon = __webpack_require__(15);

	var Identification = function (_Model) {
	  _inherits(Identification, _Model);

	  function Identification(attrs) {
	    _classCallCheck(this, Identification);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Identification).call(this, attrs));

	    if (_this.taxon && _this.taxon !== undefined) {
	      _this.taxon = new Taxon(_this.taxon);
	    }
	    return _this;
	  }

	  _createClass(Identification, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Identification), "typifyInstanceResponse", this).call(this, response, Identification);
	    }
	  }]);

	  return Identification;
	}(Model);

	module.exports = Identification;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11),
	    Photo = __webpack_require__(16);

	var Taxon = function (_Model) {
	  _inherits(Taxon, _Model);

	  function Taxon(attrs) {
	    _classCallCheck(this, Taxon);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Taxon).call(this, attrs));

	    if (_this.default_photo && _this.default_photo !== undefined) {
	      _this.defaultPhoto = new Photo(_this.default_photo);
	    }
	    return _this;
	  }

	  _createClass(Taxon, [{
	    key: "iconicTaxonName",
	    value: function iconicTaxonName() {
	      if (this.iconic_taxon_name && this.iconic_taxon_name.length > 0) {
	        return this.iconic_taxon_name;
	      }
	      return "Unknown";
	    }
	  }, {
	    key: "photoTag",
	    value: function photoTag() {
	      if (this.default_photo) {
	        return "<img src='" + this.default_photo.square_url + "'/>";
	      }
	      return "<i class='icon icon-iconic-" + this.iconicTaxonName().toLowerCase() + "'/>";
	    }
	  }], [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Taxon), "typifyResultsResponse", this).call(this, response, Taxon);
	    }
	  }]);

	  return Taxon;
	}(Model);

	module.exports = Taxon;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var Photo = function (_Model) {
	  _inherits(Photo, _Model);

	  function Photo() {
	    _classCallCheck(this, Photo);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Photo).apply(this, arguments));
	  }

	  _createClass(Photo, [{
	    key: "photoUrl",
	    value: function photoUrl(size) {
	      this.cachedPhotos = this.cachedPhotos || {};
	      size = size || "square";
	      if (this.cachedPhotos[size]) {
	        return this.cachedPhotos[size];
	      }
	      if (!this.url) {
	        return;
	      } else {
	        // this.cachedPhotos[size] = this.url.replace( /square(.?\w*\??)/i, ( match, $1 ) => {
	        //   return `${size}${$1}`;
	        // });
	        this.cachedPhotos[size] = this.url.replace("square", size);
	      }
	      return this.cachedPhotos[size];
	    }
	  }]);

	  return Photo;
	}(Model);

	module.exports = Photo;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    Observation = __webpack_require__(18),
	    User = __webpack_require__(19);

	var observations = function () {
	  function observations() {
	    _classCallCheck(this, observations);
	  }

	  _createClass(observations, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("observations", params, options).then(Observation.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("observations/:id", params, options).then(Observation.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("observations/:id", params, options);
	    }
	  }, {
	    key: "fave",
	    value: function fave(params, options) {
	      return iNaturalistAPI.post("votes/vote/observation/:id", params, options).then(Observation.typifyInstanceResponse);
	    }
	  }, {
	    key: "unfave",
	    value: function unfave(params, options) {
	      return iNaturalistAPI.delete("votes/unvote/observation/:id", params, options);
	    }
	  }, {
	    key: "review",
	    value: function review(params, options) {
	      var p = Object.assign({}, params);
	      p.reviewed = "true";
	      return iNaturalistAPI.post("observations/:id/review", p, options);
	    }
	  }, {
	    key: "unreview",
	    value: function unreview(params, options) {
	      var p = Object.assign({}, params);
	      return iNaturalistAPI.delete("observations/:id/review", p, options);
	    }
	  }, {
	    key: "setQualityMetric",
	    value: function setQualityMetric(params, options) {
	      return iNaturalistAPI.post("observations/:id/quality/:metric", params, options);
	    }
	  }, {
	    key: "deleteQualityMetric",
	    value: function deleteQualityMetric(params, options) {
	      return iNaturalistAPI.delete("observations/:id/quality/:metric", params, options);
	    }
	  }, {
	    key: "fetch",
	    value: function fetch(ids, params) {
	      return iNaturalistAPI.fetch("observations", ids, params).then(Observation.typifyResultsResponse);
	    }
	  }, {
	    key: "search",
	    value: function search(params) {
	      return iNaturalistAPI.get("observations", params).then(Observation.typifyResultsResponse);
	    }
	  }, {
	    key: "identifiers",
	    value: function identifiers(params) {
	      return iNaturalistAPI.get("observations/identifiers", params).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.user = new User(r.user);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }]);

	  return observations;
	}();

	module.exports = observations;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11),
	    Taxon = __webpack_require__(15),
	    Photo = __webpack_require__(16),
	    Identification = __webpack_require__(14);

	var Observation = function (_Model) {
	  _inherits(Observation, _Model);

	  function Observation(attrs) {
	    _classCallCheck(this, Observation);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Observation).call(this, attrs));

	    if (_this.geojson && _this.geojson.coordinates) {
	      _this.latitude = _this.geojson.coordinates[1];
	      _this.longitude = _this.geojson.coordinates[0];
	    }
	    if (_this.taxon) {
	      _this.taxon = new Taxon(_this.taxon);
	    }
	    if (_this.photos && _this.photos.length > 0) {
	      _this.photos = _this.photos.map(function (p) {
	        return new Photo(p);
	      });
	    }
	    if (_this.identifications && _this.identifications.length > 0) {
	      _this.identifications = _this.identifications.map(function (i) {
	        return new Identification(i);
	      });
	    }
	    return _this;
	  }

	  _createClass(Observation, [{
	    key: "photo",
	    value: function photo(size) {
	      this.cachedPhotos = this.cachedPhotos || {};
	      size = size || "square";
	      if (this.cachedPhotos[size]) {
	        return this.cachedPhotos[size];
	      }
	      if (this.photos && this.photos.length > 0) {
	        this.cachedPhotos[size] = this.photos[0].photoUrl(size);
	      }
	      return this.cachedPhotos[size];
	    }
	  }, {
	    key: "hasPhotos",
	    value: function hasPhotos() {
	      return this.photos && this.photos.length > 0;
	    }
	  }, {
	    key: "hasSounds",
	    value: function hasSounds() {
	      return this.sounds && this.sounds.length > 0;
	    }
	  }, {
	    key: "hasMedia",
	    value: function hasMedia() {
	      if (this.hasPhotos() || this.hasSounds()) {
	        return true;
	      }
	      return false;
	    }
	  }], [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Observation), "typifyResultsResponse", this).call(this, response, Observation);
	    }
	  }, {
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Observation), "typifyInstanceResponse", this).call(this, response, Observation);
	    }
	  }]);

	  return Observation;
	}(Model);

	module.exports = Observation;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var User = function (_Model) {
	  _inherits(User, _Model);

	  function User() {
	    _classCallCheck(this, User);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
	  }

	  _createClass(User, null, [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(User), "typifyResultsResponse", this).call(this, response, User);
	    }
	  }]);

	  return User;
	}(Model);

	module.exports = User;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    ObservationFieldValue = __webpack_require__(21);

	var observationFieldValues = function () {
	  function observationFieldValues() {
	    _classCallCheck(this, observationFieldValues);
	  }

	  _createClass(observationFieldValues, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("observation_field_values", params, options).then(ObservationFieldValue.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("observation_field_values/:id", params, options).then(ObservationFieldValue.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("observation_field_values/:id", params, options);
	    }
	  }]);

	  return observationFieldValues;
	}();

	module.exports = observationFieldValues;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var ObservationFieldValue = function (_Model) {
	  _inherits(ObservationFieldValue, _Model);

	  function ObservationFieldValue() {
	    _classCallCheck(this, ObservationFieldValue);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ObservationFieldValue).apply(this, arguments));
	  }

	  _createClass(ObservationFieldValue, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(ObservationFieldValue), "typifyInstanceResponse", this).call(this, response, ObservationFieldValue);
	    }
	  }]);

	  return ObservationFieldValue;
	}(Model);

	module.exports = ObservationFieldValue;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2);

	var photos = function () {
	  function photos() {
	    _classCallCheck(this, photos);
	  }

	  _createClass(photos, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.upload("photos", params, options);
	    }
	  }]);

	  return photos;
	}();

	module.exports = photos;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    Place = __webpack_require__(24);

	var places = function () {
	  function places() {
	    _classCallCheck(this, places);
	  }

	  _createClass(places, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("places", ids).then(Place.typifyResultsResponse);
	    }
	  }, {
	    key: "autocomplete",
	    value: function autocomplete(params) {
	      return iNaturalistAPI.get("places/autocomplete", params).then(Place.typifyResultsResponse);
	    }
	  }]);

	  return places;
	}();

	module.exports = places;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var Place = function (_Model) {
	  _inherits(Place, _Model);

	  function Place() {
	    _classCallCheck(this, Place);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Place).apply(this, arguments));
	  }

	  _createClass(Place, null, [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Place), "typifyResultsResponse", this).call(this, response, Place);
	    }
	  }]);

	  return Place;
	}(Model);

	module.exports = Place;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    Project = __webpack_require__(26);

	var projects = function () {
	  function projects() {
	    _classCallCheck(this, projects);
	  }

	  _createClass(projects, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("projects", ids).then(Project.typifyResultsResponse);
	    }
	  }, {
	    key: "join",
	    value: function join(params, options) {
	      return iNaturalistAPI.post("projects/:id/join", params, options);
	    }
	  }, {
	    key: "leave",
	    value: function leave(params, options) {
	      return iNaturalistAPI.delete("projects/:id/leave", params, options);
	    }
	  }]);

	  return projects;
	}();

	module.exports = projects;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(11);

	var Project = function (_Model) {
	  _inherits(Project, _Model);

	  function Project() {
	    _classCallCheck(this, Project);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Project).apply(this, arguments));
	  }

	  _createClass(Project, null, [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Project), "typifyResultsResponse", this).call(this, response, Project);
	    }
	  }]);

	  return Project;
	}(Model);

	module.exports = Project;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    Taxon = __webpack_require__(15);

	var taxa = function () {
	  function taxa() {
	    _classCallCheck(this, taxa);
	  }

	  _createClass(taxa, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("taxa", ids).then(Taxon.typifyResultsResponse);
	    }
	  }, {
	    key: "autocomplete",
	    value: function autocomplete(params) {
	      return iNaturalistAPI.get("taxa/autocomplete", params).then(Taxon.typifyResultsResponse);
	    }
	  }]);

	  return taxa;
	}();

	module.exports = taxa;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(2),
	    User = __webpack_require__(19);

	var users = function () {
	  function users() {
	    _classCallCheck(this, users);
	  }

	  _createClass(users, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("users", ids).then(User.typifyResultsResponse);
	    }
	  }]);

	  return users;
	}();

	module.exports = users;

/***/ }
/******/ ])));