const electron = require('electron')
const fs = require('fs')
const path = require('path')
const Directory = require('./filesystemEntities/directory');
const jsonTree = require('./filesystemEntities/jsonTree');
const structTree = require('./filesystemEntities/structTree')

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
  static getDirContentAsString(dirPath, type) {
    let dir = new Directory(dirPath);
    if(type == 'tree')
    return new structTree().getDirContentAsString(undefined,undefined, dir);
    else if(type == 'json') {
      
      console.log(
        JSON.stringify(new jsonTree().withoutParentRelations(dir))
      );
      return "See console"
    }
    

    
  }

}

module.exports = Utils;