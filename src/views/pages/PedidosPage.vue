<template>
  <ion-page>
      <VentasHeader v-model:activeTab="activeTab" @new-order="openAddProduct"/>

      <ion-content>
        <keep-alive>
          <component :is="currentComponent" @open-order="openOrder"/>
        </keep-alive>
      </ion-content>

  <OrderModal
        v-model:isOpen="isOrderModalOpen"
        :order="selectedOrder"
        :mode="modalMode"
      />  
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
} from '@ionic/vue'
import { ref, computed } from 'vue'
import VentasHeader from '@/components/pedidos/pedidosHeader.vue'
import PedidosView from '@/views/pedidos/PedidosView.vue'
import MesasView from '@/views/pedidos/MesasView.vue'
import OrderModal from '@/components/pedidos/modals/orderModal.vue'

interface Order {
  id: number
  tipoPedido: string
  fecha: string
  hora: string
  tiempo: string
  estado: string
  metodoPago: string
  canal: string
  totalUSD: number
  totalBs: string
}

const activeTab = ref<'pedidos' | 'mesas'>('pedidos')
const map = { pedidos: PedidosView, mesas: MesasView }
const currentComponent = computed(() => map[activeTab.value])

const isOrderModalOpen = ref(false)
const modalMode = ref<'view' | 'add-product'>('view')
const selectedOrder = ref<Order | null>(null)

/** 👉 Se dispara al hacer clic en "Nuevo pedido" del header */
function openAddProduct() {
  modalMode.value = 'add-product'  // modo añadir producto
  selectedOrder.value = null       // no hay pedido aún
  isOrderModalOpen.value = true
}

/** 👉 Se dispara al tocar una card en la lista */
function openOrder(order: Order) {
  modalMode.value = 'view'         // modo ver pedido
  selectedOrder.value = order      // cargamos el pedido
  isOrderModalOpen.value = true
}
</script>
