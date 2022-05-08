import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase.config";
export class App {
  static async init() {
    initializeApp(firebaseConfig);
    App.db = getFirestore();
  }
}
