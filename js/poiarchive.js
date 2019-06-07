import fs from 'fs';
import exec from './exec-promise.js';

const foldersHavingMetaXml = [
  'classes',
  'components',
  'pages',
  'triggers',
  'staticresources',
];

export const outputFiles = async (rootPath, diffFilePaths, targetCommit, outputDirectory) => {
  const metaXmlPaths = diffFilePaths
    .filter(path => !path.endsWith('-meta.xml'))
    .filter(path => foldersHavingMetaXml.some(folder => path.includes(`/${folder}/`)))
    .map(path => `${path}-meta.xml`);
  const sourcePaths = [...diffFilePaths.filter(path => !path.includes('/package.xml')), ...metaXmlPaths]
    .filter((e, i, array) => array.indexOf(e) === i)
    .sort();
  const paths = sourcePaths
    .map(source => [source, source.replace('src/', `${outputDirectory}/`)]);
  const folders = paths
    .map(([source, target]) => target.substring(target.indexOf('/') + 1, target.lastIndexOf('/')))
    .filter((e, i, array) => array.indexOf(e) === i)
    .forEach(folderName => fs.mkdirSync(`${outputDirectory}/${folderName}`, { recursive: true }));

  const errors = [];
  for (const [source, target] of paths) {
    try {
      await exec(`git show ${targetCommit}:"${source}" > "${target}"`, { cwd: rootPath });
    } catch(e) {
      errors.push({
        sourceFilePath: source,
        targetFilePath: target,
        error: e,
      });
    }
  }
  return errors;
};
