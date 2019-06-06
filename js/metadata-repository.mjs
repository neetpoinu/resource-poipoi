import fs from 'fs';

export default class {
  #rootPath;
  constructor(rootPath) {
    this.#rootPath = rootPath;
  }
  load(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${this.#rootPath}\\${filePath}`, 'utf8', (err, text) => {
        err ? reject(err) : resolve(text);
      });
    });
  }
}
