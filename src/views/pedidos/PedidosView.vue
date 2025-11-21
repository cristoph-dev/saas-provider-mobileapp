<template>
  <deliveryList @open-order="onOpenOrder"/>
</template>

<script setup lang="ts">
import deliveryList from "@/components/pedidos/deliveryList.vue";
import type { Delivery } from "@/mock/deliveries/deliveries"

const emit = defineEmits<{
  (e: "open-order", order: Delivery): void
}>()

function onOpenOrder(order: Delivery) {
  emit("open-order", order)
}
</script>
