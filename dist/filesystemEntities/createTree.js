"use strict";
exports.__esModule = true;
var jsonTree_1 = require("./jsonTree");
var structTree_1 = require("./structTree");
var directory_1 = require("./directory");
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
        else if (type == 'json') {
            this.setBuildMethod(new jsonTree_1.jsonTree());
            this.buildTree(dir);
            //console.log(
            //  JSON.stringify(new JsonTree().withoutParentRelations(dir))
            //);
            return "See console";
        }
    };
    return createTree;
}());
module.exports = createTree;
//# sourceMappingURL=createTree.js.map