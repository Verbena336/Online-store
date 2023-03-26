import { Create } from '../../helpers/create';
import { App } from './app';

class Header extends Create {
  cartAmount: Create<HTMLElement>;
  app: App;

  constructor(tag = 'header', className = 'header', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    const headerWrapper = new Create('div', 'header__wrapper', this.node);
    const headerLogo = new Create('div', 'header__logo logo', headerWrapper.node);
    const headerLink = new Create('a', 'logo__link', headerLogo.node);
    new Create('h1', 'logo__title', headerLink.node, 'Debussy');
    const headerCart = new Create('div', 'header__cart cart', headerWrapper.node);
    const cartImg = new Create('div', 'cart__img', headerCart.node);
    new Create('img', '', cartImg.node, '', [{key:'src', value: "./assets/icons/cart.png"}, {key: 'alt', value: 'Cart'}])
    this.cartAmount = new Create('span', 'cart__amount', cartImg.node, '');
    this.changeCart(this.app.storage.cart.length);
  }

  changeCart(num: number): void {
    if(num === 0) {
      this.cartAmount.node.style.display = 'none';
    } else {
      this.cartAmount.node.style.display = 'flex';
      this.cartAmount.node.innerHTML = `${num}`;
    }
  }
}

export { Header }