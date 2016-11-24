var CustomError = require('./customErrors');


var IdentifierNode = function (value) {
    this.value = value;
};
IdentifierNode.prototype = {
    evaluate: function (assignmentTable) {
        var value = assignmentTable.getValueOf(this.value);
        if (!value)
            throw new CustomError.UndefinedIdentifierException(this.value);
        return value;
    },
    equalTo: function (object) {
        return this.value === object.value;
    },
    toString: function () {
        return this.value.toString();
    }
};


module.exports = IdentifierNode;