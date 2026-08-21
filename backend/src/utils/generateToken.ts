import jwt from "jsonwebtoken";

export function generateToken(
  payload: {
    id: number;
    email: string;
    role: "admin" | "funcionario";
  }
): string {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT_SECRET não configurado");
  }

  return jwt.sign(payload, secretKey, {
    expiresIn: "1h"
  });
}