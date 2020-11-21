"use strict";
exports.__esModule = true;
exports.listTree = void 0;
var listTree = /** @class */ (function () {
    function listTree() {
    }
    listTree.prototype.getDirContentAsString = function (options, _privateOptions, dir) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (_privateOptions === void 0) { _privateOptions = { dirTree: '' }; }
        dir.children.forEach(function (fsItem) {
            var startSymbol = '-';
            var spaces = '';
            for (var i = 0; i < dir.level; i++) {
                spaces += " ";
            }
            _privateOptions.dirTree += "\n" + spaces + startSymbol + " " + fsItem.name;
            if (fsItem.isDirectory()) {
                _this.getDirContentAsString(options, _privateOptions, fsItem);
            }
        });
        return _privateOptions.dirTree;
    };
    listTree.prototype.execute = function (dir) {
        return this.getDirContentAsString(undefined, undefined, dir);
    };
    return listTree;
}());
exports.listTree = listTree;
//# sourceMappingURL=listTree.js.map