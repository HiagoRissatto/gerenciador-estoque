CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cpf VARCHAR(11),
    cnpj VARCHAR(14),
    endereco TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'funcionario',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_users_role CHECK (role IN ('admin', 'funcionario')),
    CONSTRAINT chk_users_document CHECK (
        (cpf IS NOT NULL AND cnpj IS NULL) OR
        (cpf IS NULL AND cnpj IS NOT NULL)
    )
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0,
    valor NUMERIC(10, 2) NOT NULL,
    estoque_minimo INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_products_quantity CHECK (quantidade >= 0),
    CONSTRAINT chk_products_price CHECK (valor >= 0),
    CONSTRAINT chk_products_minimum_stock CHECK (estoque_minimo >= 0)
);

CREATE TABLE stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    type VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_stock_movements_type CHECK (type IN ('entrada', 'saida')),
    CONSTRAINT chk_stock_movements_quantity CHECK (quantity > 0)
);

CREATE INDEX idx_products_name
    ON products(nome);

CREATE INDEX idx_stock_movements_product_id
    ON stock_movements(product_id);

CREATE INDEX idx_stock_movements_created_at
    ON stock_movements(created_at DESC);

CREATE INDEX idx_users_email
    ON users(email);