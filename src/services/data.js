export const fetchData = async () => {
  const URL =
    'https://njvss-appointments-public.s3.amazonaws.com/data/data.json';
  const resp = await fetch(URL);
  const json = await resp.json();

  return json;
};
