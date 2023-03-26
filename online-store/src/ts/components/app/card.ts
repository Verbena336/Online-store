import { IProduct } from '../../types/types';
import { Create } from '../../helpers/create';
import { App } from './app';
class Card extends Create{
  obj: IProduct;
  addBtn: Create<HTMLButtonElement>;
  app: App;
  id: number;

  constructor(tag = 'div', className = 'box__card card', parent: HTMLElement | null, content = '', obj: IProduct, app: App) {
    super(tag, className, parent, content)
    this.obj = obj;
    this.app = app;
    this.id = obj.id;

    const cardImg = new Create('div', 'card__img', this.node);
    new Create('img', '', cardImg.node, '', [{key: 'src', value: `${obj.img}`}, {key:'alt', value: `${obj.name}`}])
    if(obj.isRare) new Create('img', 'card__rare-icon', cardImg.node, '', [{key: 'src', value: './assets/icons/rare.png'}])
    const cardInfo = new Create('div', 'card__info', this.node);
    const cardName = new Create('div', 'card__name', cardInfo.node);
    new Create('h4', 'card__title', cardName.node, `${obj.name}`);
    new Create('span', 'card__year', cardName.node, `${obj.year}`)
    const addInfo = new Create('div', 'card__add-info', cardInfo.node);
    new Create('span', 'card__master', addInfo.node, `${obj.master}`)
    new Create('div', 'card__color-btn', addInfo.node, '', [{key: 'style', value: `background-color: ${obj.color}`}])
    const moreInfo = new Create('div', 'card__more-info', cardInfo.node);
    new Create('span', 'card__price', moreInfo.node, `€${obj.price}`);
    new Create('span', 'card__size', moreInfo.node, `${obj.size}`);
    this.addBtn = new Create('button', 'card__cart-btn', cardInfo.node, 'Add');

    this.addBtn.node.onclick = (): void => {

      if(!this.app.storage.cart.includes(this.id)) {
        if(this.app.storage.cart.length >= 20) {
          this.app.overlay.node.classList.add('overlay--open');
          this.app.modal.node.classList.add('modal--open');
          this.app.closeModal.node.onclick = (): void => {
            this.app.overlay.node.classList.remove('overlay--open')
            this.app.modal.node.classList.remove('modal--open')
          }
        } else {
          this.addBtn.node.classList.add('card__cart-btn--active');
          this.app.updateCart(this.id);
        }
      } else {
        this.addBtn.node.classList.remove('card__cart-btn--active');
        this.app.updateCart(this.id);
      }
    }
  }
}

export { Card };