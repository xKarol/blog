import moment from "moment";
import { Avatar } from "./avatar";

export class PostComment {
  constructor(author, text, date) {
    this.author = author;
    this.date = date;
    this.text = text;
  }

  render() {
    const commentsEl = document.querySelector("#post-comments-list");
    const formattedDate = moment(this.date).format("MMMM D, YYYY HH:MM");
    const fullName = `${this.author.firstName} ${this.author.lastName}`;
    const avatar = new Avatar({
      name: fullName,
      src: this.author?.avatar,
      rounded: "circle",
    });
    const avatarHTML = avatar.html;

    commentsEl.insertAdjacentHTML(
      "afterbegin",
      `
        <li class="post__comments__comment">
            <header class="post__comments__comment__header">
            ${avatarHTML}
            <div class="post__comments__comment__header__info">
                <span class="post__comments__comment__header__author"
                >${fullName}</span
                >
                <span class="post__comments__comment__header__date"
                >${formattedDate}</span
                >
            </div>
            </header>
            <p class="post__comments__comment__text">${this.text}</p>
        </li>
    `
    );
  }
}
