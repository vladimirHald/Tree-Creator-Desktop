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
var FsItem = require('./fsItem');
var FileA = /** @class */ (function (_super) {
    __extends(FileA, _super);
    /**
     * @param {string} path Full path to file.
     * @param level
     */
    function FileA(path, level) {
        if (level === void 0) { level = 0; }
        return _super.call(this, path, level) || this;
    }
    return FileA;
}(FsItem));
module.exports = FileA;
//# sourceMappingURL=fileA.js.map