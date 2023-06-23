import {APIEmbedField, ButtonStyle, EmbedBuilder, InteractionReplyOptions} from "discord.js";
import {ActionRowBuilder, ButtonBuilder, SelectMenuBuilder} from "@discordjs/builders";
import {createId, readId} from "../utils";

export const Namespaces = {
    openTicket: 'open_menu_ticket_button',
    selectCategory: 'select_category',
    confirmedOpenTicket: 'open_ticket_button',
    acceptedTicket: 'accepted_ticket_button',
    refuse: 'refuse_ticket_button',

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
    }
}

export function buttonSendTicketComponent(disabled: boolean = false, newId: string): InteractionReplyOptions {
    const [_namespace, userName, userId, categoryName] = readId(newId)

    const embed = new EmbedBuilder()
        .setTitle(`Antes de enviar o ticket para equipe de ${categoryName} certifique de:`)
        .setDescription('1° Ter passado 30 minutos para debugar ou tentado achar uma solução\n ' +
            '2° Ter pesquisado no google\n' + '3° Ter pesquisado no stackoverflow\n')

    const id = createId('open_ticket_button', categoryName)
    const sendTicket =  new ButtonBuilder()
        .setCustomId(id)
        .setStyle(ButtonStyle.Success)
        .setLabel('Enviar Ticket')
        .setDisabled(disabled)

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

export const embed = new EmbedBuilder()
    .setTitle('Ticket de Suporte Tecnico')
    .setColor('#00ff00')

export const component = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
        .setCustomId('open_menu_ticket_button')
        .setLabel('Abrir Ticket')
        .setStyle(ButtonStyle.Success),
)

export function embedSupportRequest(customId: string,  guildId?: string, disabled: boolean = false,): InteractionReplyOptions {
    const [_namespace, userName, userId, stack] = customId.split(';')
    console.log(guildId)
    const embed = new EmbedBuilder()
        .setTitle(`${userName} Solicita um soporte técnico para ${stack}`)
        .setDescription('Voce tem a disponibilidade para atender ?')

    const acceptedId = createId(Namespaces.confirmedOpenTicket, userName, userId, guildId)
    const accepted =  new ButtonBuilder()
        .setCustomId(acceptedId)
        .setStyle(ButtonStyle.Success)
        .setLabel('Aceitar')
        .setDisabled(disabled)

    const refuseId = createId(Namespaces.refuse, userName)
    const refuse =  new ButtonBuilder()
        .setCustomId(refuseId)
        .setStyle(ButtonStyle.Danger)
        .setLabel('Recusar')
        .setDisabled(disabled)

    const component = [
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(refuse, accepted)
    ]

    return {
        embeds: [embed],
        components: component,
        ephemeral: true,
    }
}