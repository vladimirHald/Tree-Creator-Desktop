const JsonTree = require('./jsonTree');
const StructTree = require('./structTree')

let Directory = require('./directory');

class createTree {
    strategy: treeInterface
    setStrategy(strategy: treeInterface) {
        this.strategy = strategy;
    }
    executeStrategy(dir: any) {
        return this.strategy.execute(dir);
    }

     getDirContentAsString(dirPath: any, type: any) {
    
        let dir = new Directory(dirPath);
        if(type == 'tree') {
            this.setStrategy(new StructTree())
            return this.executeStrategy(dir)
        }
        
        else if(type == 'json') {
         this.setStrategy(new JsonTree())
         this.executeStrategy(dir)
          //console.log(
          //  JSON.stringify(new JsonTree().withoutParentRelations(dir))
          //);
          return "See console";
        }
        
    
        
      }
}
module.exports = createTree;
