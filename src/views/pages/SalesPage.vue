<template>
  <ion-page>
    <SalesHeader/>
<ion-content>
      <SalesList/>
</ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderMenu from '@/components/menu/headerMenu.vue';
import categoryMenu from '@/components/menu/categoryMenu.vue';
import { 
  IonPage, 
  IonToolbar, 
  IonTitle, 
  IonHeader, 
  IonTabs, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonContent

} from '@ionic/vue';
import SalesHeader from '@/components/sales/salesHeader.vue';
import SalesList from '@/components/sales/salesList.vue';
</script>

<style scoped>
</style>