import type { Sale, SaleType } from "./sales";
import { sales } from "./sales";

export const SalesService = {
  getAll(): Sale[] {
    return sales;
  },

  getById(id: number): Sale | undefined {
    return sales.find((s) => s.id === id);
  },


  sell(
    orderId: number,
    totalUSD: number,
    totalBs: number,
    type: SaleType
  ): Sale {
    const newSale: Sale = {
      id: sales.length + 1,
      orderId,
      totalUSD,
      totalBs,
      status: "sold",
      type,
      createdAt: new Date().toLocaleString("es-CL"),
    };

    sales.push(newSale);
    return newSale;
  },

  // REGISTRAR CANCELACIÓN (cancelled)
  cancel(orderId: number, type: SaleType): Sale {
    const newCancel: Sale = {
      id: sales.length + 1,
      orderId,
      totalUSD: 0,   // cancelado siempre 0
      totalBs: 0,
      status: "cancelled",
      type,
      createdAt: new Date().toLocaleString("es-CL"),
    };

    sales.push(newCancel);
    return newCancel;
  }
};
