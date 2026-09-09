import argon2 from "argon2";
import { generateToken } from "../utils/generateToken.js";
import type { UserInput } from "../schemas/userSchema.js";
import { findUserByEmail, saveUser, findAllUsers, updateUserRole, } from "../repositories/userRepository.js";


export async function hashPassword(senha: string) {
  return await argon2.hash(senha);
}

export async function createUserService(user: UserInput) {
  const hashedPassword = await hashPassword(user.senha);

  const userWithHashedPassword = {
    ...user,
    role: "funcionario" as const,
    senha: hashedPassword
  };

  return await saveUser(userWithHashedPassword);
}

export async function loginUserService(
  email: string,
  senha: string
) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await argon2.verify(user.senha, senha);

  if (!isMatch) {
    throw new Error("Senha incorreta");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  const safeUser = {
    id: user.id,
    nome: user.nome,
    role: user.role
  };

  return {
    user: safeUser,
    token
  };
}

export async function getAllUsersService() {
  return await findAllUsers();
}

export async function updateUserRoleService(
  id: string,
  role: "admin" | "funcionario"
) {
  const user = await updateUserRole(id, role);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}