import argon2 from "argon2";

import type { UserInput } from "../schemas/userSchema.js";
import { findUserByEmail, saveUser } from "../repositories/userRepository.js";
import { email } from "zod/v4/mini";

export async function hashPassword(senha: string) {
  return await argon2.hash(senha);
}

export async function createUserService(user: UserInput) {
  const hashedPassword = await hashPassword(user.senha);

  const userWithHashedPassword = {
    ...user,
    senha: hashedPassword
  };

  return await saveUser(userWithHashedPassword);
}

export async function loginUserService(email: string, senha: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await argon2.verify(user.senha, senha);
  

  if (!isMatch) {
    throw new Error("Senha incorreta");
  }
  const { senha: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}