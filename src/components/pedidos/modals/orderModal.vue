<!-- <div v-if="mode === 'add-product'" class="add-product-wrapper"> -->
<!-- <div v-else class="order-view-wrapper"> -->

<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    <template v-if="mode === 'new'">
        <ion-header class="ion-no-border" >
            <ion-toolbar color="warning">
 
                <ion-button slot="start" fill="clear" size="small" @click="close()"><ion-icon :icon="chevronBackOutline"/></ion-button>
                <span>#1</span>
                <ion-chip   @click="toggleTipo" :outline="true">{{ tipoPedido }}</ion-chip>  
                <ion-label>| Pendiente</ion-label>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>
            <ion-item class="ion-no-border">
                <ion-chip :outline="true">PDV</ion-chip>
                <ion-icon style="margin-left: 0.5rem;" :icon="calendarOutline"/>
                <ion-label class="date" style="margin-left: 0.5rem;">22:30 - 31/10/2025</ion-label>
            </ion-item>
             <div class="ete"> <!-- edge to edge -->
              <ion-button  expand="full" class="btn-anadir">+ Añadir producto</ion-button>
            </div>
        </ion-content>
        <ion-footer class="ion-no-border">
          <ion-item>
            <ion-chip color="danger" :outline="true" slot="start"><ion-icon :icon="banOutline"/><ion-label>Cancelar pedido</ion-label></ion-chip>
            <ion-chip color="warning" slot="start" style="margin-left: 0.5rem;">No pagado</ion-chip>
            <ion-label slot="end">Total bs. 200.00</ion-label>  
          </ion-item>
                    
          <ion-button expand="full" class="btn-pay">PAGAR</ion-button>
          <ion-button expand="full" class="btn-ctr">AVANZAR</ion-button>
        </ion-footer>
    </template>
    <template v-else>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-button slot="start" fill="clear" size="small" @click="close()"><ion-icon :icon="chevronBackOutline"/></ion-button>
                <ion-chip :outline="true">Pedido</ion-chip>
            </ion-toolbar>
        </ion-header>
        
        <ion-content>
            <!-- <p><strong>Tipo:</strong> {{ Order?.tipoPedido }}</p>
            <p><strong>Fecha:</strong> {{ Order?.fecha}}</p>
            <p><strong>Hora:</strong> {{ Order?.hora }}</p> -->
            <p>Información del pedido...</p>
        </ion-content>
      </template>
    </ion-modal>
</template>

<script setup lang="ts">
import { bagHandleOutline, chevronBackOutline, pencilSharp, calendarOutline, banOutline} from 'ionicons/icons';
import { ref, computed } from 'vue';
import type { Order } from '@/mock/deliveries/order'
import type { Delivery } from '@/mock/deliveries/deliveries'


const props = defineProps<{
  order: Delivery | null
  mode: "new" | "view"
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

function close() {
  emit('update:isOpen', false)
}

//

const tipoPedido = computed({
  get() {
    return props.order?.deliveryType ?? "En el local"
  },
  set(value: "En el local" | "Para llevar") {
    if (props.order) {
      props.order.deliveryType = value
    }
  }
})

function toggleTipo() {
  tipoPedido.value =
    tipoPedido.value === 'En el local'
      ? 'Para llevar'
      : 'En el local'
}
</script>

<style scoped>




.date {
  font-size: 0.7rem;
  margin-left: 0.3rem;
}

.ete {
  margin-left: calc(var(--page-horizontal-padding) * -1);
  margin-right: calc(var(--page-horizontal-padding) * -1);
}

ion-item ion-chip {
  margin-left: 0rem !important;
  margin-right: 0 !important;
}

.btn-pay {
  --border-style: none;
  --color: #ffffff;      
  --border-width: 0;    
  --background-hover: rgba(211, 47, 47, 0.1);
  --background-activated: rgba(211, 47, 47, 0.2);
  --border-radius: 0;
  --background: #0074fd;
    margin: 0;
    height: 2rem;
}

.btn-ctr {
  --border-style: none;
  --color: #ffffff;      
  --border-width: 0;    
  --background-hover: rgba(211, 47, 47, 0.1);
  --background-activated: rgba(211, 47, 47, 0.2);
  --border-radius: 0;
  --background: #25D92B;
    margin: 0;
    height: 4rem;
}

.btn-anadir {
  --border-style: none;
  --background: #0074fd;
}


</style>
