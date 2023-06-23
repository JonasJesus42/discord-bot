import {Client, InteractionReplyOptions, MessageComponentInteraction} from "discord.js";

const SECONDS_DELETE_MESSAGE_EPHEMERAL: number = 30000
export class TicketHandle {
    private readonly userId: string;
    private readonly userName: string;
    private readonly client: Client;
    // private readonly curlerGuruID: string;
    // private readonly curlerGuruName: string;

    constructor(userId: string, userName: string, client: Client){
        this.userId = userId;
        this.userName = userName;
        this.client = client;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getUserName(): string {
        return this.userName;
    }

    public async sendEphemeralReply(interaction: MessageComponentInteraction , content: InteractionReplyOptions): Promise<void> {
        const {embeds, components} = content
        const reply = await interaction.reply({ embeds, components, ephemeral: true });
        await this.deleteEphemeralMessage(reply, SECONDS_DELETE_MESSAGE_EPHEMERAL);
    }

    private async deleteEphemeralMessage(message: any, delay: number): Promise<void> {
        setTimeout(async () => {
            try {
                await message.delete();
            } catch (error) {
                console.error(`Erro ao excluir mensagem: ${error}`);
            }
        }, delay);
    }

    public async sendEditEphemeralReply(interaction: MessageComponentInteraction , content: InteractionReplyOptions): Promise<void> {
        const {embeds, components} = content
        const reply = await interaction.editReply({ embeds, components });
    }


}