import { doc, getDoc } from "firebase/firestore";

export const getUserById = async (db, userId) => {
  if (!userId.length) throw new Error("User ID was not provided");
  const userDoc = await getDoc(doc(db, "users", userId));
  return { userId: userDoc.id, ...userDoc.data() };
};
