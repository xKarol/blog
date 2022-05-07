import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { App } from "./app";

export class Posts {
  constructor() {
    this.data = [];
    this.domContainer = document.querySelector("#main-posts");
  }

  render() {
    this.data.forEach(({ images, text, title }, index) => {
      this.domContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="main__card">
          <div class="main__card__image">
            <img src="${images.small}" />
          </div>
          <div class="main__card__content">
            <header class="main__card__header">
              <span class="main__card__date">December 26, 2021</span>
              <span class="main__card__dot"></span>
              <span class="main__card__category">Blog</span>
            </header>
            <h1 class="main__card__heading">
              ${title}
            </h1>
            <p class="main__card__text">${text}</p>
            ${
              index === 0
                ? '<a href="#" class="main__card__continue-reading">\
              Continue reading\
              <i class="uil uil-arrow-right main__card__continue-reading__icon"></i>\
              </a>'
                : ""
            }
          </div>
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
      console.log(doc.id, " => ", doc.data());
      this.data.push(doc.data());
    });
    this.render();
  }
}
