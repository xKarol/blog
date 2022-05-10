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
    const avatarHTML = this.avatar.html;
    const commentEl = document.createElement("li");
    this.commentElement = commentEl;
    commentEl.classList.add("post__comments__comment");
    commentEl.setAttribute("data-id", this.id);
    commentEl.innerHTML = `
    <header class="post__comments__comment__header">
        ${avatarHTML}
        <div class="post__comments__comment__header__info">
            <span class="post__comments__comment__header__author"
            >${this.fullName}</span
            >
            <span class="post__comments__comment__header__date"
            >${this.formattedDate}</span
            >
        </div>
        </header>
        <p class="post__comments__comment__text">
        ${this.showMore ? this.text : trimText(this.text, 500)}
        ${
          this.text.length > 500
            ? `<div class='post__comments__comment__more' data-id='comment-show-more'>${
                this.showMore ? "Show less" : "Show more"
              }</div>`
            : ""
        }
        </p>
        `;
    if (item) {
      console.log(commentEl, item);
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
