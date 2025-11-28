<template>
  <div class="ion-padding">
    <ion-list lines="none">
      <ion-item
        v-for="pedido in pedidos"
        :key="pedido.id"
        lines="none"
        button
        class="pedido-item"
        @click="abrirPedido(pedido)"
      >
        <div
          class="pedido-card"
          :style="{
            borderLeftColor:
              pedido.state === 'En preparación'
                ? '#00c741'
                : '#f4a91e',
          }"
        >
          <div class="top">
            <div class="tag">#{{ pedido.id }} {{ pedido.deliveryType }}</div>

            <div class="timer">
              <ion-icon name="time-outline" class="timer-icon"></ion-icon>
              <span>{{ pedido.duration }}</span>
            </div>
          </div>

          <div class="middle">
            <div class="chips">

              <div class="chip chip-outline">{{ pedido.channel }}</div>

              <div
                v-if="pedido.state === 'Pendiente'"
                class="chip chip-yellow-text-white"
              >
                {{ pedido.state }}
              </div>

              <div
                v-else-if="pedido.state === 'En preparación'"
                class="chip chip-green"
              >
                {{ pedido.state }}
              </div>

              <div
                v-if="pedido.payment === 'Pagado'"
                class="chip chip-blue"
              >
                {{ pedido.payment }}
              </div>
              <div v-else class="chip chip-yellow">
                {{ pedido.payment }}
              </div>

            </div>

            <div class="amounts">
              <div class="usd">{{ pedido.totalUSD }}$</div>
              <div class="bs">Bs. {{ pedido.totalBs }}</div>
            </div>
          </div>

          <div class="bottom">
            {{ pedido.time }} - {{ pedido.date }}
          </div>
        </div>
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonList, IonIcon } from '@ionic/vue'
import type { Delivery } from "@/mock/deliveries/deliveries"
import { DeliveryService } from '@/mock/deliveries/deliveriesService'
import { ref, onMounted, computed, watch } from 'vue'

const emit = defineEmits<{
  (e: "open-order", order: Delivery): void
  (e: "update-counts", payload: {
    todos: number
    pendientes: number
    enCurso: number
  }): void
}>()

function abrirPedido(pedido: Delivery) {
  emit("open-order", pedido)
}

const pedidos = ref<Delivery[]>([])

onMounted(() => {
  pedidos.value = DeliveryService.getAll()
  console.log("PEDIDOS EN DELIVERYLIST:", pedidos.value)
})

//emits al pedidosHeader 
const totalTodos = computed(() => pedidos.value.length)

const totalPendientes = computed(() =>
  pedidos.value.filter(p => p.state === "Pendiente").length
)

const totalEnCurso = computed(() =>
  pedidos.value.filter(p => p.state === "En preparación").length
)

watch(
  pedidos,
  () => {
    emit("update-counts", {
      todos: pedidos.value.length,
      pendientes: pedidos.value.filter(p => p.state === "Pendiente").length,
      enCurso: pedidos.value.filter(p => p.state === "En preparación").length
    })
  },
  { deep: true, immediate: true }
)
</script>



<style scoped>
.pedido-item {
  --inner-padding-end: 0;
  --inner-padding-start: 0;
  --padding-start: 0;
  --padding-end: 0;
  margin-bottom: 0.75rem;
}

.pedido-card {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 0.8rem 1rem;
  border-left: 6px solid #f4a91e;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.tag {
  background: #ffe6b3;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.timer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f25555;
  font-weight: 600;
  font-size: 0.8rem;
}

.timer-icon {
  font-size: 1rem;
}

.middle {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.3rem;
}

.chips {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}
.chip {
  border-radius: 20px;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  font-weight: 600;
}

.chip-outline {
  border: 1px solid #000000;
  color: #000000;
  background-color: #ffffff;
}

.chip-yellow {
  background-color: #fbb24a;
  color: #000000;
}

.chip-yellow-text-white {
  background-color: #fbb24a;
  color: #ffffff;
}

.chip-blue {
  background-color: #4d3bff;
  color: #ffffff;
}

.chip-green {
  background-color: #00c741;
  color: #ffffff;
}

.amounts {
  text-align: right;
}

.amounts .usd {
  font-size: 1.25rem;
  font-weight: 800;
  color: #000000;
}

.amounts .bs {
  font-size: 1rem;
  font-weight: 700;
  color: #333333;
}

.bottom {
  text-align: center;
  color: #666666;
  font-size: 0.75rem;
  margin-top: 0.4rem;
}
</style>
