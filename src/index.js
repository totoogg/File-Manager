import { userPath } from './modules/modulePath.js';
import { userInfo } from 'os';
import { logging } from './modules/moduleGreetingAndFarewell.js';
import { showFolderContent } from './modules/moduleShowFolderContent.js';

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
      userPath.setRootPath(command);
      break;
    case 'ls':
      showFolderContent(userPath.getPath());
      break;

    default:
      console.log(data.toString().trim());
      break;
  }
});

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', () => logging.farewell(printName));
