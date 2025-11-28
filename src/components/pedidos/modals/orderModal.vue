<template>
  <ion-modal :is-open="isOpen" @didDismiss="close">
    
    <!-- ENCABEZADO -->
    <ion-header class="ion-no-border">
      <ion-toolbar
          :style="{
            '--background': order?.state === 'En preparación'
              ? '#25D92B'    
              : '#F4A91E'    
          }"
        >
        <ion-button slot="start" fill="clear" size="small" @click="close()">
          <ion-icon :icon="chevronBackOutline" />
        </ion-button>

        <span>#{{ order?.id }}</span>

        <ion-chip @click="toggleTipo" :outline="true">
          {{ tipoPedido }}
        </ion-chip>

        <ion-label>| {{ order?.state }}</ion-label>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENIDO -->
    <ion-content fullscreen>

      <!-- Datos del pedido -->
      <ion-toolbar>
        <ion-chip :outline="true">{{ order?.channel }}</ion-chip>
        <ion-icon style="margin-left: 0.5rem;" :icon="calendarOutline" />
        <ion-label class="date" style="margin-left: 0.5rem;">
          {{ order?.time }} - {{ order?.date }}
        </ion-label>
      </ion-toolbar>

      <div 
        v-if="(mode === 'new' || order?.payment !== 'Pagado')" 
        class="ete"
      >
        <ion-button expand="full" class="btn-anadir" @click="openPicker">
          + Añadir/editar productos
        </ion-button>
      </div>


      <!-- LISTADO DE PRODUCTOS -->
      <div v-if="order?.products?.length" class="product-list">
        <ion-list lines="full">
          <ion-item
            v-for="prod in order.products"
            :key="prod.id"
            class="order-product-row"
            :detail="false"
          >
            <ion-thumbnail slot="start" class="thumb">
              <ion-img :src="getProductImage(prod.imageKey)" />
              <div class="qty-badge">x{{ prod.qty }}</div>
            </ion-thumbnail>

            <ion-label class="name-label">
              <h3>{{ prod.name }}</h3>
            </ion-label>

            <ion-label slot="end" class="price-label">
              {{ prod.currency }}. {{ prod.price.toFixed(2) }}
              <div class="bs">Bs. {{ (prod.price * 78).toFixed(2) }}</div>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- Si no hay productos -->
      <div v-else class="empty">
        <p>No hay productos añadidos</p>
      </div>

      <!-- PICKER -->
      <ProductPickerModal
        v-model:isOpen="isPickerOpen"
        :order="order"
      />

    </ion-content>

    <!-- FOOTER -->
    <ion-footer class="ion-no-border">
      <ion-item>
        <ion-chip color="danger" :outline="true" slot="start" @click="cancelarPedido">
          <ion-icon :icon="banOutline"></ion-icon>
          <ion-label>Cancelar pedido</ion-label>
        </ion-chip>

        <ion-chip :color="order?.payment === 'Pagado' ? 'primary' : 'warning'" :outline="true" slot="start" style="margin-left: 0.5rem;">
          {{ order?.payment }}
        </ion-chip>

        <ion-label slot="end">
          Total Bs. {{ totalBs }} {{ totalUSD.toFixed(2) }}$
        </ion-label>
      </ion-item>

      <ion-button  v-if="order?.payment !== 'Pagado'" expand="full" class="btn-pay" @click="pagarPedido">
        PAGAR
      </ion-button>

      <ion-button 
        expand="full" 
        class="btn-ctr" 
        @click="
            order?.payment === 'Pagado' && order?.state === 'En preparación'
            ? registrarVenta()
            : avanzarPedido()
            "
        >
         {{ order?.payment === 'Pagado' && order?.state === 'En preparación'
              ? 'Registrar venta'
              : 'AVANZAR'
          }}
      </ion-button>
    </ion-footer>

  </ion-modal>
</template>


<script setup lang="ts">
import { bagHandleOutline, chevronBackOutline, pencilSharp, calendarOutline, banOutline} from 'ionicons/icons';
import { ref, computed, watch} from 'vue';
import type { Order } from '@/mock/deliveries/order'
import type { Delivery } from '@/mock/deliveries/deliveries'
import ProductPickerModal from "./productPickerModal.vue";
import { getProductImage } from "@/mock/menu/productImages";
import { DeliveryService } from "@/mock/deliveries/deliveriesService";
import { useRouter } from "vue-router";
const router = useRouter();



const props = defineProps<{
  order: Delivery | null
  mode: "new" | "view"
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'close'): void
}>()

function close() {
  emit('update:isOpen', false)
  emit('close')
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

// prodcut picker modal 
const isPickerOpen = ref(false);

function openPicker() {
  isPickerOpen.value = true;
}

watch(
  () => props.order,
  (newVal) => {
    console.log("🟦 ORDER MODAL RECIBE ORDER:", JSON.parse(JSON.stringify(newVal)));
  },
  { deep: true }
);

watch(
  () => props.order?.products,
  (newVal) => {
    console.log("🟩 ORDER MODAL PRODUCTS CAMBIARON:", JSON.parse(JSON.stringify(newVal)));
  },
  { deep: true }
);

const totalUSD = computed(() => {
  if (!props.order) return 0;
  return props.order.products.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );
});

const totalBs = computed(() => {
  return (totalUSD.value * 78).toFixed(2);
});

function cancelarPedido() {
  if (!props.order) return;

  DeliveryService.cancel(props.order); 

  emit("update:isOpen", false);         
  router.push("/tabs/ventas");
}

function pagarPedido() {
  if (!props.order) return;
  props.order.payment = "Pagado";     // Cambia chip amarillo → azul
}

function avanzarPedido() {
  if (!props.order) return;
  props.order.state = "En preparación";   // Cambia chip amarillo → verde
}

function registrarVenta() {
  if (!props.order) return;

  // Guardar venta
  DeliveryService.sell(props.order);

  // Cerrar modal
  emit("update:isOpen", false);

  // Ir a ventas
  router.push("/tabs/ventas");
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

.thumb {
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.qty-badge {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
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
