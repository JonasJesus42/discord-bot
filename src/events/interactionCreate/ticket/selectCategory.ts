import { createId, event } from '../../../utils';
import { buttonSendTicketComponent, Namespaces } from '../../../pages/ticket';
import { SelectMenuInteraction } from 'discord.js';
import { sendEditEphemeralReply } from '../../../utils/messageEphemera';

export default event('interactionCreate', async ({ log: LoggerFunction }, interaction: any) => {
  let [namespace] = interaction.customId.split(';');
  if (!(interaction.customId.includes(Namespaces.selectCategory) && interaction.isStringSelectMenu()))
    return;

  try {
    let newId = createId(
      namespace,
      interaction.user.username,
      interaction.user.id,
      (interaction as SelectMenuInteraction).values[0]
    );

    await interaction.deferUpdate();
    return await sendEditEphemeralReply(
      interaction,
      buttonSendTicketComponent(false, newId)
    );
  } catch (err) {
    console.error(err);
  }
});
