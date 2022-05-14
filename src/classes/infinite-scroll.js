// import debounce from "../utils/debounce";

import { Loader } from "./loader";

export class InfiniteScroll {
  constructor(element, func) {
    this.element = element;
    this.func = func;
    this.#create();
    this.#init();
  }

  #init() {
    const options = {
      root: null,
      rootMargin: "200px",
      treshold: 1.0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.func();
          console.log("load");
          // debounce(() => console.log("next"), 3000)();
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    this.observer = observer;
    observer.observe(this.observerElement);
  }

  #create() {
    const observerEl = document.createElement("div");
    observerEl.className = "observer-point";
    this.observerElement = observerEl;
    this.element.appendChild(observerEl);
    new Loader(observerEl);
  }

  delete() {
    this.observerElement.remove();
    this.observer.unobserve(this.observerElement);
  }
}
