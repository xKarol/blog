export const calculateReadingTime = (words) => {
  const READ_TIME = 200;
  const millis = (words / READ_TIME) * 60 * 1000;
  let minutes = Math.floor(millis / 60000);
  minutes = minutes === 0 ? 1 : minutes;
  return `${minutes} min`;
};
