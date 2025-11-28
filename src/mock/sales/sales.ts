import { reactive } from "vue"

export type SaleStatus = "sold" | "cancelled";
export type SaleType = "local" | "takeaway";

export interface Sale {
  id: number;
  orderId: number;
  totalUSD: number;
  totalBs: number;
  status: SaleStatus;
  type: SaleType;
  createdAt: string;
}

export const sales = reactive<Sale[]>([
  {
    id: 7,
    orderId: 8,
    totalUSD: 45.0,        
    totalBs: 1620.0,       
    status: "sold",
    type: "local",
    createdAt: "18:30 - 11/11/2025"
  },
  {
    id: 8,
    orderId: 9,
    totalUSD: 40,
    totalBs: 40000,
    status: "cancelled",
    type: "takeaway", 
    createdAt: "18:30 - 11/11/2025"
  }
])
