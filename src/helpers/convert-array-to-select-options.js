export const convertArrayToSelectOptions = (arr, keys) =>
  arr.map((item) => ({ value: item[keys[0]], label: item[keys[1]] }));
