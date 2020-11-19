

const _ = require('lodash');
const treeInterface = require("./treeInterface")
class jsonTree implements treeInterface {
     withoutParentRelations(dir: any) {
        let thisCopy = _.cloneDeep(dir);
    
        delete thisCopy.parent;
    
        thisCopy.children.forEach((child: any) => {
          delete child.parent;
          if (child.isDirectory()) {
            child.deleteParentRelations();
          }
        });
    
        return thisCopy;
      }

      
     execute(dir: any) {
        console.log(JSON.stringify(this.withoutParentRelations(dir)));
    }
}
module.exports = jsonTree
  