class FilterStorage {
  color: Array<string>;
  isRare: boolean;
  instrument: Array<string>
  size: Array<string>;
  master: Array<string>
  yearSlider: Array<number>
  priceSlider: Array<number>
  sort: string;
  search: string;
  cart: Array<number>;
  constructor() {
    this.color = [];
    this.isRare = false;
    this.instrument = [];
    this.size = [];
    this.master = [];
    this.yearSlider = [1700, 2022];
    this.priceSlider = [1000, 100000];
    this.sort = 'earlier';
    this.search = '';
    this.cart = [];
  }
}

export { FilterStorage }