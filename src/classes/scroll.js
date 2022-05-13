export class Scroll {
  constructor(element, handleScrollFunc) {
    if (!element) throw new Error("Set scrolling element in props");
    this.element = element;
    this.handleScrollFunc = handleScrollFunc;
    this.#init();
  }

  #init() {
    window.addEventListener("scroll", () => this.#handleScroll(this));
  }

  #handleScroll(getThis) {
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;

    const elOffset = getThis.element.offsetTop;
    const elHeight = getThis.element.offsetHeight;
    const startPos = scrollTop;
    const scrollPercent =
      startPos <= 0 ? 1 : startPos / (elHeight + elOffset - winHeight);

    getThis.handleScrollFunc(scrollPercent);
  }
}
