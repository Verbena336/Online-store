import { Create } from "../../helpers/create";
import { App } from "../app/app";

class MasterFilter extends Create {
  masterBtns: Create<HTMLElement>;
  app: App;
  
  constructor(tag = 'div', className = 'aside__master master', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    new Create('h5', 'master__title', this.node, 'Master');
    this.masterBtns = new Create('ul', 'master__list', this.node);
    new Create('li', 'master__item', this.masterBtns.node, 'Jules Gaillard');
    new Create('li', 'master__item', this.masterBtns.node, 'Nicolò Gagliano');
    new Create('li', 'master__item', this.masterBtns.node, 'Peter Hornsteiner');
    new Create('li', 'master__item', this.masterBtns.node, 'Collin-Mézin');
    new Create('li', 'master__item', this.masterBtns.node, 'Neuner & Hornsteiner');
    new Create('li', 'master__item', this.masterBtns.node, 'Jochen Voigt');
    new Create('li', 'master__item', this.masterBtns.node, 'Ado Zani');
    new Create('li', 'master__item', this.masterBtns.node, 'Lorenzo Locatelli');
    new Create('li', 'master__item', this.masterBtns.node, 'Cristiano Perletti');
    new Create('li', 'master__item', this.masterBtns.node, 'Unknown');

    this.masterBtns.node.childNodes.forEach((item) => {
      if (item instanceof HTMLLIElement) {
        if(this.app.storage.master.includes(item.innerText)) item.classList.add('master__item--active');
        item.onclick = (): void => {
          if(item.classList.contains('master__item--active')) {
            item.classList.remove('master__item--active');
          } else {
            item.classList.add('master__item--active');
          }
          this.app.updateFilters('master', item.innerText);
        }
      }
    })
  }
}

export { MasterFilter }