import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">R</div>
          <div>
            <p className="dashboard-subtitle">Visão geral</p>
            <h1>Dashboard</h1>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-logout-button"
          onClick={handleLogout}
        >
          Sair
        </button>
      </header>

      <section className="dashboard-summary">
        <div className="dashboard-card dashboard-card-primary">
          <span>Total de produtos</span>
          <strong>0</strong>
          <small>Ativos no estoque</small>
        </div>

        <div className="dashboard-card">
          <span>Estoque baixo</span>
          <strong>0</strong>
          <small>Itens em alerta</small>
        </div>

        <div className="dashboard-card">
          <span>Movimentações</span>
          <strong>0</strong>
          <small>Últimas entradas/saídas</small>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <h2>Produtos com estoque baixo</h2>
            <span className="dashboard-pill">Monitoramento</span>
          </div>
          <p>Nenhum produto carregado ainda.</p>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <h2>Movimentações recentes</h2>
            <span className="dashboard-pill dashboard-pill-muted">Hoje</span>
          </div>
          <p>Nenhuma movimentação carregada ainda.</p>
        </div>
      </section>
    </main>
  );
}