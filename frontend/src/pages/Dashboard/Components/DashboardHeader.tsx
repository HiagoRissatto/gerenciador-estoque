import { FiLogOut, FiMenu } from "react-icons/fi";

interface DashboardHeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  isSidebarCollapsed,
  onToggleSidebar,
  onLogout
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-title-group">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onToggleSidebar}
          aria-label={
            isSidebarCollapsed
              ? "Abrir menu"
              : "Fechar menu"
          }
        >
          <FiMenu />
        </button>

        <div>
          <p className="dashboard-eyebrow">
            Painel administrativo
          </p>

          <h1>Gestão de produtos</h1>
        </div>
      </div>

      <button
        type="button"
        className="dashboard-logout-button"
        onClick={onLogout}
      >
        <FiLogOut />
        Sair
      </button>
    </header>
  );
}