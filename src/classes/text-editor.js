export class TextEditor {
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

  #renderHeader() {
    const editorHeader = document.createElement("header");
    editorHeader.className = "editor__header";
    editorHeader.innerHTML = `
        <header class="editor__header">
            <div class="editor__header__btns-group">
              <button class="editor__header__button">
                <i class="uil uil-bold"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-italic"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-text-fields"></i>
              </button>
            </div>
            <div class="editor__header__divider"></div>
            <div class="editor__header__btns-group">
              <button class="editor__header__button">
                <i class="uil uil-align-left"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-align-center"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-align-right"></i>
              </button>
            </div>
            <div class="editor__header__divider"></div>
            <div class="editor__header__btns-group">
              <button class="editor__header__button">
                <i class="uil uil-list-ul"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-line-spacing"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-arrow"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-smile"></i>
              </button>
            </div>
            <div class="editor__header__divider"></div>
            <div class="editor__header__btns-group">
              <button class="editor__header__button">
                <i class="uil uil-image"></i>
              </button>
              <button class="editor__header__button">
                <i class="uil uil-link-h"></i>
              </button>
            </div>
            <div class="editor__header__divider"></div>
            <button class="editor__header__button">
              <i class="uil uil-ellipsis-v"></i>
            </button>
          </header>
    `;
    return editorHeader;
  }
}
