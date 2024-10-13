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
    const needPath = path.trim();
    if (isAbsolute(needPath)) {
      try {
        await access(needPath);
        this.#currentPath = needPath;
        this.setRootPath();
      } catch {
        operationError();
      }
    } else {
      try {
        const absolutePath = join(this.#currentPath, needPath);
        await access(absolutePath);
        this.#currentPath = absolutePath;
      } catch {
        operationError();
      }
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
