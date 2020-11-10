const path = require('path');
const _ = require('lodash');

class FsItem {
  constructor(path, level) {
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
  isDirectory() {
    return Object.getPrototypeOf(this).constructor.name === 'Directory';
  }

  /**
   * @return {boolean}
   */
  isFile() {
    return Object.getPrototypeOf(this).constructor.name === 'File';
  }

  hasParent() {
    return this.parent !== null;
  }

  /**
   * @private
   * @return string
   */
  _getName() {
    // Get name from the last segment of path.
    return path.parse(this.path).base;
  }

  /**
   * Recognize if fsItem is same (by path equality).
   *
   * @param {FsItem|*} fsItem
   * @return {boolean}
   */
  is(fsItem) {
    return fsItem && _.isObject(fsItem) && this.path === fsItem.path;
  }

  /**
   * Returns copy of FsItem without any parent relation.
   *
   * @return {FsItem}
   */
  

  /**
   * Remove all parent relations.
   */
  deleteParentRelations() {
    delete this.parent;

    this.children.forEach(child => {
      delete child.parent;
      if (child.isDirectory()) {
        child.deleteParentRelations();
      }
    });
  }
}

module.exports = FsItem;