import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "./AnimatedWaves.css";

export default function AnimatedWaves() {
  const backWaveRef = useRef<SVGPathElement>(null);
  const middleWaveRef = useRef<SVGPathElement>(null);
  const frontWaveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let phase = 0;

    function createWave(
      width: number,
      baseY: number,
      amplitude: number,
      frequency: number,
      phaseOffset: number
    ) {
      const points: string[] = [];
      const step = 18;

      for (let x = 0; x <= width; x += step) {
        const progress = x / width;

        /*
          A amplitude começa forte na esquerda
          e diminui gradualmente até a direita.
        */
        const decay = Math.pow(1 - progress, 1.35);

        /*
          Movimento principal da onda.
        */
        const primaryWave = Math.sin(
          x * frequency - phase + phaseOffset
        );

        /*
          Pequena variação para a onda não parecer
          perfeitamente repetitiva.
        */
        const secondaryWave = Math.sin(
          x * 0.0035 -
            phase * 0.4 +
            phaseOffset
        );

        /*
          Faz a onda respirar levemente enquanto
          continua perdendo força para a direita.
        */
        const breathing =
          0.82 + secondaryWave * 0.18;

        const dynamicAmplitude =
          amplitude * decay * breathing;

        const y =
          baseY +
          primaryWave * dynamicAmplitude;

        points.push(
          `${x === 0 ? "M" : "L"} ${x} ${y}`
        );
      }

      return `
        ${points.join(" ")}
        L ${width} 420
        L 0 420
        Z
      `;
    }

    function animateWaves() {
      phase += 0.022;

      if (backWaveRef.current) {
        backWaveRef.current.setAttribute(
          "d",
          createWave(
            1600,
            318,
            72,
            0.006,
            0
          )
        );
      }

      if (middleWaveRef.current) {
        middleWaveRef.current.setAttribute(
          "d",
          createWave(
            1600,
            332,
            92,
            0.0068,
            1.2
          )
        );
      }

      if (frontWaveRef.current) {
        frontWaveRef.current.setAttribute(
          "d",
          createWave(
            1600,
            346,
            112,
            0.0075,
            2.4
          )
        );
      }
    }

    gsap.ticker.add(animateWaves);

    return () => {
      gsap.ticker.remove(animateWaves);
    };
  }, []);

  return (
    <svg
      className="animated-waves"
      viewBox="0 0 1600 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="backWater"
          x1="0"
          x2="1600"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#087FC0"
            stopOpacity="0.28"
          />

          <stop
            offset="55%"
            stopColor="#149FD0"
            stopOpacity="0.24"
          />

          <stop
            offset="100%"
            stopColor="#1ABFCD"
            stopOpacity="0.12"
          />
        </linearGradient>

        <linearGradient
          id="middleWater"
          x1="0"
          x2="1600"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#16B4D8"
            stopOpacity="0.42"
          />

          <stop
            offset="50%"
            stopColor="#32DDD8"
            stopOpacity="0.34"
          />

          <stop
            offset="100%"
            stopColor="#159AC9"
            stopOpacity="0.16"
          />
        </linearGradient>

        <linearGradient
          id="frontWater"
          x1="0"
          x2="1600"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor="#48E6E3"
            stopOpacity="0.58"
          />

          <stop
            offset="45%"
            stopColor="#6CF4EA"
            stopOpacity="0.42"
          />

          <stop
            offset="100%"
            stopColor="#26B8D5"
            stopOpacity="0.18"
          />
        </linearGradient>
      </defs>

      <path
        ref={backWaveRef}
        fill="url(#backWater)"
      />

      <path
        ref={middleWaveRef}
        fill="url(#middleWater)"
      />

      <path
        ref={frontWaveRef}
        fill="url(#frontWater)"
      />
    </svg>
  );
}