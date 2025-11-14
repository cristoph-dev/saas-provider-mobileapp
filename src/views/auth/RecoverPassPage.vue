<template>
  <ion-page>
      <recoverForm></recoverForm>
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
  import recoverForm from '@/components/auth/recoverPasswordForm.vue';
</script>