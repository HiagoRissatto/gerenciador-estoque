import { z } from "zod";
import { isValidCpf, isValidCnpj } from "../utils/documentValidators.js";

export const userSchema = z.object({
    nome: z.string().min(3, {
        message: "O nome é obrigatório"
    }),

    email: z.string().email({
        message: "O email é inválido"
    }),

    senha: z.string().min(8, {
        message: "A senha deve ter no mínimo 8 caracteres"
    }),

    cpf: z.string()
        .refine(isValidCpf, {
            message: "CPF inválido"
        })
        .transform((value) => value.replace(/\D/g, ""))
        .optional(),

    cnpj: z.string()
        .refine(isValidCnpj, {
            message: "CNPJ inválido"
        })
        .transform((value) => value.replace(/\D/g, ""))
        .optional(),

    endereco: z.string().min(5, {
        message: "O endereço deve ter no mínimo 5 caracteres"
    }),

    role: z.enum(["admin", "funcionario"])
        .default("funcionario")

}).refine(
    (data) =>
        (data.cpf && !data.cnpj) ||
        (!data.cpf && data.cnpj),
    {
        message: "Informe CPF ou CNPJ, mas não ambos",
        path: ["cpf"]
    }
);

export type UserInput = z.infer<typeof userSchema>;