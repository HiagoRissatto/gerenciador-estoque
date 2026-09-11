import { motion } from "framer-motion";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <motion.section
        className="not-found-card"
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.98
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="not-found-icon"
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiSearch />
        </motion.div>

        <span className="not-found-code">
          404
        </span>

        <h1>Página não encontrada</h1>

        <p>
          O endereço que você tentou acessar não existe
          ou pode ter sido movido.
        </p>

        <div className="not-found-actions">
          <button
            type="button"
            className="not-found-secondary"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft />
            Voltar
          </button>

          <button
            type="button"
            className="not-found-primary"
            onClick={() => navigate("/dashboard")}
          >
            <FiHome />
            Ir para o dashboard
          </button>
        </div>
      </motion.section>

      <div className="not-found-circle circle-one" />
      <div className="not-found-circle circle-two" />
    </main>
  );
}