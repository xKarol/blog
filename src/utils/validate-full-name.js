export const validateFullName = (name) => {
  const regName = /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$/;
  return regName.test(name);
};
