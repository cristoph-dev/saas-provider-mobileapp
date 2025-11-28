import { deliveries, type Delivery } from "./deliveries"
import type { CategoryProduct } from "@/mock/menu/categories"
import { SalesService } from "@/mock/sales/salesService"

// Autoincrement coherente
let lastId = deliveries.length
  ? Math.max(...deliveries.map(d => d.id)) + 1
  : 1

export const DeliveryService = {
  // ---------------------------------------
  // GETTERS
  // ---------------------------------------
  getAll(): Delivery[] {
    return deliveries
  },

  getById(id: number): Delivery | undefined {
    return deliveries.find(d => d.id === id)
  },

  // ---------------------------------------
  // CREATE DELIVERY
  // ---------------------------------------
  create(type: "En el local" | "Para llevar"): Delivery {
    const now = new Date()

    const nuevo: Delivery = {
      id: lastId++,
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
    }

    deliveries.push(nuevo)
    this.save()
    return nuevo
  },

  // ---------------------------------------
  // ADD PRODUCT
  // ---------------------------------------
  addProduct(delivery: Delivery, product: CategoryProduct, qty = 1) {
    const existing = delivery.products.find(p => p.id === product.id)

    if (existing) {
      existing.qty += qty
    } else {
      delivery.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        qty,
        imageKey: product.imageKey ?? "noImage"
      })
    }

    this.updateTotals(delivery)
    this.save()
  },

  // ---------------------------------------
  // UPDATE TOTALS
  // ---------------------------------------
  updateTotals(delivery: Delivery) {
    const totalUSD = delivery.products.reduce(
      (sum, p) => sum + p.qty * p.price,
      0
    )

    delivery.totalUSD = totalUSD
    delivery.totalBs = (totalUSD * 78).toFixed(2)
  },

  // ---------------------------------------
  // CANCEL DELIVERY
  // ---------------------------------------
  cancel(delivery: Delivery) {
    // 1. Eliminar el pedido del listado principal
    const index = deliveries.findIndex((d) => d.id === delivery.id)
    if (index !== -1) deliveries.splice(index, 1)

    // 2. Registrar cancelación en ventas
    SalesService.cancel(
      delivery.id,
      delivery.deliveryType === "En el local" ? "local" : "takeaway"
    )

    this.save()
  },

  // ---------------------------------------
  // PAY / SELL DELIVERY
  // ---------------------------------------
  sell(delivery: Delivery) {
    // 1. Registrar la venta
    SalesService.sell(
      delivery.id,
      delivery.totalUSD,
      parseFloat(delivery.totalBs),
      delivery.deliveryType === "En el local" ? "local" : "takeaway"
    )

    // 2. Eliminar el delivery
    const index = deliveries.findIndex((d) => d.id === delivery.id)
    if (index !== -1) deliveries.splice(index, 1)

    this.save()
  },

  // ---------------------------------------
  // SAVE + LOAD
  // ---------------------------------------
  save() {
    localStorage.setItem("deliveries", JSON.stringify(deliveries))
  },

  load() {
    const data = localStorage.getItem("deliveries")
    if (!data) return

    const parsed = JSON.parse(data) as Delivery[]
    deliveries.splice(0, deliveries.length, ...parsed)

    lastId = deliveries.length
      ? Math.max(...deliveries.map(d => d.id)) + 1
      : 1
  }
}

// cargar al iniciar
DeliveryService.load()
