export interface deliveries {
    id: number,
    deliveryType: string,
    date: string,
    time: string,
    duration: string,
    state: string,
    payment: string,
    channel: string,
    totalUSD: number,
    totalBs: string
}

export const deliveries: deliveries[] = [
    {    
    id: 1,
    deliveryType: 'Para llevar',
    date: '31/10/25',
    time: '22:49',
    duration: '1:40 min',
    state: 'Pendiente',
    payment: 'No pagado',
    channel: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
    }
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