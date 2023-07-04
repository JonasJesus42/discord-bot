import { client } from '../client';

export async function sendMessageUser(message: any, userID: string) {
  const user = await client.users.fetch(userID);

  await user.send(message);
}
