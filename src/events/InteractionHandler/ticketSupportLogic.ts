import { Client, TextChannel, VoiceChannel } from "discord.js";
import { sendMessageUser, getUserName, deleteChannelAfterDelay, createChannel } from "../../utils";

const supportsUsersIds: string[] = ["607266543859925014", "1104155034016567366"];
const categoryId: string = '1106726198840655914';

export async function handleTicketSupport(client: Client, userID: string, supportUserId: string | null): Promise<void> {
    const roomName = `${await getUserName(userID)}-${await getUserName(supportUserId ?? "")}`;

    let textChannel: TextChannel | null = null;
    let voiceChannel: VoiceChannel | null = null;

    try {
        // Criação dos canais de texto e voz
        textChannel = await createChannel(roomName, categoryId, client.guilds.cache.first()) as TextChannel;
        voiceChannel = await createChannel(roomName, categoryId, client.guilds.cache.first(), true) as VoiceChannel;
    } catch (error) {
        console.log(error);
    }

    if (textChannel === null || voiceChannel === null) {
        // Tratamento de erro caso a criação dos canais falhe
        console.log("Erro ao criar canais.");
        return;
    }

    // Envio de mensagens para os usuários de suporte
    for (const supportUserId of supportsUsersIds) {
        await sendMessageUser(`Ticket aberto por: ${await getUserName(userID)}`, supportUserId);
    }

    // Exclusão dos canais após um atraso
    await deleteChannelAfterDelay(textChannel.id);
    await deleteChannelAfterDelay(voiceChannel.id);
}
