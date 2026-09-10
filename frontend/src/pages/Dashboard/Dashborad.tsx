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
  FiEdit3,
  FiEye,
  FiLogOut,
  FiPackage,
  FiPlusCircle,
  FiTrendingUp
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuOption>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyProductForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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

  const barChartData = useMemo(() => {
    const chartProducts = products.slice(0, 6);

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
          borderRadius: 10
        }
      ]
    };
  }, [products]);

  const lineChartData = useMemo(() => {
    const chartProducts = products.slice(0, 7);

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
  }, [products]);

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

  async function handleDelete(productId: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const shouldDelete = window.confirm("Deseja excluir este produto?");
    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos/${productId}`, {
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
      await fetchProducts();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Não foi possível remover o produto."
      );
    }
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">R</div>
          <div>
            <span className="sidebar-brand-label">Remaih</span>
            <strong>Estoque</strong>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={menu === "dashboard" ? "nav-button active" : "nav-button"}
            onClick={() => setMenu("dashboard")}
          >
            <FiBarChart2 />
            Dashboard
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
            Cadastro
          </button>

          <button
            type="button"
            className={menu === "editar" ? "nav-button active" : "nav-button"}
            onClick={() => setMenu("editar")}
          >
            <FiEdit3 />
            Editar
          </button>

          <button
            type="button"
            className={menu === "visualizar" ? "nav-button active" : "nav-button"}
            onClick={() => setMenu("visualizar")}
          >
            <FiEye />
            Visualizar
          </button>
        </nav>

        <div className="sidebar-footer-box">
          <FiTrendingUp />
          <span>Operação em tempo real</span>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">Painel administrativo</p>
            <h1>Gestão de produtos</h1>
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
                  <span>Total de produtos</span>
                  <strong>{stats.totalProdutos}</strong>
                  <small>Itens cadastrados</small>
                </article>

                <article className="dashboard-stat-card">
                  <span>Estoque total</span>
                  <strong>{stats.totalEstoque}</strong>
                  <small>Unidades em estoque</small>
                </article>

                <article className="dashboard-stat-card">
                  <span>Estoque baixo</span>
                  <strong>{stats.estoqueBaixo}</strong>
                  <small>Produtos em alerta</small>
                </article>

                <article className="dashboard-stat-card">
                  <span>Valor em estoque</span>
                  <strong>{currencyFormatter.format(stats.valorTotal)}</strong>
                  <small>Estimado</small>
                </article>
              </section>

              <section className="chart-grid">
                <div className="chart-card large">
                  <div className="chart-header">
                    <h2>Quantidade por produto</h2>
                  </div>
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
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
                      cutout: "62%",
                      plugins: {
                        legend: {
                          position: "bottom"
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
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">Inventário</p>
                  <h2>Visualizar produtos</h2>
                </div>
                <span className="panel-badge">{products.length} itens</span>
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
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="empty-state">
                          Nenhum produto cadastrado.
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
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
                                onClick={() => handleDelete(product.id)}
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
            </section>
          )}
        </main>

        <footer className="dashboard-footer">
          <span>Remaih © 2026</span>
          <span>Dashboard de estoque</span>
        </footer>
      </div>
    </div>
  );
}
