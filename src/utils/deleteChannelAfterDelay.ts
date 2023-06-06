import {client} from "../client";

export async function deleteChannelAfterDelay(channelId : string) {
    try {
        const channel = await client.channels.fetch(channelId);
        if(!channel) return console.log(`Canal ${channelId} não encontrado.`);
        setTimeout(async () => {
            await channel.delete();
            console.log(`Canal ${channelId} excluído após 5 segundos.`);
        }, 100000);
    } catch (error) {
        console.error(`Erro ao excluir o canal ${channelId}:`, error);
    }
}