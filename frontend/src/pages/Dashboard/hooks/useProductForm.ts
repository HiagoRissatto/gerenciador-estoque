import { useState } from "react";

import type { Product } from "../../../types/product";

export interface ProductFormData {
  nome: string;
  marca: string;
  quantidade: string;
  valor: string;
  estoque_minimo: string;
}

const emptyProductForm: ProductFormData = {
  nome: "",
  marca: "",
  quantidade: "",
  valor: "",
  estoque_minimo: ""
};

export function useProductForm() {
  const [form, setForm] =
    useState<ProductFormData>(emptyProductForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  function handleFormChange(
    field: keyof ProductFormData,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyProductForm);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      nome: product.nome,
      marca: product.marca,
      quantidade: String(product.quantidade),
      valor: String(product.valor),
      estoque_minimo: String(product.estoque_minimo)
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyProductForm);
  }

  return {
    form,
    editingId,
    handleFormChange,
    startCreate,
    startEdit,
    resetForm
  };
}