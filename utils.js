const electron = require('electron')
const fs = require('fs')
const path = require('path')
const Directory = require('./filesystemEntities/directory');

class Utils {
  /**
   * Check if Electron is running as compiled (packaged) application.
   *
   * @returns {boolean}
   */
  static appIsPackaged() {
    if (typeof electron === 'string') {
      throw new TypeError('Not running in an Electron environment!');
    }

    return (electron.app || electron.remote.app).isPackaged;
  }

  /**
   * TODO <NewEXE> WIP
   *
   * @param dirPath
   * @returns string
   */
  static getDirContentAsString(dirPath) {
    let dir = new Directory(dirPath);

    console.log(
      dir.withoutParentRelations(),

      // TODO NewEXE produces TypeError: Converting circular structure to JSON
      //JSON.stringify(dir.withoutParentRelations())
    );

    return dir.getDirContentAsString();
  }

  static getLastIndex(paths) {
    var filesCountLastIndex = fs.readdirSync(paths).length

    return filesCountLastIndex - 1
  }

  static getDirsCount(paths) {
    var dirsCount = 0;
    fs.readdirSync(paths).forEach(item => {
      if (fs.statSync(paths + path.sep + item).isDirectory()) {
        ++dirsCount
      }
    })
    return dirsCount
  }

  static hasFiles(dirPath) {
    let hasFiles = false;
    fs.readdirSync(dirPath).forEach(item => {
      if (hasFiles) return;
      if (fs.statSync(dirPath + path.sep + item).isFile()) {
        hasFiles = true;
      }
    })
    return hasFiles;
  }
}

module.exports = Utils;