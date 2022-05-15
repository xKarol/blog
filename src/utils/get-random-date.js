import { randomBetween } from "./random-between";

export const getRandomDate = (startYear = 2018) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const minYear = startYear ? startYear : currentYear - 4;
  const randomDay = randomBetween(0, 31);
  const randomMonth = randomBetween(0, 11);
  const randomYear = randomBetween(minYear, currentYear);
  const randomHour = randomBetween(0, 23);
  const randomMinute = randomBetween(0, 59);
  date.setHours(randomHour);
  date.setMinutes(randomMinute);
  date.setDate(randomDay);
  date.setMonth(randomMonth);
  date.setFullYear(randomYear);
  return date;
};
