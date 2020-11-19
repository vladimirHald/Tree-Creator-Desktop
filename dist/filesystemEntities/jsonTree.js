var _ = require('lodash');
var treeInterface = require("./treeInterface");
var jsonTree = /** @class */ (function () {
    function jsonTree() {
    }
    jsonTree.prototype.withoutParentRelations = function (dir) {
        var thisCopy = _.cloneDeep(dir);
        delete thisCopy.parent;
        thisCopy.children.forEach(function (child) {
            delete child.parent;
            if (child.isDirectory()) {
                child.deleteParentRelations();
            }
        });
        return thisCopy;
    };
    jsonTree.prototype.execute = function (dir) {
        console.log(JSON.stringify(this.withoutParentRelations(dir)));
    };
    return jsonTree;
}());
module.exports = jsonTree;
//# sourceMappingURL=jsonTree.js.map