import { useMemo, useState } from "react";

import type { Product } from "../../../types/product";

type ChartPeriod = "7" | "30" | "all";

interface DashboardStats {
  totalEstoque: number;
  estoqueBaixo: number;
}

export function useDashboardCharts(
  products: Product[],
  stats: DashboardStats
) {
  const [chartPeriod, setChartPeriod] =
    useState<ChartPeriod>("all");

  const chartScopeProducts = useMemo(() => {
    if (chartPeriod === "7") {
      return products.slice(0, 7);
    }

    if (chartPeriod === "30") {
      return products.slice(0, 30);
    }

    return products;
  }, [chartPeriod, products]);

  const barChartData = useMemo(() => {
    const chartProducts =
      chartScopeProducts.slice(0, 6);

    return {
      labels: chartProducts.map(
        (product) => product.nome
      ),
      datasets: [
        {
          label: "Estoque",
          data: chartProducts.map(
            (product) =>
              Number(product.quantidade || 0)
          ),
          backgroundColor: [
            "#0ea5d0",
            "#1fc3b7",
            "#f59f31",
            "#2d7ef7",
            "#7dd3fc",
            "#34d399"
          ],
          borderRadius: 10,
          borderSkipped: false as const
        }
      ]
    };
  }, [chartScopeProducts]);

  const lineChartData = useMemo(() => {
    const chartProducts =
      chartScopeProducts.slice(0, 7);

    return {
      labels: chartProducts.map(
        (product) => product.nome
      ),
      datasets: [
        {
          label: "Quantidade",
          data: chartProducts.map(
            (product) =>
              Number(product.quantidade || 0)
          ),
          borderColor: "#0ea5d0",
          backgroundColor:
            "rgba(14, 165, 208, 0.18)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#0ea5d0",
          pointRadius: 4
        },
        {
          label: "Mínimo",
          data: chartProducts.map(
            (product) =>
              Number(product.estoque_minimo || 0)
          ),
          borderColor: "#f59f31",
          backgroundColor:
            "rgba(245, 159, 49, 0.14)",
          fill: false,
          tension: 0.35,
          pointBackgroundColor: "#f59f31",
          pointRadius: 4
        }
      ]
    };
  }, [chartScopeProducts]);

  const doughnutChartData = useMemo(() => {
    return {
      labels: [
        "Em estoque",
        "Abaixo do mínimo"
      ],
      datasets: [
        {
          data: [
            Math.max(
              stats.totalEstoque -
                stats.estoqueBaixo,
              0
            ),
            stats.estoqueBaixo
          ],
          backgroundColor: [
            "#1cc7b8",
            "#f59f31"
          ],
          borderWidth: 0,
          hoverOffset: 6
        }
      ]
    };
  }, [stats]);

  return {
    chartPeriod,
    setChartPeriod,
    barChartData,
    lineChartData,
    doughnutChartData
  };
}