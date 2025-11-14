<template>
<ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom" color="primary">
        <ion-tab-button tab="pedidos" href="/tabs/pedidos">
          <ion-icon v-if="route.path.startsWith('/tabs/pedidos')" :icon="pricetag" />
          <ion-icon v-else :icon="pricetagOutline" />
          <!-- <ion-label>Pedidos</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="ventas" href="/tabs/ventas">
          <ion-icon v-if="route.path.startsWith('/tabs/ventas')" :icon="receipt" />
          <ion-icon v-else :icon="receiptOutline" />
          <!-- <ion-label>Ventas</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="menu" href="/tabs/menu">
          <ion-icon v-if="route.path.startsWith('/tabs/menu')" :icon="pizza" />
          <ion-icon v-else :icon="pizzaOutline"/>
          <!-- <ion-label>Menú</ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon v-if="route.path.startsWith('/tabs/profile')" :icon="menu" />
          <ion-icon v-else :icon="menuSharp"/>
          <!-- <ion-label>Perfil</ion-label> -->
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
<script setup lang="ts">
import { 
  IonPage, IonToolbar, IonTitle, IonHeader, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonContent } from '@ionic/vue';
  import { homeOutline, cashOutline, receiptOutline, homeSharp, cashSharp, receiptSharp, fastFoodOutline, fastFoodSharp, menuOutline, menu, menuSharp, pricetagOutline, pricetag, receipt, pizza, pizzaOutline} from 'ionicons/icons'; //TODO al clickearle cambiar a filled
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<style scoped>

</style>