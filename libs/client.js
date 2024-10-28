import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'm3prshn42e',
  apiKey: process.env.API_KEY,
});
