<template>
    <div class="ion-text-center">
        <h1>Sign up</h1>
    </div>

    <ion-list>
        <ion-item>
            <ion-input label="Correo electronico" label-placement="floating" placeholder="example@email.com"></ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Nombre de tu negocio" label-placement="floating" placeholder=""></ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Numero de Whatsapp" label-placement="floating" placeholder=""></ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="Contraseña nueva" label-placement="floating" placeholder=""></ion-input>
        </ion-item>

        <ion-item>
            <ion-input label="confirma tu constraseña nueva" label-placement="floating" placeholder=""></ion-input>
        </ion-item>
    </ion-list>

<div class="ion-text-center">
    <ion-button expand="full" shape="round" routerLink="/main" routerDirection="forward">Sign up</ion-button>
</div>

<div class="ion-text-center ion-justify-content-center ion-align-items-center" style="display: flex; gap: 0.5rem;">
    <p>Already have an account?</p><a href="/login">Sign in</a>
</div>



</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSkeletonText, IonButton, IonList, IonItem, IonInput, IonLabel, IonTitle} from '@ionic/vue'

</script>


<style scoped>
</style>