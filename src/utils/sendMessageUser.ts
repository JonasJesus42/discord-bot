import { client } from '../client';

export async function sendMessageUser(message: any, userID: string) {
  const user = await client.users.fetch(userID);

  return await user.send(message);
}
