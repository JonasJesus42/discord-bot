import {Client} from "discord.js";

export class TicketHandle {
    private readonly userId: string;
    private readonly userName: string;
    private readonly client: Client;

    constructor(userId: string, userName: string, client: Client){
        this.userId = userId;
        this.userName = userName;
        this.client = client;
    }


}