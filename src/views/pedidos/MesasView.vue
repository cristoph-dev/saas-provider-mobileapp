<template>
  <ion-page>
    <MesasList/>
  </ion-page>
</template>

<script setup lang="ts">
import MesasList from '@/components/pedidos/mesasList.vue';
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