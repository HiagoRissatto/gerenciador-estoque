import {z} from "zod"

export const stockMovementSchema = z.object({
    product_id:z.uuid("product_id deve ser um UUID válido"),
    type:z.enum(["entrada", "saida"]),
    quantity:z.number().int("Precisa ser um numero inteiro").positive("Precisa ser um numero maior que zero")
})