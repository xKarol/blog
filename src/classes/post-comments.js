import { addDoc, collection, getDocs } from "firebase/firestore";
import { App } from "./app";
import { User } from "./user";

export class PostComments {
  constructor(postId) {
    if (!postId) throw new Error("Post ID was not provided.");
    this.postId = postId;
    this.addCommentEl = document.querySelector("#post-comment-add");
    this.addCommentInputEl = document.querySelector("#post-comment-add-input");
    this.loading = false;
    this.#fetch().then(() => this.#render());
    this.addCommentEl.addEventListener("submit", (e) =>
      this.#handleSubmit(e, this)
    );
  }

  async #handleSubmit(e, getThis) {
    e.preventDefault();
    if (this.loading) return;
    const data = User.get();
    if (!data) return;
    const { uid: authorId } = data;
    const text = this.addCommentInputEl.value;
    this.loading = true;
    await getThis.#addComment(this.postId, authorId, text);
    this.loading = false;
    this.addCommentInputEl.value = "";
  }

  async #addComment(postId, authorId, text) {
    const db = App.db;
    const commentRef = collection(db, "posts", postId, "comments");
    const date = new Date().toUTCString();
    await addDoc(commentRef, { authorId, text, createdAt: date });
  }

  async #fetch() {
    const db = App.db;
    const commentsRef = collection(db, "posts", this.postId, "comments");
    const comments = await getDocs(commentsRef);
    const data = comments.docs.map((docData) => ({
      id: docData.id,
      ...docData.data(),
    }));
    this.data = data;
    console.log(data);
  }
  async #render() {}
}
