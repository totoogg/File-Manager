import { userPath } from './modules/modulePath.js';
import { userInfo } from 'os';
import { logging } from './modules/moduleGreetingAndFarewell.js';
import { showFolderContent } from './modules/moduleShowFolderContent.js';
import { invalidError } from './modules/moduleError.js';

const name =
  process.argv[2]?.slice(11) || process.env.npm_config_username || 'Anonyms';

const printName = name[0].toUpperCase() + name.slice(1);

logging.greeting(printName);

userPath.setPath(userInfo().homedir);

process.stdin.on('data', (data) => {
  const command = data.toString().trim().split(' ');
  switch (command[0]) {
    case '.exit':
      process.exit();
      break;
    case 'up':
      userPath.upPath();
      break;
    case 'cd':
      userPath.setRootPath(command[1]);
      break;
    case 'ls':
      showFolderContent(userPath.getPath());
      break;
    case 'cat':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'add':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'rn':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'cp':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'mv':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'rm':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'os':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'hash':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'compress':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    case 'decompress':
      showFolderContent(userPath.getPath());
      userPath.showPath();
      break;
    default:
      invalidError();
      break;
  }
});

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', () => logging.farewell(printName));
