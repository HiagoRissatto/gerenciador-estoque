import { z } from "zod";

export const userSchema = z.object({
    nome: z.string().min(3, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "O email é inválido" }),
    senha: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    cpf: z.string().length(11, { message: "O CPF deve ter 11 caracteres" }).regex(/^\d{11}$/, {
        message: "O CPF deve conter apenas números"
    }).optional(),
    cnpj: z.string().length(14, { message: "O CNPJ deve ter 14 caracteres" }).regex(/^\d{14}$/, {
        message: "O CNPJ deve conter apenas números"
    }).optional(),
    endereco: z.string().min(5, { message: "O endereço deve ter no mínimo 5 caracteres" }),
}).refine((data) => (data.cpf && !data.cnpj) || (!data.cpf && data.cnpj), {
    message: "Informe CPF ou CNPJ, mas não ambos",
    path: ["cnpj", "cpf"],
});