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
  const page = await fetchPage(item.url);
  if (page) {
    const status = page.status;
    return status === 200;
  }
  return false;
  // const status: Number = await (await fetchPage(item.url)).status;
};

const target: store = {
  name: STORES.TARGET,
  nameStandardized: 'Target',
  itemsToCheck: [
    {
      name: 'PS5 - Digital',
      url: 'https://www.target.com/p/playstation-5-digital-edition-console/-/A-81114596',
      isInStock: false,
      lastNotification: Date.now(),
    },
    {
      name: 'PS5 - Disc Version',
      url: 'https://www.target.com/p/playstation-5-console/-/A-81114595',
      isInStock: false,
      lastNotification: Date.now(),
    },
  ],
  checkIfInStock,
};

export default target;
