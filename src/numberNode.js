
var NumberNode = function (value) {
    this.value = value;
};

NumberNode.prototype = {
    evaluate: function () {
        return this.value;
    },
    equalTo: function (object) {
        return this.value === object.value;
    }
};

module.exports = NumberNode;