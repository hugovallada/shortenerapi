export const getData = () => {
  const time = new Date().getTime();
  const data = new Date(time);
  return data.toString();
};
