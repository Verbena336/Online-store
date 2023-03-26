import { Create } from "../../helpers/create";
import noUiSlider, { API } from 'nouislider';
import { App } from "../app/app";

class SliderPrice extends Create {
  app: App
  elem: API;
  
  constructor(tag = 'div', className = 'aside__slider second-slider slider', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    new Create('h5', 'slider__title', this.node, 'Price');
    const slider = new Create('div', '', this.node, '', [{key: 'id', value: 'second-slider'}]);
    let range = [1000, 100000];
    if(this.app.storage.priceSlider.length !== 0) range = this.app.storage.priceSlider;
    this.elem = noUiSlider.create(slider.node, {
      start: range,
      connect: true,
      step: 1,
      range: {
          'min': 1000,
          'max': 100000
      },
      tooltips: true,
      format: {
          to: function (val) {
              return val.toFixed();
          },
          from: function (val) {
              return parseInt(val);
          }
      }
  });
  this.elem.on('update', (val) => {
    this.app.updateFilters('priceSlider', val)
})
  }
}

export { SliderPrice }