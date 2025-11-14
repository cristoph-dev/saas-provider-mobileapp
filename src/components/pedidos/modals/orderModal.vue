<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    <ion-header class="ion-no-border">
        <ion-toolbar>
            <ion-button color="warning" ></ion-button>
        </ion-toolbar>
    </ion-header>

        <ion-content>

      <!-- 🟦 MODO: AÑADIR PRODUCTO -->
      <div v-if="mode === 'add-product'" class="add-product-wrapper">

        <div class="header-blue">
          <h2>Añadir producto</h2>
        </div>

        <div class="content">
          <!-- Aquí va tu buscador, categorías, lista de productos, etc -->
          <p>Lista de productos aquí...</p>
        </div>

      </div>

      <!-- 🟧 MODO: VER / EDITAR PEDIDO EXISTENTE -->
      <div v-else class="order-view-wrapper">

        <div class="header-orange">
          <h2>Pedido #{{ order?.id }}</h2>
        </div>

        <div class="content">

          <p><strong>Tipo:</strong> {{ order?.tipoPedido }}</p>
          <p><strong>Fecha:</strong> {{ order?.fecha}}</p>
          <p><strong>Hora:</strong> {{ order?.hora }}</p>

          <!-- Aquí pondrás tu lista de items del pedido -->
          <p>Información del pedido...</p>

        </div>

      </div>

    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonContent, IonModal, IonHeader } from '@ionic/vue'

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

const props = defineProps<{
  isOpen: boolean
  order: Order | null
  mode: 'view' | 'add-product'
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

function close() {
  emit('update:isOpen', false)
}
</script>
