export class Dropdown {
  constructor(itemsData, element) {
    if (!itemsData || !element) throw new Error();
    if (element.nodeName !== "BUTTON")
      throw new Error("Parent element must be a button tag");
    this.itemsData = itemsData;
    this.element = element;
    this.#render();
  }

  #render() {
    const dropdownEl = document.createElement("ul");
    dropdownEl.classList.add("dropdown");

    this.itemsData.forEach(({ icon, text, href }, index) => {
      const itemEl = document.createElement("li");
      itemEl.classList.add("dropdown__item");
      itemEl.setAttribute("data-index", index);
      let anchorEl, iconEl, buttonEl;
      if (href && href.length) {
        anchorEl = document.createElement("a");
        anchorEl.href = href;
        itemEl.appendChild(anchorEl);
      } else {
        buttonEl = document.createElement("button");
        itemEl.appendChild(buttonEl);
      }
      if (icon && icon.length) {
        iconEl = document.createElement("i");
        iconEl.className = `dropdown__item__icon ${icon}`;
      } else {
        itemEl.classList.add("dropdown__item--no-icon");
      }
      const textEl = document.createElement("span");
      textEl.innerText = text;

      if (anchorEl) {
        if (iconEl) anchorEl.appendChild(iconEl);
        anchorEl.appendChild(textEl);
      } else {
        if (iconEl) buttonEl.appendChild(iconEl);
        buttonEl.appendChild(textEl);
      }
      dropdownEl.appendChild(itemEl);
    });
    this.element.classList.add("dropdown__parent");
    this.element.appendChild(dropdownEl);
    dropdownEl.addEventListener("click", (e) => this.#handleClick(e, this));
  }

  #handleClick(e, getThis) {
    const el = e.target;
    const elIndex = Number(el.parentNode.dataset.index);
    getThis.itemsData[elIndex]?.action?.();
  }
}
