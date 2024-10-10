import fs from 'fs/promises';
import { dirname, join, resolve, parse, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { userPath } from './modules/modulePath.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const name =
  process.argv[2]?.slice(11) || process.env.npm_config_username || 'Anonyms';
const printName = name[0].toUpperCase() + name.slice(1);

console.log(`Welcome to the File Manager, ${printName}!`);

userPath.setPath(dirname(fileURLToPath(import.meta.url)));
userPath.showPath();

userPath.setRootPath();

console.log(userPath.getPath());

const arr = await fs.readdir(join(__dirname));
const result = arr.map(async (el) => ({
  Name: el,
  Type: (await fs.lstat(join(__dirname, el))).isFile() ? 'file' : 'directory',
}));
Promise.all(result).then((res) =>
  console.table(res.sort((a, b) => a.Type.localeCompare(b.Type)))
);

process.stdin.on('data', (data) => {
  if (data.toString().trim() === '.exit') process.exit();
  console.log(data.toString().trim());
});

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', () =>
  process.stdout.write(
    `Thank you for using File Manager, ${printName}, goodbye!\n`
  )
);
