import metadataUtils from './metadata-utils.mjs';

const parse = async (rootPath, diffFilePaths) => {
  const namesByFolder = new Map();
  diffFilePaths
    .filter(path => path.startsWith('src/') && path.includes('.'))
    .map(path => path.substring(4, path.lastIndexOf('.')))
    .map(path => path.split('/', 2))
    .forEach(([folder, name]) => {
      const names = namesByFolder.get(folder) || [];
      namesByFolder.set(folder, [...names, name]);
    });

  return await metadataUtils.buildMetadataList(rootPath, namesByFolder);
}

export default {
  parse
};
