let fsItem = require('./fsItem')

class FileA extends fsItem {
  /**
   * @param {string} path Full path to file.
   * @param level
   */
  constructor(path: any, level = 0) {
    super(path, level);
  }
}

module.exports = FileA;