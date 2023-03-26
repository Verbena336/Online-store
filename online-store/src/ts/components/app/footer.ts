import { Create } from '../../helpers/create';

class Footer extends Create {
  constructor(tag = 'footer', className = 'footer',parent: HTMLElement | null, content = '') {
    super(tag, className, parent, content);
    const footerWrapper = new Create('div', 'footer__wrapper', this.node);
    const footerGhLink = new Create('div', 'footer__link gh-link', footerWrapper.node);
    new Create('span', 'gh-link__year', footerGhLink.node, '©2022');
    const footerGhImg = new Create('a', 'gh-link__link', footerGhLink.node, '', [{key: 'href', value: 'https://github.com/Verbena336'}])
    new Create('img', 'gh-link__img', footerGhImg.node, '', [{key: 'src', value: './assets/icons/github-logo.svg'}, {key: 'alt', value: 'gh-logo'}])
    const footerRsLink = new Create('div', 'footer__link rs-link', footerWrapper.node);
    const footerRsImg = new Create('a', 'rs-link__link', footerRsLink.node, '', [{key: 'href', value: 'https://rs.school/js-stage0/'}]);
    new Create('img', 'rs-link__img', footerRsImg.node, '', [{key: 'src', value: './assets/icons/rss-logo.svg'}, {key:'alt',value:'rs-logo'}]);
  }
}

export { Footer }