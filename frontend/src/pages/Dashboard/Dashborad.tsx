import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiEye,
  FiFilter,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPlusCircle,
  FiSearch,
  FiTrendingUp,
  FiX
} from "react-icons/fi";

import { API_URL } from "../../services/api";
import "./Dashboard.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

type Product = {
  id: string;
  nome: string;
  marca: string;
  quantidade: number;
  valor: number;
  estoque_minimo: number;
};

type MenuOption = "dashboard" | "cadastro" | "editar" | "visualizar";
type ChartPeriod = "7" | "30" | "all";

type ProductForm = {
  nome: string;
  marca: string;
  quantidade: string;
  valor: string;
  estoque_minimo: string;
};

const emptyProductForm: ProductForm = {
  nome: "",
  marca: "",
  quantidade: "",
  valor: "",
  estoque_minimo: ""
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const pageSize = 5;

export default function Dashboard() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuOption>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyProductForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Falha ao carregar produtos");
      }

      const data = (await response.json()) as Product[];
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setStatusMessage("Não foi possível carregar os produtos do banco.");
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, [navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const stats = useMemo(() => {
    const totalProdutos = products.length;
    const totalEstoque = products.reduce(
      (sum, product) => sum + Number(product.quantidade || 0),
      0
    );
    const estoqueBaixo = products.filter(
      (product) => Number(product.quantidade) <= Number(product.estoque_minimo || 0)
    ).length;
    const valorTotal = products.reduce(
      (sum, product) => sum + Number(product.quantidade || 0) * Number(product.valor || 0),
      0
    );

    return {
      totalProdutos,
      totalEstoque,
      estoqueBaixo,
      valorTotal
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const term = searchTerm.toLowerCase();

    return products.filter(
      (product) =>
        product.nome.toLowerCase().includes(term) ||
        product.marca.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage]);

  const chartScopeProducts = useMemo(() => {
    if (chartPeriod === "7") return products.slice(0, 7);
    if (chartPeriod === "30") return products.slice(0, 30);
    return products;
  }, [chartPeriod, products]);

  const barChartData = useMemo(() => {
    const chartProducts = chartScopeProducts.slice(0, 6);

    return {
      labels: chartProducts.map((product) => product.nome),
      datasets: [
        {
          label: "Estoque",
          data: chartProducts.map((product) => Number(product.quantidade || 0)),
          backgroundColor: [
            "#0ea5d0",
            "#1fc3b7",
            "#f59f31",
            "#2d7ef7",
            "#7dd3fc",
            "#34d399"
          ],
          borderRadius: 10,
          borderSkipped: false
        }
      ]
    };
  }, [chartScopeProducts]);

  const lineChartData = useMemo(() => {
    const chartProducts = chartScopeProducts.slice(0, 7);

    return {
      labels: chartProducts.map((product) => product.nome),
      datasets: [
        {
          label: "Quantidade",
          data: chartProducts.map((product) => Number(product.quantidade || 0)),
          borderColor: "#0ea5d0",
          backgroundColor: "rgba(14, 165, 208, 0.18)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#0ea5d0",
          pointRadius: 4
        },
        {
          label: "Mínimo",
          data: chartProducts.map((product) => Number(product.estoque_minimo || 0)),
          borderColor: "#f59f31",
          backgroundColor: "rgba(245, 159, 49, 0.14)",
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
      labels: ["Em estoque", "Abaixo do mínimo"],
      datasets: [
        {
          data: [
            Math.max(stats.totalEstoque - stats.estoqueBaixo, 0),
            stats.estoqueBaixo
          ],
          backgroundColor: ["#1cc7b8", "#f59f31"],
          borderWidth: 0,
          hoverOffset: 6
        }
      ]
    };
  }, [stats]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  function handleFormChange(field: keyof ProductForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  }

  function fillFormForEdit(product: Product) {
    setEditingId(product.id);
    setMenu("editar");
    setForm({
      nome: product.nome,
      marca: product.marca,
      quantidade: String(product.quantidade),
      valor: String(product.valor),
      estoque_minimo: String(product.estoque_minimo)
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      marca: form.marca.trim(),
      quantidade: Number(form.quantidade),
      valor: Number(form.valor),
      estoque_minimo: Number(form.estoque_minimo)
    };

    if (
      !payload.nome ||
      !payload.marca ||
      Number.isNaN(payload.quantidade) ||
      Number.isNaN(payload.valor) ||
      Number.isNaN(payload.estoque_minimo)
    ) {
      setStatusMessage("Preencha todos os campos com valores válidos.");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("");

      const response = await fetch(`${API_URL}/produtos${editingId ? `/${editingId}` : ""}`, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(errorData.message || "Erro ao salvar o produto");
      }

      setStatusMessage(
        editingId ? "Produto atualizado com sucesso." : "Produto cadastrado com sucesso."
      );
      setForm(emptyProductForm);
      setEditingId(null);
      setMenu("visualizar");
      await fetchProducts();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Não foi possível salvar o produto."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduct() {
    if (!deleteProduct) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos/${deleteProduct.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o produto");
      }

      setStatusMessage("Produto removido com sucesso.");
      setForm(emptyProductForm);
      setEditingId(null);
      setDeleteProduct(null);
      await fetchProducts();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Não foi possível remover o produto."
      );
    }
  }

  return (
    <div className="dashboard-shell">
      <aside className={isSidebarCollapsed ? "dashboard-sidebar collapsed" : "dashboard-sidebar"}>
        <div className="sidebar-top-row">
          <div className="sidebar-brand">
            <div className="sidebar-brand-mark">R</div>
            {!isSidebarCollapsed && (
              <div>
                <span className="sidebar-brand-label">Remaih</span>
                <strong>Estoque</strong>
              </div>
            )}
          </div>

          <button
            type="button"
            className="sidebar-collapse-button"
            onClick={() => setIsSidebarCollapsed((previous) => !previous)}
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isSidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={menu === "dashboard" ? "nav-button active" : "nav-button"}
            onClick={() => setMenu("dashboard")}
          >
            <FiBarChart2 />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </button>

          <button
            type="button"
            className={menu === "cadastro" ? "nav-button active" : "nav-button"}
            onClick={() => {
              setEditingId(null);
              setForm(emptyProductForm);
              setMenu("cadastro");
            }}
          >
            <FiPlusCircle />
            {!isSidebarCollapsed && <span>Cadastro</span>}
          </button>

          <button
            type="button"
            className={menu === "editar" ? "nav-button active" : "nav-button"}
            onClick={() => setMenu("editar")}
          >
            <FiEdit3 />
            {!isSidebarCollapsed && <span>Editar</span>}
          </button>

          <button
            type="button"
            className={menu === "visualizar" ? "nav-button active" : "nav-button"}
            onClick={() => setMenu("visualizar")}
          >
            <FiEye />
            {!isSidebarCollapsed && <span>Visualizar</span>}
          </button>
        </nav>

        {!isSidebarCollapsed && (
          <div className="sidebar-footer-box">
            <FiTrendingUp />
            <span>Operação em tempo real</span>
          </div>
        )}
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-title-group">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setIsSidebarCollapsed((previous) => !previous)}
              aria-label="Abrir menu"
            >
              <FiMenu />
            </button>

            <div>
              <p className="dashboard-eyebrow">Painel administrativo</p>
              <h1>Gestão de produtos</h1>
            </div>
          </div>

          <button type="button" className="dashboard-logout-button" onClick={handleLogout}>
            <FiLogOut />
            Sair
          </button>
        </header>

        <main className="dashboard-content-area">
          {statusMessage && <div className="status-banner">{statusMessage}</div>}

          {menu === "dashboard" && (
            <>
              <section className="dashboard-summary">
                <article className="dashboard-stat-card accent">
                  <div className="stat-icon"><FiPackage /></div>
                  <span>Total de produtos</span>
                  <strong>{stats.totalProdutos}</strong>
                  <small>Itens cadastrados</small>
                </article>

                <article className="dashboard-stat-card">
                  <div className="stat-icon"><FiTrendingUp /></div>
                  <span>Estoque total</span>
                  <strong>{stats.totalEstoque}</strong>
                  <small>Unidades em estoque</small>
                </article>

                <article className="dashboard-stat-card warning">
                  <div className="stat-icon"><FiFilter /></div>
                  <span>Estoque baixo</span>
                  <strong>{stats.estoqueBaixo}</strong>
                  <small>Produtos em alerta</small>
                </article>

                <article className="dashboard-stat-card">
                  <div className="stat-icon"><FiBarChart2 /></div>
                  <span>Valor em estoque</span>
                  <strong>{currencyFormatter.format(stats.valorTotal)}</strong>
                  <small>Estimado</small>
                </article>
              </section>

              <section className="chart-grid">
                <div className="chart-card large">
                  <div className="chart-header">
                    <h2>Quantidade por produto</h2>
                    <div className="chart-filter-group">
                      {(["7", "30", "all"] as ChartPeriod[]).map((period) => (
                        <button
                          key={period}
                          type="button"
                          className={chartPeriod === period ? "chart-filter active" : "chart-filter"}
                          onClick={() => setChartPeriod(period)}
                        >
                          {period === "all" ? "Tudo" : `${period}d`}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
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
                          }
                        }
                      }
                    }}
                  />
                </div>

                <div className="chart-card">
                  <div className="chart-header">
                    <h2>Resumo</h2>
                  </div>
                  <Doughnut
                    data={doughnutChartData}
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

                <div className="chart-card full-width">
                  <div className="chart-header">
                    <h2>Comparativo de estoque</h2>
                  </div>
                  <Line
                    data={lineChartData}
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
                            color: "rgba(148, 163, 184, 0.12)"
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
              </section>
            </>
          )}

          {(menu === "cadastro" || menu === "editar") && (
            <section className="panel-card form-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Produto</p>
                  <h2>{editingId ? "Editar produto" : "Cadastrar produto"}</h2>
                </div>
                <span className="panel-badge">{editingId ? "Atualização" : "Novo"}</span>
              </div>

              <form className="product-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    type="text"
                    value={form.nome}
                    onChange={(event) => handleFormChange("nome", event.target.value)}
                    placeholder="Ex: Notebook Pro"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="marca">Marca</label>
                  <input
                    id="marca"
                    type="text"
                    value={form.marca}
                    onChange={(event) => handleFormChange("marca", event.target.value)}
                    placeholder="Ex: Dell"
                  />
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input
                      id="quantidade"
                      type="number"
                      min="0"
                      value={form.quantidade}
                      onChange={(event) => handleFormChange("quantidade", event.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="valor">Valor</label>
                    <input
                      id="valor"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.valor}
                      onChange={(event) => handleFormChange("valor", event.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="estoque_minimo">Estoque mínimo</label>
                  <input
                    id="estoque_minimo"
                    type="number"
                    min="0"
                    value={form.estoque_minimo}
                    onChange={(event) => handleFormChange("estoque_minimo", event.target.value)}
                  />
                </div>

                <button type="submit" className="primary-button" disabled={loading}>
                  {loading
                    ? editingId
                      ? "Atualizando..."
                      : "Cadastrando..."
                    : editingId
                      ? "Salvar alterações"
                      : "Cadastrar produto"}
                </button>
              </form>
            </section>
          )}

          {menu === "visualizar" && (
            <section className="panel-card table-panel">
              <div className="panel-header table-header">
                <div>
                  <p className="panel-kicker">Inventário</p>
                  <h2>Visualizar produtos</h2>
                </div>

                <span className="panel-badge">{filteredProducts.length} itens</span>
              </div>

              <div className="table-toolbar">
                <label className="search-field" htmlFor="product-search">
                  <FiSearch />
                  <input
                    id="product-search"
                    type="search"
                    placeholder="Buscar por nome ou marca"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </label>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Marca</th>
                      <th>Estoque</th>
                      <th>Valor</th>
                      <th>Mínimo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="empty-state">
                          Nenhum produto encontrado.
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.nome}</td>
                          <td>{product.marca}</td>
                          <td>{product.quantidade}</td>
                          <td>{currencyFormatter.format(Number(product.valor || 0))}</td>
                          <td>{product.estoque_minimo}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                type="button"
                                className="action-button edit"
                                onClick={() => fillFormForEdit(product)}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="action-button delete"
                                onClick={() => setDeleteProduct(product)}
                              >
                                Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length > 0 && (
                <div className="pagination-wrapper">
                  <button
                    type="button"
                    className="pagination-button"
                    onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>

                  <span>
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    type="button"
                    className="pagination-button"
                    onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </section>
          )}
        </main>

        <footer className="dashboard-footer">
          <span>Remaih © 2026</span>
          <span>Dashboard de estoque</span>
        </footer>
      </div>

      {deleteProduct && (
        <div className="delete-modal-backdrop" onClick={() => setDeleteProduct(null)}>
          <div className="delete-modal" onClick={(event) => event.stopPropagation()}>
            <div className="delete-modal-header">
              <h3>Excluir produto</h3>
              <button type="button" className="close-modal-button" onClick={() => setDeleteProduct(null)}>
                <FiX />
              </button>
            </div>

            <p>
              Tem certeza que deseja excluir <strong>{deleteProduct.nome}</strong> do estoque?
            </p>

            <div className="delete-modal-actions">
              <button type="button" className="secondary-button" onClick={() => setDeleteProduct(null)}>
                Cancelar
              </button>
              <button type="button" className="danger-button" onClick={handleDeleteProduct}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
