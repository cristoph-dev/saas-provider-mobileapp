<template>
  <ion-page>
      <LoginForm></LoginForm>
  </ion-page>
</template>


<script setup lang="ts">
  import { IonPage,
      IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonTitle,
  IonFooter,
  IonToolbar,
  IonHeader,
  IonContent
   } from '@ionic/vue';
  import LoginForm from '@/components/auth/loginForm.vue';
</script>