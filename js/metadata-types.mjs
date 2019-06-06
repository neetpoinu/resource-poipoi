import cheerio from 'cheerio';

class Metadata {
  #name;
  #resourceNames;
  constructor(name, resourceNames) {
    this.#name = name;
    this.#resourceNames = resourceNames;
  }
  get typeName() {
    return this.#name;
  }
  get resourceNames() {
    return this.#resourceNames;
  }
  async extractMetadataChildren(metadataRepository) {
    return [];
  }
}

class UnSupported extends Metadata {
  constructor(resourceNames) {
    super('????????', resourceNames);
  }
}

class ApexClass extends Metadata {
  constructor(resourceNames) {
    super('ApexClass', resourceNames);
  }
}
class ApexComponent extends Metadata {
  constructor(resourceNames) {
    super('ApexComponent', resourceNames);
  }
}
class ApexPage extends Metadata {
  constructor(resourceNames) {
    super('ApexPage', resourceNames);
  }
}
class ApexTrigger extends Metadata {
  constructor(resourceNames) {
    super('ApexTrigger', resourceNames);
  }
}
class CustomLabel extends Metadata {
  constructor(resourceNames) {
    super('CustomLabel', resourceNames);
  }
}
class CustomObject extends Metadata {
  constructor(resourceNames) {
    super('CustomObject', resourceNames);
  }
  async extractMetadataChildren(metadataRepository) {
    const fieldNames = [];
    const listViewNames = [];
    const validationNames = [];
    const webLinkNames = [];
    for (let resourceName of this.resourceNames) {
      const xml = await metadataRepository.load(`src/objects/${resourceName}.object`);
      const $ = cheerio.load(xml);
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
    }

    const children = [];
    fieldNames.length > 0 && children.push(new CustomField(fieldNames));
    listViewNames.length > 0 && children.push(new ListView(listViewNames));
    validationNames.length > 0 && children.push(new ValidationRule(validationNames));
    webLinkNames.length > 0 && children.push(new WebLink(webLinkNames));
    return children;
  }
}
class EmailTemplate extends Metadata {
  constructor(resourceNames) {
    super('EmailTemplate', resourceNames);
  }
}
class Flow extends Metadata {
  constructor(resourceNames) {
    super('Flow', resourceNames);
  }
}
class HomePageComponent extends Metadata {
  constructor(resourceNames) {
    super('HomePageComponent', resourceNames);
  }
}
class Layout extends Metadata {
  constructor(resourceNames) {
    super('Layout', resourceNames);
  }
}
class Report extends Metadata {
  constructor(resourceNames) {
    super('Report', resourceNames);
  }
}
class ReportType extends Metadata {
  constructor(resourceNames) {
    super('ReportType', resourceNames);
  }
}
class StaticResource extends Metadata {
  constructor(resourceNames) {
    super('StaticResource', resourceNames);
  }
}
class Workflow extends Metadata {
  constructor(resourceNames) {
    super('Workflow', resourceNames);
  }
}

class CustomField extends Metadata {
  constructor(resourceNames) {
    super('CustomField', resourceNames);
  }
}
class ListView extends Metadata {
  constructor(resourceNames) {
    super('ListView', resourceNames);
  }
}
class ValidationRule extends Metadata {
  constructor(resourceNames) {
    super('ValidationRule', resourceNames);
  }
}
class WebLink extends Metadata {
  constructor(resourceNames) {
    super('WebLink', resourceNames);
  }
}

export default {
  UnSupported,
  ApexClass,
  ApexComponent,
  ApexPage,
  ApexTrigger,
  CustomLabel,
  CustomObject,
  EmailTemplate,
  Flow,
  HomePageComponent,
  Layout,
  Report,
  ReportType,
  StaticResource,
  Workflow
}
