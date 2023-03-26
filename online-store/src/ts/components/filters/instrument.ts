import { Create } from "../../helpers/create";
import { App } from "../app/app";

class InstrFilter extends Create {
  instrBtns: Create<HTMLElement>;
  app: App
  
  constructor(tag = 'div', className = 'aside__instrument instrument', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    new Create('h5', 'instrument__title', this.node, 'Instrument');
    this.instrBtns = new Create('div', 'instrument__btns btns', this.node);
    new Create('button', 'btns__instrument-btn', this.instrBtns.node, 'Violin');
    new Create('button', 'btns__instrument-btn', this.instrBtns.node, 'Viola');
    new Create('button', 'btns__instrument-btn', this.instrBtns.node, 'Cello');

    this.instrBtns.node.childNodes.forEach((item) => {
      if (item instanceof HTMLButtonElement) {
        if(this.app.storage.instrument.includes(item.innerHTML)) item.classList.add('btns__instrument-btn--active');
        item.onclick = (): void => {
          if(item.classList.contains('btns__instrument-btn--active')) {
            item.classList.remove('btns__instrument-btn--active');
          } else {
            item.classList.add('btns__instrument-btn--active');
          }
          this.app.updateFilters('instrument', item.innerHTML);
        }
      }
    })
  }
}

export { InstrFilter }