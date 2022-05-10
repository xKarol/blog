export class Scroll {
  constructor() {
    this.commentsElement = document.querySelector("#post-comments");

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
    const commentsHeight = this.commentsElement.clientHeight + 50;
    const scrollPercent = scrollTop / (docHeight - winHeight - commentsHeight);
    if (scrollPercent >= 1) {
      scrollThis.progressEl.style.opacity = "0";
    } else {
      scrollThis.progressEl.style.transform = `scaleX(${scrollPercent})`;
      scrollThis.progressEl.style.opacity = "1";
    }
  }
}
