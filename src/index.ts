import 'dotenv/config';

import axios, { Axios, AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { Twilio } from 'twilio';

const accountSid: string = process.env.TWILIO_SID;
const authToken: string = process.env.TWILIO_TOKEN;

const client = new Twilio(accountSid, authToken);

type item = {
  name: string;
  url: string;
  isInStock: boolean;
  lastNotification: number;
};

const app = () => {
  const itemsToQuery: Array<item> = [
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
  ];

  setInterval(
    () => itemsToQuery.forEach((item) => checkIfInStock(item)),
    300000
  );
};

const checkIfInStock = async (item: item) => {
  const status: Number = await fetchPage(item.url);
  if (status === 200) {
    if (item.isInStock) {
      return;
    }
    soundTheAlarm(item);
    item.isInStock = true;
    return;
  }
  item.isInStock = false;
  return;
};

const soundTheAlarm = async (item: item) => {
  console.log(
    `${item.name.toUpperCase()} IS IN STOCK!!!\nFind it here: ${item.url}`
  );
  await client.messages
    .create({
      body: `${item.name.toUpperCase()} IS IN STOCK!!!\nFind it here: ${
        item.url
      }`,
      to: process.env.PHONE_NUMBER,
      from: process.env.TWILIO_NUMBER,
    })
    .then((message) => console.log(`Message sent! SID: ${message.sid}`))
    .catch((err) => console.log(err));
};

const fetchPage = async (url: string) => {
  let status: Number;
  const response = await axios
    .get(url)
    .then((response: AxiosResponse) => {
      console.log({
        date: Date().toString(),
        status: response.status,
        text: response.statusText,
        url: response.config?.url,
      });
      return response.status;
    })
    .catch((err: AxiosError) => {
      const response = err.response;
      console.log({
        date: Date().toString(),
        status: response.status,
        text: response.statusText,
        url: response.config?.url,
      });
      return response.status;
    });
  return response;
};

app();
