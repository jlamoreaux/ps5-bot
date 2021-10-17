import 'dotenv/config';
import { sendTextAlert } from './alert';
import { store } from './types';
import target from './stores/target';
import bestbuy from './stores/bestbuy';

const storesToQuery: Array<store> = [target, bestbuy];

export const app = () => {
  console.log('App has started...');

  // query for changes every 5 minutes
  setInterval(
    () =>
      storesToQuery.forEach((store) => {
        checkItemsInStore(store);
      }),
    300000
  );
};

export const checkItemsInStore = (store: store) => {
  store.itemsToCheck.forEach(async (item) => {
    const currentItemStatus = await store.checkIfInStock(item);
    if (item.isInStock === true && item.isInStock === currentItemStatus) {
      return;
    }
    item.isInStock = currentItemStatus;
    if (item.isInStock) {
      sendTextAlert(item, store.nameStandardized);
    }
  });
};

app();
