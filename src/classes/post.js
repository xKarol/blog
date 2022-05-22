import { App } from "./app";
import { getDoc, doc, increment, updateDoc } from "firebase/firestore";
import { formatNumber } from "../utils/format-number";
import { countWords } from "../utils/count-words";
import { calculateReadingTime } from "../utils/calculate-reading-time";
import { PostComments } from "./post-comments";
import { Skeleton } from "./skeleton";
import { ScrollProgress } from "./scroll-progress";
import sanitizeHtml from "sanitize-html";

export class Post {
  static postContainerEl = document.querySelector(".post__container");
  constructor(id) {
    this.id = id;
    this.#render({ skeleton: true });
    this.#fetch().then(() => {
      this.#render();
      this.#incrementViews();
      new ScrollProgress(Post.postContainerEl);
    });
    new PostComments(id);
  }

  async #fetch() {
    const db = App.db;
    const docData = await getDoc(doc(db, "posts", this.id));
    const data = docData.data();
    const userData = await getDoc(doc(db, "users", data.userId));
    const user = userData.data();
    this.data = { ...data, user };
  }

  async #incrementViews() {
    const db = App.db;
    await updateDoc(doc(db, "posts", this.id), {
      views: increment(1),
    });
  }

  #render(data) {
    const titleElement = document.querySelector("#post-title");
    const imageContainerElement = document.querySelector("#post-image");
    const viewsElement = document.querySelector("#post-views");
    const authorElement = document.querySelector("#post-author");
    const textElement = document.querySelector("#post-text");
    const readingTimeElement = document.querySelector("#post-reading-time");

    if (data?.skeleton) {
      new Skeleton(titleElement, "100%", "40px");
      new Skeleton(imageContainerElement);
      new Skeleton(textElement, "90%", "30px");
      new Skeleton(textElement, "100%", "30px");
      new Skeleton(textElement, "60%", "30px");
      new Skeleton(textElement, "80%", "30px");
      new Skeleton(textElement, "80%", "30px");
      new Skeleton(textElement, "50%", "30px");
      new Skeleton(textElement, "50%", "30px");
      new Skeleton(textElement, "60%", "30px");
      new Skeleton(textElement, "70%", "30px");
      new Skeleton(textElement, "80%", "30px");
      new Skeleton(textElement, "60%", "30px");
      new Skeleton(textElement, "60%", "30px");
      new Skeleton(textElement, "70%", "30px");
      new Skeleton(textElement, "50%", "30px");
      new Skeleton(textElement, "80%", "30px");
      new Skeleton(textElement, "80%", "30px");
      new Skeleton(textElement, "70%", "30px");
      new Skeleton(textElement, "40%", "30px");
    } else {
      const { title, text, images, views, user } = this.data;
      const imgSkeleton = document.querySelector("#post-image > .skeleton");
      imgSkeleton?.remove?.();
      titleElement.innerText = title;
      titleElement.setAttribute("data-text", title);
      const imageElement = document.createElement("img");
      imageElement.src = images?.regular;
      imageElement.alt = ""; //TODO add alt
      imageContainerElement.appendChild(imageElement);
      viewsElement.innerText = `${formatNumber(views + 1)} views`;
      authorElement.innerText = `${user.firstName} ${user.lastName}`;
      const cleanHTML = sanitizeHtml(text);
      textElement.innerHTML = cleanHTML;
      const words = countWords(text);
      readingTimeElement.innerText = calculateReadingTime(words);
    }
  }
}
