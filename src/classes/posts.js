import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { App } from "./app";

export class Posts {
  constructor() {
    this.data = [];
  }

  render() {
    // display in dom
  }

  async fetch() {
    const db = App.db;
    const citiesRef = collection(db, "cities");
    const q = query(citiesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.data.push(doc.data());
    });
    this.render();
  }
}
