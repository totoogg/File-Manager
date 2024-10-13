import fs from 'fs';
import { access, lstat } from 'fs/promises';
import { join, parse, isAbsolute } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { operationWithFile } from './moduleOperationWithFile.js';
import { userPath } from './modulePath.js';
import { operationError } from './moduleError.js';

export async function userZip(path, method) {
  let arrPath = path.split(' ').filter((el) => el);
  arrPath = operationWithFile.getPathWithSpace(path);
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
        if (method === 'compress') {
          const nameFile = parse(arrPath[0]).base + '.gz';
          await pipeline(
            fs.createReadStream(arrPath[0], 'utf-8'),
            createBrotliCompress(),
            fs.createWriteStream(join(arrPath[1], nameFile))
          );
        }
        if (method === 'decompress') {
          const nameFile = parse(arrPath[0]).name;
          await pipeline(
            fs.createReadStream(arrPath[0]),
            createBrotliDecompress(),
            fs.createWriteStream(join(arrPath[1], nameFile))
          );
        }
      } else {
        throw new Error('Need file');
      }
    } catch (e) {
      operationError();
    }
    userPath.showPath();
  }
}
