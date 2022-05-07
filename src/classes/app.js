import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase.config";
import { Posts } from "./posts";
import { Seed } from "./seed";

export class App {
  static init() {
    initializeApp(firebaseConfig);
    App.db = getFirestore();
    if (process.env.NODE_ENV === "development") {
      // fetching random data
      const seed = new Seed();
      seed.deleteAll();
      seed.init();
    }

    window.addEventListener("DOMContentLoaded", () => {
      const posts = new Posts();
      posts.fetch();
    });
  }
}
