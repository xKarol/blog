import { getAcronym } from "../utils/get-acronym";

export class Avatar {
  constructor({ element, name, src = "", alt = "", rounded = "square" }) {
    if (!element || !name) throw new Error();
    this.element = element;
    this.name = name;
    this.src = src;
    this.alt = alt;
    this.rounded = rounded;
    this.#render();
  }

  #render() {
    const avatarContainer = document.createElement("div");
    avatarContainer.classList = `avatar ${this.rounded}`;
    if (!this.src.length) {
      avatarContainer.innerText = getAcronym(this.name);
    }
    this.element.appendChild(avatarContainer);

    if (this.src.length) {
      const avatar = document.createElement("img");
      avatar.src = this.src;
      avatar.alt = this.alt ?? `${this.name} avatar`;
      avatarContainer.appendChild(avatar);
    }
    return avatarContainer;
  }
}
