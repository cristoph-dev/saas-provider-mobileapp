<template>
  <ion-header class="ion-no-border">
      <ion-toolbar>
          <ion-item  lines="none" class="toolbar-buttons">
            <div class="tab-switcher">
              <button
                :class="['tab-btn', activeTab === 'pedidos' ? 'active-left' : 'inactive-left']"
                @click="set('pedidos')"
              >
                <ion-icon :icon="storefrontOutline" class="icon" />
                Pedidos
              </button>

              <button
                :class="['tab-btn', activeTab === 'mesas' ? 'active-right' : 'inactive-right']"
                @click="set('mesas')"
              >
                <ion-icon :icon="peopleCircleOutline" class="icon" />
                Mesas
              </button>
            </div>
          </ion-item>
      </ion-toolbar>
    </ion-header>


    <ion-button v-if="activeTab === 'pedidos'" expand="full" @click="emit('new-order')"><ion-icon slot="start" :icon="addOutline"/>Nuevo pedido</ion-button>
    <ion-item v-if="activeTab === 'pedidos'" lines="none" >
<ion-chip outline>
  Todo <ion-badge>{{ props.counts.todos }}</ion-badge>
</ion-chip>

<ion-chip outline>
  Pendiente <ion-badge color="warning">{{ props.counts.pendientes }}</ion-badge>
</ion-chip>

<ion-chip outline>
  En curso <ion-badge color="success">{{ props.counts.enCurso }}</ion-badge>
</ion-chip>
    </ion-item>

  <!-- APARTADO DE MESAS -->

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
  trashOutline, closeOutline, restaurantOutline, storefrontOutline, peopleCircleOutline
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
  const nuevo = DeliveryService.create("En el local")
  selectedOrder.value = nuevo as any
  modalMode.value = "new"
  isOrderModalOpen.value = true
}
const props = defineProps<{
  counts: {
    todos: number
    pendientes: number
    enCurso: number
  }
}>()

</script>



<style scoped>

.tab-switcher {
  display: flex;
  width: 260px;
  margin: 0.8rem auto;
  background: #a5d86e; 
  border-radius: 50px;
  overflow: hidden;
}

.tab-btn {
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  border: none;
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  transition: 0.25s ease;
}

.tab-btn .icon {
  font-size: 18px;
}

.active-left {
  background: #86bc25; /* verde más oscuro */
  color: white;
}

.active-right {
  background: #86bc25; /* verde aún más oscuro */
  color: white;
}

.inactive-left,
.inactive-right {
  background: transparent;
  color: white;
}




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