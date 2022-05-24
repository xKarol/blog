export class TextEditor {
  static headerButtons = [
    {
      type: "bold",
      icon: "uil uil-bold",
    },
    {
      type: "italic",
      icon: "uil uil-italic",
    },
    {
      type: "underline",
      icon: "uil uil-underline",
    },
    {
      type: "justifyLeft",
      icon: "uil uil-align-left",
    },
    {
      type: "justifyCenter",
      icon: "uil uil-align-center",
    },
    {
      type: "justifyRight",
      icon: "uil uil-align-right",
    },
    {
      type: "insertUnorderedList",
      icon: "uil uil-list-ul",
    },
    {
      type: "line-spacing",
      icon: "uil uil-line-spacing",
    },
    {
      type: "code",
      icon: "uil uil-arrow",
    },
    {
      type: "emote",
      icon: "uil uil-smile",
    },
    {
      type: "more",
      icon: "uil uil-ellipsis-v",
    },
  ];

  constructor(root) {
    this.root = root;
    this.#render();
  }

  #render() {
    const textEditorEl = document.createElement("section");
    textEditorEl.className = "editor__box";
    const iframeEl = document.createElement("iframe");
    iframeEl.id = "iframe-editor";
    this.iframeEl = iframeEl;
    const headerEl = this.#renderHeader();
    textEditorEl.appendChild(headerEl);
    textEditorEl.appendChild(iframeEl);
    this.root.appendChild(textEditorEl);
    this.#setIframeStyles();
  }

  #setIframeStyles() {
    this.iframeEl.contentDocument.body.style.color = "#fff";
    this.iframeEl.contentDocument.body.style.fontFamily = "sans-serif";
    this.iframeEl.contentDocument.designMode = "on";
  }

  #renderHeaderButton(type, icon) {
    const iconBtnEl = document.createElement("button");
    iconBtnEl.type = "button";
    iconBtnEl.className = "editor__header__button";
    iconBtnEl.setAttribute("data-type", type);
    const iconEl = document.createElement("i");
    iconEl.className = icon;
    iconBtnEl.appendChild(iconEl);
    return iconBtnEl;
  }

  #renderHeaderButtonsGroup(btns = [], root) {
    let element;
    if (btns.length === 1) {
      const { type, icon } = btns[0];
      element = this.#renderHeaderButton(type, icon);
    } else {
      const btnGroupEl = document.createElement("div");
      btnGroupEl.className = "editor__header__btns-group";
      btns.forEach(({ type, icon }) => {
        const btnEl = this.#renderHeaderButton(type, icon);
        btnGroupEl.appendChild(btnEl);
      });
      element = btnGroupEl;
    }
    if (root) {
      root.appendChild(element);
    }
    return element;
  }

  #renderDivider(root) {
    const dividerEl = document.createElement("div");
    dividerEl.className = "editor__header__divider";
    if (root) {
      root.appendChild(dividerEl);
    }
    return dividerEl;
  }

  #renderHeader() {
    const editorHeader = document.createElement("header");
    editorHeader.className = "editor__header";

    this.#renderHeaderButtonsGroup(
      TextEditor.headerButtons.slice(0, 3),
      editorHeader
    );
    this.#renderDivider(editorHeader);
    this.#renderHeaderButtonsGroup(
      TextEditor.headerButtons.slice(3, 6),
      editorHeader
    );
    this.#renderDivider(editorHeader);
    this.#renderHeaderButtonsGroup(
      TextEditor.headerButtons.slice(6, 10),
      editorHeader
    );
    this.#renderDivider(editorHeader);
    this.#renderHeaderButtonsGroup(
      TextEditor.headerButtons.slice(10, 12),
      editorHeader
    );
    editorHeader.addEventListener("click", (e) =>
      this.#handleClickHeader(e, this)
    );
    return editorHeader;
  }

  #handleClickHeader(e, getThis) {
    const element = e.target;
    const type = element.dataset.type;

    if (type === "image") {
    } else {
      getThis.iframeEl.contentDocument.execCommand(type, false, null);
    }
    this.selectedBtn = type;
  }

  getContent() {
    return this.iframeEl.contentDocument.body.innerHTML;
  }
}
