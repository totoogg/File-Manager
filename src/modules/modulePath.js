import { join, parse, isAbsolute } from 'path';

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
      this.setRootPath();
    } else {
      this.#currentPath = join(this.#currentPath, path);
    }
    this.showPath();
  }

  showPath() {
    console.log(`You are currently in ${this.getPath()}`);
  }

  upPath() {
    if (this.getPath() !== this.#rootPath) {
      this.setPath('..');
    } else {
      this.showPath();
    }
  }
}

export const userPath = new WorkWithPath();
