import { getDocs, collection, query, orderBy } from "firebase/firestore";
import moment from "moment";
import { ROUTE_POST } from "../config/routes";
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
      const dateTime = createdAt?.toDate?.() ?? createdAt;
      const date = moment(dateTime).format("MMMM D, YYYY");
      const postItemEl = document.createElement("li");
      postItemEl.className = "main__card";
      this.domContainer.appendChild(postItemEl);

      const postAnchorEl = document.createElement("a");
      postAnchorEl.className = "main__card__anchor";
      postAnchorEl.href = `${ROUTE_POST}?id=${id}`;
      postItemEl.appendChild(postAnchorEl);

      const postImageContainerEl = document.createElement("div");
      postImageContainerEl.className = "main__card__image card-shadow";
      postAnchorEl.appendChild(postImageContainerEl);

      const postImageEl = document.createElement("img");
      postImageEl.src = images.small;
      postImageEl.alt = ""; // TODO add alt
      postImageContainerEl.appendChild(postImageEl);

      const postContentEl = document.createElement("div");
      postContentEl.className = "main__card__content";
      postAnchorEl.appendChild(postContentEl);

      const postHeaderEl = document.createElement("header");
      postHeaderEl.className = "main__card__header";
      postContentEl.appendChild(postHeaderEl);

      const postDateEl = document.createElement("span");
      postDateEl.className = "main__card__date";
      postDateEl.innerText = date;
      const postDotEl = document.createElement("span");
      postDotEl.className = "main__card__dot";
      const postCategoryEl = document.createElement("span");
      postCategoryEl.className = "main__card__category";
      postCategoryEl.innerText = "Blog";
      postHeaderEl.appendChild(postDateEl);
      postHeaderEl.appendChild(postDotEl);
      postHeaderEl.appendChild(postCategoryEl);

      const postTitleEl = document.createElement("h1");
      postTitleEl.className = "main__card__heading";
      postTitleEl.innerText = trimText(title, 30);
      postContentEl.appendChild(postTitleEl);

      if (index === 0) {
        const postTextEl = document.createElement("p");
        postTextEl.className = "main__card__text";
        postTextEl.innerText = trimText(text, 130);
        postContentEl.appendChild(postTextEl);

        const postReadMoreEl = document.createElement("button");
        postReadMoreEl.className = "main__card__continue-reading";
        postReadMoreEl.innerText = "Continue Reading";
        postContentEl.appendChild(postReadMoreEl);

        const postReadMoreIconEl = document.createElement("i");
        postReadMoreIconEl.className = "main__card__continue-reading__icon";
        postReadMoreIconEl.classList.add("uil");
        postReadMoreIconEl.classList.add("uil-arrow-right");
        postReadMoreEl.appendChild(postReadMoreIconEl);
      }
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
