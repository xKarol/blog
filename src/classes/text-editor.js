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
          <div class="editor__header__btns-group">
            <button type="button" class="editor__header__button" data-type="bold">
              <i class="uil uil-bold"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="italic">
              <i class="uil uil-italic"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="underline">
              <i class="uil uil-underline"></i>
            </button>
          </div>
          <div class="editor__header__divider"></div>
          <div class="editor__header__btns-group">
            <button type="button" class="editor__header__button" data-type="justifyLeft">
              <i class="uil uil-align-left"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="justifyCenter">
              <i class="uil uil-align-center"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="justifyRight">
              <i class="uil uil-align-right"></i>
            </button>
          </div>
          <div class="editor__header__divider"></div>
          <div class="editor__header__btns-group">
            <button type="button" class="editor__header__button" data-type="insertUnorderedList">
              <i class="uil uil-list-ul"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="line-spacing">
              <i class="uil uil-line-spacing"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="code">
              <i class="uil uil-arrow"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="emote">
              <i class="uil uil-smile"></i>
            </button>
          </div>
          <div class="editor__header__divider"></div>
          <div class="editor__header__btns-group">
            <button type="button" class="editor__header__button" data-type="image">
              <i class="uil uil-image"></i>
            </button>
            <button type="button" class="editor__header__button" data-type="link">
              <i class="uil uil-link-h"></i>
            </button>
          </div>
          <div class="editor__header__divider"></div>
          <button type="button" class="editor__header__button" data-type="more">
            <i class="uil uil-ellipsis-v"></i>
          </button>
    `;
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
