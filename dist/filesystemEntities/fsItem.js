var path = require('path');
var __ = require('lodash');
var FsItem = /** @class */ (function () {
    function FsItem(path, level) {
        /** @type {string} */
        this.path = path;
        /** @type {string} */
        this.name = this._getName();
        /** @type {null|Directory} */
        this.parent = null;
        /** @type {int} */
        this.level = level;
    }
    /**
     * @return {boolean}
     */
    FsItem.prototype.isDirectory = function () {
        return Object.getPrototypeOf(this).constructor.name === 'Directory';
    };
    /**
     * @return {boolean}
     */
    FsItem.prototype.isFile = function () {
        return Object.getPrototypeOf(this).constructor.name === 'File';
    };
    FsItem.prototype.hasParent = function () {
        return this.parent !== null;
    };
    /**
     * @private
     * @return string
     */
    FsItem.prototype._getName = function () {
        // Get name from the last segment of path.
        return path.parse(this.path).base;
    };
    /**
     * Recognize if fsItem is same (by path equality).
     *
     * @param {FsItem|*} fsItem
     * @return {boolean}
     */
    FsItem.prototype.is = function (fsItem) {
        return fsItem && __.isObject(fsItem) && this.path === fsItem.path;
    };
    /**
     * Returns copy of FsItem without any parent relation.
     *
     * @return {FsItem}
     */
    /**
     * Remove all parent relations.
     */
    FsItem.prototype.deleteParentRelations = function () {
        delete this.parent;
        this.children.forEach(function (child) {
            delete child.parent;
            if (child.isDirectory()) {
                child.deleteParentRelations();
            }
        });
    };
    return FsItem;
}());
module.exports = FsItem;
//# sourceMappingURL=fsItem.js.map