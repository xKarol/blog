import { serverTimestamp } from "firebase/firestore";

export const getSeed = async () => {
  try {
    const res = await fetch(
      "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?size=30"
    );
    const img = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}&count=30`
    );
    const images = await img.json();
    const data = await res.json();
    return data.map((item, index) => ({
      id: item.uid,
      title: item.long_sentence,
      text: item.very_long_sentence,
      createdAt: serverTimestamp(),
      image: images[index].urls.raw,
    }));
  } catch (error) {
    console.error(error);
  }
};
