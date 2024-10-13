import crypto from 'crypto';
import { createReadStream } from 'fs';
import { access, lstat} from 'fs/promises';
import { join, isAbsolute } from 'path';
import { operationError } from './moduleError.js';
import { userPath } from './modulePath.js';

export async function userHash(path) {
  const hash = crypto.createHash('sha256');
  let needPath = path.trim();
  if (!isAbsolute(needPath)) {
    needPath = join(userPath.getPath(), path);
  }
  try {
    await access(needPath);
    const stat = await lstat(needPath);
    if (stat.isFile()) {
      const readableStream = createReadStream(needPath);
      readableStream.on('readable', () => {
        const data = readableStream.read();
        if (data) {
          hash.update(data);
        } else {
          console.log(hash.digest('hex'));
          userPath.showPath();
        }
      });
    } else {
      throw new Error('Need file');
    }
  } catch (e) {
    operationError();
    userPath.showPath();
  }
}
