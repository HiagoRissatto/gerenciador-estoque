import { FiSearch } from "react-icons/fi";

import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";

import type { Product } from "../../../types/product";

interface ProductListSectionProps {
  products: Product[];
  totalProducts: number;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  canManageProducts: boolean;

  onSearchChange: (value: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onPageChange: (page: number) => void;
}

export default function ProductListSection({
  products,
  totalProducts,
  searchTerm,
  currentPage,
  totalPages,
  canManageProducts,
  onSearchChange,
  onEdit,
  onDelete,
  onPageChange
}: ProductListSectionProps) {
  return (
    <section className="panel-card table-panel">
      <div className="panel-header table-header">
        <div>
          <p className="panel-kicker">
            Inventário
          </p>

          <h2>
            Visualizar produtos
          </h2>
        </div>

        <span className="panel-badge">
          {totalProducts} itens
        </span>
      </div>

      <div className="table-toolbar">
        <label
          className="search-field"
          htmlFor="product-search"
        >
          <FiSearch />

          <input
            id="product-search"
            type="search"
            placeholder="Buscar por nome ou marca"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
        </label>
      </div>

      <ProductTable
        products={products}
        canManageProducts={canManageProducts}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {totalProducts > 0 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}