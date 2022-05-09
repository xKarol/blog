import { doc, getDoc } from "firebase/firestore";
import { App } from "../classes/app";

export const getUserById = async (userId) => {
  if (!userId.length) throw new Error("User ID was not provided");
  const db = App.db;
  const userDoc = await getDoc(doc(db, "users", userId));
  return { userId: userDoc.id, ...userDoc.data() };
};
