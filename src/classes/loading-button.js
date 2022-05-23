import { Loader } from "./loader";

export class LoadingButton {
  static defaultOptions = {
    tag: "button",
    text: "Submit",
    className: null,
    buttonType: null,
    loaderSize: 0.8,
    loading: false,
  };
  constructor(
    root,
    options = {
      ...LoadingButton.defaultOptions,
    }
  ) {
    this.root = root;
    this.options = { ...LoadingButton.defaultOptions, ...options };
    this.#render();
  }

  #render() {
    const loadingButtonEl = document.createElement(this.options.tag);
    if (this.options.tag === "button") {
      loadingButtonEl.type = this.options.buttonType ?? "button";
    }
    loadingButtonEl.className = this.options.className;
    this.loadingButton = loadingButtonEl;
    this.root.appendChild(loadingButtonEl);
    this.toggleLoading(this.options.loading);
  }

  toggleLoading(toggle = true) {
    const loadingButton = this.loadingButton;
    this.loading = toggle;
    loadingButton.disabled = toggle;
    if (toggle) {
      if (this.loader) {
        this.loader.delete();
      }
      loadingButton.innerText = "";
      this.loader = new Loader(loadingButton, this.options.loaderSize);
    } else {
      this.loader?.delete?.();
      loadingButton.innerText = this.options.text;
    }
  }
}
