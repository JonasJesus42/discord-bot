import {
  deleteChannelAfterDelay,
  EditReply,
  event,
  getUserName,
  readId,
  sendMessageToUsersSupports,
} from '../../../utils';
import { Namespaces } from '../../../pages/ticket';
import {ChannelType, TextChannel, VoiceChannel} from 'discord.js';
import {client} from "../../../client";
import * as Process from "process";
import {includes} from "lodash";
import {Service} from "../../../schemas/service";

export default event('interactionCreate', async ({ log }, interaction: any) => {
  if (!(interaction.customId.includes(Namespaces.acceptedTicket) && interaction.isButton()))
    return;

  let supportsGuildId: string[] = ['607266543859925014'];

  try {
    await interaction.deferUpdate();
    const [namespace, userName, userId, guruId] = readId(
      interaction.customId
    );

    await updateService(userId, guruId, interaction);

    // const roomName = `${userName}-${await getUserName(guruId)}`;
    //
    // const [voiceChannel, textChannel] = await creatingTextVoiceChannel(roomName);
    //
    // await interaction.editReply(
    //   EditReply.success(`Se direcione para a sala ${roomName}!`)
    // );
    //
    // await sendMessageToUsersSupports(
    //   userId,
    //   supportsGuildId[0],
    //   textChannel.id
    // );
    //
    // await deleteChannelAfterDelay(textChannel.id);
    // await deleteChannelAfterDelay(voiceChannel.id);
  } catch (error) {
    console.log(error);
  }
});

async function creatingTextVoiceChannel(
  roomName: string,
): Promise<[VoiceChannel, TextChannel]> {
  const guild = await client.guilds.fetch(Process.env.GUILD as string);
  const categoryId = Process.env.CATEGORY_ID as string;

  const textChannel = (await guild.channels.create({
    name: roomName,
    parent: categoryId,
  })) as TextChannel

  const voiceChannel = (await guild.channels.create({
    name: roomName,
    parent: categoryId,
    type: ChannelType.GuildVoice,
  })) as VoiceChannel;

  return [voiceChannel, textChannel];
}

async function updateService(userId: string, guruId: string, interaction: any) {
  const service = await Service.findOne({
    guildId: userId,
    waitingService: true,
  })

  if (!service) {
    await interaction.editReply(
        EditReply.error('Ticket já foi aceito por outro guru!')
    );
    return;
  }

  const updateService = {
    waitingService: false,
    guruId: guruId,
  }

  await service.updateOne(updateService);
}
