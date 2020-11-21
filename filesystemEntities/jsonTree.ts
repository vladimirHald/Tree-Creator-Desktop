

 const _ = require('lodash');

 export class jsonTree implements treeInterface {
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
        return JSON.stringify(this.withoutParentRelations(dir), null, 4);
    }
}
//module.exports = jsonTree
  