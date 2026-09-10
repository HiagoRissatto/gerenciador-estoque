import type { Request, Response, NextFunction } from "express";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      error: "Acesso não autorizado"
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      error: "Acesso negado"
    });
  }

  return next();
}