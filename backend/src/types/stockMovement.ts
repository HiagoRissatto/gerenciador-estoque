export interface StockMovement {
  id?: number;
  product_id: number;
  type: "entrada" | "saida";
  quantity: number;
  created_at?: Date;
}