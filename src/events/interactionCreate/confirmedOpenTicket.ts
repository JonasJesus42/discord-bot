import {createId, EditReply, event, sendMessageUser} from "../../utils";
import {buttonSendTicketComponent, embedSupportRequest, Namespaces} from "../../pages/ticket";


export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isButton()) {
        return;
    }

    let supportsGuildId: string[] = ["607266543859925014"];

    const [namespace] = interaction.customId.split(';');
    if (Namespaces.confirmedOpenTicket === namespace){
        try {
            await interaction.deferUpdate();

            let newId = createId(
                //Namespaces.select,
                interaction.user.username,
                interaction.user.id,
                interaction.customId.split(';')[1],
            )

            supportsGuildId.map(async (guildId) => sendMessageUser(embedSupportRequest(newId, guildId), guildId));

            await interaction.editReply(buttonSendTicketComponent(true, interaction.customId));
            await interaction.editReply(EditReply.success('Ticket enviado com sucesso!'));
        }catch (err) {
            console.error(err)
        }
    }
});