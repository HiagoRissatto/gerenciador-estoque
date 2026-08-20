import jwt from "jsonwebtoken";

export function generateToken(payload: { id:number,email:string }): string {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("JWT_SECRET não está definido no arquivo .env");
  }
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}