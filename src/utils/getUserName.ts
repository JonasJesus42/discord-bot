import {client} from "../client";
import {User} from "discord.js";

export async function getUserName( userId: string | null): Promise<string> {
    if (!userId) return ""
    try {
        // Busca o usuário usando o ID
        const user: User | null = await client.users.fetch(userId);

        // Retorna o nome do usuário
        return user?.username || 'Nome do usuário não encontrado';
    } catch (error) {
        console.error('Erro ao obter o nome do usuário:', error);
        return 'Erro ao obter o nome do usuário';
    }
}