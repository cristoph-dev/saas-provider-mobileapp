<template>
  <ion-header class="ion-no-border">
      <ion-toolbar>
          <ion-item  lines="none" class="toolbar-buttons">
            <ion-button @click="set('pedidos')" id="button-left-part" color="primary">Pedidos</ion-button>
            <ion-button @click="set('mesas')" id="button-right-part" color="primary">Mesas</ion-button>
          <ion-button slot="end" size="small" shape="round" color="primary"><ion-icon  slot="icon-only" :icon="ellipsisVertical"/></ion-button>
          </ion-item>
      </ion-toolbar>
    </ion-header>


    <ion-button v-if="activeTab === 'pedidos'" expand="full" @click="emit('new-order')"><ion-icon slot="start" :icon="addOutline"/>Nuevo pedido</ion-button>
    <ion-item v-if="activeTab === 'pedidos'" lines="none" >
      <ion-chip outline>Todo<ion-badge>0</ion-badge></ion-chip>
      <ion-chip outline>Pendiente<ion-badge color="warning">0</ion-badge></ion-chip> 
      <ion-chip outline>En curso<ion-badge color="success">0</ion-badge></ion-chip> 
    </ion-item>

    <ion-item v-else lines="none" >
      <div class="salas-grid">
        <ion-button v-for="sala in salas" :key="sala.id" :class="{ activo: salaActiva === sala.id }" @click="salaActiva = sala.id" class="sala-btn">
          {{ sala.nombre }}
        </ion-button>
      <ion-button class="sala-btn">
        <ion-icon slot="start" :icon="addOutline" />
          Nueva sala
        </ion-button>
      </div>
    </ion-item>

</template>

<script setup lang="ts">
import {
  searchSharp, menuOutline, ellipsisVertical, addOutline, chevronCollapseOutline,
  chevronExpandOutline, chevronDownOutline, chevronUpOutline, copyOutline,
  trashOutline, closeOutline, restaurantOutline
} from 'ionicons/icons'
import DomicilioView from '@/views/pedidos/PedidosView.vue'
import MesasView from '@/views/pedidos/MesasView.vue'
import OrderModal from '@/components/pedidos/modals/orderModal.vue'   
import { ref } from 'vue'
import { DeliveryService } from '@/mock/deliveries/deliveriesService'

// modal

interface Order {
  id: number
  orderType: string
  date: string
  time: string
  duration: string
  status: string
  paymentMethod: string
  channel: string
  totalUSD: number
  totalBs: string
}

const activeTab = ref<'pedidos' | 'mesas'>('pedidos')

const emit = defineEmits<{
  (e: 'update:activeTab', value: 'pedidos'|'mesas'): void
  (e: 'new-order'): void
}>()

function set(v: 'pedidos'|'mesas') {
  activeTab.value = v         
  emit('update:activeTab', v)  
}

// salas 


const salas = ref([
  { id: 1, nombre: 'Sala principal' },
  { id: 2, nombre: 'Terraza' },
  { id: 3, nombre: 'Ejemplo' },
])

const salaActiva = ref(1)


const isOrderModalOpen = ref(false)
const modalMode = ref<'new' | 'view'>('new')
const selectedOrder = ref<Order | null>(null)

function openAddProduct() {
  // 1. Crear un nuevo delivery vacío
  const nuevo = DeliveryService.create("En el local")

  // 2. Enviar ese delivery al modal
  selectedOrder.value = nuevo as any

  modalMode.value = "new"
  isOrderModalOpen.value = true
}

</script>



<style scoped>



#button-left-part {
  --border-radius: 12px 0 0 12px;
  font-size: 10px;
  margin: 0 0 0 0;
  border-style: none;
}

#button-middle-part {
  --border-radius: 0 0 0 0;
    font-size: 10px;
    margin: 0 0 0 0;
    border-style: none;
}

#button-right-part {
  --border-radius: 0 12px 12px 0;
    font-size: 10px;
    margin: 0 0 0 0;
    border-style: none;
}

.salas-grid {
  display: grid;
  grid-template-columns: repeat(2, 140px); 
  gap: 8px;
  justify-content: center; 
  width: 100%;
}

.sala-btn {
  --border-radius: 12px;
  height: 40px;
  text-transform: none;
  font-weight: 500;
}

.sala-btn.activo {
  --color: #ffffff;
}

</style>