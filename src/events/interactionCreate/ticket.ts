import {
    event,
    Reply,
    sendMessageUser,
    getUserName,
    deleteChannelAfterDelay,
    createChannel,
    sendMessageToUsersSupports,
    EditReply
} from "../../utils";
import { SelectMenuInteraction, VoiceChannel, TextChannel } from "discord.js";
import { buttonSendTicketComponent, Namespaces, selectComponent, embedSupportRequest } from "../../pages/ticket";
import { DiscordInteractionHandler } from "../InteractionHandler/discordInteractionHandler";
import { client } from "../../client";

const supportsUsersIds: string[] = ["607266543859925014", "979712919786897479", "1061986502038536192"];
let userID: string | null = null;
let supportUserId: string | null = null;
const categoryId: string = '1106726198840655914';
let guild: any = null;
let index: number = 0;

export default event('interactionCreate', async ({ log }, interaction) => {
    const interactionHandler = new DiscordInteractionHandler(client);

    if (!interaction.isButton() && !interaction.isSelectMenu()) {
        return;
    }

    let [namespace] = interaction.customId.split(';');

    if (guild === null) {
        guild = interaction.guild;
    }

    if (userID === null) {
        userID = interaction.user.id;
    }

    if (!Object.values(Namespaces).includes(namespace)) {
        return;
    }

    if (interaction.isButton() && namespace === Namespaces.accept && supportsUsersIds[index] === null) {
        supportUserId = interaction.user.id;
    }

    const roomName = `${await getUserName(userID)}-${await getUserName(supportUserId)}`;

    console.log(await getUserName(userID), await getUserName(supportUserId));

    switch (namespace) {
        case Namespaces.root:
            return interactionHandler.sendEphemeralReply(interaction, selectComponent());
        case Namespaces.select:
            await interaction.deferUpdate();
            if (interaction.isStringSelectMenu()) {
                const selectMenuInteraction = interaction as SelectMenuInteraction;
                //await interactionHandler.sendEphemeralReply(interaction, buttonSendTicketComponent(false, selectMenuInteraction.values[0]));
            return await interaction.editReply(buttonSendTicketComponent(false, selectMenuInteraction.values[0]))
            }
            return;
        case Namespaces.action:
            await interaction.deferUpdate();
            await sendMessageUser(embedSupportRequest(await getUserName(userID)), supportsUsersIds[index]);
            await interaction.editReply(buttonSendTicketComponent(true));
            console.log("action", Namespaces.action);
            await interaction.editReply(EditReply.success('Ticket enviado com sucesso!'));
            return;
        case Namespaces.accept:
            await interaction.deferUpdate();
            let textChannel: TextChannel | null = null;
            let voiceChannel: VoiceChannel | null = null;
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

            await sendMessageToUsersSupports(userID, supportsUsersIds[index], textChannel.id);

            await deleteChannelAfterDelay(textChannel.id);
            await deleteChannelAfterDelay(voiceChannel.id);
            return;
        case Namespaces.refuse:
            await interaction.deferUpdate();
            console.log("refuse");
            index++;
            namespace = Namespaces.action;
            await sendMessageUser(embedSupportRequest(await getUserName(userID)), supportsUsersIds[index]);
            await interaction.editReply(EditReply.success('Certo, o suporte vai ser solicitado de outra pessoa!'));
            return;
        default:
            throw new Error('Invalid namespace reached...');
    }
});
