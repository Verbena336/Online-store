import { Create } from "../../helpers/create";
import { App } from "../app/app";

class SizeFilter extends Create {
  sizeBtns: Create<HTMLElement>;
  app: App;
  
  constructor(tag = 'div', className = 'aside__size size', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    new Create('h5', 'size__title', this.node, 'Size');
    this.sizeBtns = new Create('div', 'size__btns btns', this.node);
    new Create('button', 'btns__size-btn', this.sizeBtns.node, '1/4');
    new Create('button', 'btns__size-btn', this.sizeBtns.node, '2/4');
    new Create('button', 'btns__size-btn', this.sizeBtns.node, '3/4');
    new Create('button', 'btns__size-btn', this.sizeBtns.node, '4/4');

    this.sizeBtns.node.childNodes.forEach((item) => {
      if (item instanceof HTMLButtonElement) {
        if(this.app.storage.size.includes(item.innerHTML)) item.classList.add('btns__size-btn--active');
        item.onclick = (): void => {
          if(item.classList.contains('btns__size-btn--active')) {
            item.classList.remove('btns__size-btn--active');
          } else {
            item.classList.add('btns__size-btn--active');
          }
          this.app.updateFilters('size', item.innerHTML)
        }
      }
    })
  }
}

export { SizeFilter }