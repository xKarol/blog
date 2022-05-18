import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase.config";
export class App {
  static async init(callback) {
    initializeApp(firebaseConfig);
    App.db = getFirestore();
    callback?.();
  }
}
