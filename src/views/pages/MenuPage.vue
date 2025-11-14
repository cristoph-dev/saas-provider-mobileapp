<template>
  <ion-page>
    <HeaderMenu></HeaderMenu>
    <IonContent>
      <categoryMenu></categoryMenu>
    </IonContent>
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
</script>

<style scoped>
</style>