import {ChannelType, Guild, TextChannel, VoiceChannel} from "discord.js";

export async function createChannel(name: string, parentId: string, guild: Guild, isVoice: boolean = false) {
    if (isVoice) {
        return await guild.channels.create({
            name: name,
            parent: parentId,
            type: ChannelType.GuildVoice,
        }) as VoiceChannel;
    }
    return await guild.channels.create({
        name: name,
        parent: parentId,
    }) as TextChannel | VoiceChannel;
}