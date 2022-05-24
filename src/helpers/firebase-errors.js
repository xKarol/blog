export const firebaseErrors = {
  "auth/email-already-exists": "This email is already exists.",
  "auth/email-already-in-use": "This email is already in use.",
  "auth/invalid-email": "This email is invalid.",
  "auth/user-not-found": "The account was not found.",
  "auth/wrong-password": "Invalid Password.",
  "auth/weak-password": "Password must be a string with at least 6 characters.",
  "auth/too-many-requests": "Try again later.",
};

export const getFirebaseErrorByCode = (code) => {
  const errorText = firebaseErrors[code];
  if (!errorText?.length) return "An error has occurred";
  return errorText;
};
