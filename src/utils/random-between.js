export const randomBetween = (min, max) => {
  if (isNaN(min) || isNaN(max)) throw new Error();
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
