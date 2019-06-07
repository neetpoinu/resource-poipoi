import { exec } from 'child_process';

export default (command, options) => new Promise((resolve, reject) => {
  exec(command, options, (error, stdout, stderr) => {
    error ? reject(error) : resolve(stdout);
  });
});
