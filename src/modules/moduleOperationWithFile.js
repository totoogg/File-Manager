import fs from 'fs';
import { access, writeFile, lstat, rename } from 'fs/promises';
import { join, parse, isAbsolute } from 'path';
import { pipeline } from 'stream/promises';
import { operationError, invalidError } from './moduleError.js';
import { userPath } from './modulePath.js';

class OperationWithFile {
  async cat(path) {
    let needPath = path.trim();
    if (!isAbsolute(needPath)) {
      needPath = join(userPath.getPath(), path);
    }
    try {
      await access(needPath);
      const stat = await lstat(needPath);
      if (stat.isFile()) {
        const readableStream = fs.createReadStream(needPath, 'utf-8');

        let data = '';

        readableStream.on('data', (chunk) => (data += chunk));
        readableStream.on('end', () => {
          console.log(data);
          userPath.showPath();
        });
      } else {
        throw new Error('Need file');
      }
    } catch (e) {
      operationError();
      userPath.showPath();
    }
  }

  async add(path) {
    try {
      const pathNewFile = join(userPath.getPath(), path.trim());
      await writeFile(pathNewFile, '');
    } catch (e) {
      operationError();
    }
    userPath.showPath();
  }

  async rn(path) {
    let arrPath = path.split(' ').filter((el) => el);
    arrPath = this.getPathWithSpace(path);
    if (arrPath) {
      if (!isAbsolute(arrPath[0])) {
        arrPath[0] = join(userPath.getPath(), arrPath[0]);
      }
      try {
        await access(arrPath[0]);
        const stat = await lstat(arrPath[0]);
        if (stat.isFile()) {
          const pathRenameDir = parse(arrPath[0]).dir;
          await rename(arrPath[0], join(pathRenameDir, arrPath[1]));
        } else {
          throw new Error('Need file');
        }
      } catch (e) {
        operationError();
      }
      userPath.showPath();
    }
  }

  async cp(path) {
    let arrPath = path.split(' ').filter((el) => el);
    arrPath = this.getPathWithSpace(path);
    if (arrPath) {
      arrPath = [...arrPath].map((el) => {
        if (!isAbsolute(el)) {
          return join(userPath.getPath(), el);
        }
        return el;
      });
      try {
        await access(arrPath[0]);
        await access(arrPath[1]);
        const stat = await lstat(arrPath[0]);
        if (stat.isFile()) {
          const nameFile = parse(arrPath[0]).base;
          await pipeline(
            fs.createReadStream(arrPath[0], 'utf-8'),
            fs.createWriteStream(join(arrPath[1], nameFile))
          );
        } else {
          throw new Error('Need file');
        }
      } catch (e) {
        operationError();
      }
      userPath.showPath();
    }
  }

  getPathWithSpace(path) {
    const arrPath = path.split(' ').filter((el) => el.trim());
    let result = [...arrPath];
    if (arrPath.length > 2 && !path.includes('"')) {
      console.error(
        `We should wrap with double quotation mark, when give command to application with space! For instance, rn "test test1.txt" "test test.txt"`
      );
      userPath.showPath();
      return;
    }
    if (arrPath.length < 2) {
      invalidError();
      userPath.showPath();
      return;
    }
    if (path.includes('"')) {
      const countQuotation = path.split('').filter((el) => el === '"').length;
      if (countQuotation > 4 || countQuotation % 2 !== 0) {
        invalidError();
        userPath.showPath();
        return;
      }
      const arrPathWithSpace = path
        .match(/((["]).*?\2)/gi)
        .map((el) => el.slice(1, -1))
        .map((el) => el.trim());
      result = [...arrPathWithSpace];
      if (
        arrPathWithSpace[0].trim().length !== arrPathWithSpace[0].length ||
        arrPathWithSpace[0].length === path.length - 2
      ) {
        invalidError();
        userPath.showPath();
        return;
      }
      if (countQuotation === 2) {
        let strPath = '';
        if (path.lastIndexOf('"') === path.length - 1) {
          strPath = path.slice(0, path.indexOf('"')).trim();
          result = [strPath, ...result];
        } else {
          strPath = path.slice(path.lastIndexOf('"') + 1).trim();
          result = [...result, strPath];
        }
      }
    }
    return result;
  }
}

export const operationWithFile = new OperationWithFile();
