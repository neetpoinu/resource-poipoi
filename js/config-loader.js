import path from 'path';
import { defaultSetting, customSetting } from '../config/設定.js';

const rootPath = customSetting.rootPath || defaultSetting.rootPath;
const outputPath = customSetting.outputPath || defaultSetting.outputPath;
const fromCommit = customSetting.fromCommit || defaultSetting.fromCommit;
const toCommit = customSetting.toCommit || defaultSetting.toCommit;
const packageVersion = customSetting.packageVersion || defaultSetting.packageVersion;

export default applicationRootPath => ({
  rootPath: path.resolve(applicationRootPath, rootPath),
  outputPath: path.resolve(applicationRootPath, outputPath),
  fromCommit,
  toCommit,
  packageVersion
});
