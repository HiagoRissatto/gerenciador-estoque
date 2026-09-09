import { useState } from "react";
import type { FormEvent } from "react";
import remaihDrop from "../../assets/remaih-gota.svg";

import { motion } from "motion/react";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/api";

import "./LoginForm.css";

interface LoginFormProps {
  onRegister: () => void;
}

export default function LoginForm({
  onRegister
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/usuarios/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            senha: password
          })
        }
      );

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        setError(
          data.message ||
          `Não foi possível realizar o login (erro ${response.status}).`
        );

        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      navigate("/dashboard");
    } catch {
      setError(
        "Não foi possível conectar ao servidor. Verifique se a API está em execução."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="login-card"
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      <motion.div
        className="login-card-header"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.5,
          delay: 0.2
        }}
      >
<div className="login-mini-logo">
  <motion.img
    src={remaihDrop}
    alt="Remaih"
    className="login-drop"
    initial={{
      opacity: 0,
      y: -25,
      scale: 0.8
    }}
    animate={{
      opacity: 1,
      y: [0, -4, 0],
      scale: 1
    }}
    transition={{
      opacity: {
        duration: 0.4
      },

      scale: {
        duration: 0.5,
        ease: "easeOut"
      },

      y: {
        delay: 0.4,
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  />

  <motion.span
    className="drop-shadow"
    animate={{
      scaleX: [1, 0.75, 1],
      opacity: [0.18, 0.08, 0.18]
    }}
    transition={{
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
</div>

        <h2>Bem-vindo de volta!</h2>

        <p>
          Faça login para acessar sua conta
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            E-mail
          </label>

          <div className="input-wrapper">
            <FiMail className="input-icon" />

            <input
              type="email"
              className="form-control login-input"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Senha
          </label>

          <div className="input-wrapper">
            <FiLock className="input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              className="form-control login-input password-input"
              placeholder="Sua senha"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              aria-label={
                showPassword
                  ? "Ocultar senha"
                  : "Mostrar senha"
              }
            >
              {showPassword
                ? <FiEyeOff />
                : <FiEye />}
            </button>
          </div>
        </div>

        <div className="login-options">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
            />

            <label
              className="form-check-label"
              htmlFor="remember"
            >
              Lembrar de mim
            </label>
          </div>

          <button
            type="button"
            className="forgot-password"
          >
            Esqueci minha senha
          </button>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          className="login-button"
          disabled={loading}
          whileHover={
            loading
              ? {}
              : {
                scale: 1.03,
                y: -2
              }
          }
          whileTap={
            loading
              ? {}
              : {
                scale: 0.97
              }
          }
          transition={{
            duration: 0.2
          }}
        >
          {loading
            ? "Entrando..."
            : "Entrar"}
        </motion.button>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button
          type="button"
          className="google-button"
        >
          Continuar com Google
        </button>

        <p className="register-text">
          Ainda não possui uma conta?

          <button
            type="button"
            onClick={onRegister}
          >
            Criar conta
          </button>
        </p>
      </form>
    </motion.div>
  );
}