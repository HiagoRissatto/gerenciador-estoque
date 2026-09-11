import { useState } from "react";
import type { FormEvent } from "react";
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

import Sidebar from "./Components/Sidebar";
import DashboardHeader from "./Components/DashboardHeader";
import DashboardStats from "./Components/DashboardStats";
import DashboardCharts from "./Components/DashboardCharts";
import ProductForm from "./Components/ProductForm";
import ProductListSection from "./Components/ProductListSection";
import DeleteProductModal from "./Components/DeleteProductModal";

import { useProducts } from "./hooks/useProduct";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { useDashboardCharts } from "./hooks/useDashboardCharts";
import { useProductFilters } from "./hooks/useProductFilters";
import { useProductForm } from "./hooks/useProductForm";
import { useDashboardStats } from "./hooks/useDashboardStats";

import type { Product } from "../../types/product";

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

type MenuOption =
  | "dashboard"
  | "cadastro"
  | "editar"
  | "visualizar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState<MenuOption>("dashboard");

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const { user } = useCurrentUser();

  const {
    form,
    editingId,
    handleFormChange,
    startCreate,
    startEdit,
    resetForm
  } = useProductForm();

  const {
    products,
    loading,
    statusMessage,
    saveProduct,
    deleteProduct
  } = useProducts({
    form,
    editingId,
    onSuccess: () => {
      resetForm();
      setMenu("visualizar");
    }
  });

  const stats = useDashboardStats(products);

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    filteredProducts,
    paginatedProducts,
    totalPages
  } = useProductFilters(products);

  const {
    chartPeriod,
    setChartPeriod,
    barChartData,
    lineChartData,
    doughnutChartData
  } = useDashboardCharts(products, stats);

  const canManageProducts = user?.role === "admin";

  function handleLogout() {
    localStorage.removeItem("token");

    navigate("/", {
      replace: true
    });
  }

  function handleNewProduct() {
    startCreate();
    setMenu("cadastro");
  }

  function handleEditProduct(product: Product) {
    startEdit(product);
    setMenu("editar");
  }

  function handleCancelForm() {
    resetForm();
    setMenu("dashboard");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await saveProduct();
  }

  async function handleDeleteProduct() {
    if (!productToDelete) {
      return;
    }

    await deleteProduct(productToDelete);

    setProductToDelete(null);
  }

  return (
    <div className="dashboard-shell">
      <Sidebar
        menu={menu}
        isCollapsed={isSidebarCollapsed}
        onMenuChange={setMenu}
        onToggleCollapse={() =>
          setIsSidebarCollapsed(
            (previous) => !previous
          )
        }
        onNewProduct={handleNewProduct}
      />

      <div className="dashboard-main">
        <DashboardHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() =>
            setIsSidebarCollapsed(
              (previous) => !previous
            )
          }
          onLogout={handleLogout}
        />

        <main className="dashboard-content-area">
          {statusMessage && (
            <div className="status-banner">
              {statusMessage}
            </div>
          )}

          {menu === "dashboard" && (
            <>
              <DashboardStats
                totalProducts={stats.totalProdutos}
                totalStock={stats.totalEstoque}
                lowStock={stats.estoqueBaixo}
                stockValue={stats.valorTotal}
              />

              <DashboardCharts
                barData={barChartData}
                lineData={lineChartData}
                doughnutData={doughnutChartData}
                chartPeriod={chartPeriod}
                onChartPeriodChange={setChartPeriod}
              />
            </>
          )}

          {(menu === "cadastro" ||
            menu === "editar") && (
            <ProductForm
              form={form}
              isEditing={editingId !== null}
              loading={loading}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
            />
          )}

          {menu === "visualizar" && (
            <ProductListSection
              products={paginatedProducts}
              totalProducts={filteredProducts.length}
              searchTerm={searchTerm}
              currentPage={currentPage}
              totalPages={totalPages}
              canManageProducts={canManageProducts}
              onSearchChange={setSearchTerm}
              onEdit={handleEditProduct}
              onDelete={setProductToDelete}
              onPageChange={setCurrentPage}
            />
          )}
        </main>

        <footer className="dashboard-footer">
          <span>Remaih © 2026</span>
          <span>Dashboard de estoque</span>
        </footer>
      </div>

      <DeleteProductModal
        isOpen={productToDelete !== null}
        productName={productToDelete?.nome}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
}