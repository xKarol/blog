import { TextEditor } from "./text-editor";

export class Editor {
  constructor(root) {
    this.root = root;
    this.tags = ["JavaScript", "HTML", "CSS"];
    this.#render();
  }

  #renderTags() {
    const tagsEl = document.createElement("form");
    tagsEl.className = "editor__tag";
    this.tags.forEach((tag) => {
      const tagEl = document.createElement("div");
      tagEl.className = "editor__tag__chip";
      const tagTextEl = document.createElement("span");
      tagTextEl.innerText = tag;
      tagEl.appendChild(tagTextEl);
      const tagRemoveEl = document.createElement("i");
      tagRemoveEl.className = "uil uil-times editor__tag__chip__icon";
      tagEl.appendChild(tagRemoveEl);
      tagsEl.appendChild(tagEl);
    });
    const tagAddEl = document.createElement("input");
    tagAddEl.type = "text";
    tagAddEl.className = "editor__tag__input";
    tagAddEl.placeholder = "Add tag...";
    tagAddEl.id = "editor-tag";
    tagsEl.appendChild(tagAddEl);
    return tagsEl;
  }

  #render() {
    const titleEl = document.createElement("input");
    titleEl.type = "text";
    titleEl.className = "editor__title";
    titleEl.placeholder = "New post title here...";
    titleEl.id = "editor-title";
    this.root.appendChild(titleEl);

    const tagsEl = this.#renderTags();
    this.root.appendChild(tagsEl);

    const contentEl = document.createElement("div");
    contentEl.className = "editor__content";
    this.root.appendChild(contentEl);

    this.textEditor = new TextEditor(contentEl);

    const publishEl = document.createElement("button");
    publishEl.className = "editor__publish";
    publishEl.innerText = "Publish";
    contentEl.appendChild(publishEl);
  }
}
