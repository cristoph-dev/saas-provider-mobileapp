<template>
    <deliveryList :vacio="false" @open-order="onOpenOrder"/>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonTitle, IonHeader, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent } from '@ionic/vue';
import deliveryList from '@/components/pedidos/deliveryList.vue';
import VentasHeader from '@/components/pedidos/pedidosHeader.vue';

// show modal

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

const emit = defineEmits<{
  (e: 'open-order', order: Order): void
}>()

function onOpenOrder(order: Order) {
  emit('open-order', order)
}
</script>