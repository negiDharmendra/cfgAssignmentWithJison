var nodes = require('./nodes.js');

var SymbolTable = function () {
    this.table = {};
};

SymbolTable.prototype = {

    populate: function (key, value) {
        this.table[key] = value;
    },

    getValueOf: function (key) {
        return this.table[key];
    },

    equalTo: function (object) {
        if (!(object instanceof SymbolTable)) return false;

        var currentObject = this;
        var thisObjectKeys = Object.keys(currentObject.table).sort();
        var otherObjectKeys = Object.keys(object.table).sort();

        return thisObjectKeys.every(function (key, index) {
            var otherObjectKey = otherObjectKeys[index];
            return key === otherObjectKey && currentObject.table[key].equalTo(object.table[otherObjectKey]);
        });

    }

};

module.exports = SymbolTable;