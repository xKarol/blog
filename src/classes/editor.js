import { ROUTE_POST } from "../config/routes";
import { createPost } from "../services/firebase";
import { LoadingButton } from "./loading-button";
import { Router } from "./router";
import { TextEditor } from "./text-editor";
import { User } from "./user";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export class Editor {
  #fileInput;
  #previewThumbnailEl;

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

  #renderUploader() {
    const uploaderEl = document.createElement("div");
    uploaderEl.className = "editor__thumbnail";

    const previewEl = document.createElement("img");
    previewEl.className = "editor__thumbnail__preview";
    this.#previewThumbnailEl = previewEl;
    uploaderEl.appendChild(previewEl);

    const uploaderIconEl = document.createElement("i");
    uploaderIconEl.className = "uil uil-image-upload editor__thumbnail__icon";
    uploaderEl.appendChild(uploaderIconEl);

    const uploaderTextEl = document.createElement("span");
    uploaderTextEl.className = "editor__thumbnail__text";
    uploaderTextEl.innerText = "Upload thumbnail";
    uploaderEl.appendChild(uploaderTextEl);

    const uploaderFileEl = document.createElement("input");
    uploaderFileEl.type = "file";
    uploaderFileEl.hidden = true;
    uploaderFileEl.accept = "image/*";
    this.#fileInput = uploaderFileEl;
    uploaderEl.appendChild(uploaderFileEl);

    uploaderEl.addEventListener("click", () => this.#handleSelectFile(this));
    uploaderFileEl.addEventListener("change", (e) =>
      this.#handleChangeFile(e, this)
    );
    return uploaderEl;
  }

  #handleSelectFile(getThis) {
    getThis.#fileInput.click();
  }

  #handleChangeFile(e, getThis) {
    const file = e.target.files[0];
    if (!file) return;
    const thumbnailSrc = URL.createObjectURL(file);
    const previewEl = getThis.#previewThumbnailEl;
    previewEl.classList.add("active");
    previewEl.src = thumbnailSrc;
    this.thumbnailFile = file;
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

    const uploaderEl = this.#renderUploader();
    this.root.appendChild(uploaderEl);

    const contentEl = document.createElement("form");
    contentEl.className = "editor__content";
    this.root.appendChild(contentEl);

    this.textEditor = new TextEditor(contentEl);

    const bottomEl = document.createElement("div");
    bottomEl.className = "editor__bottom";

    const errorEl = document.createElement("span");
    errorEl.className = "editor__error";
    this.errorEl = errorEl;
    bottomEl.appendChild(errorEl);

    this.loadingButton = new LoadingButton(bottomEl, {
      className: "editor__publish",
      text: "Publish",
      buttonType: "submit",
      elementId: "validation-submit",
    });
    contentEl.appendChild(bottomEl);

    contentEl.addEventListener("submit", (e) => this.#handleSubmit(e, this));
  }

  setError(error = "") {
    this.errorEl.innerText = error;
  }

  async #uploadThumbnail() {
    const file = this.thumbnailFile;
    const fileName = file.name + Math.random() + Date.now();
    const storage = getStorage();
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

  async #handleSubmit(e, getThis) {
    e.preventDefault();
    if (this.loadingButton.loading) return;
    try {
      this.setError("");
      this.loadingButton.toggleLoading(true);
      const title = getThis.titleEl.value;
      const content = getThis.textEditor.getContent();
      const user = User.data;
      if (!user?.loggedIn) {
        return getThis.setError("An error has occurred.");
      }

      if (!title?.length) {
        return getThis.setError("Please add post title.");
      } else if (!getThis?.thumbnailFile?.type?.length) {
        return getThis.setError("Please add post thumbnail.");
      } else if (!content?.length) {
        return getThis.setError("Please add post text.");
      }

      const url = await this.#uploadThumbnail();
      if (!url?.length) {
        return getThis.setError("The thumbnail could not be uploaded");
      }

      const db = getFirestore();
      const postDoc = await createPost(db, user.uid, url, title, content);
      const postId = postDoc.id;
      Router.set(ROUTE_POST, {
        params: { name: "id", value: postId },
      });
    } catch (error) {
      getThis.setError("An error has occurred.");
    } finally {
      this.loadingButton.toggleLoading(false);
    }
  }
}
