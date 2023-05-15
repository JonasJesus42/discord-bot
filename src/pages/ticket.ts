import {APIEmbedField, ButtonStyle, EmbedBuilder, InteractionReplyOptions} from "discord.js";
import {ActionRowBuilder, ButtonBuilder, SelectMenuBuilder} from "@discordjs/builders";

export const Namespaces = {
    root: 'open_menu_ticket_button',
    select: 'select_category',
    action: 'open_ticket_button'
}

export function selectComponent(): InteractionReplyOptions {
    const embed = new EmbedBuilder()
        .setTitle('Selecione a Áreas de Conhecimento')

    const categories = [
        {
            label: 'Front-end',
            value: 'front-end',
        },
        {
            label: 'Back-end',
            value: 'back-end',
        }
    ]

    const select = new SelectMenuBuilder()
        .setCustomId("select_category")
        .setPlaceholder('Áreas de Conhecimento')
        .setMaxValues(1)
        .setOptions(categories)

    const component = [
        new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(select),
    ]


    return {
        embeds: [embed],
        components: component,
        ephemeral: true,
    }
}

export function buttonSendTicketComponent(selectValue: string): InteractionReplyOptions {
    const embed = new EmbedBuilder()
        .setTitle(`Antes de enviar o ticket para equipe de ${selectValue} certifique de:`)
        .setDescription('1° Ter passado 30 minutos para debugar ou tentado achar uma solução\n ' +
            '2° Ter pesquisado no google\n' + '3° Ter pesquisado no stackoverflow\n')

    const sendTicket =  new ButtonBuilder()
        .setCustomId('open_ticket_button')
        .setStyle(ButtonStyle.Success)
        .setLabel('Enviar Ticket')

    const component = [
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(sendTicket)
    ]

    return {
        embeds: [embed],
        components: component,
        ephemeral: true,
    }
}