interface IProducts {
  list: Array<IProduct>;
}

interface IProduct {
  id: number,
  img: string,
  name: string,
  instrument: string,
  year: number,
  color: string,
  master: string,
  price: number,
  size: string,
  isRare: boolean
}

type TAttributes = {
  key: string;
  value: string;
}

interface IFilters {
  name: Array<string>;
  color: Array<string>;
  isRare: boolean;
  instrument: Array<string>;
  size: Array<string>;
  master: Array<string>;
  yearSlider: Array<number>;
  priceSlider: Array<number>;
  sort: string | null;
}

export { IProduct, IProducts, TAttributes, IFilters };