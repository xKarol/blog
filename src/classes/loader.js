export class Loader {
  #loaderEl;

  constructor(element, size = 1.0) {
    if (!element) throw new Error();
    this.element = element;
    this.size = size;
    this.#render();
  }

  #render() {
    const loaderEl = document.createElement("div");
    loaderEl.className = "loader";
    this.#loaderEl = loaderEl;

    const loaderSpanEl = document.createElement("span");
    loaderEl.appendChild(loaderSpanEl);

    this.#changeSize(this.size);
    this.element.prepend(loaderEl);
  }

  #changeSize(size) {
    this.#loaderEl.setAttribute("style", `--size: ${size}`);
  }

  delete() {
    this.#loaderEl.remove();
  }
}
