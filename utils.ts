const electron = require('electron')

export class Utils {
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
  

}

