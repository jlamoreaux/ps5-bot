import fetchPage from '../fetchPage';
import { item } from '../types';

/**
 * Checks to see if this item is in stock
 * @param item the item we want to check and see if it is inStock
 * @returns true if item is in stock
 *
 */
export const checkIfInStock = async (item: item) => {
  const status: Number = await (await fetchPage(item.url)).status;
  return status === 200;
};
