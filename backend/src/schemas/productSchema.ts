import {z} from "zod";


export const productSchema = z.object({
    nome:z.string("precisa ser letras").min(5,"O nome precisa ter no mínimo 5 caracteres" ),
    marca:z.string("precisa ser letras").min(3,"marca precisa de no mínimo 3 caracteres"),
    quantidade:z.number("precisa ser um numero").int("o numero precisa ser acima de zero").nonnegative("quantidade não pode ser negativa"),
    valor:z.number("precisa ser um numero").positive("O valor deve ser maior que zero").multipleOf(0.01, "No máximo 2 casas decimais"),
    estoque_minimo:z.number("precisa ser um numero").int("o numero precisa ser acima de zero").nonnegative("estoque mínimo não pode ser negativo")
})