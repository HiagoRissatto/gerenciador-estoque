import type { Request, Response, NextFunction  } from "express";
import { userSchema } from "../schemas/userSchema.js";
import { createUserService, getAllUsersService, loginUserService, updateUserRoleService } from "../services/userService.js";
type UserParams = {
  id: string;
};

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

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, senha } = req.body;

  try {
    const user = await loginUserService(email, senha);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function listUsersController(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsersService();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function updateUserRoleController(
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { role } = req.body;

  if (role !== "admin" && role !== "funcionario") {
    return res.status(400).json({
      message: "Role inválido."
    });
  }
  try {
    const user = await updateUserRoleService(id, role);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function getCurrentUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (req as any).user;

    return res.status(200).json({
      user
    });
  } catch (error) {
    next(error);
  }
}

