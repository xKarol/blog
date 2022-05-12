export class Skeleton {
  constructor(element, width = "100%", height = "100%") {
    this.element = element;
    this.width = width;
    this.height = height;
    this.#render();
  }

  #render() {
    const skeletonEl = document.createElement("div");
    skeletonEl.className = "skeleton";
    skeletonEl.style.width = this.width;
    skeletonEl.style.height = this.height;
    this.skeletonEl = skeletonEl;
    this.element.classList.add("skeleton-spacing");
    this.element.prepend(skeletonEl);
  }

  remove() {
    this.skeletonEl.remove();
  }
}
