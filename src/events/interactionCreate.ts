import commands from "../commands";
import { Command } from "../types";
import { EditReply, event, Reply} from "../utils";

const allCommands = commands.map(({ commands }) => commands).flat()
const allCommandsMap = new Map<string, Command>(
    allCommands.map((command) => [command.meta.name, command])
)

export default event("interactionCreate", async (
    {
        log, client
    },
    interaction
) => {
    if (!interaction.isChatInputCommand()) return
    
    try {
        const commandName = interaction.commandName
        const command = allCommandsMap.get(commandName)

        if(!command) throw new Error(`Command ${commandName} not found`)

        await command.exec({
            interaction,
            client,
            log(...args) {
                log(`[Command ${command.meta.name}]`, ...args)
            },
        })
    } catch (err) {
        log('[Command Error]', err)

        if (interaction.deferred){
            return await interaction.editReply(
                EditReply.error('Something went wrong :(')
            )
        }

        return await interaction.reply(
            Reply.error('Something went wrong :(')
        )
    }
})
