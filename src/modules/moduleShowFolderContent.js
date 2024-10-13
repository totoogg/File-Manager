import fs from 'fs/promises';
import { join } from 'path';
import { userPath } from './modulePath.js';

export async function showFolderContent(path) {
  const arr = await fs.readdir(path);
  const result = arr.map(async (el) => ({
    Name: el,
    Type: (await fs.lstat(join(path, el))).isFile() ? 'file' : 'directory',
  }));
  Promise.all(result).then((res) => {
    const arrFolders = res
      .filter((el) => el.Type === 'directory')
      .sort((a, b) => a.Name.localeCompare(b.Name));
    const arrFiles = res
      .filter((el) => el.Type === 'file')
      .sort((a, b) => a.Name.localeCompare(b.Name));
    console.table([...arrFolders, ...arrFiles]);
    userPath.showPath();
  });
}
