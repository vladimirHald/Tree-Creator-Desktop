"use strict";
exports.__esModule = true;
exports.structTree = void 0;
var _ = require('lodash');
var structTree = /** @class */ (function () {
    function structTree() {
    }
    structTree.prototype.getDirContentAsString = function (options, _privateOptions, dir) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (_privateOptions === void 0) { _privateOptions = { dirTree: '' }; }
        dir.children.forEach(function (fsItem) {
            var startSymbol = fsItem.parent.isLastChild(fsItem) ? '└' : '├';
            var levelsWithoutSeparator = _this._getLevelsWithoutSeparator(fsItem);
            var spaces = '';
            for (var i = 0; i < dir.level; i++) {
                var separator = levelsWithoutSeparator.includes(i) ? ' ' : '|';
                spaces += separator + "   ";
            }
            _privateOptions.dirTree += "\n" + spaces + startSymbol + "\u2500\u2500 " + fsItem.name;
            if (fsItem.isDirectory()) {
                _this.getDirContentAsString(options, _privateOptions, fsItem);
            }
        });
        return _privateOptions.dirTree;
    };
    /**
       * @private
       * Resolves levels without separator (|) for fsItem.
       *
       * @param {FsItem} fsItem
       * @return {int[]}
       */
    structTree.prototype._getLevelsWithoutSeparator = function (fsItem) {
        var fsItemCopy = _.cloneDeep(fsItem), // don't broke origin object
        levelsWithoutSeparator = [];
        while (fsItemCopy.hasParent()) {
            if (fsItemCopy.parent.hasParent() && fsItemCopy.parent.parent.isLastChild(fsItemCopy.parent)) {
                levelsWithoutSeparator.push(fsItemCopy.parent.parent.level);
            }
            fsItemCopy = fsItemCopy.parent;
        }
        return levelsWithoutSeparator;
    };
    structTree.prototype.execute = function (dir) {
        return this.getDirContentAsString(undefined, undefined, dir);
    };
    return structTree;
}());
exports.structTree = structTree;
//module.exports = structTree;
//# sourceMappingURL=structTree.js.map