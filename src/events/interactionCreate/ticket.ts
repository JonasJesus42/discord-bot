import { EditReply, event, Reply} from "../../utils";
import { SelectMenuInteraction } from "discord.js";
import { buttonSendTicketComponent, Namespaces, selectComponent, component } from "../../pages/ticket";
import {client} from "../../client";

export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isButton() && !interaction.isSelectMenu()) return;
    const [namespace] = interaction.customId.split(';');

    if (!Object.values(Namespaces).includes(namespace)) return;
    try {
        switch(namespace) {
            case Namespaces.root:
                return await interaction.reply(selectComponent())
            case Namespaces.select:
                await interaction.deferUpdate();

                if (interaction.isSelectMenu()) {
                    const selectMenuInteraction = interaction as SelectMenuInteraction;
                    return await interaction.editReply(buttonSendTicketComponent(false, selectMenuInteraction.values[0]));
                }
                return
            case Namespaces.action:
                await interaction.deferUpdate();
                const userID = "607266543859925014";
                const mensagem = 'Olá! Essa é uma mensagem enviada pelo bot em resposta à sua interação.';

                await enviarMensagem(mensagem, userID);
                await interaction.editReply(buttonSendTicketComponent(true));
                return await interaction.editReply(EditReply.success('Ticket enviado com sucesso!'));
            default:
                throw new Error('Invalid namespace reached...')
        }
    } catch (error) {
        log('[Ticket Error]', error);

        if (interaction.deferred)
            return interaction.editReply(EditReply.error('Something went wrong :('));

        return interaction.reply(Reply.error('Something went wrong :('));
    }
});

async function enviarMensagem(mensagem: string, userID: string) {
        const user = await client.users.fetch(userID);

        await user.send(mensagem);
}