import { addDoc, collection, getDocs } from "firebase/firestore";
import { getUserById } from "../services/firebase";
import { App } from "./app";
import { PostComment } from "./post-comment";
import { User } from "./user";

export class PostComments {
  constructor(postId) {
    if (!postId) throw new Error("Post ID was not provided.");
    this.postId = postId;
    this.addCommentEl = document.querySelector("#post-comment-add");
    this.addCommentInputEl = document.querySelector("#post-comment-add-input");
    this.loading = false;
    this.comments = [];
    this.#fetch().then(() => this.#render());
    this.addCommentEl.addEventListener("submit", (e) =>
      this.#handleSubmit(e, this)
    );
  }

  async #handleSubmit(e, getThis) {
    e.preventDefault();
    if (this.loading) return;
    const user = User.get();
    if (!user) return;
    const { uid: authorId } = user;
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

    this.data = await Promise.all(
      comments.docs.map(async (docData) => {
        const userId = docData.data().authorId;
        const userData = await getUserById(userId);
        return {
          user: userData,
          ...docData.data(),
        };
      })
    );
    console.log(this.data);
  }
  async #render() {
    this.data.forEach(({ user, text, createdAt }) => {
      const newComment = new PostComment(user, text, createdAt);
      newComment.render();
      this.comments.push(newComment);
    });
  }
}
