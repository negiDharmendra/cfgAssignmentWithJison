var util = require('util');
var customErrors = {};

customErrors.UndefinedIdentifierException = function (value) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = "Undefined identifier => " + value;

};

customErrors.DivisionByZeroException = function (dividend, divisor) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = "Invalid division operation " + dividend + "/" + divisor + ". Divisor must be a integer other than zero";

};


util.inherits(customErrors.UndefinedIdentifierException, Error);
util.inherits(customErrors.DivisionByZeroException, Error);

module.exports = customErrors;