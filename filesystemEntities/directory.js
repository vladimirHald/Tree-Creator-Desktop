const FsItem = require('./fsItem.js')
const fs = require('fs')
const path = require('path')
const File = require('./file.js');
const _ = require('lodash');

class Directory extends FsItem {
  /**
   * @param {string} path Full path to directory.
   * @param level
   */
  constructor(path, level = 0) {
    super(path, level);

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
   * @param {FsItem} fsItem
   * @return {boolean}
   */
  isLastChild(fsItem) {
    let lastChild = _.last(this.children);
    return fsItem.is(lastChild);
  }

  /**
   * @param {object} options
   * @param {object} _privateOptions
   * @return {string}
   */
  getDirContentAsString(options = {}, _privateOptions = { dirTree: '' }) {
    this.children.forEach(fsItem => {
      let startSymbol = fsItem.parent.isLastChild(fsItem) ? '└' : '├';

      let levelsWithoutSeparator = this._getLevelsWithoutSeparator(fsItem);

      let spaces = '';
      for (let i = 0; i < this.level; i++) {
        let separator = levelsWithoutSeparator.includes(i) ? ' ' : '|';
        spaces += `${separator}   `;
      }

      _privateOptions.dirTree += `\n${spaces}${startSymbol}── ${fsItem.name}`;

      if (fsItem.isDirectory()) {
        fsItem.getDirContentAsString(options, _privateOptions);
      }
    });

    return _privateOptions.dirTree;
  }

  /**
   * @private
   * Resolves levels without separator (|) for fsItem.
   *
   * @param {FsItem} fsItem
   * @return {int[]}
   */
  _getLevelsWithoutSeparator(fsItem) {
    let
      fsItemCopy = _.cloneDeep(fsItem), // don't broke origin object
      levelsWithoutSeparator = [];

    while (fsItemCopy.hasParent()) {
      if (fsItemCopy.parent.hasParent() && fsItemCopy.parent.parent.isLastChild(fsItemCopy.parent)) {
        levelsWithoutSeparator.push(fsItemCopy.parent.parent.level);
      }

      fsItemCopy = fsItemCopy.parent;
    }

    return levelsWithoutSeparator;
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
          fsItem = new Directory(dirItemPath, this.level+1);
        } else if(stat.isFile()) {
          fsItem = new File(dirItemPath, this.level+1);
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
      .forEach(fsItem => {
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