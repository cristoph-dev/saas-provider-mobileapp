import { reactive } from "vue";

export interface Delivery {
    id: number;
    deliveryType: 'Para llevar' | 'En el local';
    date: string;
    time: string;
    duration: string;
    state: "Pendiente" | "En preparación" | string;
    payment: "Pagado" | "No pagado"
    channel: 'PDV' | string;
    totalUSD: number;
    totalBs: string;
    products: DeliveryProduct[]
}

export interface DeliveryProduct {
  id: number
  name: string
  price: number
  currency: "Bs" | "USD" | "VES"
  qty: number
}

export const deliveries = reactive<Delivery[]>([
  // #1
  {    
    id: 1,
    deliveryType: 'Para llevar',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'Pendiente',
    payment: 'Pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '2170',
    products: [
      {
        id: 1,
        name: "Arepa de carne mechada",
        price: 22,
        currency: "Bs",
        qty: 1
      },
      {
        id: 2,
        name: "Coca Cola",
        price: 15,
        currency: "Bs",
        qty: 2
      }
    ]
  },

  // #2
  {
    id: 2,
    deliveryType: 'En el local',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'Pendiente',
    payment: 'Pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '2790',
    products: [
      {
        id: 10,
        name: "Pizza de pepperoni",
        price: 40,
        currency: "Bs",
        qty: 1
      },
      {
        id: 11,
        name: "Jugo natural",
        price: 18,
        currency: "Bs",
        qty: 1
      }
    ]
  },

  // #3
  {
    id: 3,
    deliveryType: 'En el local',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'En preparación',
    payment: 'No pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '1450',
    products: [
      {
        id: 5,
        name: "Arepa de queso",
        price: 20,
        currency: "Bs",
        qty: 1
      },
      {
        id: 2,
        name: "Coca Cola",
        price: 15,
        currency: "Bs",
        qty: 1
      }
    ]
  },

  // #4
  {
    id: 4,
    deliveryType: 'En el local',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'En preparación',
    payment: 'Pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '3320',
    products: [
      {
        id: 10,
        name: "Pizza de pepperoni",
        price: 40,
        currency: "Bs",
        qty: 1
      },
      {
        id: 15,
        name: "Pizza napolitana",
        price: 35,
        currency: "Bs",
        qty: 1
      },
      {
        id: 2,
        name: "Coca Cola",
        price: 15,
        currency: "Bs",
        qty: 1
      }
    ]
  },

  // #5
  {
    id: 5,
    deliveryType: 'En el local',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'En preparación',
    payment: 'Pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '980',
    products: [
      {
        id: 3,
        name: "Te frío",
        price: 12,
        currency: "Bs",
        qty: 1
      },
      {
        id: 4,
        name: "Galletas",
        price: 8,
        currency: "Bs",
        qty: 1
      }
    ]
  },
])

// legacy code
const pedidos = [
  {
    id: 1,
    tipoPedido: 'Para llevar',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'Pendiente',
    metodoPago: 'No pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
  {
    id: 2,
    tipoPedido: 'En el local',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'Pendiente',
    metodoPago: 'Pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
  {
    id: 3,
    tipoPedido: 'En el local',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'En preparación',
    metodoPago: 'No pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
  {
    id: 4,
    tipoPedido: 'En el local',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'En preparación',
    metodoPago: 'Pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
]