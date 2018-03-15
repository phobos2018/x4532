"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var functions = require('./functions'), Market = require('./Market');
var isNode = functions.isNode, keys = functions.keys, values = functions.values, deepExtend = functions.deepExtend, extend = functions.extend, flatten = functions.flatten, unique = functions.unique, indexBy = functions.indexBy, sortBy = functions.sortBy, groupBy = functions.groupBy, aggregate = functions.aggregate, uuid = functions.uuid, unCamelCase = functions.unCamelCase, precisionFromString = functions.precisionFromString, throttle = functions.throttle, capitalize = functions.capitalize, now = functions.now, sleep = functions.sleep, timeout = functions.timeout, TimedOut = functions.TimedOut, buildOHLCVC = functions.buildOHLCVC;
var _a = require('./errors'), ExchangeError = _a.ExchangeError, InvalidAddress = _a.InvalidAddress, NotSupported = _a.NotSupported, AuthenticationError = _a.AuthenticationError, DDoSProtection = _a.DDoSProtection, RequestTimeout = _a.RequestTimeout, ExchangeNotAvailable = _a.ExchangeNotAvailable;
var defaultFetch = isNode ? require('fetch-ponyfill')().fetch : fetch;
var journal = undefined;
module.exports = (function () {
    function Exchange(userConfig) {
        if (userConfig === void 0) { userConfig = {}; }
        var _this = this;
        Object.assign(this, functions, { encode: function (string) { return string; }, decode: function (string) { return string; } });
        if (isNode)
            this.nodeVersion = '9.8.0;'
        this.options = {};
        this.userAgents = {
            'chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
            'chrome39': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
        };
        this.headers = {};
        this.proxy = '';
        this.origin = '*';
        this.iso8601 = function (timestamp) { return ((typeof timestamp === 'undefined') ? timestamp : new Date(timestamp).toISOString()); };
        this.parse8601 = function (x) { return Date.parse(((x.indexOf('+') >= 0) || (x.slice(-1) === 'Z')) ? x : (x + 'Z')); };
        this.parseDate = function (x) {
            if (typeof x === 'undefined')
                return x;
            return ((x.indexOf('GMT') >= 0) ?
                Date.parse(x) :
                _this.parse8601(x));
        };
        this.microseconds = function () { return now() * 1000; };
        this.seconds = function () { return Math.floor(now() / 1000); };
        this.minFundingAddressLength = 10;
        this.substituteCommonCurrencyCodes = true;
        this.fetchImplementation = defaultFetch;
        this.timeout = 10000;
        this.verbose = false;
        this.debug = false;
        this.journal = 'debug.json';
        this.userAgent = undefined;
        this.twofa = false;
        this.apiKey = undefined;
        this.secret = undefined;
        this.uid = undefined;
        this.login = undefined;
        this.password = undefined;
        this.balance = {};
        this.orderbooks = {};
        this.tickers = {};
        this.orders = {};
        this.trades = {};
        this.last_http_response = undefined;
        this.last_json_response = undefined;
        this.last_response_headers = undefined;
        this.arrayConcat = function (a, b) { return a.concat(b); };
        var unCamelCaseProperties = function (obj) {
            if (obj === void 0) { obj = _this; }
            if (obj !== null) {
                try {
                    for (var _a = __values(Object.getOwnPropertyNames(obj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var k = _b.value;
                        _this[unCamelCase(k)] = _this[k];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                unCamelCaseProperties(Object.getPrototypeOf(obj));
            }
            var e_1, _c;
        };
        unCamelCaseProperties();
        var config = deepExtend(this.describe(), userConfig);
        try {
            for (var _a = __values(Object.entries(config)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), property = _c[0], value = _c[1];
                this[property] = deepExtend(this[property], value);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        for (var k in this.has) {
            this['has' + capitalize(k)] = !!this.has[k];
        }
        if (this.api)
            this.defineRestApi(this.api, 'request');
        this.initRestRateLimiter();
        if (this.markets)
            this.setMarkets(this.markets);
        if (this.debug && journal) {
            journal(function () { return _this.journal; }, this, Object.keys(this.has));
        }
        var e_2, _d;
    }
    Exchange.prototype.getMarket = function (symbol) {
        if (!this.marketClasses)
            this.marketClasses = {};
        var marketClass = this.marketClasses[symbol];
        if (marketClass)
            return marketClass;
        marketClass = new Market(this, symbol);
        this.marketClasses[symbol] = marketClass;
        return marketClass;
    };
    Exchange.prototype.describe = function () {
        return {
            'id': undefined,
            'name': undefined,
            'countries': undefined,
            'enableRateLimit': false,
            'rateLimit': 2000,
            'has': {
                'CORS': false,
                'publicAPI': true,
                'privateAPI': true,
                'cancelOrder': true,
                'cancelOrders': false,
                'createDepositAddress': false,
                'createOrder': true,
                'createMarketOrder': true,
                'createLimitOrder': true,
                'deposit': false,
                'editOrder': 'emulated',
                'fetchBalance': true,
                'fetchBidsAsks': false,
                'fetchClosedOrders': false,
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchFundingFees': false,
                'fetchL2OrderBook': true,
                'fetchMarkets': true,
                'fetchMyTrades': false,
                'fetchOHLCV': 'emulated',
                'fetchOpenOrders': false,
                'fetchOrder': false,
                'fetchOrderBook': true,
                'fetchOrderBooks': false,
                'fetchOrders': false,
                'fetchTicker': true,
                'fetchTickers': false,
                'fetchTrades': true,
                'withdraw': false,
            },
            'urls': {
                'logo': undefined,
                'api': undefined,
                'www': undefined,
                'doc': undefined,
                'fees': undefined,
            },
            'api': undefined,
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': false,
                'login': false,
                'password': false,
            },
            'markets': undefined,
            'currencies': {},
            'timeframes': undefined,
            'fees': {
                'trading': {
                    'tierBased': undefined,
                    'percentage': undefined,
                    'taker': undefined,
                    'maker': undefined,
                },
                'funding': {
                    'tierBased': undefined,
                    'percentage': undefined,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'parseJsonResponse': true,
            'skipJsonOnStatusCodes': [],
            'exceptions': undefined,
            'dontGetUsedBalanceFromStaleCache': false,
        };
    };
    Exchange.prototype.defaults = function () {
        return {};
    };
    Exchange.prototype.nonce = function () {
        return this.seconds();
    };
    Exchange.prototype.milliseconds = function () {
        return now();
    };
    Exchange.prototype.encodeURIComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return encodeURIComponent.apply(void 0, __spread(args));
    };
    Exchange.prototype.checkRequiredCredentials = function () {
        var _this = this;
        Object.keys(this.requiredCredentials).map(function (key) {
            if (_this.requiredCredentials[key] && !_this[key])
                throw new AuthenticationError(_this.id + ' requires `' + key + '`');
        });
    };
    Exchange.prototype.checkAddress = function (address) {
        if (typeof address === 'undefined')
            throw new InvalidAddress(this.id + ' address is undefined');
        if ((unique(address).length < 2) || address.length < this.minFundingAddressLength || address.includes(' '))
            throw new InvalidAddress(this.id + ' address is invalid or has less than ' + this.minFundingAddressLength.toString() + ' characters: "' + address.toString() + '"');
        return address;
    };
    Exchange.prototype.initRestRateLimiter = function () {
        var fetchImplementation = this.fetchImplementation;
        if (this.rateLimit === undefined)
            throw new Error(this.id + '.rateLimit property is not configured');
        this.tokenBucket = this.extend({
            refillRate: 1 / this.rateLimit,
            delay: 1,
            capacity: 1,
            defaultCost: 1,
            maxCapacity: 1000,
        }, this.tokenBucket);
        this.throttle = throttle(this.tokenBucket);
        this.executeRestRequest = function (url, method, headers, body) {
            var _this = this;
            if (method === void 0) { method = 'GET'; }
            if (headers === void 0) { headers = undefined; }
            if (body === void 0) { body = undefined; }
            var promise = fetchImplementation(url, { method: method, headers: headers, body: body, 'agent': this.agent || null, timeout: this.timeout })
                .catch(function (e) {
                if (isNode)
                    throw new ExchangeNotAvailable([_this.id, method, url, e.type, e.message].join(' '));
                throw e;
            })
                .then(function (response) { return _this.handleRestResponse(response, url, method, headers, body); });
            return timeout(this.timeout, promise).catch(function (e) {
                if (e instanceof TimedOut)
                    throw new RequestTimeout(_this.id + ' ' + method + ' ' + url + ' request timed out (' + _this.timeout + ' ms)');
                throw e;
            });
        };
    };
    Exchange.prototype.defineRestApi = function (api, methodName, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var _loop_1 = function (type) {
            try {
                for (var _a = __values(Object.keys(api[type])), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var httpMethod = _b.value;
                    var paths = api[type][httpMethod];
                    var _loop_2 = function (i) {
                        var path = paths[i].trim();
                        var splitPath = path.split(/[^a-zA-Z0-9]/);
                        var uppercaseMethod = httpMethod.toUpperCase();
                        var lowercaseMethod = httpMethod.toLowerCase();
                        var camelcaseMethod = this_1.capitalize(lowercaseMethod);
                        var camelcaseSuffix = splitPath.map(this_1.capitalize).join('');
                        var underscoreSuffix = splitPath.map(function (x) { return x.trim().toLowerCase(); }).filter(function (x) { return x.length > 0; }).join('_');
                        var camelcase = type + camelcaseMethod + this_1.capitalize(camelcaseSuffix);
                        var underscore = type + '_' + lowercaseMethod + '_' + underscoreSuffix;
                        if ('suffixes' in options) {
                            if ('camelcase' in options['suffixes'])
                                camelcase += options['suffixes']['camelcase'];
                            if ('underscore' in options.suffixes)
                                underscore += options['suffixes']['underscore'];
                        }
                        if ('underscore_suffix' in options)
                            underscore += options.underscoreSuffix;
                        if ('camelcase_suffix' in options)
                            camelcase += options.camelcaseSuffix;
                        var partial = function (params) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2, this[methodName](path, type, uppercaseMethod, params || {})];
                        }); }); };
                        this_1[camelcase] = partial;
                        this_1[underscore] = partial;
                    };
                    for (var i = 0; i < paths.length; i++) {
                        _loop_2(i);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
            var e_3, _c;
        };
        var this_1 = this;
        try {
            for (var _a = __values(Object.keys(api)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var type = _b.value;
                _loop_1(type);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var e_4, _c;
    };
    Exchange.prototype.fetch = function (url, method, headers, body) {
        if (method === void 0) { method = 'GET'; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        if (isNode && this.userAgent) {
            if (typeof this.userAgent === 'string')
                headers = extend({ 'User-Agent': this.userAgent }, headers);
            else if ((typeof this.userAgent === 'object') && ('User-Agent' in this.userAgent))
                headers = extend(this.userAgent, headers);
        }
        if (typeof this.proxy === 'function') {
            url = this.proxy(url);
            if (isNode)
                headers = extend({ 'Origin': this.origin }, headers);
        }
        else if (typeof this.proxy === 'string') {
            if (this.proxy.length)
                if (isNode)
                    headers = extend({ 'Origin': this.origin }, headers);
            url = this.proxy + url;
        }
        headers = extend(this.headers, headers);
        if (this.verbose)
            console.log("fetch:\n", this.id, method, url, "\nRequest:\n", headers, "\n", body, "\n");
        return this.executeRestRequest(url, method, headers, body);
    };
    Exchange.prototype.fetch2 = function (path, type, method, params, headers, body) {
        if (type === void 0) { type = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.enableRateLimit) return [3, 2];
                        return [4, this.throttle()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        request = this.sign(path, type, method, params, headers, body);
                        return [2, this.fetch(request.url, request.method, request.headers, request.body)];
                }
            });
        });
    };
    Exchange.prototype.request = function (path, type, method, params, headers, body) {
        if (type === void 0) { type = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return this.fetch2(path, type, method, params, headers, body);
    };
    Exchange.prototype.parseJson = function (response, responseBody, url, method) {
        try {
            return (responseBody.length > 0) ? JSON.parse(responseBody) : {};
        }
        catch (e) {
            if (this.verbose)
                console.log('parseJson:\n', this.id, method, url, response.status, 'error', e, "response body:\n'" + responseBody + "'\n");
            var title = undefined;
            var match = responseBody.match(/<title>([^<]+)/i);
            if (match)
                title = match[1].trim();
            var maintenance = responseBody.match(/offline|busy|retry|wait|unavailable|maintain|maintenance|maintenancing/i);
            var ddosProtection = responseBody.match(/cloudflare|incapsula|overload|ddos/i);
            if (e instanceof SyntaxError) {
                var error = ExchangeNotAvailable;
                var details = 'not accessible from this location at the moment';
                if (maintenance)
                    details = 'offline, on maintenance or unreachable from this location at the moment';
                if (ddosProtection)
                    error = DDoSProtection;
                throw new error([this.id, method, url, response.status, title, details].join(' '));
            }
            throw e;
        }
    };
    Exchange.prototype.handleErrors = function (statusCode, statusText, url, method, requestHeaders, responseBody, json) {
    };
    Exchange.prototype.defaultErrorHandler = function (response, responseBody, url, method) {
        var code = response.status, reason = response.statusText;
        if ((code >= 200) && (code <= 299))
            return;
        var error = undefined;
        var details = responseBody;
        var match = responseBody.match(/<title>([^<]+)/i);
        if (match)
            details = match[1].trim();
        if ([418, 429].includes(code)) {
            error = DDoSProtection;
        }
        else if ([404, 409, 500, 501, 502, 520, 521, 522, 525].includes(code)) {
            error = ExchangeNotAvailable;
        }
        else if ([400, 403, 405, 503, 530].includes(code)) {
            var ddosProtection = responseBody.match(/cloudflare|incapsula/i);
            if (ddosProtection) {
                error = DDoSProtection;
            }
            else {
                error = ExchangeNotAvailable;
                details += ' (possible reasons: ' + [
                    'invalid API keys',
                    'bad or old nonce',
                    'exchange is down or offline',
                    'on maintenance',
                    'DDoS protection',
                    'rate-limiting',
                ].join(', ') + ')';
            }
        }
        else if ([408, 504].includes(code)) {
            error = RequestTimeout;
        }
        else if ([401, 511].includes(code)) {
            error = AuthenticationError;
        }
        else {
            error = ExchangeError;
        }
        throw new error([this.id, method, url, code, reason, details].join(' '));
    };
    Exchange.prototype.handleRestResponse = function (response, url, method, requestHeaders, requestBody) {
        var _this = this;
        if (method === void 0) { method = 'GET'; }
        if (requestHeaders === void 0) { requestHeaders = undefined; }
        if (requestBody === void 0) { requestBody = undefined; }
        return response.text().then(function (responseBody) {
            var jsonRequired = _this.parseJsonResponse && !_this.skipJsonOnStatusCodes.includes(response.status);
            var json = jsonRequired ? _this.parseJson(response, responseBody, url, method) : undefined;
            var responseHeaders = {};
            response.headers.forEach(function (value, key) {
                key = key.split('-').map(function (word) { return capitalize(word); }).join('-');
                responseHeaders[key] = value;
            });
            _this.last_response_headers = responseHeaders;
            _this.last_http_response = responseBody;
            _this.last_json_response = json;
            if (_this.verbose)
                console.log("handleRestResponse:\n", _this.id, method, url, response.status, response.statusText, "\nResponse:\n", responseHeaders, "\n", responseBody, "\n");
            var args = [response.status, response.statusText, url, method, responseHeaders, responseBody, json];
            _this.handleErrors.apply(_this, __spread(args));
            _this.defaultErrorHandler(response, responseBody, url, method);
            return jsonRequired ? json : responseBody;
        });
    };
    Exchange.prototype.setMarkets = function (markets, currencies) {
        var _this = this;
        if (currencies === void 0) { currencies = undefined; }
        var values = Object.values(markets).map(function (market) { return deepExtend({
            'limits': _this.limits,
            'precision': _this.precision,
        }, _this.fees['trading'], market); });
        this.markets = deepExtend(this.markets, indexBy(values, 'symbol'));
        this.marketsById = indexBy(markets, 'id');
        this.markets_by_id = this.marketsById;
        this.symbols = Object.keys(this.markets).sort();
        this.ids = Object.keys(this.markets_by_id).sort();
        if (currencies) {
            this.currencies = deepExtend(currencies, this.currencies);
        }
        else {
            var baseCurrencies = values.filter(function (market) { return 'base' in market; })
                .map(function (market) { return ({
                id: market.baseId || market.base,
                code: market.base,
                precision: market.precision ? (market.precision.base || market.precision.amount) : 8,
            }); });
            var quoteCurrencies = values.filter(function (market) { return 'quote' in market; })
                .map(function (market) { return ({
                id: market.quoteId || market.quote,
                code: market.quote,
                precision: market.precision ? (market.precision.quote || market.precision.price) : 8,
            }); });
            var allCurrencies = baseCurrencies.concat(quoteCurrencies);
            var groupedCurrencies_1 = groupBy(allCurrencies, 'code');
            var currencies_1 = Object.keys(groupedCurrencies_1).map(function (code) {
                return groupedCurrencies_1[code].reduce(function (previous, current) {
                    return ((previous.precision > current.precision) ? previous : current);
                }, groupedCurrencies_1[code][0]);
            });
            var sortedCurrencies = sortBy(flatten(currencies_1), 'code');
            this.currencies = deepExtend(indexBy(sortedCurrencies, 'code'), this.currencies);
        }
        this.currencies_by_id = indexBy(this.currencies, 'id');
        return this.markets;
    };
    Exchange.prototype.loadMarkets = function (reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var markets, currencies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!reload && this.markets) {
                            if (!this.markets_by_id) {
                                return [2, this.setMarkets(this.markets)];
                            }
                            return [2, this.markets];
                        }
                        return [4, this.fetchMarkets()];
                    case 1:
                        markets = _a.sent();
                        currencies = undefined;
                        if (!this.has.fetchCurrencies) return [3, 3];
                        return [4, this.fetchCurrencies()];
                    case 2:
                        currencies = _a.sent();
                        _a.label = 3;
                    case 3: return [2, this.setMarkets(markets, currencies)];
                }
            });
        });
    };
    Exchange.prototype.fetchBidsAsks = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchBidsAsks not supported yet');
    };
    Exchange.prototype.fetchOHLCV = function (symbol, timeframe, since, limits, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limits === void 0) { limits = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var trades, ohlcvc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.has['fetchTrades'])
                            throw new NotSupported(this.id + ' fetchOHLCV() not supported yet');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.fetchTrades(symbol, since, limits, params)];
                    case 2:
                        trades = _a.sent();
                        ohlcvc = buildOHLCVC(trades, timeframe, since, limits);
                        return [2, ohlcvc.map(function (c) { return c.slice(0, -1); })];
                }
            });
        });
    };
    Exchange.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchTickers not supported yet');
    };
    Exchange.prototype.purgeCachedOrders = function (before) {
        var orders = Object
            .values(this.orders)
            .filter(function (order) {
            return (order.status === 'open') ||
                (order.timestamp >= before);
        });
        this.orders = indexBy(orders, 'id');
        return this.orders;
    };
    Exchange.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchOrder not supported yet');
    };
    Exchange.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchOrders not supported yet');
    };
    Exchange.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchOpenOrders not supported yet');
    };
    Exchange.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchClosedOrders not supported yet');
    };
    Exchange.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' fetchMyTrades not supported yet');
    };
    Exchange.prototype.fetchCurrencies = function () {
        throw new NotSupported(this.id + ' fetchCurrencies not supported yet');
    };
    Exchange.prototype.fetchMarkets = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return resolve(_this.markets); });
    };
    Exchange.prototype.fetchOrderStatus = function (id, market) {
        if (market === void 0) { market = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrder(id, market)];
                    case 1:
                        order = _a.sent();
                        return [2, order['status']];
                }
            });
        });
    };
    Exchange.prototype.account = function () {
        return {
            'free': 0.0,
            'used': 0.0,
            'total': 0.0,
        };
    };
    Exchange.prototype.commonCurrencyCode = function (currency) {
        if (!this.substituteCommonCurrencyCodes)
            return currency;
        if (currency === 'XBT')
            return 'BTC';
        if (currency === 'BCC')
            return 'BCH';
        if (currency === 'DRK')
            return 'DASH';
        return currency;
    };
    Exchange.prototype.currency = function (code) {
        if (typeof this.currencies === 'undefined')
            return new ExchangeError(this.id + ' currencies not loaded');
        if ((typeof code === 'string') && (code in this.currencies))
            return this.currencies[code];
        throw new ExchangeError(this.id + ' does not have currency code ' + code);
    };
    Exchange.prototype.findMarket = function (string) {
        if (typeof this.markets === 'undefined')
            return new ExchangeError(this.id + ' markets not loaded');
        if (typeof string === 'string') {
            if (string in this.markets_by_id)
                return this.markets_by_id[string];
            if (string in this.markets)
                return this.markets[string];
        }
        return string;
    };
    Exchange.prototype.findSymbol = function (string, market) {
        if (market === void 0) { market = undefined; }
        if (typeof market === 'undefined')
            market = this.findMarket(string);
        if (typeof market === 'object')
            return market['symbol'];
        return string;
    };
    Exchange.prototype.market = function (symbol) {
        if (typeof this.markets === 'undefined')
            return new ExchangeError(this.id + ' markets not loaded');
        if ((typeof symbol === 'string') && (symbol in this.markets))
            return this.markets[symbol];
        throw new ExchangeError(this.id + ' does not have market symbol ' + symbol);
    };
    Exchange.prototype.marketId = function (symbol) {
        var market = this.market(symbol);
        return (typeof market !== 'undefined' ? market['id'] : symbol);
    };
    Exchange.prototype.marketIds = function (symbols) {
        var _this = this;
        return symbols.map(function (symbol) { return _this.marketId(symbol); });
    };
    Exchange.prototype.symbol = function (symbol) {
        return this.market(symbol).symbol || symbol;
    };
    Exchange.prototype.extractParams = function (string) {
        var re = /{([\w-]+)}/g;
        var matches = [];
        var match = re.exec(string);
        while (match) {
            matches.push(match[1]);
            match = re.exec(string);
        }
        return matches;
    };
    Exchange.prototype.implodeParams = function (string, params) {
        for (var property in params)
            string = string.replace('{' + property + '}', params[property]);
        return string;
    };
    Exchange.prototype.url = function (path, params) {
        if (params === void 0) { params = {}; }
        var result = this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (Object.keys(query).length)
            result += '?' + this.urlencode(query);
        return result;
    };
    Exchange.prototype.parseBidAsk = function (bidask, priceKey, amountKey) {
        if (priceKey === void 0) { priceKey = 0; }
        if (amountKey === void 0) { amountKey = 1; }
        var price = parseFloat(bidask[priceKey]);
        var amount = parseFloat(bidask[amountKey]);
        return [price, amount];
    };
    Exchange.prototype.parseBidsAsks = function (bidasks, priceKey, amountKey) {
        var _this = this;
        if (priceKey === void 0) { priceKey = 0; }
        if (amountKey === void 0) { amountKey = 1; }
        return Object.values(bidasks || []).map(function (bidask) { return _this.parseBidAsk(bidask, priceKey, amountKey); });
    };
    Exchange.prototype.fetchL2OrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrderBook(symbol, limit, params)];
                    case 1:
                        orderbook = _a.sent();
                        return [2, extend(orderbook, {
                                'bids': sortBy(aggregate(orderbook.bids), 0, true),
                                'asks': sortBy(aggregate(orderbook.asks), 0),
                            })];
                }
            });
        });
    };
    Exchange.prototype.parseOrderBook = function (orderbook, timestamp, bidsKey, asksKey, priceKey, amountKey) {
        if (timestamp === void 0) { timestamp = undefined; }
        if (bidsKey === void 0) { bidsKey = 'bids'; }
        if (asksKey === void 0) { asksKey = 'asks'; }
        if (priceKey === void 0) { priceKey = 0; }
        if (amountKey === void 0) { amountKey = 1; }
        timestamp = timestamp || this.milliseconds();
        return {
            'bids': sortBy((bidsKey in orderbook) ? this.parseBidsAsks(orderbook[bidsKey], priceKey, amountKey) : [], 0, true),
            'asks': sortBy((asksKey in orderbook) ? this.parseBidsAsks(orderbook[asksKey], priceKey, amountKey) : [], 0),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        };
    };
    Exchange.prototype.getCurrencyUsedOnOpenOrders = function (currency) {
        var _this = this;
        return Object.values(this.orders).filter(function (order) { return (order['status'] === 'open'); }).reduce(function (total, order) {
            var symbol = order['symbol'];
            var market = _this.markets[symbol];
            var remaining = order['remaining'];
            if (currency === market['base'] && order['side'] === 'sell') {
                return total + remaining;
            }
            else if (currency === market['quote'] && order['side'] === 'buy') {
                return total + (order['price'] * remaining);
            }
            else {
                return total;
            }
        }, 0);
    };
    Exchange.prototype.parseBalance = function (balance) {
        var _this = this;
        var currencies = Object.keys(this.omit(balance, 'info'));
        currencies.forEach(function (currency) {
            if (typeof balance[currency].used === 'undefined') {
                if (_this.dontGetUsedBalanceFromStaleCache && ('open_orders' in balance['info'])) {
                    var exchangeOrdersCount = balance['info']['open_orders'];
                    var cachedOrdersCount = Object.values(_this.orders).filter(function (order) { return (order['status'] === 'open'); }).length;
                    if (cachedOrdersCount === exchangeOrdersCount) {
                        balance[currency].used = _this.getCurrencyUsedOnOpenOrders(currency);
                        balance[currency].total = balance[currency].used + balance[currency].free;
                    }
                }
                else {
                    balance[currency].used = _this.getCurrencyUsedOnOpenOrders(currency);
                    balance[currency].total = balance[currency].used + balance[currency].free;
                }
            }
            ['free', 'used', 'total'].forEach(function (account) {
                balance[account] = balance[account] || {};
                balance[account][currency] = balance[currency][account];
            });
        });
        return balance;
    };
    Exchange.prototype.fetchPartialBalance = function (part, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchBalance(params)];
                    case 1:
                        balance = _a.sent();
                        return [2, balance[part]];
                }
            });
        });
    };
    Exchange.prototype.fetchFreeBalance = function (params) {
        if (params === void 0) { params = {}; }
        return this.fetchPartialBalance('free', params);
    };
    Exchange.prototype.fetchUsedBalance = function (params) {
        if (params === void 0) { params = {}; }
        return this.fetchPartialBalance('used', params);
    };
    Exchange.prototype.fetchTotalBalance = function (params) {
        if (params === void 0) { params = {}; }
        return this.fetchPartialBalance('total', params);
    };
    Exchange.prototype.filterBySinceLimit = function (array, since, limit) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (typeof since !== 'undefined')
            array = array.filter(function (entry) { return entry.timestamp >= since; });
        if (typeof limit !== 'undefined')
            array = array.slice(0, limit);
        return array;
    };
    Exchange.prototype.filterBySymbolSinceLimit = function (array, symbol, since, limit) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var symbolIsDefined = typeof symbol !== 'undefined';
        var sinceIsDefined = typeof since !== 'undefined';
        if (symbolIsDefined || sinceIsDefined)
            array = array.filter(function (entry) {
                return ((symbolIsDefined ? (entry.symbol === symbol) : true) &&
                    (sinceIsDefined ? (entry.timestamp >= since) : true));
            });
        if (typeof limit !== 'undefined')
            array = array.slice(0, limit);
        return array;
    };
    Exchange.prototype.parseTrades = function (trades, market, since, limit) {
        var _this = this;
        if (market === void 0) { market = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var result = Object.values(trades || []).map(function (trade) { return _this.parseTrade(trade, market); });
        result = sortBy(result, 'timestamp');
        var symbol = (typeof market !== 'undefined') ? market['symbol'] : undefined;
        return this.filterBySymbolSinceLimit(result, symbol, since, limit);
    };
    Exchange.prototype.parseOrders = function (orders, market, since, limit) {
        var _this = this;
        if (market === void 0) { market = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var result = Object.values(orders).map(function (order) { return _this.parseOrder(order, market); });
        result = sortBy(result, 'timestamp');
        var symbol = (typeof market !== 'undefined') ? market['symbol'] : undefined;
        return this.filterBySymbolSinceLimit(result, symbol, since, limit);
    };
    Exchange.prototype.filterBySymbol = function (array, symbol) {
        if (symbol === void 0) { symbol = undefined; }
        return ((typeof symbol !== 'undefined') ? array.filter(function (entry) { return entry.symbol === symbol; }) : array);
    };
    Exchange.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return Array.isArray(ohlcv) ? ohlcv.slice(0, 6) : ohlcv;
    };
    Exchange.prototype.parseOHLCVs = function (ohlcvs, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        ohlcvs = Object.values(ohlcvs);
        var result = [];
        for (var i = 0; i < ohlcvs.length; i++) {
            if (limit && (result.length >= limit))
                break;
            var ohlcv = this.parseOHLCV(ohlcvs[i], market, timeframe, since, limit);
            if (since && (ohlcv[0] < since))
                continue;
            result.push(ohlcv);
        }
        return result;
    };
    Exchange.prototype.editLimitBuyOrder = function (id, symbol) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.editLimitOrder.apply(this, __spread([id, symbol, 'buy'], args));
    };
    Exchange.prototype.editLimitSellOrder = function (id, symbol) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.editLimitOrder.apply(this, __spread([id, symbol, 'sell'], args));
    };
    Exchange.prototype.editLimitOrder = function (id, symbol) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return this.editOrder.apply(this, __spread([id, symbol, 'limit'], args));
    };
    Exchange.prototype.editOrder = function (id, symbol) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.enableRateLimit)
                            throw new ExchangeError(this.id + ' editOrder() requires enableRateLimit = true');
                        return [4, this.cancelOrder(id, symbol)];
                    case 1:
                        _a.sent();
                        return [2, this.createOrder.apply(this, __spread([symbol], args))];
                }
            });
        });
    };
    Exchange.prototype.createLimitOrder = function (symbol) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.createOrder.apply(this, __spread([symbol, 'limit'], args));
    };
    Exchange.prototype.createMarketOrder = function (symbol) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.createOrder.apply(this, __spread([symbol, 'market'], args));
    };
    Exchange.prototype.createLimitBuyOrder = function (symbol) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.createOrder.apply(this, __spread([symbol, 'limit', 'buy'], args));
    };
    Exchange.prototype.createLimitSellOrder = function (symbol) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.createOrder.apply(this, __spread([symbol, 'limit', 'sell'], args));
    };
    Exchange.prototype.createMarketBuyOrder = function (symbol, amount, params) {
        if (params === void 0) { params = {}; }
        return this.createOrder(symbol, 'market', 'buy', amount, undefined, params);
    };
    Exchange.prototype.createMarketSellOrder = function (symbol, amount, params) {
        if (params === void 0) { params = {}; }
        return this.createOrder(symbol, 'market', 'sell', amount, undefined, params);
    };
    Exchange.prototype.costToPrecision = function (symbol, cost) {
        return parseFloat(cost).toFixed(this.markets[symbol].precision.price);
    };
    Exchange.prototype.priceToPrecision = function (symbol, price) {
        return parseFloat(price).toFixed(this.markets[symbol].precision.price);
    };
    Exchange.prototype.amountToPrecision = function (symbol, amount) {
        return this.truncate(amount, this.markets[symbol].precision.amount);
    };
    Exchange.prototype.amountToString = function (symbol, amount) {
        return this.truncate_to_string(amount, this.markets[symbol].precision.amount);
    };
    Exchange.prototype.amountToLots = function (symbol, amount) {
        var lot = this.markets[symbol].lot;
        return this.amountToPrecision(symbol, Math.floor(amount / lot) * lot);
    };
    Exchange.prototype.feeToPrecision = function (symbol, fee) {
        return parseFloat(fee).toFixed(this.markets[symbol].precision.price);
    };
    Exchange.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
        if (takerOrMaker === void 0) { takerOrMaker = 'taker'; }
        if (params === void 0) { params = {}; }
        var market = this.markets[symbol];
        var rate = market[takerOrMaker];
        var cost = parseFloat(this.costToPrecision(symbol, amount * price));
        return {
            'type': takerOrMaker,
            'currency': market['quote'],
            'rate': rate,
            'cost': parseFloat(this.feeToPrecision(symbol, rate * cost)),
        };
    };
    Exchange.prototype.ymd = function (timestamp, infix) {
        if (infix === void 0) { infix = ' '; }
        var date = new Date(timestamp);
        var Y = date.getUTCFullYear();
        var m = date.getUTCMonth() + 1;
        var d = date.getUTCDate();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        return Y + '-' + m + '-' + d;
    };
    Exchange.prototype.ymdhms = function (timestamp, infix) {
        if (infix === void 0) { infix = ' '; }
        var date = new Date(timestamp);
        var Y = date.getUTCFullYear();
        var m = date.getUTCMonth() + 1;
        var d = date.getUTCDate();
        var H = date.getUTCHours();
        var M = date.getUTCMinutes();
        var S = date.getUTCSeconds();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        H = H < 10 ? ('0' + H) : H;
        M = M < 10 ? ('0' + M) : M;
        S = S < 10 ? ('0' + S) : S;
        return Y + '-' + m + '-' + d + infix + H + ':' + M + ':' + S;
    };
    return Exchange;
}());
//# sourceMappingURL=Exchange.js.map