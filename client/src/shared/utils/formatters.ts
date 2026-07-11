export const formatDate = (date: string) => {
  const getDate = new Date(date);

  return getDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

export const formatUrl = (url: string) => {
  const urlProtocol = url.split("://")[0];
  return url.split(`${urlProtocol}://`)[1];
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * The api expects the tags to be in the form of an array,
 * so this function is used to convert the string into the required format.
 * @param tags the string containing the tags of the selected bookmark
 * @returns tags in the form of an array
 */
export const normalizeTags = (tags: string) => {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};
