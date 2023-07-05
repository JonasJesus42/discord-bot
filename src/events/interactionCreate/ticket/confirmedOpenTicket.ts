import { createId, EditReply, event, sendMessageUser } from '../../../utils';
import {
  buttonSendTicketComponent,
  embedSupportRequest,
  Namespaces,
} from '../../../pages/ticket';
import {IService, Service} from "../../../schemas/service";
let supportsGuildId: string[] = ['607266543859925014', '1125856563060547756'];
export default event(
  'interactionCreate',
  async ({ log: LoggerFunction }, interaction: any) => {
    if (!(interaction.customId.includes(Namespaces.confirmedOpenTicket) && interaction.isButton())) return

    try {
        await interaction.deferUpdate();

        let newId = createId(
        interaction.user.username,
        interaction.user.id,
        interaction.customId.split(';')[1]
        );

        await createService(newId);

        for (const guruId of supportsGuildId) {
            await sendMessageUser(embedSupportRequest(newId, guruId), guruId)
        }

        await interaction.editReply(
            buttonSendTicketComponent(true, "noId")
        );
        await interaction.editReply(
            EditReply.success('Ticket enviado com sucesso!')
        );
    } catch (err) {
      console.error(err);
    }
  }
);

async function createService(newId: string){
    const [ userName, userId, typeSupport] = newId.split(';')

    const service = await Service.findOne({
        guildId: userId,
        waitingService: true,
    })
    console.log(service)
    if (service) {
        return
    }

    const newService = new Service({
        name: userName,
        guildId: userId,
        waitingService: true,
        typeSupport: typeSupport,
    })

    await newService.save();
}