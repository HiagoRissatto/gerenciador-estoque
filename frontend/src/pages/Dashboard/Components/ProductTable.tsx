import {
  FiEdit3,
  FiEye,
  FiTrash2
} from "react-icons/fi";

interface Product {
  id: string;
  nome: string;
  marca: string;
  quantidade: number;
  valor: number;
  estoque_minimo: number;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView?: (product: Product) => void;
  canManageProducts?: boolean;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onView,
  canManageProducts = true
}: ProductTableProps) {
  return (
    <div className="product-table-container">
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
              <td colSpan={6}>
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const lowStock =
                product.quantidade <= product.estoque_minimo;

              return (
                <tr key={product.id}>
                  <td>{product.nome}</td>

                  <td>{product.marca}</td>

                  <td>
                    <span
                      className={
                        lowStock
                          ? "stock-status stock-status-low"
                          : "stock-status"
                      }
                    >
                      {product.quantidade}
                    </span>
                  </td>

                  <td>
                    {product.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </td>

                  <td>{product.estoque_minimo}</td>

                  <td>
                    <div className="product-actions">
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(product)}
                          aria-label={`Visualizar ${product.nome}`}
                        >
                          <FiEye />
                        </button>
                      )}

                      {canManageProducts && (
                        <>
                          <button
                            type="button"
                            onClick={() => onEdit(product)}
                            aria-label={`Editar ${product.nome}`}
                          >
                            <FiEdit3 />
                          </button>

                          <button
                            type="button"
                            onClick={() => onDelete(product)}
                            aria-label={`Excluir ${product.nome}`}
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      )}
                    </div>
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