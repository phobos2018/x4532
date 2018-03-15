"use strict";
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
var fs = require('fs');
var path = require('path');
var log = require('ololog');
var ansi = require('ansicolor').nice;
var capitalize = require('./js/base/functions.js').capitalize;
var errors = require('./js/base/errors.js');
var _a = __read(process.argv, 3), filename = _a[2];
function replaceInFile(filename, regex, replacement) {
    var contents = fs.readFileSync(filename, 'utf8');
    var parts = contents.split(regex);
    var newContents = parts[0] + replacement + parts[1];
    fs.truncateSync(filename);
    fs.writeFileSync(filename, newContents);
}
function regexAll(text, array) {
    for (var i in array) {
        var regex = array[i][0];
        regex = typeof regex === 'string' ? new RegExp(regex, 'g') : new RegExp(regex);
        text = text.replace(regex, array[i][1]);
    }
    return text;
}
var commonRegexes = [
    [/\.deepExtend\s/g, '.deep_extend'],
    [/\.safeFloat\s/g, '.safe_float'],
    [/\.safeInteger\s/g, '.safe_integer'],
    [/\.safeString\s/g, '.safe_string'],
    [/\.safeValue\s/g, '.safe_value'],
    [/\.arrayConcat\s/g, '.array_concat'],
    [/\.binaryConcat\s/g, '.binary_concat'],
    [/\.binaryToString\s/g, '.binary_to_string'],
    [/\.precisionFromString\s/g, '.precision_from_string'],
    [/\.implodeParams\s/g, '.implode_params'],
    [/\.extractParams\s/g, '.extract_params'],
    [/\.parseBalance\s/g, '.parse_balance'],
    [/\.parseOHLCVs\s/g, '.parse_ohlcvs'],
    [/\.parseOHLCV\s/g, '.parse_ohlcv'],
    [/\.parseDate\s/g, '.parse_date'],
    [/\.parseTicker\s/g, '.parse_ticker'],
    [/\.parseTimeframe\s/g, '.parse_timeframe'],
    [/\.parseTradesData\s/g, '.parse_trades_data'],
    [/\.parseTrades\s/g, '.parse_trades'],
    [/\.parseTrade\s/g, '.parse_trade'],
    [/\.parseOrderBook\s/g, '.parse_order_book'],
    [/\.parseBidsAsks\s/g, '.parse_bids_asks'],
    [/\.parseBidAsk\s/g, '.parse_bid_ask'],
    [/\.parseOrders\s/g, '.parse_orders'],
    [/\.parseOrderStatus\s/g, '.parse_order_status'],
    [/\.parseOrder\s/g, '.parse_order'],
    [/\.filterBySymbolSinceLimit\s/g, '.filter_by_symbol_since_limit'],
    [/\.filterBySinceLimit\s/g, '.filter_by_since_limit'],
    [/\.filterBySymbol\s/g, '.filter_by_symbol'],
    [/\.getVersionString\s/g, '.get_version_string'],
    [/\.indexBy\s/g, '.index_by'],
    [/\.sortBy\s/g, '.sort_by'],
    [/\.filterBy\s/g, '.filter_by'],
    [/\.groupBy\s/g, '.group_by'],
    [/\.findMarket\s/g, '.find_market'],
    [/\.findSymbol\s/g, '.find_symbol'],
    [/\.marketIds\s/g, '.market_ids'],
    [/\.marketId\s/g, '.market_id'],
    [/\.fetchFundingFees\s/g, '.fetch_funding_fees'],
    [/\.fetchTradingFees\s/g, '.fetch_trading_fees'],
    [/\.fetchFees\s/g, '.fetch_fees'],
    [/\.fetchL2OrderBook\s/g, '.fetch_l2_order_book'],
    [/\.fetchOrderBook\s/g, '.fetch_order_book'],
    [/\.fetchMyTrades\s/g, '.fetch_my_trades'],
    [/\.fetchOrderStatus\s/g, '.fetch_order_status'],
    [/\.fetchOpenOrders\s/g, '.fetch_open_orders'],
    [/\.fetchOpenOrder\s/g, '.fetch_open_order'],
    [/\.fetchOrders\s/g, '.fetch_orders'],
    [/\.fetchOrderTrades\s/g, '.fetch_order_trades'],
    [/\.fetchOrder\s/g, '.fetch_order'],
    [/\.fetchBidsAsks\s/g, '.fetch_bids_asks'],
    [/\.fetchTickers\s/g, '.fetch_tickers'],
    [/\.fetchTicker\s/g, '.fetch_ticker'],
    [/\.fetchCurrencies\s/g, '.fetch_currencies'],
    [/\.priceToPrecision\s/g, '.price_to_precision'],
    [/\.amountToPrecision\s/g, '.amount_to_precision'],
    [/\.amountToString\s/g, '.amount_to_string'],
    [/\.amountToLots\s/g, '.amount_to_lots'],
    [/\.feeToPrecision\s/g, '.fee_to_precision'],
    [/\.costToPrecision\s/g, '.cost_to_precision'],
    [/\.commonCurrencyCode\s/g, '.common_currency_code'],
    [/\.loadFees\s/g, '.load_fees'],
    [/\.loadMarkets\s/g, '.load_markets'],
    [/\.fetchMarkets\s/g, '.fetch_markets'],
    [/\.appendInactiveMarkets\s/g, '.append_inactive_markets'],
    [/\.fetchCategories\s/g, '.fetch_categories'],
    [/\.calculateFee\s/g, '.calculate_fee'],
    [/\.editLimitBuyOrder\s/g, '.edit_limit_buy_order'],
    [/\.editLimitSellOrder\s/g, '.edit_limit_sell_order'],
    [/\.editLimitOrder\s/g, '.edit_limit_order'],
    [/\.editOrder\s/g, '.edit_order'],
    [/\.encodeURIComponent\s/g, '.encode_uri_component'],
    [/\.throwExceptionOnError\s/g, '.throw_exception_on_error'],
    [/\.handleErrors\s/g, '.handle_errors'],
    [/\.checkRequiredCredentials\s/g, '.check_required_credentials'],
    [/\.checkAddress\s/g, '.check_address'],
];
var pythonRegexes = [
    [/Array\.isArray\s*\(([^\)]+)\)/g, 'isinstance($1, list)'],
    [/([^\(\s]+)\s+instanceof\s+([^\)\s]+)/g, 'isinstance($1, $2)'],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\=\=\=?\s+\'undefined\'/g, '$1[$2] is None'],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\!\=\=?\s+\'undefined\'/g, '$1[$2] is not None'],
    [/typeof\s+([^\s]+)\s+\=\=\=?\s+\'undefined\'/g, '$1 is None'],
    [/typeof\s+([^\s]+)\s+\!\=\=?\s+\'undefined\'/g, '$1 is not None'],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\=\=\=?\s+\'string\'/g, 'isinstance($1[$2], basestring)'],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\!\=\=?\s+\'string\'/g, 'not isinstance($1[$2], basestring)'],
    [/typeof\s+([^\s]+)\s+\=\=\=?\s+\'string\'/g, 'isinstance($1, basestring)'],
    [/typeof\s+([^\s]+)\s+\!\=\=?\s+\'string\'/g, 'not isinstance($1, basestring)'],
    [/undefined/g, 'None'],
    [/\=\=\=?/g, '=='],
    [/\!\=\=?/g, '!='],
    [/this\.stringToBinary\s*\((.*)\)/g, '$1'],
    [/this\.stringToBase64\s/g, 'base64.b64encode'],
    [/this\.base64ToBinary\s/g, 'base64.b64decode'],
].concat(commonRegexes).concat([
    [/this\./g, 'self.'],
    [/([^a-zA-Z\'])this([^a-zA-Z])/g, '$1self$2'],
    [/([^a-zA-Z0-9_])(?:let|const|var)\s\[\s*([^\]]+)\s\]/g, '$1$2'],
    [/([^a-zA-Z0-9_])(?:let|const|var)\s\{\s*([^\}]+)\s\}\s\=\s([^\;]+)/g, '$1$2 = (lambda $2: ($2))(**$3)'],
    [/([^a-zA-Z0-9_])(?:let|const|var)\s/g, '$1'],
    [/Object\.keys\s*\((.*)\)\.length/g, '$1'],
    [/Object\.keys\s*\((.*)\)/g, 'list($1.keys())'],
    [/\[([^\]]+)\]\.join\s*\(([^\)]+)\)/g, "$2.join([$1])"],
    [/hash \(([^,]+)\, \'(sha[0-9])\'/g, "hash($1, '$2'"],
    [/hmac \(([^,]+)\, ([^,]+)\, \'(md5)\'/g, 'hmac($1, $2, hashlib.$3'],
    [/hmac \(([^,]+)\, ([^,]+)\, \'(sha[0-9]+)\'/g, 'hmac($1, $2, hashlib.$3'],
    [/throw new ([\S]+) \((.*)\)/g, 'raise $1($2)'],
    [/throw ([\S]+)/g, 'raise $1'],
    [/try {/g, 'try:'],
    [/\}\s+catch \(([\S]+)\) {/g, 'except Exception as $1:'],
    [/([\s\(])extend(\s)/g, '$1self.extend$2'],
    [/\} else if/g, 'elif'],
    [/else if/g, 'elif'],
    [/if\s+\((.*)\)\s+\{/g, 'if $1:'],
    [/if\s+\((.*)\)\s*[\n]/g, "if $1:\n"],
    [/\}\s*else\s*\{/g, 'else:'],
    [/else\s*[\n]/g, "else:\n"],
    [/for\s+\(([a-zA-Z0-9_]+)\s*=\s*([^\;\s]+\s*)\;[^\<\>\=]+(?:\<=|\>=|<|>)\s*(.*)\.length\s*\;[^\)]+\)\s*{/g, 'for $1 in range($2, len($3)):'],
    [/\s\|\|\s/g, ' or '],
    [/\s\&\&\s/g, ' and '],
    [/\!([^\=])/g, 'not $1'],
    [/([^\s]+)\.length/g, 'len($1)'],
    [/\.push\s*\(([\s\S]+?)\);/g, '.append($1);'],
    [/^\s*}\s*$/gm, ''],
    [/;/g, ''],
    [/\.toUpperCase\s*/g, '.upper'],
    [/\.toLowerCase\s*/g, '.lower'],
    [/JSON\.stringify\s*/g, 'json.dumps'],
    [/JSON\.parse\s*/g, "json.loads"],
    [/([^\s]+)\.toFixed\s*\(([0-9]+)\)/g, "'{:.$2f}'.format($1)"],
    [/([^\s]+)\.toFixed\s*\(([^\)]+)\)/g, "('{:.' + str($2) + 'f}').format($1)"],
    [/parseFloat\s*/g, 'float'],
    [/parseInt\s*/g, 'int'],
    [/self\[([^\]+]+)\]/g, 'getattr(self, $1)'],
    [/([^\s]+)\.slice \(([^\,\)]+)\,\s?([^\)]+)\)/g, '$1[$2:$3]'],
    [/([^\s]+)\.slice \(([^\)\:]+)\)/g, '$1[$2:]'],
    [/Math\.floor\s*\(([^\)]+)\)/g, 'int(math.floor($1))'],
    [/Math\.abs\s*\(([^\)]+)\)/g, 'abs($1)'],
    [/Math\.pow\s*\(([^\)]+)\)/g, 'math.pow($1)'],
    [/Math\.round\s*\(([^\)]+)\)/g, 'int(round($1))'],
    [/Math\.ceil\s*\(([^\)]+)\)/g, 'int(ceil($1))'],
    [/Math\.log/g, 'math.log'],
    [/(\([^\)]+\)|[^\s]+)\s*\?\s*([^\:]+)\s+\:\s*([^\n]+)/g, '$2 if $1 else $3'],
    [/ \/\//g, ' #'],
    [/([^\n\s]) #/g, '$1  #'],
    [/\.indexOf/g, '.find'],
    [/\strue/g, ' True'],
    [/\sfalse/g, ' False'],
    [/\(([^\s]+)\sin\s([^\)]+)\)/g, '($1 in list($2.keys()))'],
    [/([^\s]+\s*\(\))\.toString\s+\(\)/g, 'str($1)'],
    [/([^\s]+)\.toString \(\)/g, 'str($1)'],
    [/([^\s]+)\.join\s*\(\s*([^\)\[\]]+?)\s*\)/g, '$2.join($1)'],
    [/Math\.(max|min)\s/g, '$1'],
    [/console\.log\s/g, 'print'],
    [/process\.exit\s+/g, 'sys.exit'],
    [/([^:+=\/\*\s-]+) \(/g, '$1('],
    [/\[ /g, '['],
    [/\{ /g, '{'],
    [/([^\s]+) \]/g, '$1]'],
    [/([^\s]+) \}/g, '$1}'],
    [/([^a-z])(elif|if|or|else)\(/g, '$1$2 \('],
    [/\=\=\sTrue/g, 'is True'],
]);
var python2Regexes = [
    [/(\s)await(\s)/g, '$1']
];
var phpRegexes = [
    [/\{([a-zA-Z0-9_]+?)\}/g, '<$1>'],
    [/Array\.isArray\s*\(([^\)]+)\)/g, "gettype ($1) === 'array' && count (array_filter (array_keys ($1), 'is_string')) == 0"],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\=\=\=?\s+\'undefined\'/g, '$1[$2] == null'],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\!\=\=?\s+\'undefined\'/g, '$1[$2] != null'],
    [/typeof\s+([^\s]+)\s+\=\=\=?\s+\'undefined\'/g, '$1 === null'],
    [/typeof\s+([^\s]+)\s+\!\=\=?\s+\'undefined\'/g, '$1 !== null'],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\=\=\=?\s+\'string\'/g, "gettype ($1[$2]) == 'string'"],
    [/typeof\s+([^\s\[]+)(?:\s|\[(.+?)\])\s+\!\=\=?\s+\'string\'/g, "gettype ($1[$2]) != 'string'"],
    [/typeof\s+([^\s]+)\s+\=\=\=?\s+\'string\'/g, "gettype ($1) == 'string'"],
    [/typeof\s+([^\s]+)\s+\!\=\=?\s+\'string\'/g, "gettype ($1) != 'string'"],
    [/undefined/g, 'null'],
    [/this\.extend/g, 'array_merge'],
    [/this\.stringToBinary\s*\((.*)\)/g, '$1'],
    [/this\.stringToBase64/g, 'base64_encode'],
    [/this\.base64ToBinary/g, 'base64_decode'],
    [/this\.deepExtend/g, 'array_replace_recursive'],
].concat(commonRegexes).concat([
    [/this\./g, '$this->'],
    [/ this;/g, ' $this;'],
    [/([^'])this_\./g, '$1$this_->'],
    [/\{\}/g, 'array ()'],
    [/\[\]/g, 'array ()'],
    [/\{([^\n\}]+)\}/g, 'array ($1)'],
    [/([^a-zA-Z0-9_])(?:let|const|var)\s\[\s*([^\]]+)\s\]/g, '$1list ($2)'],
    [/([^a-zA-Z0-9_])(?:let|const|var)\s\{\s*([^\}]+)\s\}/g, '$1array_values (list ($2))'],
    [/([^a-zA-Z0-9_])(?:let|const|var)\s/g, '$1'],
    [/Object\.keys\s*\((.*)\)\.length/g, '$1'],
    [/Object\.keys\s*\((.*)\)/g, 'is_array ($1) ? array_keys ($1) : array ()'],
    [/([^\s]+\s*\(\))\.toString \(\)/g, '(string) $1'],
    [/([^\s]+)\.toString \(\)/g, '(string) $1'],
    [/throw new Error \((.*)\)/g, 'throw new \\Exception ($1)'],
    [/throw new ([\S]+) \((.*)\)/g, 'throw new $1 ($2)'],
    [/throw ([\S]+)\;/g, 'throw $$$1;'],
    ['([^a-z]+) (' + Object.keys(errors).join('|') + ')([^\\s])', "$1 '\\\\ccxt\\\\$2'$3"],
    [/\}\s+catch \(([\S]+)\) {/g, '} catch (Exception $$$1) {'],
    [/for\s+\(([a-zA-Z0-9_]+)\s*=\s*([^\;\s]+\s*)\;[^\<\>\=]+(\<=|\>=|<|>)\s*(.*)\.length\s*\;([^\)]+)\)\s*{/g, 'for ($1 = $2; $1 $3 count ($4);$5) {'],
    [/([^\s]+)\.length\;/g, 'is_array ($1) ? count ($1) : 0;'],
    [/([^\s\(]+)\.length/g, 'strlen ($1)'],
    [/\.push\s*\(([\s\S]+?)\)\;/g, '[] = $1;'],
    [/(\s)await(\s)/g, '$1'],
    [/([\S])\: /g, '$1 => '],
]).concat(__spread(Array(20)).map(function (x) { return [/\{([^\;\{]+?)\}([^\s])/g, 'array ($1)$2']; })).concat([
    [/\[\s*([^\]]+?)\s*\]\.join\s*\(\s*([^\)]+?)\s*\)/g, "implode ($2, array ($1))"],
]).concat(__spread(Array(20)).map(function (x) { return [/\[(\s[^\]]+?\s)\]/g, 'array ($1)']; })).concat([
    [/JSON\.stringify/g, 'json_encode'],
    [/JSON\.parse\s+\(([^\)]+)\)/g, 'json_decode ($1, $$as_associative_array = true)'],
    [/([^\(\s]+)\.includes\s+\(([^\)]+)\)/g, 'mb_strpos ($1, $2)'],
    [/([^\s]+)\.toFixed\s*\(([0-9]+)\)/g, "sprintf ('%.$2f', $1)"],
    [/([^\s]+)\.toFixed\s*\(([^\)]+)\)/g, "sprintf ('%.' . $2 . 'f', $1)"],
    [/parseFloat\s/g, 'floatval '],
    [/parseInt\s/g, 'intval '],
    [/ \+ /g, ' . '],
    [/ \+\= /g, ' .= '],
    [/([^\s\(]+(?:\s*\(.+\))?)\.toUpperCase\s*\(\)/g, 'strtoupper ($1)'],
    [/([^\s\(]+(?:\s*\(.+\))?)\.toLowerCase\s*\(\)/g, 'strtolower ($1)'],
    [/([^\s\(]+(?:\s*\(.+\))?)\.replace\s*\(([^\)]+)\)/g, 'str_replace ($2, $1)'],
    [/this\[([^\]+]+)\]/g, '$$this->$$$1'],
    [/([^\s\(]+).slice \(([^\)\:]+)\)/g, 'mb_substr ($1, $2)'],
    [/([^\s\(]+).slice \(([^\,\)]+)\,\s*([^\)]+)\)/g, 'mb_substr ($1, $2, $3)'],
    [/([^\s\(]+).split \(([^\,]+?)\)/g, 'explode ($2, $1)'],
    [/Math\.floor\s*\(([^\)]+)\)/g, '(int) floor ($1)'],
    [/Math\.abs\s*\(([^\)]+)\)/g, 'abs ($1)'],
    [/Math\.round\s*\(([^\)]+)\)/g, '(int) round ($1)'],
    [/Math\.ceil\s*\(([^\)]+)\)/g, '(int) ceil ($1)'],
    [/Math\.pow\s*\(([^\)]+)\)/g, 'pow ($1)'],
    [/Math\.log/g, 'log'],
    [/([^\(\s]+)\s+%\s+([^\s\)]+)/g, 'fmod ($1, $2)'],
    [/\(([^\s]+)\.indexOf\s*\(([^\)]+)\)\s*\>\=\s*0\)/g, '(mb_strpos ($1, $2) !== false)'],
    [/([^\s]+)\.indexOf\s*\(([^\)]+)\)\s*\>\=\s*0/g, 'mb_strpos ($1, $2) !== false'],
    [/([^\s]+)\.indexOf\s*\(([^\)]+)\)/g, 'mb_strpos ($1, $2)'],
    [/\(([^\s\(]+)\sin\s([^\)]+)\)/g, '(is_array ($2) && array_key_exists ($1, $2))'],
    [/([^\s]+)\.join\s*\(\s*([^\)]+?)\s*\)/g, 'implode ($2, $1)'],
    [/Math\.(max|min)/g, '$1'],
    [/console\.log/g, 'var_dump'],
    [/process\.exit/g, 'exit'],
    [/super\./g, 'parent::'],
    [/\<([a-zA-Z0-9_]+?)\>/g, '{$1}'],
]);
function createPythonClass(className, baseClass, body, methods, async) {
    if (async === void 0) { async = false; }
    var pythonStandardLibraries = {
        'base64': 'base64',
        'hashlib': 'hashlib',
        'math': 'math',
        'json.loads': 'json',
    };
    async = async ? 'async.' : '';
    var importFrom = (baseClass == 'Exchange') ?
        ('ccxt.' + async + 'base.exchange') :
        ('ccxt.' + async + baseClass);
    var bodyAsString = body.join("\n");
    var header = __spread([
        "# -*- coding: utf-8 -*-\n",
        "# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:",
        "# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code\n",
        'from ' + importFrom + ' import ' + baseClass
    ], (bodyAsString.match(/basestring/) ? [
        "\n# -----------------------------------------------------------------------------\n",
        "try:",
        "    basestring  # Python 3",
        "except NameError:",
        "    basestring = str  # Python 2",
    ] : []));
    var libraries = [];
    for (var library in pythonStandardLibraries) {
        var regex = new RegExp("[^\\']" + library + "[^\\'a-zA-Z]");
        if (bodyAsString.match(regex))
            libraries.push('import ' + pythonStandardLibraries[library]);
    }
    var errorImports = [];
    for (var error in errors) {
        var regex = new RegExp("[^\\']" + error + "[^\\']");
        if (bodyAsString.match(regex))
            errorImports.push('from ccxt.base.errors import ' + error);
    }
    header = header.concat(libraries, errorImports);
    try {
        for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
            var method = methods_1_1.value;
            var regex = new RegExp('self\\.(' + method + ')\\s*\\(', 'g');
            bodyAsString = bodyAsString.replace(regex, function (match, p1) { return ('self.' + convertMethodNameToUnderscoreNotation(p1) + '('); });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (methods_1_1 && !methods_1_1.done && (_a = methods_1.return)) _a.call(methods_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    header.push("\n\nclass " + className + ' (' + baseClass + '):');
    var footer = [
        '',
    ];
    var result = header.join("\n") + "\n" + bodyAsString + "\n" + footer.join('\n');
    return result;
    var e_1, _a;
}
function createPHPClass(className, baseClass, body, methods) {
    var baseFolder = (baseClass == 'Exchange') ? 'base/' : '';
    var baseFile = baseFolder + baseClass + '.php';
    var header = [
        "<?php\n",
        "namespace ccxt;\n",
        "// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:",
        "// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code\n",
        'class ' + className + ' extends ' + baseClass + ' {',
    ];
    var bodyAsString = body.join("\n");
    try {
        for (var methods_2 = __values(methods), methods_2_1 = methods_2.next(); !methods_2_1.done; methods_2_1 = methods_2.next()) {
            var method = methods_2_1.value;
            var regex = new RegExp('this->(' + method + ')\\s*\\(', 'g');
            bodyAsString = bodyAsString.replace(regex, function (match, p1) { return ('this->' + convertMethodNameToUnderscoreNotation(p1) + ' ('); });
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (methods_2_1 && !methods_2_1.done && (_a = methods_2.return)) _a.call(methods_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var footer = [
        "}\n",
    ];
    var result = header.join("\n") + "\n" + bodyAsString + "\n" + footer.join('\n');
    return result;
    var e_2, _a;
}
var python2Folder = './python/ccxt/';
var python3Folder = './python/ccxt/async/';
var phpFolder = './php/';
function convertMethodNameToUnderscoreNotation(method) {
    return (method
        .replace(/[A-Z]+/g, function (match) { return capitalize(match.toLowerCase()); })
        .replace(/[A-Z]/g, function (match) { return '_' + match.toLowerCase(); }));
}
function transpileDerivedExchangeClass(contents) {
    var requireRegex = /^const\s+[^\=]+\=\s*require\s*\(\'[^\']+\'\);*$/gm;
    var requireMatches = contents.match(requireRegex);
    var exchangeClassDeclarationMatches = contents.match(/^module\.exports\s*=\s*class\s+([\S]+)\s+extends\s+([\S]+)\s+{([\s\S]+?)^};*/m);
    var className = exchangeClassDeclarationMatches[1];
    var baseClass = exchangeClassDeclarationMatches[2];
    var methods = exchangeClassDeclarationMatches[3].trim().split(/\n\s*\n/);
    var python2 = [];
    var python3 = [];
    var php = [];
    var methodNames = [];
    var _loop_1 = function (i) {
        var part = methods[i].trim();
        var lines = part.split("\n");
        var signature = lines[0].trim();
        var methodSignatureRegex = /(async |)([\S]+)\s\(([^)]*)\)\s*{/;
        var matches = methodSignatureRegex.exec(signature);
        var keyword = matches[1];
        var method = matches[2];
        methodNames.push(method);
        method = convertMethodNameToUnderscoreNotation(method);
        var args = matches[3].trim();
        args = args.length ? args.split(',').map(function (x) { return x.trim(); }) : [];
        var variables = args.map(function (arg) { return arg.split('=').map(function (x) { return x.trim(); })[0]; });
        var phpArgs = args.join(', $').trim().replace(/undefined/g, 'null').replace('{}', 'array ()');
        phpArgs = phpArgs.length ? ('$' + phpArgs) : '';
        var pythonArgs = args.map(function (x) { return x.replace(' = ', '='); })
            .join(', ')
            .replace(/undefined/g, 'None')
            .replace(/false/g, 'False')
            .replace(/true/g, 'True');
        var body = lines.slice(1, -1).join("\n");
        var localVariablesRegex = /[^a-zA-Z0-9_](?:let|const|var)\s+(?:\[([^\]]+)\]|([a-zA-Z0-9_]+))/g;
        var localVariablesMatches = void 0;
        while (localVariablesMatches = localVariablesRegex.exec(body)) {
            var match = localVariablesMatches[1] ? localVariablesMatches[1] : localVariablesMatches[2];
            match = match.trim().split(', ');
            match.forEach(function (x) { return variables.push(x.trim()); });
            variables.push(localVariablesMatches[1]);
        }
        var catchClauseRegex = /catch \(([^)]+)\)/g;
        var catchClauseMatches = void 0;
        while (catchClauseMatches = catchClauseRegex.exec(body)) {
            variables.push(catchClauseMatches[1]);
        }
        var phpVariablesRegexes = variables.map(function (x) { return ["([^$$a-zA-Z0-9\\.\\>'_])" + x + "([^a-zA-Z0-9'_])", '$1$$' + x + '$2']; });
        var python3Body = regexAll(body, pythonRegexes)
            .replace(/$\s*$/gm, '')
            .replace(/\'([абвгдеёжзийклмнопрстуфхцчшщъыьэюя服务端忙碌]+)\'/gm, "u'$1'");
        var orderedDictRegex = /\.ordered\s+\(\{([^\}]+)\}\)/g;
        var orderedDictMatches = undefined;
        while (orderedDictMatches = orderedDictRegex.exec(python3Body)) {
            var replaced = orderedDictMatches[1].replace(/^(\s+)([^\:]+)\:\s*([^\,]+)\,$/gm, '$1($2, $3),');
            python3Body = python3Body.replace(orderedDictRegex, '\.ordered ([' + replaced + '])');
        }
        python3Body = python3Body.replace(/super\./g, 'super(' + className + ', self).');
        var python2Body = regexAll(python3Body, python2Regexes);
        var pythonString = 'def ' + method + '(self' + (pythonArgs.length ? ', ' + pythonArgs : '') + '):';
        python2.push('');
        python2.push('    ' + pythonString);
        python2.push(python2Body);
        python3.push('');
        python3.push('    ' + keyword + pythonString);
        python3.push(python3Body);
        var phpBody = regexAll(body, phpRegexes.concat(phpVariablesRegexes));
        php.push('');
        php.push('    public function ' + method + ' (' + phpArgs + ') {');
        php.push(phpBody);
        php.push('    }');
    };
    for (var i = 0; i < methods.length; i++) {
        _loop_1(i);
    }
    return {
        python2: createPythonClass(className, baseClass, python2, methodNames),
        python3: createPythonClass(className, baseClass, python3, methodNames, true),
        php: createPHPClass(className, baseClass, php, methodNames),
        className: className,
        baseClass: baseClass,
    };
}
function transpileDerivedExchangeFile(folder, filename) {
    try {
        var contents = fs.readFileSync(folder + filename, 'utf8');
        var _a = transpileDerivedExchangeClass(contents), python2 = _a.python2, python3 = _a.python3, php = _a.php, className = _a.className, baseClass = _a.baseClass;
        var python2Filename = python2Folder + filename.replace('.js', '.py');
        var python3Filename = python3Folder + filename.replace('.js', '.py');
        var phpFilename = phpFolder + filename.replace('.js', '.php');
        log.cyan('Transpiling from', filename.yellow);
        overwriteFile(python2Filename, python2);
        overwriteFile(python3Filename, python3);
        overwriteFile(phpFilename, php);
        return { className: className, baseClass: baseClass };
    }
    catch (e) {
        log.red('\nFailed to transpile source code from', filename.yellow);
        log.red('See https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md on how to build this library properly\n');
        throw e;
    }
}
function transpileDerivedExchangeFiles(folder, pattern) {
    if (pattern === void 0) { pattern = '.js'; }
    var classNames = fs.readdirSync(folder)
        .filter(function (file) { return file.includes(pattern); })
        .map(function (file) { return transpileDerivedExchangeFile(folder, file); });
    if (classNames.length === 0)
        return null;
    var classes = {};
    classNames.forEach(function (_a) {
        var className = _a.className, baseClass = _a.baseClass;
        classes[className] = baseClass;
    });
    return classes;
}
function copyFile(oldName, newName) {
    var contents = fs.readFileSync(oldName, 'utf8');
    fs.truncateSync(newName);
    fs.writeFileSync(newName, contents);
}
function overwriteFile(filename, contents) {
    fs.closeSync(fs.openSync(filename, 'a'));
    fs.truncateSync(filename);
    fs.writeFileSync(filename, contents);
}
function createFolder(folder) {
    try {
        fs.mkdirSync(folder);
    }
    catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}
function createFolderRecursively(folder) {
    var parts = folder.split(path.sep);
    for (var i = 1; i <= parts.length; i++) {
        createFolder(path.join.apply(null, parts.slice(0, i)));
    }
}
function transpilePythonAsyncToSync(oldName, newName) {
    log.magenta('Transpiling ' + oldName.yellow + ' → ' + newName.yellow);
    var fileContents = fs.readFileSync(oldName, 'utf8');
    var lines = fileContents.split("\n");
    lines = lines.filter(function (line) { return !['import asyncio'].includes(line); })
        .map(function (line) {
        return (line.replace('asyncio.get_event_loop().run_until_complete(main())', 'main()')
            .replace('import ccxt.async as ccxt', 'import ccxt')
            .replace(/.*token\_bucket.*/g, '')
            .replace('await asyncio.sleep', 'time.sleep')
            .replace('async ', '')
            .replace('await ', ''));
    });
    function deleteFunction(f, from) {
        var re1 = new RegExp('def ' + f + '[^\#]+', 'g');
        var re2 = new RegExp('[\\s]+' + f + '\\(exchange\\)', 'g');
        return from.replace(re1, '').replace(re2, '');
    }
    var newContents = lines.join('\n');
    newContents = deleteFunction('test_tickers_async', newContents);
    newContents = deleteFunction('test_l2_order_books_async', newContents);
    fs.truncateSync(newName);
    fs.writeFileSync(newName, newContents);
}
function exportTypeScriptDeclarations(classes) {
    var file = './ccxt.d.ts';
    var regex = /(?:    export class [^\s]+ extends [^\s]+ \{\}[\r]?[\n])+/;
    var replacement = Object.keys(classes).map(function (className) {
        var baseClass = classes[className];
        return '    export class ' + className + ' extends ' + baseClass + " {}";
    }).join("\n") + "\n";
    replaceInFile(file, regex, replacement);
}
createFolderRecursively(python2Folder);
createFolderRecursively(python3Folder);
createFolderRecursively(phpFolder);
var classes = transpileDerivedExchangeFiles('./js/', filename);
if (classes === null) {
    log.bright.yellow('0 files transpiled.');
    return;
}
exportTypeScriptDeclarations(classes);
transpilePythonAsyncToSync('./python/test/test_async.py', './python/test/test.py');
log.bright.green('Transpiled successfully.');
//# sourceMappingURL=transpile.js.map