import cheerio from 'cheerio';

export class Metadata {
  #name;
  #resourceEntries;
  constructor(resourceEntries, name) {
    this.#name = name ? name : this.constructor.name;
    this.#resourceEntries = resourceEntries;
  }
  get typeName() {
    return this.#name;
  }
  get resourceEntries() {
    return this.#resourceEntries;
  }
  get resourcePaths() {
    return this.#resourceEntries.map(([path, file]) => path);
  }
  get resourceNames() {
    return this.resourcePaths.map(path => path.substring(0, path.lastIndexOf('.')));
  }
  extractMetadataChildren() {
    return [];
  }
}

class ChildMetadata extends Metadata {
  #resourceNames;
  constructor(resourceNames) {
    super([]);
    this.#resourceNames = resourceNames;
  }
  get resourceNames() {
    return this.#resourceNames;
  }
}

export class UnSupported extends Metadata {
  constructor(folder, resourceEntries) {
    super(resourceEntries, `${folder}は対応してないっぽいです。手動でがんばって。`);
  }
}

export class ApexClass extends Metadata {}
export class ApexComponent extends Metadata {}
export class ApexPage extends Metadata {}
export class ApexTrigger extends Metadata {}
export class CustomLabel extends ChildMetadata {
  constructor(resourceEntries) {
    const $ = cheerio.load(resourceEntries[0][1]);
    const labels = [];
    $('labels > fullName').each((i, elem) => {
      labels.push($(elem).text());
    });
    super(labels);
  }
}

export class CustomObject extends Metadata {
  extractMetadataChildren() {
    const fieldNames = [];
    const listViewNames = [];
    const validationNames = [];
    const webLinkNames = [];
    this.resourceEntries.forEach(([path, file]) => {
      const resourceName = path.substring(0, path.lastIndexOf('.'));
      const $ = cheerio.load(file);
      $('fields > fullName').each((i, elem) => {
        fieldNames.push(`${resourceName}.${$(elem).text()}`);
      });
      $('listViews > fullName').each((i, elem) => {
        listViewNames.push(`${resourceName}.${$(elem).text()}`);
      });
      $('validationRules > fullName').each((i, elem) => {
        validationNames.push(`${resourceName}.${$(elem).text()}`);
      });
      $('webLinks > fullName').each((i, elem) => {
        webLinkNames.push(`${resourceName}.${$(elem).text()}`);
      });
    });

    const children = [];
    fieldNames.length > 0 && children.push(new CustomField(fieldNames));
    listViewNames.length > 0 && children.push(new ListView(listViewNames));
    validationNames.length > 0 && children.push(new ValidationRule(validationNames));
    webLinkNames.length > 0 && children.push(new WebLink(webLinkNames));
    return children;
  }
}

export class CustomSite extends Metadata {}
export class CustomTab extends Metadata {}
export class EmailTemplate extends Metadata {}
export class Flow extends Metadata {}
export class HomePageComponent extends Metadata {}
export class Layout extends Metadata {}

export class Report extends Metadata {
  constructor(resourceEntries) {
    const folderNames = resourceEntries
      .filter(([path, file]) => !path.includes('/') && path.endsWith('-meta.xml'))
      .map(([path, file]) => [path.replace('-meta.xml', '.xml'), file]);
    const filePaths = resourceEntries.filter(([path, file]) => path.includes('/'));
    super([...folderNames, ...filePaths].sort());
  }
}

export class ReportType extends Metadata {}
export class StaticResource extends Metadata {}
export class Workflow extends Metadata {}

export class CustomField extends ChildMetadata {}
export class ListView extends ChildMetadata {}
export class ValidationRule extends ChildMetadata {}
export class WebLink extends ChildMetadata {}
