import { join, parse, isAbsolute } from 'path';
import { access } from 'fs/promises';
import { operationError } from './moduleError.js';

class WorkWithPath {
  #currentPath = '';
  #rootPath = '';

  setRootPath() {
    this.#rootPath = parse(this.#currentPath).root;
  }

  getPath() {
    return this.#currentPath;
  }

  async setPath(path) {
    try {
      await access(path);
      if (isAbsolute(path)) {
        this.#currentPath = path;
        this.setRootPath();
      } else {
        this.#currentPath = join(this.#currentPath, path);
      }
    } catch {
      operationError();
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
