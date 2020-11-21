import {FsItem} from './fsItem'

export class File extends FsItem {
  /**
   * @param {string} path Full path to file.
   * @param level
   */
  constructor(path: any, level = 0) {
    super(path, level);
  }
}
