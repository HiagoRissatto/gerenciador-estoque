import { useMemo } from "react";

import type { Product } from "../../../types/product";

export function useDashboardStats(products: Product[]) {
  const stats = useMemo(() => {
    const totalProdutos = products.length;

    const totalEstoque = products.reduce(
      (sum, product) =>
        sum + Number(product.quantidade || 0),
      0
    );

    const estoqueBaixo = products.filter(
      (product) =>
        Number(product.quantidade) <=
        Number(product.estoque_minimo || 0)
    ).length;

    const valorTotal = products.reduce(
      (sum, product) =>
        sum +
        Number(product.quantidade || 0) *
          Number(product.valor || 0),
      0
    );

    return {
      totalProdutos,
      totalEstoque,
      estoqueBaixo,
      valorTotal
    };
  }, [products]);

  return stats;
}