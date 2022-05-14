// import debounce from "../utils/debounce";

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
      rootMargin: "1000px",
      treshold: 1.0,
    };

    let appending = false;
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !appending) {
          appending = true;
          setTimeout(() => {
            appending = false;
            this.func();
          }, 500);
          // debounce(() => console.log("next"), 3000)();
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.observerElement);
  }

  #create() {
    const observerEl = document.createElement("div");
    observerEl.className = "observer-point";
    this.observerElement = observerEl;
    this.element.appendChild(observerEl);
  }
}
