import loadConfig from './config-loader.js';
import exec from './exec-promise.js';
import { outputFiles } from './poiarchive.js';
import { parse } from './poidiff.js';
import { write } from './poickage.js';
import * as messages from './messages.js';
import MetadataRepository from './metadata-repository.js';

const parseDiffText = diffText => diffText.replace(/\r/g, '').split('\n')
  .filter(path => path.startsWith('src/') && path.includes('.'));
const outputPackage = async (diffFilePaths, outputDirectory, outputPath, packageVersion) => {
  const metadataRepository = new MetadataRepository(outputDirectory);
  const metadataList = await parse(diffFilePaths, metadataRepository);
  metadataList.sort((a, b) => a.typeName < b.typeName ? -1 : 1);
  write(metadataList, outputPath, packageVersion);
};

(async () => {
  const config = loadConfig(process.cwd());
  try {
    const diffResult = await exec(`git diff --name-only --diff-filter=d ${config.fromCommit} ${config.toCommit}`, { cwd: config.rootPath });
    const diffFilePaths = parseDiffText(diffResult);
    const outputFilesErrors = await outputFiles(config.rootPath, diffFilePaths, config.toCommit, config.outputPath);
    await outputPackage(diffFilePaths, config.outputPath, `${config.outputPath}/package.xml`, config.packageVersion);

    if (outputFilesErrors.length > 0) {
      console.log(messages.OUTPUT_PARTLY_FAILED(outputFilesErrors.map(e => e.sourceFilePath)));
    }
    console.log(messages.SUCCESS);
  } catch(e) {
    console.log(messages.EXCEPTION(e));
    process.exit(1);
  }
})();
