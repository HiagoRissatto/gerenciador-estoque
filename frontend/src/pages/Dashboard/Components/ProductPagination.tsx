import {
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange
}: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="product-pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <FiChevronLeft />
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}