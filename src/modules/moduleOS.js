import { platform, arch, cpus } from 'os';
import { invalidError, operationError } from './moduleError.js';
import { userPath } from './modulePath.js';

export function userOS(command) {
  switch (command.trim().slice(2)) {
    case 'EOL':
      if (platform() === 'win32') {
        console.log('\\r\\n');
      } else {
        console.log('\\n');
      }
      break;
    case 'cpus':
      break;
    case 'homedir':
      break;
    case 'username':
      break;
    case 'architecture':
      break;
    default:
      invalidError();
      break;
  }
  userPath.showPath();
}
