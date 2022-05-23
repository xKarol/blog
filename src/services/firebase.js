import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export const getUserById = async (db, userId) => {
  if (!userId.length) throw new Error("User ID was not provided");
  const userDoc = await getDoc(doc(db, "users", userId));
  return { userId: userDoc.id, ...userDoc.data() };
};

export const createPost = async (db, userId, thumbnail, title, content) => {
  return await addDoc(collection(db, "posts"), {
    userId,
    thumbnail: { src: thumbnail, alt: "" },
    title,
    text: content,
    createdAt: new Date(),
    views: 0,
  });
};
