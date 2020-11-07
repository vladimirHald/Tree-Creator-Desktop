const FsItem = require('./fsItem.js')

class File extends FsItem {
  /**
   * @param {string} path Full path to file.
   */
  constructor(path) {
    super(path);
  }
}

module.exports = File;