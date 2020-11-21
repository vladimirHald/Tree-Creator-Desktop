"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.File = void 0;
var fsItem_1 = require("./fsItem");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    /**
     * @param {string} path Full path to file.
     * @param level
     */
    function File(path, level) {
        if (level === void 0) { level = 0; }
        return _super.call(this, path, level) || this;
    }
    return File;
}(fsItem_1.FsItem));
exports.File = File;
//# sourceMappingURL=file.js.map