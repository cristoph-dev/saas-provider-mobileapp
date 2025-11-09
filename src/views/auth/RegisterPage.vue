<template>
  <ion-page>
    <ion-content> 
      <RegisterForm></RegisterForm>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonContent } from '@ionic/vue';
import RegisterForm from '@/components/auth/registerForm.vue';
</script>