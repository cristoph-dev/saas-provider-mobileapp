<template>
  <ion-page>
      <VentasHeader v-model:activeTab="activeTab"  :counts="counts" @new-order="openAddProduct"/>

      <ion-content>
        <keep-alive>
          <component :is="currentComponent" @open-order="openOrder" @update-counts="counts = $event"/>
        </keep-alive>
      </ion-content>

  <OrderModal
        v-model:isOpen="isOrderModalOpen"
        :order="selectedOrder"
        :mode="modalMode"
        @close="reloadPedidos"
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

function reloadPedidos() {
  // Forzar recargar desde el servicio
  DeliveryService.save();
}

//emits al header

const counts = ref({
  todos: 0,
  pendientes: 0,
  enCurso: 0
})

</script>
