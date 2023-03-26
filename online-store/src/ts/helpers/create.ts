import { TAttributes } from "../types/types";

class Create<NodeType extends HTMLElement = HTMLElement> {
  node: NodeType;

  constructor(tag = 'div', className = '', parent: HTMLElement | null, content = '', attr?: Array<TAttributes>) {
    const elem = document.createElement(tag);
    if (className) {
      elem.className = className;
    }

    elem.textContent = content;
    
    if (attr) {
      attr.forEach((item) => {
        elem.setAttribute(item.key, item.value);
      })
    }

    if (parent) {
      parent.append(elem);
    }

    this.node = elem as NodeType;
  }
}

export { Create }