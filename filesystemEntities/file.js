const FsItem = require('./fsItem.js')

class File extends FsItem {
  /**
   * @param {string} path Full path to file.
   * @param level
   */
  constructor(path, level = 0) {
    super(path, level);
  }
}

module.exports = File;