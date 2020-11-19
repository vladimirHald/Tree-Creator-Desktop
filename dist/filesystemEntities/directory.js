"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Directory = void 0;
var FsItem = require('./fsItem.js');
var fs = require('fs');
var path = require('path');
var File = require('./fileA.js');
var _ = require('lodash');
var Directory = /** @class */ (function (_super) {
    __extends(Directory, _super);
    /**
     * @param {string} path Full path to directory.
     * @param level
     */
    function Directory(path, level) {
        if (level === void 0) { level = 0; }
        var _this = _super.call(this, path, level) || this;
        /**
         * @type {FsItem[]} Contains all files and dirs in directory.
         */
        _this.children = [];
        // Resolve and assign files and dirs of directory.
        _this._resolveChildren();
        return _this;
    }
    /**
     * @param {FsItem} fsItem
     * @return {boolean}
     */
    Directory.prototype.isChildExists = function (fsItem) {
        return !!_.find(this.children, { path: fsItem.path });
    };
    /**
     * @param {FsItem} fsItem
     * @return {boolean}
     */
    Directory.prototype.isLastChild = function (fsItem) {
        var lastChild = _.last(this.children);
        return fsItem.is(lastChild);
    };
    /**
     * @param {object} options
     * @param {object} _privateOptions
     * @return {string}
     */
    /**
     * @private
     *
     * Resolve and assign children of directory.
     * Each child has link to parent.
     */
    Directory.prototype._resolveChildren = function () {
        var _this = this;
        fs.readdirSync(this.path)
            .map(function (dirItemName) {
            var dirItemPath = _this.path + path.sep + dirItemName, stat = fs.lstatSync(dirItemPath), fsItem;
            if (stat.isDirectory()) {
                fsItem = new Directory(dirItemPath, _this.level + 1);
            }
            else if (stat.isFile()) {
                fsItem = new File(dirItemPath, _this.level + 1);
            }
            else {
                // Symlinks, FIFO, sockets and other Filesystem items
                // will be skipped.
                fsItem = null;
            }
            return fsItem;
        })
            .filter(function (fsItem) { return fsItem !== null; }) // Skip of unsupported Filesystem items
            .sort(function (a, b) {
            // Directories first.
            if (a.isDirectory() && !b.isDirectory())
                return -1;
            if (!a.isDirectory() && b.isDirectory())
                return 1;
            // All items sorted by alphabet.
            return a.name.localeCompare(b.name);
        })
            .forEach(function (fsItem) {
            if (_this.isChildExists(fsItem))
                return;
            if (fsItem.isDirectory()) {
                fsItem._resolveChildren();
            }
            fsItem.parent = _this;
            _this.children.push(fsItem);
        });
    };
    return Directory;
}(FsItem));
exports.Directory = Directory;
module.exports = Directory;
//# sourceMappingURL=directory.js.map