import { Create } from '../../helpers/create';
import { App } from '../app/app';

class ColorFilter extends Create {
  colorBtns: Create<HTMLElement>;
  app: App;
  
  constructor(tag = 'div', className = 'aside__color color', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    new Create('h5', 'color__title', this.node, 'Color');
    this.colorBtns = new Create('div', 'color__btns btns', this.node);
    new Create('button', "btns__color-btn", this.colorBtns.node, '', [{key: 'style', value: 'background-color: rgb(192, 47, 11)'}]);
    new Create('button', "btns__color-btn", this.colorBtns.node, '', [{key: 'style', value: 'background-color: rgb(237, 93, 10)'}]);
    new Create('button', "btns__color-btn", this.colorBtns.node, '', [{key: 'style', value: 'background-color: rgb(139, 91, 37)'}]);
    new Create('button', "btns__color-btn", this.colorBtns.node, '', [{key: 'style', value: 'background-color: rgb(103, 50, 0)'}]);
    

    this.colorBtns.node.childNodes.forEach((item) => {
      if (item instanceof HTMLButtonElement) {
        if(this.app.storage.color.includes(item.style.backgroundColor)) item.classList.add('btns__color-btn--active');
        item.onclick = (): void => {
          if(item.classList.contains('btns__color-btn--active')) {
            item.classList.remove('btns__color-btn--active');
          } else {
            item.classList.add('btns__color-btn--active');
          }
          this.app.updateFilters('color', `${item.style.backgroundColor}`);
        }
      }
    })
  }
}

export { ColorFilter }