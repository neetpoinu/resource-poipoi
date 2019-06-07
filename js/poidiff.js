import { buildMetadataList } from './metadata-utils.js';

export const parse = async (diffFilePaths, metadataRepository) => {
  const pathsFromFolder = new Map();
  diffFilePaths
    .map(path => path.substring(4))
    .filter(path => path.includes('/'))
    .map(path => [path, path.indexOf('/')])
    .map(([path, index]) => [path.substring(0, index), path.substring(index + 1)])
    .forEach(([folder, pathFromFolder]) => {
      const paths = pathsFromFolder.get(folder) || [];
      pathsFromFolder.set(folder, [...paths, pathFromFolder]);
    });
  return await buildMetadataList(pathsFromFolder, metadataRepository);
}
