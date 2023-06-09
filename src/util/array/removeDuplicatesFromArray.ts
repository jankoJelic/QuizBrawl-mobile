export const removeDuplicatesFromArray = (arr: any[]) => {
  let uniqueChars: any[] = [];
  arr?.forEach(c => {
    if (!uniqueChars.includes(c)) {
      uniqueChars.push(c);
    }
  });

  return uniqueChars;
};
