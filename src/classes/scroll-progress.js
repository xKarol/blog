import { Scroll } from "./scroll";

export class ScrollProgress extends Scroll {
  constructor(element) {
    super(element, (percent) => this.#handleScroll(percent));
    this.#create();
    this.element = element;
  }

  #create() {
    const progressElement = document.createElement("div");
    progressElement.classList.add("scroll-progress");
    progressElement.style.transform = `scaleX(0)`;
    document.body.appendChild(progressElement);
    this.progressEl = progressElement;
  }

  #handleScroll(percent) {
    if (percent >= 1) {
      this.progressEl.style.opacity = "0";
    } else {
      this.progressEl.style.transform = `scaleX(${percent})`;
      this.progressEl.style.opacity = "1";
    }
  }
}
