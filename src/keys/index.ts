import { Keys } from '../types';

const keys: Keys = {
  clientToken: process.env.CLIENT_TOKEN || '',
  Guild: process.env.GUILD || '',
  testChannel: process.env.TEST_CHANNEL || '',
  CategoryID: process.env.CATEGORY_ID || '',
};

if (Object.values(keys).some((value) => value === '')) {
  throw new Error('Missing required environment variable.');
}

export default keys;
