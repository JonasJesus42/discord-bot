import {
    createChannel,
    deleteChannelAfterDelay,
    EditReply,
    event,
    getUserName,
    sendMessageToUsersSupports
} from "../../utils";
import {Namespaces} from "../../pages/ticket";
import {TextChannel, VoiceChannel} from "discord.js";

export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isButton()) {
        return;
    }
    const categoryId: string = '1106726198840655914';
    let supportsGuildId: string[] = ["607266543859925014"];
    let guild: any = null;
    if (guild === null) {
        guild = interaction.guild;
    }

    const [namespace] = interaction.customId.split(';');
    if(Namespaces.acceptedTicket === namespace){
        await interaction.deferUpdate();
        let textChannel: TextChannel | null = null;
        let voiceChannel: VoiceChannel | null = null;

        const [namespaceAccept, username, userId, guruId] = interaction.customId.split(';');

        const roomName = `${username}-${await getUserName(guruId)}`;
        try {
            textChannel = await createChannel(roomName, categoryId, guild) as TextChannel;
            voiceChannel = await createChannel(roomName, categoryId, guild, true) as VoiceChannel;
        } catch (error) {
            console.log(error);
        }
        await interaction.editReply(EditReply.success(`Se direcione para a sala ${roomName}!`));

        if (textChannel === null || voiceChannel === null) {
            return;
        }

        await sendMessageToUsersSupports(userId, supportsGuildId[0], textChannel.id);

        await deleteChannelAfterDelay(textChannel.id);
        await deleteChannelAfterDelay(voiceChannel.id);
    }
});