import { Create } from "../../helpers/create";
import { App } from "../app/app";

class ResetBtn extends Create {
  app: App;
  constructor(tag = 'button', className = 'aside__reset-btn btn', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    this.node.onclick = (): void => {
      this.app.storage.search = '';
      this.app.storage.color = [];
      this.app.storage.isRare = false;
      this.app.storage.instrument = [];
      this.app.storage.size = [];
      this.app.storage.master = [];
      this.app.storage.priceSlider = [1000, 100000];
      this.app.storage.yearSlider = [1700, 2022];
      window.localStorage.setItem('storage', JSON.stringify(this.app.storage));
      this.app.search.inputSearch.node.value = ''
      this.app.color.colorBtns.node.childNodes.forEach((item) => {
        if (item instanceof HTMLButtonElement) {
        item.classList.remove('btns__color-btn--active');
        }
      });
      this.app.rare.checkbox.node.checked = false;
      this.app.instrument.instrBtns.node.childNodes.forEach((item) => {
        if (item instanceof HTMLButtonElement) {
          item.classList.remove('btns__instrument-btn--active');
        }
      });
      this.app.size.sizeBtns.node.childNodes.forEach((item) => {
        if (item instanceof HTMLButtonElement) {
          item.classList.remove('btns__size-btn--active');
        }
      });
      this.app.master.masterBtns.node.childNodes.forEach((item) => {
        if (item instanceof HTMLLIElement) {
          item.classList.remove('master__item--active');
        }
      });
      this.app.yearSlider.elem.set([1700, 2022]);
      this.app.priceSlider.elem.set([1000, 100000])
    }
  }
}

export { ResetBtn }