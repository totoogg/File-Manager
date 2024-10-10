import fs from 'fs/promises';

export async function showFolderContent(path) {
  const arr = await fs.readdir(path);
  const result = arr.map(async (el) => ({
    Name: el,
    Type: (await fs.lstat(join(path, el))).isFile()
      ? 'file'
      : 'directory',
  }));
  Promise.all(result).then((res) =>
    console.table(res.sort((a, b) => a.Type.localeCompare(b.Type)))
  );
}
