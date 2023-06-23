import {
    event,
    Reply,
    sendMessageUser,
    getUserName,
    deleteChannelAfterDelay,
    createChannel,
    sendMessageToUsersSupports,
    EditReply, createId
} from "../../utils";
import { SelectMenuInteraction, VoiceChannel, TextChannel } from "discord.js";
import { buttonSendTicketComponent, Namespaces, selectComponent, embedSupportRequest } from "../../pages/ticket";
import { DiscordInteractionHandler } from "../InteractionHandler/discordInteractionHandler";
import { client } from "../../client";
import {Guru, IGuru} from "../../schemas/guru";
import {TicketHandle} from "./ticketHandle";

let supportsGuildId: string[] = ["607266543859925014", "979712919786897479", "1061986502038536192"];
const categoryId: string = '1106726198840655914';
let guild: any = null;
let index: number = 0;

Guru.find<IGuru>({ inAttendance: false }).then((docs) => {
    supportsGuildId = docs.map((doc) => doc).map((guild) => guild.guildId)
})

export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isButton() && !interaction.isSelectMenu()) {
        return;
    }

    let [namespace] = interaction.customId.split(';');

    if (guild === null) {
        guild = interaction.guild;
    }

    const ticketHandle = new TicketHandle(interaction.user.id, interaction.user.username, client);

    switch (namespace) {
        case Namespaces.root:

            return ticketHandle.sendEphemeralReply(interaction, selectComponent());
        case Namespaces.select:
            //verificando valor selecionado e criando o id
            let newIid = createId(
                Namespaces.select,
                interaction.user.username,
                interaction.user.id,
                (interaction as SelectMenuInteraction).values[0],
            )

            //atualizando o componente de seleção para um aviso com botoes
            await interaction.deferUpdate();
            if (interaction.isStringSelectMenu()) {
                return await interaction.editReply(buttonSendTicketComponent(false, newIid))
            }
            return;
        case Namespaces.action:
            //verificando a ação de enviar ticket
            await interaction.deferUpdate();
            console.log((interaction as SelectMenuInteraction))
            let newId = createId(
                Namespaces.select,
                interaction.user.username,
                interaction.user.id,
                (interaction as SelectMenuInteraction).values[0],
            )
            //mandando mensagem para todos os suportes
            supportsGuildId.map(async (guildId) => sendMessageUser(embedSupportRequest(newId, guildId), guildId));

            // atualiznado componente para delabilitar botão
            await interaction.editReply(buttonSendTicketComponent(true, interaction.customId));
            //mudando a mensagem avisando que foi enviado
            await interaction.editReply(EditReply.success('Ticket enviado com sucesso!'));
            return;
        case Namespaces.accept:
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

            await sendMessageToUsersSupports(userId, supportsGuildId[index], textChannel.id);

            await deleteChannelAfterDelay(textChannel.id);
            await deleteChannelAfterDelay(voiceChannel.id);
            return;
        case Namespaces.refuse:
            await interaction.deferUpdate();

            index++;
            namespace = Namespaces.action;
            await sendMessageUser(embedSupportRequest(await getUserName('asdasd')), supportsGuildId[index]);
            await interaction.editReply(EditReply.success('Certo, o suporte vai ser solicitado de outra pessoa!'));
            return;
        default:
            throw new Error('Invalid namespace reached...');
    }
});
