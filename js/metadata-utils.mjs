import types from './metadata-types.mjs';
import MetadataRepository from './metadata-repository.mjs';

const buildMetadataList = async (rootPath, namesByFolder) => {
  const metadataRepository = new MetadataRepository(rootPath);
  return (await Promise.all(
    Array.from(namesByFolder.entries())
      .map(([folder, names]) => {
        const metadataType = TYPE_NAME_BY_FOLDER[folder];
        return metadataType ? new metadataType(names) : new types.UnSupported(names);
      })
      .map(async metadata => [metadata, ...await metadata.extractMetadataChildren(metadataRepository)])
  )).flat();
};

const TYPE_NAME_BY_FOLDER = {
  classes: types.ApexClass,
  components: types.ApexComponent,
  pages: types.ApexPage,
  triggers: types.ApexTrigger,
  labels: types.CustomLabel,
  objects: types.CustomObject,
  email: types.EmailTemplate,
  flows: types.Flow,
  homePageComponents: types.HomePageComponent,
  layouts: types.Layout,
  reports: types.Report,
  reportTypes: types.ReportType,
  staticresources: types.StaticResource,
  workflows: types.Workflow,
};

export default {
  buildMetadataList
}
