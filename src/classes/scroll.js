export class Scroll {
  constructor() {
    this.#create();
    this.#init();
  }

  #create() {
    const progressElement = document.createElement("div");
    progressElement.classList.add("scroll-progress");
    progressElement.style.transform = `scaleX(0)`;
    document.body.appendChild(progressElement);
    this.progressEl = progressElement;
  }

  #init() {
    window.addEventListener("scroll", () => this.#handleScroll(this));
  }

  #handleScroll(scrollThis) {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    scrollThis.progressEl.style.transform = `scaleX(${scrollPercent})`;
  }
}
