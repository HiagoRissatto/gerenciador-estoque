import type { FormEvent } from "react";

import type { ProductFormData } from "../hooks/useProductForm";

interface ProductFormProps {
  form: ProductFormData;
  isEditing: boolean;
  loading: boolean;
  onChange: (
    field: keyof ProductFormData,
    value: string
  ) => void;
  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;
  onCancel: () => void;
}

export default function ProductForm({
  form,
  isEditing,
  loading,
  onChange,
  onSubmit,
  onCancel
}: ProductFormProps) {
  return (
    <section className="panel-card form-panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">
            Produto
          </p>

          <h2>
            {isEditing
              ? "Editar produto"
              : "Cadastrar produto"}
          </h2>
        </div>

        <span className="panel-badge">
          {isEditing
            ? "Atualização"
            : "Novo"}
        </span>
      </div>

      <form
        className="product-form"
        onSubmit={onSubmit}
      >
        <div className="input-group">
          <label htmlFor="nome">
            Nome
          </label>

          <input
            id="nome"
            type="text"
            value={form.nome}
            onChange={(event) =>
              onChange(
                "nome",
                event.target.value
              )
            }
            placeholder="Ex: Notebook Pro"
          />
        </div>

        <div className="input-group">
          <label htmlFor="marca">
            Marca
          </label>

          <input
            id="marca"
            type="text"
            value={form.marca}
            onChange={(event) =>
              onChange(
                "marca",
                event.target.value
              )
            }
            placeholder="Ex: Dell"
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="quantidade">
              Quantidade
            </label>

            <input
              id="quantidade"
              type="number"
              min="0"
              value={form.quantidade}
              onChange={(event) =>
                onChange(
                  "quantidade",
                  event.target.value
                )
              }
            />
          </div>

          <div className="input-group">
            <label htmlFor="valor">
              Valor
            </label>

            <input
              id="valor"
              type="number"
              min="0"
              step="0.01"
              value={form.valor}
              onChange={(event) =>
                onChange(
                  "valor",
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="estoque_minimo">
            Estoque mínimo
          </label>

          <input
            id="estoque_minimo"
            type="number"
            min="0"
            value={
              form.estoque_minimo
            }
            onChange={(event) =>
              onChange(
                "estoque_minimo",
                event.target.value
              )
            }
          />
        </div>

        <div className="product-form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? isEditing
                ? "Atualizando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar produto"}
          </button>
        </div>
      </form>
    </section>
  );
}