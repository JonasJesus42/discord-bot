import {
  ButtonStyle,
  ChannelType,
  Client,
  GatewayIntentBits,
  TextChannel,
} from 'discord.js';
import keys from '../keys';
import { registerEvents } from '../utils';
import events from '../events';
import {component, embed} from "../pages/ticket";
import {getGurusNamesIds} from "./googleSheets";
import {connectToMongoDB} from "./mongoDB";
import {mapSheetGurus} from "../utils/mapSheetGurus";
import _ from "lodash";
import {Guru} from "../schemas/guru";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
});

//connect mongoDB
async function initializeMongoDB(){
  console.log('Connecting to MongoDB')
  const status = await connectToMongoDB()
  if (!status) return

  const data = _.drop(await getGurusNamesIds())
  if (!data) {
    throw new Error('No data found')
  }
  const gurusIds = _.map(data, (item) => _.values(_.pick(item, [1])))

  const existingGurusIds = await Guru.find({ guildId: { $in: gurusIds.flat() } });
  const existingGurusIdValues = existingGurusIds.map(doc => doc.guildId);
  const missingGuildIds = gurusIds
      .flat()
      .filter(guruId => !existingGurusIdValues.includes(guruId))

  try {
    if (!missingGuildIds.length) return
    
    const newsGurus = data.filter((item) => missingGuildIds.includes(item[1]))
    const gurus = mapSheetGurus(newsGurus)
    await Guru.insertMany(gurus)
  }catch (err) {
    console.error(err)
  }
}

initializeMongoDB()

registerEvents(client, events);

client.on('ready', async (client) => {

  const channel = client.channels.cache.get(keys.testChannel)


  if (channel instanceof TextChannel) {
    await channel.bulkDelete(100)
        .then(messages => console.log(`Apagou ${messages.size} mensagens`))
        .catch(console.error);
    await channel.send({embeds: [embed], components: [component]})
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
