import {createId, event} from "../../utils";
import {buttonSendTicketComponent, Namespaces} from "../../pages/ticket";
import {SelectMenuInteraction} from "discord.js";
import {sendEditEphemeralReply} from "../../utils/messageEphemera";

export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isSelectMenu()) {
        return;
    }

    let [namespace] = interaction.customId.split(';');
    if (Namespaces.selectCategory === namespace){
        try {
            let newIid = createId(
                namespace,
                interaction.user.username,
                interaction.user.id,
                (interaction as SelectMenuInteraction).values[0],
            )

            await interaction.deferUpdate();
            if (interaction.isStringSelectMenu()) {
                return await sendEditEphemeralReply(interaction, buttonSendTicketComponent(false, newIid));
            }
        }catch (err) {
            console.error(err)
        }
    }
});