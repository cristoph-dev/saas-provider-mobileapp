<template>
  <ion-content class="ion-padding">
    <ion-list lines="none">
      <ion-item
        v-for="pedido in pedidos"
        :key="pedido.id"
        lines="none"
        button
        class="pedido-item"
        @click="abrirPedido(pedido)"
      >
        <!--Borde dinamico de la izquierda-->
        <div
          class="pedido-card"
          :style="{
            borderLeftColor:
              pedido.estado === 'En preparación'
                ? '#00c741'
                : '#f4a91e',
          }"
        >
          <div class="top">
            <div class="tag">#{{ pedido.id }} {{ pedido.tipoPedido }}</div>

            <div class="timer">
              <ion-icon name="time-outline" class="timer-icon"></ion-icon>
              <span>{{ pedido.tiempo }}</span>
            </div>
          </div>

          <div class="middle">
            <div class="chips">
              <!-- PDV -->
              <div class="chip chip-outline">{{ pedido.canal }}</div>

              <!-- Estado (Pendiente/En preparacion) -->
              <div
                v-if="pedido.estado === 'Pendiente'"
                class="chip chip-yellow-text-white"
              >
                {{ pedido.estado }}
              </div>
              <div
                v-else-if="pedido.estado === 'En preparación'"
                class="chip chip-green"
              >
                {{ pedido.estado }}
              </div>

              <!-- Pago (Pagado/No pagado) -->
              <div
                v-if="pedido.metodoPago === 'Pagado'"
                class="chip chip-blue"
              >
                {{ pedido.metodoPago }}
              </div>
              <div
                v-else
                class="chip chip-yellow"
              >
                {{ pedido.metodoPago }}
              </div>
            </div>

            <div class="amounts">
              <div class="usd">{{ pedido.totalUSD }}$</div>
              <div class="bs">Bs. {{ pedido.totalBs }}</div>
            </div>
          </div>

          <div class="bottom">
            {{ pedido.hora }} - {{ pedido.fecha }}
          </div>
        </div>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import { IonContent, IonItem, IonList, IonIcon } from '@ionic/vue'


// MINO BDD TEMPORAL PARA PROBAR LOS 4 POSIBLES CASOS
const pedidos = [
  {
    id: 1,
    tipoPedido: 'Para llevar',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'Pendiente',
    metodoPago: 'No pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
  {
    id: 2,
    tipoPedido: 'En el local',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'Pendiente',
    metodoPago: 'Pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
  {
    id: 3,
    tipoPedido: 'En el local',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'En preparación',
    metodoPago: 'No pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
  {
    id: 4,
    tipoPedido: 'En el local',
    fecha: '31/10/25',
    hora: '22:49',
    tiempo: '1:40 min',
    estado: 'En preparación',
    metodoPago: 'Pagado',
    canal: 'PDV',
    totalUSD: 10,
    totalBs: '2,170',
  },
]

function abrirPedido(pedido: any) {
  console.log(pedido)
}
</script>

<style scoped>
.pedido-item {
  --inner-padding-end: 0;
  --inner-padding-start: 0;
  --padding-start: 0;
  --padding-end: 0;
  margin-bottom: 0.75rem;
}

/* CARD */
.pedido-card {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 0.8rem 1rem;
  border-left: 6px solid #f4a91e;
}

/* FILA SUPERIOR */
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

/* FILA MEDIA */
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

/* MONTOS */
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

/* FILA INFERIOR */
.bottom {
  text-align: center;
  color: #666666;
  font-size: 0.75rem;
  margin-top: 0.4rem;
}
</style>
