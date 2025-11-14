<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    <!-- add products -->
    <div v-if="mode === 'add-product'" class="add-product-wrapper">
        <ion-header class="ion-no-border" >
            <ion-toolbar color="warning">
                <ion-button slot="start" fill="clear" size="small" @click="close()"><ion-icon :icon="chevronBackOutline"/></ion-button>
                <ion-chip :outline="true">Pedido</ion-chip>           
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-chip :outline="true">BDV</ion-chip>
                <ion-label class="ion-padding">22:30 - 31/10/2025</ion-label>
            </ion-item>
 
            <ion-button color="primary" expand="full">+ Añadir producto</ion-button>
        </ion-content>


        <ion-footer class="ion-no-border">
            <ion-chip>Cancelado</ion-chip>
            <ion-chip>No pagado</ion-chip>
            <ion-label>Total bs. 200.00</ion-label>
            <ion-button expand="full" class="btn-ctr-up">PAGAR</ion-button>
            <ion-button expand="full" color="primary" class="btn-ctr">AVANZAR</ion-button>
        </ion-footer>
    </div>
    <!-- editar pedido -->
    <div v-else class="order-view-wrapper">
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-button color="warning" expand="full"></ion-button>
            </ion-toolbar>
        </ion-header>
        
        <ion-content>
            <!-- <p><strong>Tipo:</strong> {{ Order?.tipoPedido }}</p>
            <p><strong>Fecha:</strong> {{ Order?.fecha}}</p>
            <p><strong>Hora:</strong> {{ Order?.hora }}</p> -->
            <p>Información del pedido...</p>
        </ion-content>
      </div>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonContent, IonModal, IonHeader } from '@ionic/vue'
import { bagHandleOutline, chevronBackOutline } from 'ionicons/icons';
import type { Order } from '@/mock/deliveries/order'




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

<style scoped>
.chips {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

/* CHIPS (circulitos con info (pagado, no pagado, en preparacion...)) */
.chip {
  border-radius: 20px;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  font-weight: 600;
}

.chip-outline {
  border: 1px solid #000000;
  color: #000000;
}

.btn-ctr-up {
    margin: 0;
    height: 2rem;
    background-color: #322acfa6;
}

.btn-ctr {
    margin: 0;
    height: 4rem;
}
</style>
