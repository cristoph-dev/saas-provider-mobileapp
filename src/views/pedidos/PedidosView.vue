<template>
  <ion-page>
    <pedidosList :vacio="false"/>
  </ion-page>
</template>

<script setup lang="ts">
import pedidosList from '@/components/pedidos/pedidosList.vue';
import VentasHeader from '@/components/pedidos/pedidosHeader.vue';
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
</script>