import { Create } from '../../helpers/create';

class Main extends Create {
  aside: Create<HTMLElement>;
  mainContent: Create<HTMLElement>
  constructor(tag = 'main', className = 'main', parent: HTMLElement | null, content = '') {
    super(tag, className, parent, content);
    const mainHeadSection = new Create('section', 'main__heading heading', this.node);
    const headingWrapper = new Create('div', 'heading__wrapper', mainHeadSection.node);
    new Create('h2', 'heading__title', headingWrapper.node, 'Strings');
    const mainWrapper = new Create('div', 'main__wrapper', this.node);
    this.aside = new Create('aside', 'main__aside aside', mainWrapper.node);
    this.mainContent = new Create('section', 'main__content content', mainWrapper.node);
  }
}

export { Main }