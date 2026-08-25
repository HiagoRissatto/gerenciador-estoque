import "./BrandPanel.css";
import remaihDrop from "../../assets/remaih-gota.svg";
import remaihWaves from "../../assets/remaih-waves.svg";
import { motion } from "motion/react";
export default function BrandPanel() {
  return (
    <section className="brand-panel">


      <div className="brand-overlay">
        <div className="brand-content">
          
          
          <div className="brand-logo">
            <motion.img
              src={remaihDrop}
              alt="Remaih"
              className="brand-drop"
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.85
              }}
              animate={{
                opacity: 1,
                y: [0, -6, 0],
                scale: 1
              }}
              transition={{
                opacity: {
                  duration: 0.5
                },
                scale: {
                  duration: 0.6,
                  ease: "easeOut"
                },
                y: {
                  delay: 0.5,
                  duration: 3.5,
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
            <h1>Remaih</h1>
          </div>

          <motion.div
            className="brand-line"
            initial={{ width: 0, opacity: 0, x: -15 }}
            animate={{ width: 80, opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          />

          <p className="brand-slogan">
            Gestão inteligente <br />
            para o <span>seu negócio.</span>
          </p>

          <div className="brand-features">
            <div className="brand-feature">
              <div className="feature-icon">□</div>

              <div>
                <h3>Controle completo</h3>
                <p>
                  Gerencie produtos, entradas, saídas e acompanhe tudo em tempo
                  real.
                </p>
              </div>
            </div>

            <div className="brand-feature">
              <div className="feature-icon">▥</div>

              <div>
                <h3>Relatórios inteligentes</h3>
                <p>
                  Análises e indicadores para tomar decisões com mais segurança.
                </p>
              </div>
            </div>

            <div className="brand-feature">
              <div className="feature-icon">✓</div>

              <div>
                <h3>Seguro e confiável</h3>
                <p>
                  Seus dados protegidos com as melhores práticas de segurança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

<motion.img
  src={remaihWaves}
  alt=""
  className="brand-waves"
  animate={{
    y: [0, -8, 0, 6, 0],
    scaleX: [1, 1.025, 1, 0.985, 1],
    scaleY: [1, 1.01, 1, 0.995, 1]
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
    </section>
  );
}
