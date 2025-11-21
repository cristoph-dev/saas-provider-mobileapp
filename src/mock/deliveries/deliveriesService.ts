import { deliveries, type Delivery } from "./deliveries"

export const DeliveryService = {
  getAll(): Delivery[] {
    return deliveries
  },

  getById(id: number): Delivery | undefined {
    return deliveries.find(d => d.id === id)
  },

  create(type: "En el local" | "Para llevar" = "En el local"): Delivery {
    const now = new Date()

    const newDelivery: Delivery = {
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
    }

    deliveries.push(newDelivery)
    return newDelivery
  },

  update(id: number, data: Partial<Delivery>) {
    const d = deliveries.find(x => x.id === id)
    if (!d) return

    Object.assign(d, data)
    return d
  }
}
