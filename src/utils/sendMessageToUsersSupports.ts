import {client} from "../client";
import {TextChannel, User} from "discord.js";

export async function sendMessageToUsersSupports(userId: string, supportId: string | null, channelId: string) {
    if (!supportId) return console.log(`Usuário de suporte não encontrado.`);
    try {
        const channel = await client.channels.fetch(channelId) as TextChannel;
        const user = await client.users.fetch(userId) as User;
        const support = await client.users.fetch(supportId) as User;
        await channel.send(`Olá, ${user}!  ${support} vai te ajudar, aguarde ele na sala de ${channel.name}.`);
        console.log(`Mensagem enviada para o usuário ${userId} no canal ${channelId}.`);
    } catch (error) {
        console.error(`Erro ao enviar mensagem para o usuário ${userId} no canal ${channelId}:`, error);
    }
}