import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Fetches page and returns response
 * @param url the url to fetch
 * @returns status code of page
 */
const fetchPage = async (url: string) => {
  const response = await axios
    .get(url)
    .then((response: AxiosResponse) => {
      console.log({
        date: Date().toString(),
        status: response.status,
        text: response.statusText,
        url: response.config?.url,
      });
      return response;
    })
    .catch((err: AxiosError) => {
      const response = err.response;
      console.log({
        date: Date().toString(),
        status: response.status,
        text: response.statusText,
        url: response.config?.url,
      });
      return response;
    });
  return response;
};

export default fetchPage;
