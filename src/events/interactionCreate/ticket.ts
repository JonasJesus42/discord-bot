import {
    event,
    EditReply,
} from "../../utils";
import {  Namespaces } from "../../pages/ticket";

let supportsGuildId: string[] = ["607266543859925014", "979712919786897479"];
const categoryId: string = '1106726198840655914';
let guild: any = null;
let index: number = 0;



export default event('interactionCreate', async ({ log }, interaction) => {
    if (!interaction.isButton() && !interaction.isSelectMenu()) {
        return;
    }

    let [namespace] = interaction.customId.split(';');

    if (guild === null) {
        guild = interaction.guild;
    }

    switch (namespace) {

        case Namespaces.refuse:
            await interaction.deferUpdate();

            index++;
            namespace = Namespaces.confirmedOpenTicket;
            //await sendMessageUser(embedSupportRequest(await getUserName('asdasd')), supportsGuildId[index]);
            await interaction.editReply(EditReply.success('Certo, o suporte vai ser solicitado de outra pessoa!'));
            //TODO: adicionar componente de recusar
            interaction.deleteReply()
            return;
    }
});
