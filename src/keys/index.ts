import { Keys } from '../types';

const keys: Keys = {
  clientToken: process.env.CLIENT_TOKEN || '',
};

if (Object.values(keys).some((value) => value === '')) {
  throw new Error('Missing required environment variable.');
}

export default keys;
