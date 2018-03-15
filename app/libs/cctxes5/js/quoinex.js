'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var qryptos = require('./qryptos.js');
module.exports = (function (_super) {
    __extends(quoinex, _super);
    function quoinex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    quoinex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'quoinex',
            'name': 'QUOINEX',
            'countries': ['JP', 'SG', 'VN'],
            'version': '2',
            'rateLimit': 1000,
            'has': {
                'CORS': false,
                'fetchTickers': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/35047114-0e24ad4a-fbaa-11e7-96a9-69c1a756083b.jpg',
                'api': 'https://api.quoine.com',
                'www': 'https://quoinex.com/',
                'doc': [
                    'https://developers.quoine.com',
                    'https://developers.quoine.com/v2',
                ],
                'fees': 'https://quoine.zendesk.com/hc/en-us/articles/115011281488-Fees',
            },
        });
    };
    return quoinex;
}(qryptos));
//# sourceMappingURL=quoinex.js.map