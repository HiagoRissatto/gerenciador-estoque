export interface User {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cpf?: string;
    cnpj?: string;
    created_at?: Date;
    endereco: string;
}