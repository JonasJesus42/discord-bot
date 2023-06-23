import { Event } from '../../types'
import commands from './commands'
import help from './help'
import openTicket from "./openTicket";
import selectCategory from "./selectCategory";
import confirmedOpenTicket from "./confirmedOpenTicket";
import acceptedTicket from "./acceptedTicket";
import refusedTicket from "./refuseTicket"

const events: Event<any>[] = [
    commands,
    help,
    openTicket,
    selectCategory,
    confirmedOpenTicket,
    acceptedTicket,
    refusedTicket
]

export default events