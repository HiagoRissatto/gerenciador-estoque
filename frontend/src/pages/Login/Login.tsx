import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import BrandPanel from "../../components/login/BrandPanel";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/register/RegisterForm";

import "./Login.css";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slideOffset = isMobile ? 0 : "50%";
  const formOffset = isMobile ? 0 : "0%";

  return (
    <main className="auth-page">
     <motion.div
       className="auth-brand"
       animate={{
         left: isRegistering ? slideOffset : "0%",
         x: 0,
         scale: isRegistering ? 1.01 : 1,
         filter: isRegistering ? "saturate(1.05)" : "saturate(1)"
       }}
       transition={{
         duration: 0.6,
         ease: "easeInOut"
       }}
     >
       <BrandPanel />
     </motion.div>

     <motion.div
       className="auth-form"
       animate={{
         left: isRegistering ? formOffset : "50%",
         x: 0,
         scale: isRegistering ? 1.005 : 1
       }}
       transition={{
         duration: 0.6,
         ease: "easeInOut"
       }}
     >
       <AnimatePresence mode="wait">
         {isRegistering ? (
           <motion.div
             key="register"
             initial={{
               opacity: 0,
               x: isMobile ? 18 : 64
             }}
             animate={{
               opacity: 1,
               x: 0
             }}
             exit={{
               opacity: 0,
               x: isMobile ? -18 : -64
             }}
             transition={{
               duration: 0.42,
               ease: "easeInOut"
             }}
             className="auth-form-content"
           >
             <RegisterForm onLogin={() => setIsRegistering(false)} />
           </motion.div>
         ) : (
           <motion.div
             key="login"
             initial={{
               opacity: 0,
               x: isMobile ? -18 : -64
             }}
             animate={{
               opacity: 1,
               x: 0
             }}
             exit={{
               opacity: 0,
               x: isMobile ? 18 : 64
             }}
             transition={{
               duration: 0.42,
               ease: "easeInOut"
             }}
             className="auth-form-content"
           >
             <LoginForm onRegister={() => setIsRegistering(true)} />
           </motion.div>
         )}
       </AnimatePresence>
     </motion.div>
    </main>
  );
}