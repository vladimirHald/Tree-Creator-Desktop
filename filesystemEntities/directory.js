const FsItem = require('./fsItem.js')
const fs = require('fs')
const path = require('path')
const File = require('./file.js');
const _ = require('lodash');

class Directory extends FsItem {
  /**
   * @param {string} path Full path to directory.
   */
  constructor(path) {
    super(path);

    /**
     * @type {FsItem[]} Contains all files and dirs in directory.
     */
    this.children = [];

    // Resolve and assign files and dirs of directory.
    this._resolveChildren();
  }

  /**
   * @param {FsItem} fsItem
   * @return {boolean}
   */
  isChildExists(fsItem) {
    return !!_.find(this.children, { path: fsItem.path });
  }

  /**
   * @private
   *
   * Resolve and assign children of directory.
   * Each child has link to parent.
   */
  _resolveChildren() {
    fs.readdirSync(this.path)
      .map(dirItemName => {
        let
          dirItemPath = this.path + path.sep + dirItemName,
          stat = fs.lstatSync(dirItemPath),
          fsItem;

        if (stat.isDirectory()) {
          fsItem = new Directory(dirItemPath);
        } else if(stat.isFile()) {
          fsItem = new File(dirItemPath);
        } else {
          // Symlinks, FIFO, sockets and other Filesystem items
          // will be skipped.
          fsItem = null;
        }

        return fsItem;
      })
      .filter(fsItem => fsItem !== null) // Skip of unsupported Filesystem items
      .sort((a, b) => {
        // Directories first.
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        // All items sorted by alphabet.
        return a.name.localeCompare(b.name);
      })
      .forEach((fsItem) => {
        if (fsItem.isDirectory()) {
          fsItem._resolveChildren();
        }

        fsItem.parent = this;
        if (!this.isChildExists(fsItem)) {
          this.children.push(fsItem);
        }
      })
  }
}

module.exports = Directory;