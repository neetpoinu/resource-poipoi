import loadConfig from './config-loader.mjs';
import exec from './exec-promise.mjs';
import poidiff from './poidiff.mjs';
import poickage from './poickage.mjs';
import messages from './messages.mjs';

console.log(`${messages.START}\n`);
(async () => {
  const config = loadConfig(process.cwd());
  try {
    const diffResult = await exec(`git diff --name-only ${config.fromCommit} ${config.toCommit}`, { cwd: config.rootPath });
    const metadataList = await poidiff.parse(config.rootPath, diffResult.split('\n'));
    metadataList.sort((a, b) => a.typeName < b.typeName ? -1 : 1);
    poickage.write(metadataList, `${config.outputPath}\\package.xml`, config.packageVersion);

    console.log(messages.SUCCESS);
  } catch(e) {
    console.log(messages.EXCEPTION(e));
    process.exit(1);
  }
})();
