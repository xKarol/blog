import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from "firebase/firestore";
import { getUserById } from "../services/firebase";
import { App } from "./app";
import { InfiniteScroll } from "./infinite-scroll";
import { Loader } from "./loader";
import { PostComment } from "./post-comment";
import { User } from "./user";

export class PostComments {
  #infiniteScroll;

  constructor(postId) {
    if (!postId) throw new Error("Post ID was not provided.");
    this.postId = postId;
    this.addCommentEl = document.querySelector("#post-comment-add");
    this.addCommentBtnEl = document.querySelector("#post-comment-add > button");
    this.addCommentInputEl = document.querySelector("#post-comment-add-input");
    this.commentsListEl = document.querySelector("#post-comments-list");
    this.commentsEl = document.querySelector("#post-comments");
    this.loading = false;
    this.comments = [];
    this.user = User.get();
    this.#init();
  }

  async #init() {
    this.#fetch();
    this.addCommentEl.addEventListener("submit", (e) =>
      this.#handleSubmit(e, this)
    );
    this.commentsListEl.addEventListener("click", (e) =>
      this.#handleClick(e, this)
    );
    this.addCommentInputEl.addEventListener("input", (e) =>
      this.#handleChangeInput(e, this)
    );
    this.#infiniteScroll = new InfiniteScroll(this.commentsEl, async () => {
      await this.#fetch();
    });
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
    const text = this.#formatComment(this.addCommentInputEl.value);
    this.#toggleLoading(true);
    await getThis.#addComment(this.postId, authorId, text);
    this.#toggleLoading(false);
    this.addCommentInputEl.value = "";
  }

  #handleChangeInput(e, getThis) {
    if (getThis.loading) return;
    const text = e.target.value;
    const formattedText = getThis.#formatComment(text);
    e.target.value = formattedText;
  }

  #formatComment(text) {
    const formattedComment = text.replace(/\s\s+/g, " ");
    return formattedComment;
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

  async #fetch(max = 25) {
    try {
      if (this.pending) return;
      this.pending = true;
      const db = App.db;
      const commentsRef = collection(db, "posts", this.postId, "comments");
      let q;
      if (!this.lastComment) {
        q = query(commentsRef, orderBy("createdAt", "desc"), limit(max));
      } else {
        q = query(
          commentsRef,
          orderBy("createdAt", "desc"),
          startAfter(this.lastComment),
          limit(max)
        );
      }
      const querySnapshot = await getDocs(q);
      const queryElements = querySnapshot.docs;
      if (!queryElements.length) {
        this.#infiniteScroll.delete();
        return;
      }

      const data = await Promise.all(
        queryElements.map(async (docData) => {
          const userId = docData.data().authorId;
          const userData = await getUserById(userId);
          return {
            user: userData,
            ...docData.data(),
            id: docData.id,
          };
        })
      );
      this.#render(data);

      if (!this.firstPost) {
        this.firstPost = data[0]?.id;
      }

      const lastVisible = queryElements[queryElements.length - 1];
      this.lastComment = lastVisible;
    } catch (error) {
      console.error(error);
    } finally {
      this.pending = false;
    }
  }

  #render(data) {
    data.forEach(({ id, user, text, createdAt }) => {
      const newComment = new PostComment(id, user, text, createdAt);
      console.log("render", newComment);
      newComment.render();
      this.comments.push(newComment);
    });
    this.#updateCommentsAmount();
  }
}
