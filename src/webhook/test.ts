import { EmbedBuilder, ButtonStyle} from 'discord.js';
import keys from "../keys";
import {ActionRowBuilder, ButtonBuilder} from "@discordjs/builders";

export const embed = new EmbedBuilder()
    .setTitle('Ticket de Suporte Tecnico')
    .setColor('#00ff00')

export const component = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
        .setCustomId('open_menu_ticket_button')
        .setLabel('Abrir Ticket')
        .setStyle(ButtonStyle.Success),
)
