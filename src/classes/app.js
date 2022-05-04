import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.config";

export class App {
  static init() {
    initializeApp(firebaseConfig);
  }
}
