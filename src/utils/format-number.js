export const formatNumber = (number = 0) => {
  if (number < 10 * 1000) return number;
  if (number < 1000 * 1000) return (number / 1000).toFixed(1) + "K";
  if (number < 1000000 * 1000) return (number / 1000000).toFixed(1) + "M";
  if (number < 10000000 * 1000) return (number / 1000000000).toFixed(1) + "B";
};
