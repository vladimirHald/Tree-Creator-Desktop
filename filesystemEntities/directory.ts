
  import {FsItem} from './fsItem.js'
  import {File} from './file.js'
  const fs = require('fs')
  const path = require('path')
  const _ = require('lodash');
  
  
  export class Directory extends FsItem {
    /**
     * @param {string} path Full path to directory.
     * @param level
     */
    constructor(path: any, level = 0) {
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
    isChildExists(fsItem: any) {
      return !!_.find(this.children, { path: fsItem.path });
    }
  
    /**
     * @param {FsItem} fsItem
     * @return {boolean}
     */
    isLastChild(fsItem: any) {
      let lastChild = _.last(this.children);
      return fsItem.is(lastChild);
    }
  
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
    _resolveChildren() {
      fs.readdirSync(this.path)
        .map((dirItemName: any) => {
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
        .filter((fsItem: any) => fsItem !== null) // Skip of unsupported Filesystem items
        .sort((a: any, b: any) => {
          // Directories first.
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          // All items sorted by alphabet.
          return a.name.localeCompare(b.name);
        })
        .forEach((fsItem: any) => {
          if (this.isChildExists(fsItem)) return;
  
          if (fsItem.isDirectory()) {
            fsItem._resolveChildren();
          }
  
          fsItem.parent = this;
          this.children.push(fsItem);
        })
    }
  }

