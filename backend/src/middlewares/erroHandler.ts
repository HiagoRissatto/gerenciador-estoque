import type { Request, Response, NextFunction } from "express";

type DatabaseError = Error & {
  code?: string;
  constraint?: string;
};

export function errorHandler(
  err: DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err.code === "23505") {
    return res.status(409).json({
      message: "Email, CPF ou CNPJ já cadastrado"
    });
  }

  if (err.message === "Produto não encontrado") {
    return res.status(404).json({
      message: err.message
    });
  }

  if (
    err.message === "Usuário não encontrado" ||
    err.message === "Senha incorreta"
  ) {
    return res.status(401).json({
      message: "Email ou senha incorretos"
    });
  }

  if (err.message === "Quantidade insuficiente em estoque") {
    return res.status(400).json({
      message: err.message
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor"
  });
}