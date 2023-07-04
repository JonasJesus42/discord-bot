import { Event } from '../../types';
import commands from './commands';
import help from './help';
import openTicket from './ticket/openTicket';
import selectCategory from './ticket/selectCategory';
import confirmedOpenTicket from './ticket/confirmedOpenTicket';
import acceptedTicket from './ticket/acceptedTicket';
import refusedTicket from './ticket/refuseTicket';

const events: Event<any>[] = [
  commands,
  help,
  openTicket,
  selectCategory,
  confirmedOpenTicket,
  acceptedTicket,
  refusedTicket,
];

export default events;
