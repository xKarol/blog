// import { Avatar } from "./avatar";

export class PostComment {
  constructor(author, date, text) {
    this.author = author;
    this.date = date;
    this.text = text;
  }

  render() {
    const commentsEl = document.querySelector("#post-comments-list");
    const formattedDate = moment(this.date).format("MMMM D, YYYY HH:MM");
    commentsEl.innerHTML = `
        <li class="post__comments__comment">
            <header class="post__comments__comment__header">
            <div class="post__comments__comment__header__info">
                <span class="post__comments__comment__header__author"
                >${this.author.firstName} ${this.author.lastName}</span
                >
                <span class="post__comments__comment__header__date"
                >${formattedDate}</span
                >
            </div>
            </header>
            <p class="post__comments__comment__text">${this.text}</p>
        </li>
    `;
    console.log(commentsEl);
  }
}
