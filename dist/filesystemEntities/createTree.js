var JsonTree = require('./jsonTree');
var StructTree = require('./structTree');
var Directory = require('./directory');
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
        var dir = new Directory(dirPath);
        if (type == 'tree') {
            this.setStrategy(new StructTree());
            return this.executeStrategy(dir);
        }
        else if (type == 'json') {
            this.setStrategy(new JsonTree());
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