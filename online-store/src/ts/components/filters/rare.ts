import { Create } from "../../helpers/create";
import { App } from "../app/app";

class RareFilter extends Create {
  checkbox: Create<HTMLInputElement>;
  app: App;
  constructor(tag = 'div', className = 'aside__rare rare', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    new Create('h5', 'rare__title', this.node, 'Rare');
    this.checkbox = new Create('input', 'checkbox', this.node, '', [{key:'id', value: 'checkbox'}, {key:'type', value: 'checkbox'}]);
    new Create('label', 'checkbox__label', this.node, '', [{key:'for', value: 'checkbox'}]);
    if (this.app.storage.isRare) {
        this.checkbox.node.checked = true;
      } else {
        this.checkbox.node.checked = false;
    }
    this.checkbox.node.onclick = (): void => {
      this.app.updateFilters('isRare', this.checkbox.node.checked)
    }
  }
}

export { RareFilter }