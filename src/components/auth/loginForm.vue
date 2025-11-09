<template>
    <div class="ion-text-center">
        <h1>Sign in</h1>
    </div>
    <ion-list>
        <ion-item>
            <ion-input label="Email" label-placement="floating" placeholder=""></ion-input>
        </ion-item>
    </ion-list>
    <ion-list>
        <ion-item>
            <ion-input label="Password" label-placement="floating" placeholder=""></ion-input>
        </ion-item>
    </ion-list>




<div class="ion-text-center">
    <ion-button expand="full" shape="round" routerLink="/menu" routerDirection="forward">Sign in</ion-button>
</div>

<div class="ion-text-center ion-justify-content-center ion-align-items-center" style="display: flex; gap: 0.5rem;">
    <p>Doesn't have an account?</p><a href="/register">Sign up</a>
</div>



</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSkeletonText, IonButton, IonList, IonItem, IonInput, IonLabel, IonTitle} from '@ionic/vue'

</script>


<style scoped>
</style>