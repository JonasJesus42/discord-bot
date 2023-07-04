import { createId, EditReply, event, sendMessageUser } from '../../../utils';
import {
  buttonSendTicketComponent,
  embedSupportRequest,
  Namespaces,
} from '../../../pages/ticket';
let supportsGuildId: string[] = ['607266543859925014'];
export default event(
  'interactionCreate',
  async ({ log: LoggerFunction }, interaction: any) => {
    const [namespace] = interaction.customId.split(';');
    if (
      !(
          Namespaces.confirmedOpenTicket === namespace && interaction.isButton()
      )
    ) return

    try {
      await interaction.deferUpdate();

      let newId = createId(
        interaction.user.username,
        interaction.user.id,
        interaction.customId.split(';')[1]
      );

      supportsGuildId.map(async (guildId) =>
        sendMessageUser(embedSupportRequest(newId, guildId), guildId)
      );

      // await interaction.editReply(
      //   buttonSendTicketComponent(true, "noId")
      // );
      await interaction.editReply(
        EditReply.success('Ticket enviado com sucesso!')
      );
    } catch (err) {
      console.error(err);
    }
  }
);
