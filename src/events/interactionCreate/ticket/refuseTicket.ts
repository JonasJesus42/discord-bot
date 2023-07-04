import { EditReply, event } from '../../../utils';
import { Namespaces, selectComponent } from '../../../pages/ticket';

export default event('interactionCreate', async ({ log: LoggerFunction }, interaction: any) => {
  if (!(interaction.customId.includes(Namespaces.refuseTicket) && interaction.isButton())) return

  let index: number = 0;
  await interaction.deferUpdate();

  index++;
  //await sendMessageUser(embedSupportRequest(await getUserName('asdasd')), supportsGuildId[index]);
  await interaction.editReply(
    EditReply.success('Certo, o suporte vai ser solicitado de outra pessoa!')
  );
  //TODO: adicionar componente de recusar
  interaction.deleteReply();
});
