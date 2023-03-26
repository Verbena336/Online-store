import { Create } from "../../helpers/create";
import noUiSlider, { API } from 'nouislider';
import { App } from "../app/app";

class SliderYear extends Create {
  app: App
  elem: API;
  
  constructor(tag = 'div', className = 'aside__slider first-slider slider', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app
    new Create('h5', 'slider__title', this.node, 'Year');
    const slider = new Create('div', '', this.node, '', [{key: 'id', value: 'first-slider'}]);
    let range = [1700, 2022];
    if(this.app.storage.yearSlider !== range) {
      range = this.app.storage.yearSlider;
    }

    this.elem = noUiSlider.create(slider.node, {
      start: range,
      connect: true,
      step: 1,
      range: {
          'min': 1700,
          'max': 2022
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
    this.app.updateFilters('yearSlider', val);
})
  }
}

export { SliderYear }