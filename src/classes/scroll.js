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
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    // const commentsHeight = getThis.element.clientHeight + 50;
    // const scrollPercent = scrollTop / (docHeight - winHeight - commentsHeight);
    const scrollPercent = scrollTop / (docHeight - winHeight);
    getThis.handleScrollFunc(scrollPercent);
  }
}
