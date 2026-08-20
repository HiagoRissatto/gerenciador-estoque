import type { Request, Response } from "express";

import { userSchema } from "../schemas/userSchema.js";
import { createUserService } from "../services/userService.js";

export async function createUserController(
  req: Request,
  res: Response
) {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => {
      return {
        field: issue.path.join("."),
        message: issue.message
      };
    });

    return res.status(400).json({
      message: "Dados inválidos",
      errors
    });
  }

  const user = result.data;

  const userCreated = await createUserService(user);

  return res.status(201).json(userCreated);
}