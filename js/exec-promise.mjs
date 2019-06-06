import childProcess from 'child_process';

export default (command, options) => new Promise((resolve, reject) => {
  childProcess.exec(command, options, (error, stdout, stderr) => {
    error ? reject(error) : resolve(stdout);
  });
});
