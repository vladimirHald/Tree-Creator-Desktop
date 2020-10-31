const electron = require('electron')
const fs = require('fs')
const path = require('path')

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
   * @param options
   * @param _privateOptions
   * @returns string
   */
  static getDirContentAsString(dirPath, options = {}, _privateOptions = { level: 0, dirTree: '' }) {
    if (_privateOptions.level === 0) {
      _privateOptions.dirTree += '.'
    }

    fs.readdirSync(dirPath)
      .map(dirItemName => {
        let dirItemPath = dirPath + path.sep + dirItemName;

        return {
          name: dirItemName,
          path: dirItemPath,
          isDir: fs.lstatSync(dirItemPath).isDirectory()
        };
      })
      .sort((a, b) => b.isDir - a.isDir || a.name > b.name ? 1 : -1)
      .forEach(dirItem => {
        let dirItemPath = dirItem.path;

        let spaces = ' '.repeat(_privateOptions.level * 4);
        _privateOptions.dirTree += `\n${spaces} ├── ${dirItem.name}`

        if (dirItem.isDir) {
          ++_privateOptions.level;
          Utils.getDirContentAsString(dirItemPath, options, _privateOptions);
        }
    });

    return _privateOptions.dirTree;
  }
}

module.exports = Utils;