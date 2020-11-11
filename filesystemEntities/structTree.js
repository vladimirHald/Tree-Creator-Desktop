const _ = require('lodash')
class structTree {
    getDirContentAsString(options = {}, _privateOptions = { dirTree: '' }, dir) {
        dir.children.forEach(fsItem => {
          let startSymbol = fsItem.parent.isLastChild(fsItem) ? '└' : '├';
    
          let levelsWithoutSeparator = this._getLevelsWithoutSeparator(fsItem);
    
          let spaces = '';
          for (let i = 0; i < dir.level; i++) {
            let separator = levelsWithoutSeparator.includes(i) ? ' ' : '|';
            spaces += `${separator}   `;
          }
    
          _privateOptions.dirTree += `\n${spaces}${startSymbol}── ${fsItem.name}`;
    
          if (fsItem.isDirectory()) {
            this.getDirContentAsString(options, _privateOptions, fsItem);
          }
        });
    
        return _privateOptions.dirTree;
      }
  
/**
   * @private
   * Resolves levels without separator (|) for fsItem.
   *
   * @param {FsItem} fsItem
   * @return {int[]}
   */
  _getLevelsWithoutSeparator(fsItem) {
    let
      fsItemCopy = _.cloneDeep(fsItem), // don't broke origin object
      levelsWithoutSeparator = [];

    while (fsItemCopy.hasParent()) {
      if (fsItemCopy.parent.hasParent() && fsItemCopy.parent.parent.isLastChild(fsItemCopy.parent)) {
        levelsWithoutSeparator.push(fsItemCopy.parent.parent.level);
      }

      fsItemCopy = fsItemCopy.parent;
    }

    return levelsWithoutSeparator;
  }
}
module.exports = structTree;