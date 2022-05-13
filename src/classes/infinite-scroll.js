import debounce from "../utils/debounce";
import { Scroll } from "./scroll";

export class InfiniteScroll extends Scroll {
  constructor(element, callback) {
    super(element, (percent) => this.#handleScroll(percent, callback));
  }

  #handleScroll(percent, callback) {
    console.log(percent);
    if (percent >= 75 / 100) {
      debounce(callback, 500)();
    }
  }
}
