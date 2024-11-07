export const convertDateToString = (date) => {
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const withoutTimezone = new Date(date.valueOf() - tzoffset).toISOString();
  return withoutTimezone;
};
