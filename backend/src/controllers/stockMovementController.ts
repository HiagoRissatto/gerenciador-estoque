import { createStockMovement } from "../services/stockMovementService.js";
import { stockMovementSchema } from "../schemas/stockMovementSchema.js";
import {getStockMovements} from "../services/stockMovementService.js";
import type { Request,Response, NextFunction } from "express";


export async function createMovement(req: Request, res: Response, next: NextFunction) {
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

  try{
    const stockCreated = await createStockMovement(stock);
    res.status(201).json(stockCreated);

  }catch (error) {
    next(error);
      }
     
  }



export async function listStockMovements(req: Request, res: Response) {
  const stockMovements = await getStockMovements();
  res.status(200).json(stockMovements);
}