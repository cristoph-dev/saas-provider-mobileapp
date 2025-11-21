import { deliveries, type Delivery } from "./deliveries";
import type { CategoryProduct } from "@/mock/menu/categories";


export const DeliveryService = {
  getAll(): Delivery[] {
    return deliveries;
  },

  getById(id: number): Delivery | undefined {
    return deliveries.find(d => d.id === id);
  },

  create(type: "En el local" | "Para llevar"): Delivery {
    const now = new Date();

    const nuevo: Delivery = {
      id: deliveries.length + 1,
      deliveryType: type,
      date: now.toLocaleDateString("es-CL"),
      time: now.toLocaleTimeString("es-CL"),
      duration: "0 min",
      state: "Pendiente",
      payment: "No pagado",
      channel: "PDV",
      totalUSD: 0,
      totalBs: "0",
      products: []
    };

    deliveries.push(nuevo);
    return nuevo;
  },

addProduct(delivery: Delivery, product: CategoryProduct) {
    const existing = delivery.products.find(p => p.id === product.id)

    if (existing) {
      existing.qty++
    } else {
      delivery.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        qty: 1
      })
    }

    // actualizar totales
    const totalBs = delivery.products
      .filter(p => p.currency === "Bs")
      .reduce((sum, p) => sum + p.price * p.qty, 0)

    delivery.totalBs = totalBs.toFixed(2)
  }
};
