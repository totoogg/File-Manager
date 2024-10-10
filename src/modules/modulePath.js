import { dirname, join, resolve, parse, isAbsolute } from 'node:path';

class WorkWithPath {
  #currentPath = '';
  #rootPath = '';

  setRootPath() {
    this.#rootPath = parse(this.#currentPath).root;
  }

  getPath() {
    return this.#currentPath;
  }

  setPath(path) {
    if (isAbsolute(path)) {
      this.#currentPath = path;
    } else {
      this.#currentPath = join(this.#currentPath, path);
    }
  }

  showPath() {
    console.log(`You are currently in ${this.getPath()}`);
  }
}

export const userPath = new WorkWithPath();
