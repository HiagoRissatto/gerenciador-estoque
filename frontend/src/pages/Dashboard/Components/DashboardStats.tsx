import {
  FiBox,
  FiTrendingUp,
  FiFilter,
  FiBarChart2
} from "react-icons/fi";

interface DashboardStatsProps {
  totalProducts: number;
  totalStock: number;
  lowStock: number;
  stockValue: number;
}

export default function DashboardStats({
  totalProducts,
  totalStock,
  lowStock,
  stockValue
}: DashboardStatsProps) {
  const formattedStockValue = stockValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <section className="dashboard-stats">
      <div className="stat-card stat-card-highlight">
        <div className="stat-card-icon">
          <FiBox />
        </div>

        <span className="stat-card-label">Total de produtos</span>

        <strong className="stat-card-value">
          {totalProducts}
        </strong>

        <span className="stat-card-description">
          Itens cadastrados
        </span>
      </div>

      <div className="stat-card">
        <div className="stat-card-icon">
          <FiTrendingUp />
        </div>

        <span className="stat-card-label">Estoque total</span>

        <strong className="stat-card-value">
          {totalStock}
        </strong>

        <span className="stat-card-description">
          Unidades em estoque
        </span>
      </div>

      <div className="stat-card">
        <div className="stat-card-icon">
          <FiFilter />
        </div>

        <span className="stat-card-label">Estoque baixo</span>

        <strong className="stat-card-value">
          {lowStock}
        </strong>

        <span className="stat-card-description">
          Produtos em alerta
        </span>
      </div>

      <div className="stat-card">
        <div className="stat-card-icon">
          <FiBarChart2 />
        </div>

        <span className="stat-card-label">Valor em estoque</span>

        <strong className="stat-card-value">
          {formattedStockValue}
        </strong>

        <span className="stat-card-description">
          Estimado
        </span>
      </div>
    </section>
  );
}