import 'dotenv/config';
import { sendTextAlert } from './alert';
import { store } from './types';
import { STORES } from './stores/stores';
import { checkIfInStock as targetCheckIfInStock } from './stores/target';

const storesToQuery: Array<store> = [
  {
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
    checkIfInStock: targetCheckIfInStock,
  },
];

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
      sendTextAlert(item);
    }
  });
};

app();
