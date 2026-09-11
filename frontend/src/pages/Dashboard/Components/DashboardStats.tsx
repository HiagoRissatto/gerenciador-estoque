import {
  FiBarChart2,
  FiFilter,
  FiPackage,
  FiTrendingUp
} from "react-icons/fi";

interface DashboardStatsProps {
  totalProducts: number;
  totalStock: number;
  lowStock: number;
  stockValue: number;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export default function DashboardStats({
  totalProducts,
  totalStock,
  lowStock,
  stockValue
}: DashboardStatsProps) {
  return (
    <section className="dashboard-summary">
      <article className="dashboard-stat-card accent">
        <div className="stat-icon">
          <FiPackage />
        </div>

        <span>Total de produtos</span>
        <strong>{totalProducts}</strong>
        <small>Itens cadastrados</small>
      </article>

      <article className="dashboard-stat-card">
        <div className="stat-icon">
          <FiTrendingUp />
        </div>

        <span>Estoque total</span>
        <strong>{totalStock}</strong>
        <small>Unidades em estoque</small>
      </article>

      <article className="dashboard-stat-card warning">
        <div className="stat-icon">
          <FiFilter />
        </div>

        <span>Estoque baixo</span>
        <strong>{lowStock}</strong>
        <small>Produtos em alerta</small>
      </article>

      <article className="dashboard-stat-card">
        <div className="stat-icon">
          <FiBarChart2 />
        </div>

        <span>Valor em estoque</span>

        <strong>
          {currencyFormatter.format(stockValue)}
        </strong>

        <small>Estimado</small>
      </article>
    </section>
  );
}