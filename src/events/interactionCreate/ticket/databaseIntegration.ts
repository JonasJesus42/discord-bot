import { Pool } from 'pg';

// Configurações do banco de dados
const dbConfig = {
  user: 'seu-usuario',
  password: 'sua-senha',
  host: 'localhost',
  port: 5432,
  database: 'nome-do-banco-de-dados',
};

// Cria uma pool de conexões com o banco de dados
const pool = new Pool(dbConfig);

// Função para inserir um ticket no banco de dados
export async function insertTicket(
  userID: string,
  supportUserID: string
): Promise<void> {
  const query =
    'INSERT INTO tickets (user_id, support_user_id) VALUES ($1, $2)';
  const values = [userID, supportUserID];

  try {
    await pool.query(query, values);
    console.log('Ticket inserido no banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir ticket no banco de dados:', error);
  }
}

// Função para recuperar todos os tickets do banco de dados
export async function getAllTickets(): Promise<any[]> {
  const query = 'SELECT * FROM tickets';

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erro ao recuperar tickets do banco de dados:', error);
    return [];
  }
}
