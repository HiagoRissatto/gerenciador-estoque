import { motion } from "framer-motion";
import { FiPackage } from "react-icons/fi";

import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <main className="loading-screen">
      <motion.div
        className="loading-card"
        initial={{
          opacity: 0,
          y: 20,
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
          className="loading-brand"
          animate={{
            rotate: [0, -3, 3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          R
        </motion.div>

        <motion.div
          className="loading-icon-wrapper"
          animate={{
            y: [0, -8, 0]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiPackage />
        </motion.div>

        <div className="loading-content">
          <span className="loading-eyebrow">
            REMAIH ESTOQUE
          </span>

          <h1>Preparando seu estoque</h1>

          <p>
            Estamos carregando as informações do seu painel.
          </p>
        </div>

        <div className="loading-dots">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: dot * 0.15
              }}
            />
          ))}
        </div>

        <div className="loading-progress">
          <motion.div
            className="loading-progress-bar"
            initial={{
              x: "-100%"
            }}
            animate={{
              x: "250%"
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      <div className="loading-background-circle loading-circle-one" />
      <div className="loading-background-circle loading-circle-two" />
    </main>
  );
}