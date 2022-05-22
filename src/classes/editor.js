import { ROUTE_HOME, ROUTE_POST } from "../config/routes";
import { createPost } from "../services/firebase";
import { App } from "./app";
import { Router } from "./router";
import { TextEditor } from "./text-editor";
import { User } from "./user";

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
    this.titleEl = titleEl;
    this.root.appendChild(titleEl);

    const tagsEl = this.#renderTags();
    this.root.appendChild(tagsEl);

    const contentEl = document.createElement("form");
    contentEl.className = "editor__content";
    this.root.appendChild(contentEl);

    this.textEditor = new TextEditor(contentEl);

    const publishEl = document.createElement("button");
    publishEl.type = "submit";
    publishEl.className = "editor__publish";
    publishEl.innerText = "Publish";
    contentEl.appendChild(publishEl);
    contentEl.addEventListener("submit", (e) => this.#handleSubmit(e, this));
  }

  async #handleSubmit(e, getThis) {
    e.preventDefault();
    try {
      const title = getThis.titleEl.value;
      const content = getThis.textEditor.getContent();
      const user = User.data;
      const thumbnail = null;
      if (!user?.loggedIn) {
        Router.set(ROUTE_HOME);
        return;
      }
      const db = App.db;
      const postDoc = await createPost(db, user.uid, thumbnail, title, content);
      const postId = postDoc.id;
      //   Router.set(ROUTE_POST, {
      //     query: { name: "id", value: postId },
      //   });
    } catch (error) {
      console.error(error);
    }
  }
}
