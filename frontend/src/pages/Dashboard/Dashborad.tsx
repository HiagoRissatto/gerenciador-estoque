import "./Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">Visão geral</p>
          <h1>Dashboard</h1>
        </div>
      </header>

      <section className="dashboard-cards">
        <div className="dashboard-card">
          <span>Total de produtos</span>
          <strong>0</strong>
        </div>

        <div className="dashboard-card">
          <span>Estoque baixo</span>
          <strong>0</strong>
        </div>

        <div className="dashboard-card">
          <span>Movimentações</span>
          <strong>0</strong>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-panel">
          <h2>Produtos com estoque baixo</h2>
          <p>Nenhum produto carregado ainda.</p>
        </div>

        <div className="dashboard-panel">
          <h2>Movimentações recentes</h2>
          <p>Nenhuma movimentação carregada ainda.</p>
        </div>
      </section>
    </main>
  );
}