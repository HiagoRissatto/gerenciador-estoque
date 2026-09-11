import {
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiEye,
  FiPlusCircle,
  FiTrendingUp
} from "react-icons/fi";

type MenuOption =
  | "dashboard"
  | "cadastro"
  | "editar"
  | "visualizar";

interface SidebarProps {
  menu: MenuOption;
  isCollapsed: boolean;
  onMenuChange: (menu: MenuOption) => void;
  onToggleCollapse: () => void;
  onNewProduct: () => void;
}

export default function Sidebar({
  menu,
  isCollapsed,
  onMenuChange,
  onToggleCollapse,
  onNewProduct
}: SidebarProps) {
  return (
    <aside
      className={
        isCollapsed
          ? "dashboard-sidebar collapsed"
          : "dashboard-sidebar"
      }
    >
      <div className="sidebar-top-row">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            R
          </div>

          {!isCollapsed && (
            <div>
              <span className="sidebar-brand-label">
                Remaih
              </span>

              <strong>
                Estoque
              </strong>
            </div>
          )}
        </div>

        <button
          type="button"
          className="sidebar-collapse-button"
          onClick={onToggleCollapse}
          aria-label={
            isCollapsed
              ? "Expandir menu"
              : "Recolher menu"
          }
        >
          {isCollapsed
            ? <FiChevronRight />
            : <FiChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <button
          type="button"
          className={
            menu === "dashboard"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={() =>
            onMenuChange("dashboard")
          }
        >
          <FiBarChart2 />

          {!isCollapsed && (
            <span>
              Dashboard
            </span>
          )}
        </button>

        <button
          type="button"
          className={
            menu === "cadastro"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={onNewProduct}
        >
          <FiPlusCircle />

          {!isCollapsed && (
            <span>
              Cadastro
            </span>
          )}
        </button>

        <button
          type="button"
          className={
            menu === "editar"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={() =>
            onMenuChange("editar")
          }
        >
          <FiEdit3 />

          {!isCollapsed && (
            <span>
              Editar
            </span>
          )}
        </button>

        <button
          type="button"
          className={
            menu === "visualizar"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={() =>
            onMenuChange("visualizar")
          }
        >
          <FiEye />

          {!isCollapsed && (
            <span>
              Visualizar
            </span>
          )}
        </button>
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer-box">
          <FiTrendingUp />

          <span>
            Operação em tempo real
          </span>
        </div>
      )}
    </aside>
  );
}