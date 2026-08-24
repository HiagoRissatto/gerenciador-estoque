import "./BrandPanel.css";
import { motion } from "motion/react";
export default function BrandPanel() {
  return (
    <section className="brand-panel">
      <div className="brand-overlay">
        <div className="brand-content">
          <div className="brand-logo">
            <div className="brand-drop">◆</div>

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
    </section>
  );
}
