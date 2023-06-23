import {event} from "../../utils";
import {Namespaces, selectComponent} from "../../pages/ticket";
import {sendEphemeralReply} from "../../utils/messageEphemera";

export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isButton()) {
        return;
    }

    const [namespace] = interaction.customId.split(';');
    if (Namespaces.openTicket === namespace){
        try {
           const ephemeraMessage = await sendEphemeralReply(interaction, selectComponent());
            //TODO: verificar se da para deletar mensagem pelo id se der criar uma tabela so de mensagens a serem deletadas
        }catch (err) {
            console.error(err)
        }
    }
});
