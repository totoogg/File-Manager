import { userPath } from './modules/modulePath.js';
import { userInfo } from 'os';
import { logging } from './modules/moduleGreetingAndFarewell.js';
import { showFolderContent } from './modules/moduleShowFolderContent.js';
import { invalidError } from './modules/moduleError.js';
import { operationWithFile } from './modules/moduleOperationWithFile.js';
import { userOS } from './modules/moduleOS.js';
import { userHash } from './modules/moduleHash.js';

const name =
  process.argv[2]?.slice(11) || process.env.npm_config_username || 'Anonyms';

const printName = name[0].toUpperCase() + name.slice(1);

logging.greeting(printName);

userPath.setPath(userInfo().homedir);

process.stdin.on('data', (data) => {
  const command = data.toString().trim();
  switch (command.split(' ')[0]) {
    case '.exit':
      process.exit();
      break;
    case 'up':
      userPath.upPath();
      break;
    case 'cd':
      if (command.length === 2) {
        invalidError();
        userPath.showPath();
      } else {
        userPath.setPath(command.slice(3));
      }
      break;
    case 'ls':
      showFolderContent(userPath.getPath());
      break;
    case 'cat':
      if (command.length === 3) {
        invalidError();
        userPath.showPath();
      } else {
        operationWithFile.cat(command.slice(4));
      }
      break;
    case 'add':
      if (command.length === 3) {
        invalidError();
        userPath.showPath();
      } else {
        operationWithFile.add(command.slice(4));
      }
      break;
    case 'rn':
      if (command.length === 2) {
        invalidError();
        userPath.showPath();
      } else {
        operationWithFile.rn(command.slice(3));
      }
      break;
    case 'cp':
      if (command.length === 2) {
        invalidError();
        userPath.showPath();
      } else {
        operationWithFile.cp(command.slice(3));
      }
      break;
    case 'mv':
      if (command.length === 2) {
        invalidError();
        userPath.showPath();
      } else {
        operationWithFile.mv(command.slice(3));
      }
      break;
    case 'rm':
      if (command.length === 2) {
        invalidError();
        userPath.showPath();
      } else {
        operationWithFile.rm(command.slice(3));
      }
      break;
    case 'os':
      if (command.length === 2) {
        invalidError();
        userPath.showPath();
      } else {
        userOS(command.slice(3));
      }
      break;
    case 'hash':
      if (command.length === 4) {
        invalidError();
        userPath.showPath();
      } else {
        userHash(command.slice(5));
      }
      break;
    case 'compress':
      //
      break;
    case 'decompress':
      //
      break;
    default:
      invalidError();
      userPath.showPath();
      break;
  }
});

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', () => logging.farewell(printName));
