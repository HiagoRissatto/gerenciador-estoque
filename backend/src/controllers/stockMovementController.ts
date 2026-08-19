import { createStockMovement } from "../services/stockMovementService.js";
import { stockMovementSchema } from "../schemas/stockMovementSchema.js";
import type { Request,Response } from "express";


export async function createMovement(req: Request, res: Response) {
  const result = stockMovementSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => {
      return {
        field: issue.path[0],
        message: issue.message
      };
    });

    return res.status(400).json({
      message: "Dados inválidos",
      errors
    });
  }

  const stock = result.data;

  const stockCreated = await createStockMovement(stock);

  res.status(201).send(stockCreated);
}