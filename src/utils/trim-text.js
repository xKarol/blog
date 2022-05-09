export const trimText = (text, position) => {
  const slice = text.slice(0, 130);
  if (text.length > position) return `${slice}...`;
  return slice;
};
