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
    this.html = `
      <div class="avatar ${this.rounded}">
        ${
          this.src.length
            ? `<img src="${this.src}" alt="${
                this.alt ?? `${this.name} avatar`
              }"/>`
            : getAcronym(this.name)
        }
      </div>
      `;
    return avatarContainer;
  }
}
