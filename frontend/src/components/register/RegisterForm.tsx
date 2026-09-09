import { useState } from "react";
import type { FormEvent } from "react";

import { motion } from "motion/react";

import "./RegisterForm.css";

interface RegisterFormProps {
  onLogin: () => void;
}

export default function RegisterForm({
  onLogin
}: RegisterFormProps) {
  const [accountType, setAccountType] =
    useState<"cpf" | "cnpj">("cpf");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !document.trim() ||
      !address.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }

    if (password.length < 8) {
      setError(
        "A senha precisa ter no mínimo 8 caracteres."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    onLogin();
  }

  return (
    <div className="register-card">
      <div className="register-header">
        <h2>Crie sua conta</h2>

        <p>
          Preencha seus dados para começar
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="register-type">
          <button
            type="button"
            onClick={() => {
              setAccountType("cpf");
              setDocument("");
            }}
          >
            {accountType === "cpf" && (
              <motion.span
                className="register-type-indicator"
                layoutId="accountTypeIndicator"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }}
              />
            )}

            <span className="register-type-text">
              Pessoa física
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAccountType("cnpj");
              setDocument("");
            }}
          >
            {accountType === "cnpj" && (
              <motion.span
                className="register-type-indicator"
                layoutId="accountTypeIndicator"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }}
              />
            )}

            <span className="register-type-text">
              Empresa
            </span>
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">
            {accountType === "cpf"
              ? "Nome"
              : "Razão social"}
          </label>

          <input
            type="text"
            className="form-control"
            placeholder={
              accountType === "cpf"
                ? "Digite seu nome"
                : "Digite a razão social"
            }
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            E-mail
          </label>

          <input
            type="email"
            className="form-control"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            {accountType === "cpf"
              ? "CPF"
              : "CNPJ"}
          </label>

          <input
            type="text"
            className="form-control"
            placeholder={
              accountType === "cpf"
                ? "Digite seu CPF"
                : "Digite seu CNPJ"
            }
            value={document}
            onChange={(event) =>
              setDocument(event.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Endereço
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Digite seu endereço"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Senha
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Crie uma senha"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Confirmar senha
          </label>

          <input
            type="password"
            className="form-control"
            placeholder="Digite a senha novamente"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
          />
        </div>

        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="register-button"
        >
          Criar conta
        </button>

        <button
          type="button"
          className="register-login-button"
          onClick={onLogin}
        >
          Já tenho uma conta
        </button>
      </form>
    </div>
  );
}