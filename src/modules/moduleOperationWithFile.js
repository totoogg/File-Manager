import fs from 'fs';
import { access, writeFile } from 'fs/promises';
import { join } from 'path';
import { operationError } from './moduleError.js';
import { userPath } from './modulePath.js';

class OperationWithFile {
  async cat(path) {
    try {
      await access(path);
      const readableStream = fs.createReadStream(path, 'utf-8');

      let data = '';

      readableStream.on('data', (chunk) => (data += chunk));
      readableStream.on('end', () => {
        console.log(data);
        userPath.showPath();
      });
    } catch (e) {
      operationError();
      userPath.showPath();
    }
  }

  async add(path) {
    try {
      const pathNewFile = join(userPath.getPath(), path);
      console.log(pathNewFile);
      await writeFile(pathNewFile, '');
    } catch (e) {
      operationError();
    }
    userPath.showPath();
  }
}

export const operationWithFile = new OperationWithFile();
