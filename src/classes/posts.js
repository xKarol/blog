import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import moment from "moment";
import { ROUTE_POST } from "../config/routes";
import { trimText } from "../utils/trim-text";
import { App } from "./app";
import { InfiniteScroll } from "./infinite-scroll";
import { Skeleton } from "./skeleton";

export class Posts {
  #infiniteScroll;
  static mainElement = document.querySelector("#main-posts");

  constructor() {
    this.data = [];
    this.mainContainer = document.querySelector("#main-posts");
    const mainEl = document.querySelector(".main");
    this.#infiniteScroll = new InfiniteScroll(
      mainEl,
      async () => await this.fetch()
    );
  }

  #renderCard(data) {
    const { id, images, text, title, createdAt } = data;
    const firstPost = this.firstPost === id;

    const postItemEl = document.createElement("li");
    postItemEl.className = "main__card";
    this.mainContainer.appendChild(postItemEl);

    const postAnchorEl = document.createElement("a");
    postAnchorEl.className = "main__card__anchor";
    postItemEl.appendChild(postAnchorEl);

    const postImageContainerEl = document.createElement("div");
    postImageContainerEl.className = "main__card__image";
    postAnchorEl.appendChild(postImageContainerEl);

    const postContentEl = document.createElement("div");
    postContentEl.className = "main__card__content";
    postAnchorEl.appendChild(postContentEl);

    const postTitleEl = document.createElement("h1");
    postTitleEl.className = "main__card__heading";
    postContentEl.appendChild(postTitleEl);

    let postTextEl;

    if (firstPost || data?.skeleton) {
      postTextEl = document.createElement("p");
      postTextEl.className = "main__card__text";
      postContentEl.appendChild(postTextEl);
    }

    if (data?.skeleton) {
      postItemEl.setAttribute("data-skeleton", "true");
      new Skeleton(postImageContainerEl, false);
      new Skeleton(postTitleEl, "70%", "35px", false);
      new Skeleton(postTitleEl, "100%", "35px", false);
      new Skeleton(postTextEl, "40%", "25px", false);
      new Skeleton(postTextEl, "60%", "25px", false);
      new Skeleton(postTextEl, "55%", "25px", false);
      new Skeleton(postTextEl, "50%", "25px", false);
      return;
    }
    const dateTime = createdAt?.toDate?.() ?? createdAt;
    const date = moment(dateTime).format("MMMM D, YYYY");

    postAnchorEl.href = `${ROUTE_POST}?id=${id}`;

    const postImageEl = document.createElement("img");
    postImageEl.src = images.small;
    postImageEl.alt = ""; // TODO add alt

    postImageContainerEl.classList.add("card-shadow");
    postImageContainerEl.appendChild(postImageEl);

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

    postTitleEl.innerText = trimText(title, 30);

    if (firstPost) {
      postTextEl.innerText = trimText(text, 200);
      const postReadMoreIconEl = document.createElement("i");
      postReadMoreIconEl.className = "main__card__continue-reading__icon";
      postReadMoreIconEl.classList.add("uil");
      postReadMoreIconEl.classList.add("uil-arrow-right");

      const postReadMoreEl = document.createElement("button");
      postReadMoreEl.className = "main__card__continue-reading";
      postReadMoreEl.innerText = "Continue Reading";
      postReadMoreEl.appendChild(postReadMoreIconEl);
      postContentEl.appendChild(postReadMoreEl);
    }
  }

  render() {
    this.data.forEach((data) => {
      this.#renderCard(data);
    });
  }

  renderSkeleton() {
    for (let i = 0; i < 10; i++) {
      this.#renderCard({ skeleton: true });
    }
  }

  removeSkeleton() {
    const skeletons = [...document.querySelectorAll("[data-skeleton='true']")];
    skeletons.forEach((skeletonEl) => skeletonEl.remove());
  }

  async fetch(max = 25) {
    if (this.pending) return;
    this.pending = true;
    const db = App.db;
    const citiesRef = collection(db, "posts");
    let q;
    if (!this.lastPost) {
      q = query(citiesRef, orderBy("createdAt", "desc"), limit(max));
    } else {
      q = query(
        citiesRef,
        orderBy("createdAt", "desc"),
        startAfter(this.lastPost),
        limit(max)
      );
    }

    const querySnapshot = await getDocs(q);
    const queryElements = querySnapshot.docs;

    if (!this.data.length) {
      this.removeSkeleton();
    }

    queryElements.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      this.data.push(data);
      if (!this.firstPost) {
        this.firstPost = this.data[0].id;
      }
      this.#renderCard(data);
    });

    if (!queryElements.length) {
      this.#infiniteScroll.delete();
      return;
    }

    const lastVisible = queryElements[queryElements.length - 1];
    this.lastPost = lastVisible;
    this.pending = false;
  }
}
