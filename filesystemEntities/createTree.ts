
    
        import {jsonTree} from './jsonTree';
        import {structTree} from './structTree';
        import {Directory} from './directory';
        import {listTree} from './listTree';
        
        
        export class createTree {
            buildMethod: treeInterface
            
            setBuildMethod(buildMethod: treeInterface) {
                this.buildMethod = buildMethod;
            }
            buildTree(dir: any) {
                return this.buildMethod.execute(dir);
            }
        
             getDirContentAsString(dirPath: any, type: any) {
            
                let dir = new Directory(dirPath);
                
                if(type == 'tree') {
                    this.setBuildMethod(new structTree())
                    return this.buildTree(dir)
                }
                else if(type == 'listTree') {
                    this.setBuildMethod(new listTree())
                    return this.buildTree(dir)
                }
                
                else if(type == 'json') {
                 this.setBuildMethod(new jsonTree())
                 return this.buildTree(dir)
                  
                  
                }
                
            
                
              }
        }
    
        
    
    
    
    