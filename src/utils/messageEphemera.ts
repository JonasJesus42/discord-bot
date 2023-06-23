import {InteractionReplyOptions, MessageComponentInteraction} from "discord.js";
const SECONDS_DELETE_MESSAGE_EPHEMERAL: number = 30000
export async function sendEphemeralReply(interaction: MessageComponentInteraction , content: InteractionReplyOptions): Promise<any> {
    const {embeds, components} = content
    const reply = await interaction.reply({ embeds, components, ephemeral: true });
    await deleteEphemeralMessage(reply, SECONDS_DELETE_MESSAGE_EPHEMERAL);
    return reply;
}
export async function deleteEphemeralMessage(message: any, delay: number): Promise<void> {
    setTimeout(async () => {
        try {
            await message.delete();
        } catch (error) {
            console.error(`Erro ao excluir mensagem: ${error}`);
        }
    }, delay);
}

export async function sendEditEphemeralReply(interaction: MessageComponentInteraction , content: InteractionReplyOptions): Promise<void> {
    const {embeds, components} = content
    const reply = await interaction.editReply({ embeds, components });
}