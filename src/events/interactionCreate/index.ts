import { Event } from '../../types'
import commands from './commands'
import help from './help'
import ticket from "./ticket";

const events: Event<any>[] = [
    commands,
    help,
    ticket,
]

export default events