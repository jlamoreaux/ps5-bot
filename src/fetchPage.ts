import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Fetches page and returns response
 * @param url the url to fetch
 * @returns status code of page
 */
const fetchPage = async (url: string) => {
  const response: AxiosResponse = await axios
    .get(url, { timeout: 1000 })
    .then((response: AxiosResponse) => {
      console.log({
        date: Date().toString(),
        message: 'Query ran successfully',
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
        message: 'Error while running query',
        status: response?.status || 'none',
        url: response?.config?.url,
        code: err.code || 'none',
      });
      return err.response;
    });
  return response;
};

export default fetchPage;
