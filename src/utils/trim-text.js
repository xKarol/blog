export const trimText = (text, position) => {
  if (!text || !text.length) return;
  const slice = text.slice(0, position);
  if (text.length > position) return `${slice}...`;
  return slice;
};
