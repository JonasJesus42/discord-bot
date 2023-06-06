import {APIEmbedField, ButtonStyle, EmbedBuilder, InteractionReplyOptions} from "discord.js";
import {ActionRowBuilder, ButtonBuilder, SelectMenuBuilder} from "@discordjs/builders";

export const Namespaces = {
    root: 'open_menu_ticket_button',
    select: 'select_category',
    action: 'open_ticket_button',
    accept: 'accepted_ticket_button',
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

export function buttonSendTicketComponent(disabled: boolean = false, selectValue?: string): InteractionReplyOptions {
    const embed = new EmbedBuilder()
        .setTitle(`Antes de enviar o ticket para equipe de ${selectValue} certifique de:`)
        .setDescription('1° Ter passado 30 minutos para debugar ou tentado achar uma solução\n ' +
            '2° Ter pesquisado no google\n' + '3° Ter pesquisado no stackoverflow\n')

    const sendTicket =  new ButtonBuilder()
        .setCustomId('open_ticket_button')
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

export function embedSupportRequest(UserName: string, disabled: boolean = false): InteractionReplyOptions {
    const embed = new EmbedBuilder()
        .setTitle(`${UserName} Solicita um soporte técnico`)
        .setDescription('Voce tem a disponibilidade para atender ?')

    const accepted =  new ButtonBuilder()
        .setCustomId('accepted_ticket_button')
        .setStyle(ButtonStyle.Success)
        .setLabel('Aceitar')
        .setDisabled(disabled)

    const refuse =  new ButtonBuilder()
        .setCustomId('refuse_ticket_button')
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