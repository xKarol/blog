export class Dropdown {
  constructor(itemsData, element) {
    if (!itemsData || !element) throw new Error();
    this.itemsData = itemsData;
    this.element = element;
    this.#render();
  }

  #render() {
    const dropdownEl = document.createElement("ul");
    dropdownEl.classList.add("dropdown");

    this.itemsData.forEach(({ icon, text, href }) => {
      const itemEl = document.createElement("li");
      itemEl.classList.add("dropdown__item");
      let anchorEl, iconEl;
      if (href && href.length) {
        anchorEl = document.createElement("a");
        anchorEl.href = href;
        itemEl.appendChild(anchorEl);
      }
      if (icon && icon.length) {
        iconEl = document.createElement("i");
        iconEl.className = `dropdown__item__icon ${icon}`;
      }
      const textEl = document.createElement("span");
      textEl.innerText = text;

      if (anchorEl) {
        if (iconEl) anchorEl.appendChild(iconEl);
        anchorEl.appendChild(textEl);
      } else {
        itemEl.classList.add("padding");
        if (iconEl) itemEl.appendChild(iconEl);
        itemEl.appendChild(textEl);
      }
      dropdownEl.appendChild(itemEl);
    });
    this.element.classList.add("dropdown__parent");
    this.element.appendChild(dropdownEl);
  }
}
