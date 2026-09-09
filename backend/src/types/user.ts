export interface User {
    id: string;
    nome: string;
    email: string;
    senha: string;
    cpf?: string;
    cnpj?: string;
    created_at?: Date;
    endereco: string;
}