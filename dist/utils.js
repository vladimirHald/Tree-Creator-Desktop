"use strict";
exports.__esModule = true;
exports.Utils = void 0;
var electron = require('electron');
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Check if Electron is running as compiled (packaged) application.
     *
     * @returns {boolean}
     */
    Utils.appIsPackaged = function () {
        if (typeof electron === 'string') {
            throw new TypeError('Not running in an Electron environment!');
        }
        return (electron.app || electron.remote.app).isPackaged;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map