const path = require('path')

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

  /**
   * @private
   * @return string
   */
  _getName() {
    // Get name from the last segment of path.
    return this.path.substring(this.path.lastIndexOf(path.sep) + 1);
  }
}

module.exports = FsItem;