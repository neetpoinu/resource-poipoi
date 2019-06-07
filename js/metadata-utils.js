import * as types from './metadata-types.js';

export const buildMetadataList = async (pathsFromFolder, metadataRepository) => {

  const pathsEntries = Array.from(pathsFromFolder.entries())
    .filter(([folder, paths]) => !FOLDERS_TO_IGNORE.includes(folder));
  const fileByPath = new Map();
  await Promise.all(pathsEntries.flatMap(([folder, paths]) => paths.map(async path => {
    const metadataPath = `${folder}/${path}`;
    const file = await metadataRepository.load(metadataPath);
    file && fileByPath.set(metadataPath, file);
  })));

  return pathsEntries
    .map(([folder, paths]) => {
      const metadataType = TYPE_NAME_BY_FOLDER[folder];
      const resourceEntries = paths.map(path => [path, fileByPath.get(`${folder}/${path}`)]);
      return metadataType ? new metadataType(resourceEntries) : new types.UnSupported(folder, resourceEntries);
    })
    .map(metadata => [metadata, ...metadata.extractMetadataChildren()])
    .flat();
};

const TYPE_NAME_BY_FOLDER = {
  classes: types.ApexClass,
  components: types.ApexComponent,
  pages: types.ApexPage,
  triggers: types.ApexTrigger,
  labels: types.CustomLabel,
  objects: types.CustomObject,
  sites: types.CustomSite,
  tabs: types.CustomTab,
  email: types.EmailTemplate,
  flows: types.Flow,
  homePageComponents: types.HomePageComponent,
  layouts: types.Layout,
  reports: types.Report,
  reportTypes: types.ReportType,
  staticresources: types.StaticResource,
  workflows: types.Workflow,
};

const FOLDERS_TO_IGNORE = [
  'flowDefinitions',
];
