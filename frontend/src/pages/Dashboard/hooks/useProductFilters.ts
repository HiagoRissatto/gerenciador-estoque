import { useEffect, useMemo, useState } from "react";

import type { Product } from "../../../types/product";

const pageSize = 5;

export function useProductFilters(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize)
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredProducts.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [filteredProducts, currentPage]);

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    filteredProducts,
    paginatedProducts,
    totalPages
  };
}