import { Event } from '../../types'
import commands from './commands'
import help from './help'
import ticket from "./ticket";
import openTicket from "./openTicket";
import selectCategory from "./selectCategory";
import confirmedOpenTicket from "./confirmedOpenTicket";
import acceptedTicket from "./acceptedTicket";

const events: Event<any>[] = [
    commands,
    help,
    ticket,
    openTicket,
    selectCategory,
    confirmedOpenTicket,
    acceptedTicket,
]

export default events