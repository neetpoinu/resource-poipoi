const TAB = '    ';

const toXml = root => {
  const header = '<?xml version="1.0" encoding="UTF-8"?>';
  return header + root.text();
};

class Element {
  #name;
  #attributes;
  #children;
  #depth;
  constructor(name, attributes) {
    this.#name = name;
    this.#attributes = attributes || [];
    this.#children = [];
    this.#depth = 0;
  }
  addElement(element) {
    this.#children.push(element.deep(this.#depth + 1));
  }
  text() {
    let xml = `\r\n${TAB.repeat(this.#depth)}<${this.#name}`;
    this.#attributes.forEach(([key, value]) => {
      xml += ` ${key}="${value}"`;
    });
    xml += '>';
    this.#children.forEach(element => {
      xml += element.text();
    });
    const lastChild = this.lastChild();
    if (lastChild && lastChild.hasChildren()) {
      xml += `\r\n${TAB.repeat(this.#depth)}`;
    }
    xml += `</${this.#name}>`;
    return xml;
  }
  deep(n) {
    this.#depth = n;
    return this;
  }
  hasChildren() {
    return this.#children.length > 0;
  }
  lastChild() {
    return this.hasChildren() ? this.#children[this.#children.length - 1] : null;
  }
}

class TextNode extends Element {
  #text;
  constructor(text) {
    super();
    this.#text = text;
  }
  text() {
    return this.#text;
  }
}

export default {
  toXml,
  Element,
  TextNode
}
