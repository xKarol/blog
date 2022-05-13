import { doc, collection, getDocs, writeBatch } from "firebase/firestore";
import { App } from "./app";
import { v4 as uuidv4 } from "uuid";

export class Seed {
  static async refresh() {
    await this.delete();
    await this.create();
  }

  static async create() {
    const db = App.db;
    const data = await Seed.getSeed();

    const batch = writeBatch(db);
    data.forEach((post) => {
      const docId = uuidv4();
      const docRef = doc(db, "posts", docId);
      batch.set(docRef, post);
    });

    await batch.commit();
  }

  static async delete() {
    const db = App.db;
    const batch = writeBatch(db);
    const docsData = await getDocs(collection(db, "posts"));
    const docsId = docsData.docs.map((doc) => doc.id);

    docsId.forEach((docId) => {
      batch.delete(doc(db, "posts", docId));
    });

    await batch.commit();
  }

  static async getSeed() {
    try {
      const db = App.db;
      const usersRef = collection(db, "users");
      const usersData = await getDocs(usersRef);
      const users = usersData.docs.map((docData) => docData.id);
      if (!users.length) throw new Error("Seed Error: Not found user");
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];
      const randomLorem = await fetch(
        "https://baconipsum.com/api/?type=all-meat&paras=100"
      );
      const loremData = await randomLorem.json();
      const connectLorem = (loremData) => {
        const randomIndex = Math.floor(Math.random() * loremData.length);
        let loremText = "";
        for (let i = 0; i < 30; i++) {
          loremText += ` ${loremData[randomIndex]}`;
        }
        return loremText;
      };

      const res = await fetch(
        "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?size=30"
      );
      const img = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}&count=30`
      );
      const images = await img.json();
      const data = await res.json();
      const date = new Date();
      return data.map((item, index) => ({
        title: item.long_sentence,
        text: connectLorem(loremData),
        createdAt: date,
        images: images[index].urls,
        userId: randomUser,
        views: 0,
      }));
    } catch (error) {
      console.error(error);
    }
  }
}
