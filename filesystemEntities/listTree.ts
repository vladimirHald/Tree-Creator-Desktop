
export class listTree implements treeInterface {
    getDirContentAsString(options = {}, _privateOptions = { dirTree: '' }, dir: any) {
        dir.children.forEach((fsItem: any) => {
          let startSymbol =  '-';
          let spaces = '';
          for (let i = 0; i < dir.level; i++) {
            spaces += `  `;
          }
    
          _privateOptions.dirTree += `\n${spaces}${startSymbol} ${fsItem.name}`;
    
          if (fsItem.isDirectory()) {
            this.getDirContentAsString(options, _privateOptions, fsItem);
          }
        });
    
        return _privateOptions.dirTree;
      }
      execute(dir: any) {
        return this.getDirContentAsString(undefined,undefined, dir)
      }
    }