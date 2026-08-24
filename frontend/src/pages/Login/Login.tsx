import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import BrandPanel from "../../components/login/BrandPanel";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/register/RegisterForm";

import "./Login.css";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <main className="auth-page">
      <motion.div
        className="auth-brand"
        animate={{
          x: isRegistering ? "100%" : "0%"
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut"
        }}
      >
        <BrandPanel />
      </motion.div>

            <motion.div
        className="auth-form"
        animate={{
          x: isRegistering ? "-100%" : "0%"
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut"
        }}
      >
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35 }}
              className="auth-form-content"
            >
              <RegisterForm
                onLogin={() => setIsRegistering(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="auth-form-content"
            >
              <LoginForm
                onRegister={() => setIsRegistering(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </main>
  );
}
