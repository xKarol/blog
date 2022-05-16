import moment from "moment";
import { Avatar } from "./avatar";
import { trimText } from "../utils/trim-text";

export class PostComment {
  static commentsEl = document.querySelector("#post-comments-list");

  constructor(id, author, text, date) {
    this.id = id;
    this.author = author;
    this.date = date?.toDate?.() ?? date;
    this.text = text;
    this.showMore = false;
    this.formattedDate = moment(this.date).format("MMMM D, YYYY HH:mm");
    this.fullName = `${this.author.firstName} ${this.author.lastName}`;
    this.avatar = new Avatar({
      name: this.fullName,
      src: this.author?.avatar,
      rounded: "circle",
    });
  }

  render() {
    const item = document.querySelector(`[data-id="${this.id}"]`);
    const commentEl = document.createElement("li");
    this.commentElement = commentEl;
    commentEl.className = "post__comments__comment";
    commentEl.setAttribute("data-id", this.id);

    const commentHeaderEl = document.createElement("header");
    commentHeaderEl.className = "post__comments__comment__header";
    commentHeaderEl.appendChild(this.avatar.element);
    commentEl.appendChild(commentHeaderEl);

    const commentHeaderInfoEl = document.createElement("div");
    commentHeaderInfoEl.className = "post__comments__comment__header__info";
    commentHeaderEl.appendChild(commentHeaderInfoEl);

    const commentHeaderAuthor = document.createElement("span");
    commentHeaderAuthor.className = "post__comments__comment__header__author";
    commentHeaderAuthor.innerText = this.fullName;
    commentHeaderInfoEl.appendChild(commentHeaderAuthor);

    const commentHeaderDate = document.createElement("span");
    commentHeaderDate.className = "post__comments__comment__header__date";
    commentHeaderDate.innerText = this.formattedDate;
    commentHeaderInfoEl.appendChild(commentHeaderDate);

    const commentTextEl = document.createElement("p");
    commentTextEl.className = "post__comments__comment__text";
    commentTextEl.innerText = this.showMore
      ? this.text
      : trimText(this.text, 500);
    commentEl.appendChild(commentTextEl);

    if (this.text.length > 500) {
      const commentShowMoreEl = document.createElement("div");
      commentShowMoreEl.className = "post__comments__comment__more";
      commentShowMoreEl.innerText = this.showMore ? "Show less" : "Show more";
      commentShowMoreEl.setAttribute("data-id", "comment-show-more");
      commentEl.appendChild(commentShowMoreEl);
    }
    if (item) {
      PostComment.commentsEl.replaceChild(commentEl, item);
    } else {
      PostComment.commentsEl.appendChild(commentEl);
      this.commentTextElement = commentEl.querySelector(
        ".post__comments__comment__text"
      );
    }
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
    this.render();
  }
}
