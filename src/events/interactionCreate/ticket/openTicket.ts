import { event } from '../../../utils';
import { Namespaces, selectComponent } from '../../../pages/ticket';
import { sendEphemeralReply } from '../../../utils/messageEphemera';

export default event('interactionCreate', async ({ log: LoggerFunction }, interaction: any) => {
  if (!(interaction.customId.includes(Namespaces.openTicket) && interaction.isButton())) return;

  try {
    const ephemeraMessage = await sendEphemeralReply(
      interaction,
      selectComponent()
    );
    //TODO: verificar se da para deletar mensagem pelo id se der criar uma tabela so de mensagens a serem deletadas
  } catch (err) {
    console.error(err);
  }
});
