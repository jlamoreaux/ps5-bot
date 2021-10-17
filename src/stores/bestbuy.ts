import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import fetchPage from '../fetchPage';
import { item, store } from '../types';
import { STORES } from './stores';

/**
 * Checks to see if this item is in stock
 * @param item the item we want to check and see if it is inStock
 * @returns true if item is in stock
 *
 */
const checkIfInStock = async (item: item) => {
  console.log('Checking if item is in stock at Best Buy');
  const response: AxiosResponse = await fetchPage(item.url);
  const $ = cheerio.load(response.data.toString());
  const addToCartIsEnabled = !$(
    '.add-to-cart-button'
  )[0].attribs?.class.includes('disabled');
  return addToCartIsEnabled;
};

const bestbuy: store = {
  name: STORES.BESTBUY,
  nameStandardized: 'Best Buy',
  itemsToCheck: [
    {
      name: 'PS5 - Digital',
      url: 'https://www.bestbuy.com/site/sony-playstation-5-digital-edition-console/6430161.p?skuId=6430161',
      isInStock: false,
      lastNotification: Date.now(),
    },
    {
      name: 'PS5 - Disc Version',
      url: 'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149',
      isInStock: false,
      lastNotification: Date.now(),
    },
  ],
  checkIfInStock,
};

export default bestbuy;
