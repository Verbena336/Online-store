import { Create } from "../../helpers/create";
import { App } from "../app/app";

class HeadingContent extends Create {
  contentAmount: Create<HTMLElement>;
  select: Create<HTMLSelectElement>;
  app: App;
  constructor(tag = 'div', className = 'content__heading', parent: HTMLElement | null, content = '', amount: number, app: App) {
    super(tag, className, parent, content);
    this.app = app
    this.contentAmount = new Create('span', 'content__amount', this.node)
    this.changeAmount(amount)
    new Create('hr', 'content__line', this.node)
    this.select = new Create('select', 'content__select', this.node)
    new Create('option', '', this.select.node, 'Earlier', [{key: 'value', value: 'earlier'}]);
    new Create('option', '', this.select.node, 'Later', [{key: 'value', value: 'later'}]);
    new Create('option', '', this.select.node, 'A - Z', [{key: 'value', value: 'a'}]);
    new Create('option', '', this.select.node, 'Z - A', [{key: 'value', value: 'z'}]);

    this.select.node.childNodes.forEach((item) => {
      if (item instanceof HTMLOptionElement) {
        if(this.app.storage.sort === item.value) {
          item.setAttribute('selected', 'selected')
        }
      }
    });
    this.select.node.oninput = (): void => {
      this.app.updateFilters('sort', this.select.node.value)
    }
  }

  changeAmount(num: number): void {
    this.contentAmount.node.innerHTML = `${num} Products`;
  }
}

export {HeadingContent}