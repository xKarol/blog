import { getDocs, collection, query, orderBy } from "firebase/firestore";
import moment from "moment";
import { trimText } from "../utils/trim-text";
import { App } from "./app";

export class Posts {
  constructor() {
    this.data = [];
    this.domContainer = document.querySelector("#main-posts");
  }

  render() {
    this.domContainer.innerHTML = "";
    this.data.forEach(({ id, images, text, title, createdAt }, index) => {
      const date = moment(createdAt).format("MMMM D, YYYY");
      this.domContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="main__card">
          <a href="/post.html?id=${id}">
            <div class="main__card__image card-shadow">
              <img src="${images.small}" alt="" />
            </div>
            <div class="main__card__content">
              <header class="main__card__header">
                <span class="main__card__date">${date}</span>
                <span class="main__card__dot"></span>
                <span class="main__card__category">Blog</span>
              </header>
              <h1 class="main__card__heading">
                ${trimText(title, 30)}
              </h1>
             
              ${
                index === 0
                  ? ` <p class="main__card__text">${trimText(text, 130)}</p>\
                  <a href="#" class="main__card__continue-reading">\
                  Continue reading\
                  <i class="uil uil-arrow-right main__card__continue-reading__icon"></i>\
                  </a>`
                  : ""
              }
            </div>
          </a>
        </li>
        `
      );
    });
  }

  async fetch() {
    const db = App.db;
    const citiesRef = collection(db, "posts");
    const q = query(citiesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.data.push({ id: doc.id, ...doc.data() });
    });
    this.render();
  }
}
