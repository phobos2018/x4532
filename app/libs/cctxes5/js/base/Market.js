"use strict";
module.exports = (function () {
    function Market(exchange, symbol) {
        this.exchange = exchange;
        this.symbol = symbol;
        this.market = exchange.markets[symbol];
    }
    Market.prototype.amountToPrecision = function (amount) {
        return this.exchange.amountToPrecision(this.symbol, amount);
    };
    Market.prototype.createLimitBuyOrder = function (amount, price) {
        return this.exchange.createLimitBuyOrder(this.symbol, amount, price);
    };
    Market.prototype.createLimitSellOrder = function (amount, price) {
        return this.exchange.createLimitSellOrder(this.symbol, amount, price);
    };
    return Market;
}());
//# sourceMappingURL=Market.js.map