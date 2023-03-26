import { Create } from "../../helpers/create";
import { FilterStorage } from "../../helpers/filtersClass";
import { App } from "../app/app";

class HardResetBtn extends Create {
  app: App;
  constructor(tag = 'button', className = 'aside__hard-reset btn', parent: HTMLElement | null, content = '', app: App) {
    super(tag, className, parent, content);
    this.app = app;
    this.node.onclick = (): void => {
      this.app.storage = new FilterStorage();
      window.localStorage.setItem('storage', JSON.stringify(this.app.storage));
      window.location.reload();
    }
  }
}

export { HardResetBtn }