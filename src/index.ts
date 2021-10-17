import 'dotenv/config';
import { sendTextAlert } from './alert';
import { store } from './types';
import target from './stores/target';
import bestbuy from './stores/bestbuy';

const storesToQuery: Array<store> = [target, bestbuy];
const interval = Number(process.env.INTERVAL);

export const app = () => {
  console.log('App has started...');

  // query for changes every 5 minutes
  setInterval(
    () =>
      storesToQuery.forEach((store) => {
        checkItemsInStore(store);
      }),
    interval
  );
};

export const checkItemsInStore = (store: store) => {
  store.itemsToCheck.forEach(async (item) => {
    const currentItemStatus = await store.checkIfInStock(item);
    if (item.isInStock === true && item.isInStock === currentItemStatus) {
      console.log(
        `${item.name} is still in stock at ${store.nameStandardized}`
      );
      return;
    }
    item.isInStock = currentItemStatus;
    if (item.isInStock) {
      console.log(
        `${item.name} is now in stock at ${store.nameStandardized}. Sending notification.`
      );
      sendTextAlert(item, store.nameStandardized);
      return;
    }
    console.log(`${item.name} is out of stock at ${store.nameStandardized}`);
    return;
  });
};

app();
