import fs from 'fs';
import { toXml, Element, TextNode } from './poixml.js';

export const write = (metadataList, packagePath, packageVersion) => {
  const root = new Element('Package', [['xmlns', 'http://soap.sforce.com/2006/04/metadata']]);
  metadataList.forEach(metadata => {
    const types = new Element('types');
    root.addElement(types);

    metadata.resourceNames
      .filter(resourceName => !resourceName.includes('.') || !resourceName.substring(resourceName.indexOf('.')).endsWith('-meta'))
      .forEach(resourceName => {
        const members = new Element('members');
        members.addElement(new TextNode(resourceName));
        types.addElement(members);
      });
    const name = new Element('name');
    name.addElement(new TextNode(metadata.typeName));
    types.addElement(name);
  });
  const version = new Element('version');
  version.addElement(new TextNode(packageVersion));
  root.addElement(version);

  fs.writeFileSync(packagePath, toXml(root));
};
