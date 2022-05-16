import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getUserById } from "../services/firebase";
import { App } from "./app";
import { Loader } from "./loader";
import { PostComment } from "./post-comment";
import { User } from "./user";

export class PostComments {
  constructor(postId) {
    if (!postId) throw new Error("Post ID was not provided.");
    this.postId = postId;
    this.addCommentEl = document.querySelector("#post-comment-add");
    this.addCommentBtnEl = document.querySelector("#post-comment-add > button");
    this.addCommentInputEl = document.querySelector("#post-comment-add-input");
    this.commentsListEl = document.querySelector("#post-comments-list");
    this.loading = false;
    this.comments = [];
    this.user = User.get();
    this.#init();
  }

  async #init() {
    this.#fetch().then(() => this.#render());
    this.addCommentEl.addEventListener("submit", (e) =>
      this.#handleSubmit(e, this)
    );
    this.commentsListEl.addEventListener("click", (e) =>
      this.#handleClick(e, this)
    );
  }

  #handleClick(e, getThis) {
    const el = e.target;
    const id = el.dataset?.id;
    if (id === "comment-show-more") {
      const parent = el.parentElement;
      const commentId = parent.dataset.id;
      const comment = getThis.#getCommentByID(commentId);
      comment.toggleShowMore();
    }
  }

  #getCommentByID(id) {
    const find = this.comments.filter((comment) => comment.id === id)[0];
    if (!find) throw new Error();
    return find;
  }

  async #handleSubmit(e, getThis) {
    e.preventDefault();
    if (this.loading) return;
    if (!this.user.loggedIn) return;
    const { uid: authorId } = this.user;
    const text = this.addCommentInputEl.value;
    this.#toggleLoading(true);
    await getThis.#addComment(this.postId, authorId, text);
    this.#toggleLoading(false);
    this.addCommentInputEl.value = "";
  }

  async #addComment(postId, authorId, text) {
    const db = App.db;
    const commentRef = collection(db, "posts", postId, "comments");
    const date = new Date();
    const docData = await addDoc(commentRef, {
      authorId,
      text,
      createdAt: serverTimestamp(),
    });
    const id = docData.id;
    const newComment = new PostComment(id, this.user, text, date);
    newComment.render();
    this.comments.push(newComment);
    this.#updateCommentsAmount();
  }

  #toggleLoading(toggle = true) {
    if (toggle) {
      if (this.loader) {
        this.loader.delete();
      }
      this.addCommentBtnEl.innerText = "";
      this.loader = new Loader(this.addCommentBtnEl, 0.8);
      this.loading = true;
      this.addCommentBtnEl.disabled = true;
    } else {
      this.loading = false;
      this.addCommentBtnEl.disabled = false;
      this.loader?.delete?.();
      this.addCommentBtnEl.innerText = "Submit";
    }
  }

  #updateCommentsAmount() {
    const commentsAmountEl = document.querySelector("#post-comments-amount");
    commentsAmountEl.innerText = `Comments (${this.comments.length})`;
  }

  async #fetch() {
    const db = App.db;
    const commentsRef = collection(db, "posts", this.postId, "comments");
    const comments = await getDocs(commentsRef);

    this.data = await Promise.all(
      comments.docs.map(async (docData) => {
        const userId = docData.data().authorId;
        const userData = await getUserById(userId);
        return {
          user: userData,
          ...docData.data(),
          id: docData.id,
        };
      })
    );
  }

  async #render() {
    this.comments = [];
    this.commentsListEl.innerHTML = "";
    this.data.forEach(({ id, user, text, createdAt }) => {
      const newComment = new PostComment(id, user, text, createdAt);
      newComment.render();
      this.comments.push(newComment);
    });
    this.#updateCommentsAmount();
  }
}
