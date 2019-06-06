import fs from 'fs';
import poixml from './poixml.mjs';

const write = (metadataList, packagePath, packageVersion) => {
  const root = new poixml.Element('Package', [['xmlns', 'http://soap.sforce.com/2006/04/metadata']]);
  metadataList.forEach(metadata => {
    const types = new poixml.Element('types');
    root.addElement(types);

    metadata.resourceNames.forEach(resourceName => {
      const members = new poixml.Element('members');
      members.addElement(new poixml.TextNode(resourceName));
      types.addElement(members);
    });
    const name = new poixml.Element('name');
    name.addElement(new poixml.TextNode(metadata.typeName));
    types.addElement(name);
  });
  const version = new poixml.Element('version');
  version.addElement(new poixml.TextNode(packageVersion));
  root.addElement(version);

  fs.writeFileSync(packagePath, poixml.toXml(root));
};

export default {
  write
}
