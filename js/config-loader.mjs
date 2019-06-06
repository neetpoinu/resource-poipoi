import path from 'path';
import setting from '../config/設定.js';

const rootPath = setting.custom.rootPath || setting.default.rootPath;
const outputPath = setting.custom.outputPath || setting.default.outputPath;
const fromCommit = setting.custom.fromCommit || setting.default.fromCommit;
const toCommit = setting.custom.toCommit || setting.default.toCommit;
const packageVersion = setting.custom.packageVersion || setting.default.packageVersion;

export default applicationRootPath => ({
  rootPath: path.resolve(applicationRootPath, rootPath),
  outputPath: path.resolve(applicationRootPath, outputPath),
  fromCommit,
  toCommit,
  packageVersion
});
