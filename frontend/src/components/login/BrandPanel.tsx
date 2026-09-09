import "./BrandPanel.css";
import remaihDrop from "../../assets/remaih-gota.svg";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const titleText = "Remaih";

export default function BrandPanel() {
 const titleRef = useRef<HTMLHeadingElement | null>(null);
 const [brandNameWidth, setBrandNameWidth] = useState(260);

 useEffect(() => {
   const updateWidth = () => {
     const width = titleRef.current?.getBoundingClientRect().width ?? 260;
     setBrandNameWidth(Math.ceil(width));
   };

   updateWidth();

   if (!titleRef.current) {
     return;
   }

   const resizeObserver = new ResizeObserver(updateWidth);
   resizeObserver.observe(titleRef.current);

   return () => resizeObserver.disconnect();
 }, []);

 return (
   <section
     className="brand-panel"
     style={{
       ["--brand-name-width" as string]: `${brandNameWidth}px`
     }}
   >
     <div className="brand-panel-inner">
       <div className="rising-drops" aria-hidden="true">
         <span className="rising-drop rising-drop-1" />
         <span className="rising-drop rising-drop-2" />
         <span className="rising-drop rising-drop-3" />
         <span className="rising-drop rising-drop-4" />
         <span className="rising-drop rising-drop-5" />
         <span className="rising-drop rising-drop-6" />
         <span className="rising-drop rising-drop-7" />
       </div>

       <div className="brand-overlay">
         <div className="brand-content">
           <div className="brand-logo">
             <motion.img
               src={remaihDrop}
               alt="Remaih"
               className="brand-drop"
               initial={{ opacity: 0, y: -20, scale: 0.85 }}
               animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
               transition={{
                 opacity: { duration: 0.5 },
                 scale: { duration: 0.6, ease: "easeOut" },
                 y: { delay: 0.5, duration: 3.5, repeat: Infinity, ease: "easeInOut" }
               }}
             />

             <motion.span
               className="drop-shadow"
               animate={{ scaleX: [1, 0.75, 1], opacity: [0.18, 0.08, 0.18] }}
               transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
             />

             <motion.h1
               ref={titleRef}
               className="brand-title"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
             >
               {titleText.split("").map((char, index) => (
                 <motion.span
                   key={`${char}-${index}`}
                   className="brand-letter"
                   initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                   animate={{
                     opacity: [0, 1, 1, 0.85, 1],
                     y: [18, 0, 0, 0, 0],
                     filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
                   }}
                   transition={{
                     duration: 1.25,
                     delay: index * 0.12,
                     ease: "easeOut",
                     repeat: Infinity,
                     repeatDelay: 1.8,
                     times: [0, 0.18, 0.52, 0.8, 1]
                   }}
                 >
                   {char}
                 </motion.span>
               ))}
             </motion.h1>
           </div>

           <motion.div
             className="brand-line"
             initial={{ width: 0, opacity: 0, transformOrigin: "left center" }}
             animate={{ width: [0, brandNameWidth, brandNameWidth, 0], opacity: [0, 1, 1, 0] }}
             transition={{
               duration: 2.8,
               ease: "easeInOut",
               repeat: Infinity,
               repeatDelay: 1.6,
               times: [0, 0.35, 0.8, 1]
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
     </div>
   </section>
 );
}
