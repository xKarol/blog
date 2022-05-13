import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase.config";
export class App {
  
  static async init(callback) {
    initializeApp(firebaseConfig);
    App.db = getFirestore();
    callback?.();
  }

  static getURLParams() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    return params;
  }
}
