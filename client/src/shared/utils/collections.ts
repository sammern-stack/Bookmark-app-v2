/**
 * Counts the occurrences of each string in the provided array and returns an array of tuples.
 * @param arr Provide an array of strings
 * @returns An array of tuples containing the string and its occurrence count,
 * sorted in ascending order based on the string value.
 */
export const countOccurrences = (arr: string[]) => {
  const tags = arr.reduce((list, tag) => {
    list.set(tag, (list.get(tag) ?? 0) + 1);
    return list;
  }, new Map<string, number>());

  const sortedTags = [...tags].sort((a, b) => a[0].localeCompare(b[0]));

  return sortedTags;
};
