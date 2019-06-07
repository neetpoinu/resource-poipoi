import fs from 'fs';

export default class MetadataRepository {
  #rootPath;
  #xmls;
  constructor(rootPath) {
    this.#rootPath = rootPath;
    this.#xmls = new Map();
  }
  load(filePath) {
    const absolutePath = `${this.#rootPath}/${filePath}`;
    const xml = this.#xmls.get(absolutePath);
    if (xml) {
      return Promise.resolve(xml);
    }
    return new Promise((resolve, reject) => {
      fs.readFile(absolutePath, 'utf8', (err, text) => {
        if (err) {
          reject(err);
        } else {
          this.#xmls.set(absolutePath, text);
          resolve(text);
        }
      });
    });
  }
}
