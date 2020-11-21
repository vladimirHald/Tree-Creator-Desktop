"use strict";
exports.__esModule = true;
var jsonTree_1 = require("./jsonTree");
var structTree_1 = require("./structTree");
var directory_1 = require("./directory");
var createTree = /** @class */ (function () {
    function createTree() {
    }
    createTree.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    createTree.prototype.executeStrategy = function (dir) {
        return this.strategy.execute(dir);
    };
    createTree.prototype.getDirContentAsString = function (dirPath, type) {
        var dir = new directory_1.Directory(dirPath);
        if (type == 'tree') {
            this.setStrategy(new structTree_1.structTree());
            return this.executeStrategy(dir);
        }
        else if (type == 'json') {
            this.setStrategy(new jsonTree_1.jsonTree());
            this.executeStrategy(dir);
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