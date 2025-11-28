<template>
    <ion-header class="ion-no-border">
        <ion-toolbar>
            <h2 slot="start">Menú</h2>
            <div class="contenainer-profile" slot="end">
                 <ion-icon :icon="personCircleSharp" class="profile-icon"></ion-icon> <!--TODO icono temporal, aqui deberia poder subirse una imagen con un script -->
            </div>
        </ion-toolbar>  

    </ion-header>
</template>

<script setup lang="ts">
  import { IonButton, IonIcon, IonToolbar, IonHeader } from '@ionic/vue';
  import { heart, logoApple, settingsSharp, star, caretDownSharp, cameraSharp, personCircleSharp } from 'ionicons/icons';
  const items_amount = 2;
</script>

<style scoped>

ion-header {
    position: relative;
    text-align: center;
}

ion-toolbar {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  --padding-start: var(--page-horizontal-padding);
  --padding-end: var(--page-horizontal-padding);
  padding-bottom: 0.5rem;
}

h2 {
    padding-left: 0.5rem;
}

.cameraBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.profile-pic {
    width: 4rem;
    height: 4rem;
    border: 1px solid #ff0000;
    border-radius: 50px;
    margin: 0.5rem 0.5rem 0 0.5rem;
}

.profile-icon {
  width: 5rem;  
  height: 5rem;
}

.contenainer-profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
}

.username { 
    font-size: larger;
}

.userdesc {
    font-size: x-small;
    font-weight: 100;
}

.username, .userdesc {
    margin: 0px;
}


</style>