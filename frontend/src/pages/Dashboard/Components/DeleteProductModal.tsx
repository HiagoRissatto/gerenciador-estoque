import { FiAlertTriangle, FiX } from "react-icons/fi";

interface DeleteProductModalProps {
  isOpen: boolean;
  productName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductModal({
  isOpen,
  productName,
  onConfirm,
  onCancel
}: DeleteProductModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <button
          type="button"
          className="modal-close-button"
          onClick={onCancel}
          aria-label="Fechar"
        >
          <FiX />
        </button>

        <div className="delete-modal-icon">
          <FiAlertTriangle />
        </div>

        <h2>Excluir produto</h2>

        <p>
          Tem certeza que deseja excluir
          {productName ? ` "${productName}"` : " este produto"}?
        </p>

        <p className="delete-modal-warning">
          Essa ação não poderá ser desfeita.
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}