const path = require('path');
const __ = require('lodash');

class FsItem {
  path: any;
  name: any;
  parent: any;
  level: any;
  children: any;
  constructor(path: any, level: any) {
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
  is(fsItem: any) {
    return fsItem && __.isObject(fsItem) && this.path === fsItem.path;
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

    this.children.forEach((child: any) => {
        delete child.parent;
        if (child.isDirectory()) {
          child.deleteParentRelations();
        }
      });
  }
}

module.exports = FsItem;