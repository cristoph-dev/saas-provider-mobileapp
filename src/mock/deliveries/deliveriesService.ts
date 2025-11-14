import { deliveries, type Delivery } from '@/mock/deliveries/deliveries'

// @get all
export function useDeliveries() {
  function getAll(): Delivery[] {   // simula el fetch (luego lo reemplazamos por API)
    return deliveries
  }

  function getById(id: number): Delivery | undefined {
    return deliveries.find(d => d.id === id)
  }

  return { getAll, getById }
}
