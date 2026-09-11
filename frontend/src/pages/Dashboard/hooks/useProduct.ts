import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../../services/api";

import type { Product } from "../../../types/product";

interface ProductFormData {
  nome: string;
  marca: string;
  quantidade: string;
  valor: string;
  estoque_minimo: string;
}

interface UseProductsParams {
  form: ProductFormData;
  editingId: string | null;
  onSuccess: () => void;
}

export function useProducts({
  form,
  editingId,
  onSuccess
}: UseProductsParams) {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchProducts = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", {
        replace: true
      });

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
      setStatusMessage(
        "Não foi possível carregar os produtos do banco."
      );
    }
  }, [navigate]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  async function saveProduct() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", {
        replace: true
      });

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
      setStatusMessage(
        "Preencha todos os campos com valores válidos."
      );

      return;
    }

    try {
      setLoading(true);
      setStatusMessage("");

      const response = await fetch(
        `${API_URL}/produtos${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => ({}))) as {
          message?: string;
        };

        throw new Error(
          errorData.message || "Erro ao salvar o produto"
        );
      }

      setStatusMessage(
        editingId
          ? "Produto atualizado com sucesso."
          : "Produto cadastrado com sucesso."
      );

      await fetchProducts();

      onSuccess();
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o produto."
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(product: Product) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", {
        replace: true
      });

      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/produtos/${product.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir o produto");
      }

      setStatusMessage(
        "Produto removido com sucesso."
      );

      await fetchProducts();
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível remover o produto."
      );
    }
  }

  return {
    products,
    loading,
    statusMessage,
    fetchProducts,
    saveProduct,
    deleteProduct,
    setStatusMessage
  };
}