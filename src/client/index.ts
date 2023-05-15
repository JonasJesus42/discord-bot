import {
  ButtonStyle,
  Client,
  GatewayIntentBits,
  TextChannel,
} from 'discord.js';
import keys from '../keys';
import { registerEvents } from '../utils';
import events from '../events';
import {component, embed} from "../webhook/test";
import ticket from "../events/interactionCreate/ticket";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
});

registerEvents(client, events);

client.on('ready', (client) => {
  const channel = client.channels.cache.get(keys.testChannel);

  if (channel instanceof TextChannel) {
    channel.bulkDelete(100)
        .then(messages => console.log(`Apagou ${messages.size} mensagens`))
        .catch(console.error);
    channel.send({ embeds: [embed] , components: [component] })
        .then(() => console.log(`Mensagem enviada com sucesso para o canal ${channel.name}!`))
        .catch((error: any) => console.error(`Erro ao enviar mensagem para o canal ${channel.name}:`, error));
  } else {
    console.error(`O canal ${channel} não é um canal de texto!`);
  }
});

client
  .login(keys.clientToken)
  .then(() => {
    console.log('Logged in!');
  })
  .catch((error) => {
    console.error('Failed to log in!', error);
    process.exit(1);
  });
