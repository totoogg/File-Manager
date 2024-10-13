import { platform, arch, cpus, userInfo } from 'os';
import { invalidError } from './moduleError.js';
import { userPath } from './modulePath.js';

function infoCpus() {
  const infoCpus = cpus();
  console.log('Overall amount of CPUS:', infoCpus.length);
  infoCpus.forEach((el, i) => {
    const model = el.model.trim();
    const speed = el.speed / 1000;
    console.log(
      `${i + 1}) CPU: model - ${model}; speed - ${speed.toFixed(2)} GHz`
    );
  });
}

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
      infoCpus();
      break;
    case 'homedir':
      console.log(userInfo().homedir);
      break;
    case 'username':
      console.log(userInfo().username);
      break;
    case 'architecture':
      console.log(arch());
      break;
    default:
      invalidError();
      break;
  }
  userPath.showPath();
}
