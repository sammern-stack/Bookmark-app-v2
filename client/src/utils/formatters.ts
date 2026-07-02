export const formatDate = (date: string) => {
  const getDate = new Date(date);

  return getDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

export const formatUrl = (url: string) => {
  const urlProtocol = url.split("://")[0]
  return url.split(`${urlProtocol}://`)[1];
};
