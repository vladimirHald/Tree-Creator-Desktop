const _ = require('lodash')
class jsonTree {
    withoutParentRelations(dir) {
        let thisCopy = _.cloneDeep(dir);
    
        delete thisCopy.parent;
    
        thisCopy.children.forEach(child => {
          delete child.parent;
          if (child.isDirectory()) {
            child.deleteParentRelations();
          }
        });
    
        return thisCopy;
      }

      
    getJSONTree() {
        return JSON.stringify(this.withoutParentRelations());
    }
}
module.exports = jsonTree
  