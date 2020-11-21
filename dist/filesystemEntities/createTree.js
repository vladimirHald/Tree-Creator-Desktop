"use strict";
exports.__esModule = true;
exports.createTree = void 0;
var jsonTree_1 = require("./jsonTree");
var structTree_1 = require("./structTree");
var directory_1 = require("./directory");
var listTree_1 = require("./listTree");
var createTree = /** @class */ (function () {
    function createTree() {
    }
    createTree.prototype.setBuildMethod = function (buildMethod) {
        this.buildMethod = buildMethod;
    };
    createTree.prototype.buildTree = function (dir) {
        return this.buildMethod.execute(dir);
    };
    createTree.prototype.getDirContentAsString = function (dirPath, type) {
        var dir = new directory_1.Directory(dirPath);
        if (type == 'tree') {
            this.setBuildMethod(new structTree_1.structTree());
            return this.buildTree(dir);
        }
        else if (type == 'listTree') {
            this.setBuildMethod(new listTree_1.listTree());
            return this.buildTree(dir);
        }
        else if (type == 'json') {
            this.setBuildMethod(new jsonTree_1.jsonTree());
            return this.buildTree(dir);
        }
    };
    return createTree;
}());
exports.createTree = createTree;
//# sourceMappingURL=createTree.js.map