import argon2 from "argon2";

import type { UserInput } from "../schemas/userSchema.js";
import { saveUser } from "../repositories/userRepository.js";

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