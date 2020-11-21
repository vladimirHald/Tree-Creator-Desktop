"use strict";
exports.__esModule = true;
exports.jsonTree = void 0;
var _ = require('lodash');
var jsonTree = /** @class */ (function () {
    function jsonTree() {
    }
    jsonTree.prototype.withoutParentRelations = function (dir) {
        var thisCopy = _.cloneDeep(dir);
        delete thisCopy.parent;
        thisCopy.children.forEach(function (child) {
            delete child.parent;
            if (child.isDirectory()) {
                child.deleteParentRelations();
            }
        });
        return thisCopy;
    };
    jsonTree.prototype.execute = function (dir) {
        return JSON.stringify(this.withoutParentRelations(dir), null, 4);
    };
    return jsonTree;
}());
exports.jsonTree = jsonTree;
//module.exports = jsonTree
//# sourceMappingURL=jsonTree.js.map