import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase.config";
import { Posts } from "./posts";

export class App {
  static init() {
    initializeApp(firebaseConfig);
    App.db = getFirestore();

    window.addEventListener("DOMContentLoaded", () => {
      const posts = new Posts();
      posts.fetch();
    });
  }
}
