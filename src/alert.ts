import { Twilio } from 'twilio';
import { item } from './types';

const accountSid: string = process.env.TWILIO_SID;
const authToken: string = process.env.TWILIO_TOKEN;

const client = new Twilio(accountSid, authToken);

/**
 * Sends SMS message to alert that the item is in stock
 * @param item the item that is triggering the notification
 */
export const sendTextAlert = async (item: item, store: string) => {
  await client.messages
    .create({
      body: `${item.name.toUpperCase()} IS IN STOCK AT ${store.toUpperCase()}!!!\nFind it here: ${
        item.url
      }`,
      to: process.env.PHONE_NUMBER,
      from: process.env.TWILIO_NUMBER,
    })
    .then((message) => {
      item.lastNotification = Date.now();
      const logData = {
        message: 'Notification Sent!',
        item: item.name,
        time: item.lastNotification,
        messageSid: message.sid,
      };
      console.log(logData);
    })
    .catch((err) => console.log(err));
};
