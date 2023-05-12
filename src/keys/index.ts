import { Keys } from '../types';

const keys: Keys = {
  clientToken: process.env.CLIENT_TOKEN || '',
  testGuild: process.env.TEST_GUILD || '',
};

if (Object.values(keys).some((value) => value === '')) {
  throw new Error('Missing required environment variable.');
}

export default keys;
