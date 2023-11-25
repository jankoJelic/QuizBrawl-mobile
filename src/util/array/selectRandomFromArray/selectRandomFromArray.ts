export const selectRandomFromArray = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)];
