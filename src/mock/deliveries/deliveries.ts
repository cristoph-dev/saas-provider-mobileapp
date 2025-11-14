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
}

export const deliveries: Delivery[] = [
  // pendiente y no pagado
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
    totalBs: '2,170',
    },
    {
    // Pendiente y pagado
    id: 2,
    deliveryType: 'En el local',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'Pendiente',
    payment: 'Pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
// En preparacion y no pagado
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
    totalBs: '2,170',
  },
// En preparacion y pagado
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
    totalBs: '2,170',
  },
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
    totalBs: '2,170',
  },
];

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