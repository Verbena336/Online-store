import { Header } from './header';
import { Footer } from './footer';
import { Main } from './main';
import { Create } from '../../helpers/create';
import { HeadingContent } from '@src/ts/components/filters/select';
import { SizeFilter } from '@src/ts/components/filters/size';
import { ColorFilter } from '@src/ts/components/filters/color';
import { Search } from '@src/ts/components/filters/search';
import { InstrFilter } from '@src/ts/components/filters/instrument';
import { RareFilter } from '@src/ts/components/filters/rare';
import { MasterFilter } from '@src/ts/components/filters/master';
import { SliderYear } from '@src/ts/components/filters/yearSlider';
import { SliderPrice } from '@src/ts/components/filters/priceSlider';
import { ResetBtn } from '@src/ts/components/filters/resetBtn';
import products from '../../products/products.json'
import { IProduct } from '@src/ts/types/types';
import { Card } from './card';
import { FilterStorage } from '../../helpers/filtersClass';
import { HardResetBtn } from '../filters/hardReset';


class App {

  header: Header;
  main: Main;
  footer: Footer;

  overlay: Create<HTMLDivElement>;
  modal: Create<HTMLDataElement>;
  closeModal: Create<HTMLElement>;

  headingContent: HeadingContent;
  cardBox: Create<HTMLElement>;

  storage: FilterStorage;

  size: SizeFilter;
  color: ColorFilter;
  search: Search;
  instrument: InstrFilter;
  rare: RareFilter;
  master: MasterFilter;
  yearSlider: SliderYear;
  priceSlider: SliderPrice;
  resetBtn: ResetBtn;
  hardResetBtn: HardResetBtn;

  filterProducts: Array<IProduct> = [];

  constructor() {
    this.storage = JSON.parse(window.localStorage.getItem('storage') as string) || new FilterStorage()
    
    this.overlay = new Create('div', 'overlay', document.body, '');
    this.modal = new Create('div', 'modal', document.body, '');
    new Create('p', 'modal__text', this.modal.node, 'Sorry, no more slots for products');
    this.closeModal = new Create('button', 'modal__close-btn', this.modal.node, 'Ok:(');
    
    this.header = new Header('header', 'header', document.body, '', this);
    this.main = new Main('main', 'main', document.body);
    this.footer = new Footer('footer', 'footer', document.body);
    
    this.headingContent = new HeadingContent('div', 'content__heading', this.main.mainContent.node, '', 20, this);
    this.cardBox = new Create('div', 'content__box box', this.main.mainContent.node);

    this.search = new Search('div', 'aside__input-search', this.main.aside.node, '', this);
    this.color = new ColorFilter('div', 'aside__color color', this.main.aside.node, '', this);
    this.rare = new RareFilter('div', 'aside__rare rare', this.main.aside.node, '', this);
    this.instrument = new InstrFilter('div','aside__instrument instrument', this.main.aside.node,'', this);
    this.size = new SizeFilter('div', 'aside__size size',  this.main.aside.node, '', this);
    this.master = new MasterFilter('div', 'aside__master master', this.main.aside.node, '', this);
    this.yearSlider = new SliderYear('div', 'aside__slider first-slider slider', this.main.aside.node, '', this);
    this.priceSlider = new SliderPrice('div', 'aside__slider second-slider slider', this.main.aside.node, '', this);
    this.resetBtn = new ResetBtn('button', 'aside__reset-btn btn', this.main.aside.node, 'Reset Filters', this)
    this.hardResetBtn = new HardResetBtn('button', 'aside__hard-reset btn', this.main.aside.node, 'Hard Reset', this);
    this.filterProductsArray(products);
  }

  renderCards(filtProducts: Array<IProduct>): void {
    this.cardBox.node.innerHTML = '';

    if(filtProducts.length === 0) {
      new Create('p', 'box__no-cards', this.cardBox.node, 'Sorry, no products for this filters :(')
    }
    
    if(this.storage.cart.length === 0) {
      for(const item of filtProducts) {
        new Card('div','box__card card', this.cardBox.node, '', item, this);
      }
    } else {
      for(const item of filtProducts) {
        const card = new Card('div','box__card card', this.cardBox.node, '', item, this);
        if(this.storage.cart.includes(item.id)) {
          card.addBtn.node.classList.add('card__cart-btn--active')
        }
      }
    }
    this.headingContent.changeAmount(filtProducts.length);
  }
    

  filterProductsArray (unfiltProducts: Array<IProduct>): void {
    this.filterProducts = [];
    
    unfiltProducts.forEach((item) => {
      if ((this.storage.isRare === false || this.storage.isRare === item.isRare) &&
      (this.storage.color.length === 0 || this.storage.color.includes(item.color)) &&
      (this.storage.instrument.length === 0 || this.storage.instrument.includes(item.instrument)) &&
      (this.storage.size.length === 0 || this.storage.size.includes(item.size)) &&
      (this.storage.master.length === 0 || this.storage.master.includes(item.master)) &&
      (this.storage.priceSlider[0] <= item.price) &&
      (this.storage.priceSlider[1] >= item.price) &&
      (this.storage.yearSlider[0] <= item.year) &&
      (this.storage.yearSlider[1] >= item.year) &&
      (item.name.toLowerCase().includes(this.storage.search.toLowerCase()))) {
        this.filterProducts.push(item);
      }
    })
    this.sortCards(this.storage.sort);
  }

  sortCards(sort: string): void {
    switch(sort) {
      case 'earlier': this.filterProducts = this.filterProducts.sort((a,b) => a.year - b.year);
      break;
      case 'later': this.filterProducts = this.filterProducts.sort((a,b) => b.year - a.year);
      break;
      case 'a': this.filterProducts = this.filterProducts.sort((a,b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0
      })
      break;
      case 'z': this.filterProducts = this.filterProducts.sort((a,b) => {
        if(a.name < b.name) return 1;
        if(a.name > b.name) return -1;
        return 0
      })
      break;
    }
    this.renderCards(this.filterProducts);
  }

  updateCart(val: number): void {
    if(this.storage.cart.includes(val as number)) {
      this.storage.cart = this.storage.cart.filter((item) => item !== val)
      window.localStorage.setItem('storage', JSON.stringify(this.storage))
    } else {
      if(this.storage.cart.length >= 20) return;
      this.storage.cart.push(val)
      window.localStorage.setItem('storage', JSON.stringify(this.storage))
    }
    this.header.changeCart(this.storage.cart.length);
  }


  updateFilters(key: string, val: string | boolean | (number | string)[]): void {

    switch(key) {
      case 'color': if(this.storage.color.includes(val as string)) {
        this.storage.color = this.storage.color.filter((item) => item !== val);
      } else {
        this.storage.color.push(val as string);
      }
      break;
      case 'isRare': this.storage.isRare = val as boolean;
      break;
      case 'instrument': if(this.storage.instrument.includes(val as string)) {
        this.storage.instrument = this.storage.instrument.filter((item) => item !== val)
      } else {
        this.storage.instrument.push(val as string)
      }
      break;
      case 'size': if(this.storage.size.includes(val as string)) {
        this.storage.size = this.storage.size.filter((item) => item !== val)
      } else {
        this.storage.size.push(val as string)
      }
      break;
      case 'master': if(this.storage.master.includes(val as string)) {
        this.storage.master = this.storage.master.filter((item) => item !== val)
      } else {
        this.storage.master.push(val as string)
      }
      break;
      case 'yearSlider': this.storage.yearSlider = val as (number)[];
      break;
      case 'priceSlider': this.storage.priceSlider = val as (number)[];
      break;
      case 'sort': this.storage.sort = val as string;
      break;
      case 'search': this.storage.search = val as string;
      break;
    }

    window.localStorage.setItem('storage', JSON.stringify(this.storage))
    
    this.filterProductsArray(products);
  }
}

export { App }