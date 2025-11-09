<template>
  <ion-list>
    <ion-item>
      <ion-icon slot="start" :icon="albumsOutline"></ion-icon>
      <ion-label>Categorías</ion-label>
    </ion-item>

    <ion-item>
      <ion-icon slot="start" :icon="notificationsOutline"></ion-icon>
      <ion-label>Notificaciones</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" :icon="moonOutline"></ion-icon>
      <ion-label>Tema</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
      <ion-label>Salir</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
    import { logOutOutline, moonOutline, albumsOutline, notificationsOutline ,homeOutline, cashOutline, receiptOutline, homeSharp, cashSharp, receiptSharp, fastFoodOutline, fastFoodSharp, menuOutline, menu, menuSharp, pricetagOutline, pricetag, receipt, pizza, pizzaOutline} from 'ionicons/icons';
</script>