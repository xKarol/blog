import { getAcronym } from "../utils/get-acronym";

export class Avatar {
  constructor(data) {
    const { name, src = "", alt = "", rounded = "square" } = data;
    if (!name) throw new Error();
    this.name = name;
    this.src = src;
    this.alt = alt;
    this.rounded = rounded;
    this.#render();
  }

  #render() {
    const avatarContainer = document.createElement("div");
    avatarContainer.className = `avatar ${this.rounded}`;
    if (this.src.length) {
      const avatarImgEl = document.createElement("img");
      avatarImgEl.src = this.src;
      avatarImgEl.alt = this.alt ?? `${this.name} avatar`;
      avatarContainer.appendChild(avatarImgEl);
    } else {
      avatarContainer.innerText = getAcronym(this.name);
    }
    this.html = avatarContainer.outerHTML;
    this.element = avatarContainer;
  }
}
