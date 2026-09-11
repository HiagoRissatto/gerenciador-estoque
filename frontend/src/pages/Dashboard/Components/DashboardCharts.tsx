import {
    Bar,
    Doughnut,
    Line
} from "react-chartjs-2";

import type {
    ChartData
} from "chart.js";

type ChartPeriod =
    | "7"
    | "30"
    | "all";

interface DashboardChartsProps {
    barData: ChartData<"bar">;
    lineData: ChartData<"line">;
    doughnutData: ChartData<"doughnut">;

    chartPeriod: ChartPeriod;

    onChartPeriodChange: (
        period: ChartPeriod
    ) => void;
}

export default function DashboardCharts({
    barData,
    lineData,
    doughnutData,
    chartPeriod,
    onChartPeriodChange
}: DashboardChartsProps) {
    return (
        <section className="chart-grid">
            <div className="chart-card large">
                <div className="chart-header">
                    <h2>
                        Quantidade por produto
                    </h2>

                    <div className="chart-filter-group">
                        {(
                            [
                                "7",
                                "30",
                                "all"
                            ] as ChartPeriod[]
                        ).map((period) => (
                            <button
                                key={period}
                                type="button"
                                className={
                                    chartPeriod === period
                                        ? "chart-filter active"
                                        : "chart-filter"
                                }
                                onClick={() =>
                                    onChartPeriodChange(
                                        period
                                    )
                                }
                            >
                                {period === "all"
                                    ? "Tudo"
                                    : `${period}d`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="chart-container">
                    <Bar
                        data={barData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,

                            layout: {
                                padding: {
                                    bottom: 20
                                }
                            },

                            plugins: {
                                legend: {
                                    display: false
                                }
                            },

                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: "rgba(148, 163, 184, 0.12)"
                                    }
                                },

                                x: {
                                    grid: {
                                        display: false
                                    },

                                    ticks: {
                                        padding: 10,
                                        maxRotation: 0,
                                        minRotation: 0
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>

            <div className="chart-card">
                <div className="chart-header">
                    <h2>Resumo</h2>
                </div>

                <div className="chart-container">
                    <Doughnut
                        data={doughnutData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: "62%",

                            plugins: {
                                legend: {
                                    position: "bottom",

                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: "circle"
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>

            <div className="chart-card full-width">
                <div className="chart-header">
                    <h2>
                        Comparativo de estoque
                    </h2>
                </div>

                <div className="chart-container">
                    <Line
                        data={lineData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,

                            plugins: {
                                legend: {
                                    position: "bottom"
                                }
                            },

                            scales: {
                                y: {
                                    beginAtZero: true,

                                    grid: {
                                        color:
                                            "rgba(148, 163, 184, 0.12)"
                                    }
                                },

                                x: {
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </section>
    );
}