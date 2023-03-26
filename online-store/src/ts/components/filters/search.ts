import { Create } from '../../helpers/create';
import { App } from '../app/app';

class Search extends Create {
  inputSearch: Create<HTMLInputElement>;
  app: App;
  constructor(tag = 'div', className = 'aside__input-search', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app
    this.inputSearch = new Create('input', 'aside__search', this.node, '', [
      {key: 'type', value:'search'},
      {key:'placeholder',value: 'Search'},
      {key:'autocomplete', value:'off'},
      {key:'autofocus', value: 'true'},
      {key: 'id', value: 'outinput'}
    ])
    new Create('label', 'aside__search-label', this.node, 'Search', [{key: 'for', value: 'outinput'}])
    if(this.app.storage.search) this.inputSearch.node.value = this.app.storage.search;
    this.inputSearch.node.oninput = (): void => {
      this.app.updateFilters('search', this.inputSearch.node.value);
    }
  }
}

export {Search};