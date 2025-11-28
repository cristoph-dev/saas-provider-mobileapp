<template>
  <div class="ion-padding">
    <ion-list lines="none">
      <ion-item
        v-for="venta in ventas"
        :key="venta.id"
        lines="none"
        button
        class="pedido-item"
        @click="abrirVenta(venta)"
      >
        <div
          class="pedido-card"
          :style="{
            borderLeftColor: venta.status === 'sold' ? '#00c741' : '#f25555',
          }"
        >
          <div class="top">
            <div class="tag">
              #{{ venta.orderId }} · 
              {{ venta.type === 'local' ? 'En el local' : 'Para llevar' }}
            </div>
          </div>
          <div class="middle">
            <div class="chips">
              <div
                v-if="venta.status === 'sold'"
                class="chip chip-green"
              >
                Vendido
              </div>

              <div
                v-else
                class="chip chip-yellow-text-white"
              >
                Cancelado
              </div>
            </div>
            <div class="amounts">
              <div class="usd">{{ venta.totalUSD.toFixed(2) }}$</div>
              <div class="bs">Bs. {{ Number(venta.totalBs).toFixed(2) }}</div>
            </div>
          </div>
          <div class="bottom">
            {{ venta.createdAt }}
          </div>
        </div>
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue'
import { ref } from 'vue'
import { SalesService } from '@/mock/sales/salesService'
import { sales } from "@/mock/sales/sales"
import type { Sale } from '@/mock/sales/sales'

const emit = defineEmits<{
  (e: 'open-sale', sale: Sale): void
}>()

const ventas = sales

function abrirVenta(venta: Sale) {
  emit('open-sale', venta)
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

.pedido-card {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 0.8rem 1rem;
  border-left: 6px solid #00c741;
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

.chip-yellow-text-white {
  background-color: #fbb24a;
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

.bottom {
  text-align: center;
  color: #666666;
  font-size: 0.75rem;
  margin-top: 0.4rem;
}
</style>
