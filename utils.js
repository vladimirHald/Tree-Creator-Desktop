const electron = require('electron')

class Utils {
  /**
   * Check if Electron is running as compiled (packaged) application.
   *
   * @returns {boolean}
   */
  static isPackaged() {
    if (typeof electron === 'string') {
      throw new TypeError('Not running in an Electron environment!');
    }

    return (electron.app || electron.remote.app).isPackaged;
  }
}

module.exports = Utils;