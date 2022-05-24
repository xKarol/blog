import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.config";
export class App {
  static async init(callback) {
    initializeApp(firebaseConfig);
    callback?.();
  }
}
