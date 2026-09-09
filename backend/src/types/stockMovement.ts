export interface StockMovement {
  id?: string;
  product_id: string;
  type: "entrada" | "saida";
  quantity: number;
  created_at?: Date;
}