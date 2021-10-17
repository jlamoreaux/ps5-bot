export type item = {
  name: string;
  url: string;
  isInStock: boolean;
  lastNotification: number;
};

export type store = {
  name: string;
  nameStandardized: string;
  itemsToCheck: Array<item>;
  checkIfInStock: Function;
};
