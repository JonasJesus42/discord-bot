import {
    CacheType,
    Client,
    Interaction,
    InteractionReplyOptions,
    InteractionResponse,
    Message, MessageComponentInteraction,
    MessagePayload
} from "discord.js";

export interface InteractionHandler {
    name: string;
    run: (client: Client, interaction: Interaction) => Promise<void>;
}

export class DiscordInteractionHandler {
    private readonly client: Client;
    private readonly handlers: InteractionHandler[] = [
        // new TicketSupportLogic(),
        // new DatabaseIntegration()
    ];

    constructor(client: Client) {
        this.client = client;
        this.handlers = [];
    }

    public registerHandler(handler: InteractionHandler): void {
        this.handlers.push(handler);
    }

    public registerHandlers(handlers: InteractionHandler[]): void {
        this.handlers.push(...handlers);
    }

    public registerAllHandlers(): void {
        // Register all handlers here
        // Example:
        // this.registerHandler(new MyCustomInteractionHandler());
    }

    public listen(): void {
        this.client.on("interactionCreate", async (interaction) => {
            if (!interaction.isCommand()) {
                return;
            }

            const handler = this.handlers.find(
                (h) => h.name === interaction.commandName
            );

            if (!handler) {
                console.warn(`No handler found for command ${interaction.commandName}`);
                return;
            }

            try {
                await handler.run(this.client, interaction);
            } catch (error) {
                console.error(`Error while handling command ${interaction.commandName}: ${error}`);
                await interaction.reply({ content: "Ocorreu um erro ao processar o seu comando", ephemeral: true });
            }
        });
    }
}