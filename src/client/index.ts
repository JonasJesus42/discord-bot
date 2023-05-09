import { Client, GatewayIntentBits } from 'discord.js';
import keys from "../keys";
import {registerEvents} from "../utils";
import events from "../events";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

registerEvents(client, events)
client.login(keys.clientToken)
    .then(() => {
        console.log('Logged in!');
    }).catch(error => {
        console.error('Failed to log in!', error);
        process.exit(1);
    })

