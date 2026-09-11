import {
  FiEdit3,
  FiTrash2
} from "react-icons/fi";

import type { Product } from "../../../types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  canManageProducts?: boolean;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  canManageProducts = true
}: ProductTableProps) {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Marca</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Estoque mínimo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const lowStock =
                product.quantidade <= product.estoque_minimo;

              return (
                <tr key={product.id}>
                  <td>
                    <div className="product-name-cell">
                      <div className="product-avatar">
                        {product.nome.charAt(0).toUpperCase()}
                      </div>

                      <strong>{product.nome}</strong>
                    </div>
                  </td>

                  <td>{product.marca}</td>

                  <td>
                    <span
                      className={
                        lowStock
                          ? "stock-badge low"
                          : "stock-badge normal"
                      }
                    >
                      {product.quantidade}
                    </span>
                  </td>

                  <td className="product-price">
                    {Number(product.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </td>

                  <td>{product.estoque_minimo}</td>

                  <td>
                    {canManageProducts && (
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="action-button edit"
                          onClick={() => onEdit(product)}
                          aria-label={`Editar ${product.nome}`}
                          title="Editar produto"
                        >
                          <FiEdit3 />
                        </button>

                        <button
                          type="button"
                          className="action-button delete"
                          onClick={() => onDelete(product)}
                          aria-label={`Excluir ${product.nome}`}
                          title="Excluir produto"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}