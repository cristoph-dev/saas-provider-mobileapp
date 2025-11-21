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
import type { Delivery } from '@/mock/deliveries/deliveries'
import { DeliveryService } from '@/mock/deliveries/deliveriesService'


const activeTab = ref<'pedidos' | 'mesas'>('pedidos')
const map = { pedidos: PedidosView, mesas: MesasView }
const currentComponent = computed(() => map[activeTab.value])

const isOrderModalOpen = ref(false)
const modalMode = ref<'view' | 'new'>('view')
const selectedOrder = ref<Delivery | null>(null)

function openAddProduct() {
  const nuevo = DeliveryService.create("En el local")

  modalMode.value = 'new'
  selectedOrder.value = nuevo
  isOrderModalOpen.value = true
}

function openOrder(order: Delivery) {
  modalMode.value = 'view'
  selectedOrder.value = order
  isOrderModalOpen.value = true
}
</script>
