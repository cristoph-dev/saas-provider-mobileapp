<template>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col
          size="6"
          size-md="3"
          v-for="n in 8"
          :key="n"
          class="mesa-col"
        >
          <ion-button
            expand="block"
            fill="outline"
            class="mesa-boton"
            @click="abrirFormulario(n)"
          >
            {{ n }}
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>

    <!-- Modal del formulario -->
    <ion-modal :is-open="showModal" @didDismiss="showModal = false">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Formulario Mesa #{{ mesaSeleccionada }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showModal = false">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Nombre del cliente</ion-label>
          <ion-input placeholder="Ej: Juan Pérez" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Cantidad de personas</ion-label>
          <ion-input type="number" placeholder="Ej: 4" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Observaciones</ion-label>
          <ion-textarea placeholder="Ej: Prefiere mesa cerca de la ventana" />
        </ion-item>

        <ion-button expand="block" class="ion-margin-top">
          Guardar pedido
        </ion-button>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSegment,
  IonSegmentButton,
  IonIcon
} from '@ionic/vue'
import { refreshOutline } from 'ionicons/icons'

const showModal = ref(false)
const mesaSeleccionada = ref<number | null>(null)

function abrirFormulario(n: number) {
  mesaSeleccionada.value = n
  showModal.value = true
}
</script>

<style scoped>
.salas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: .5rem;
}

.acciones {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.mesa-col {
  padding: .4rem;
}

.mesa-boton {
  height: 80px;
  font-size: 1.4rem;
  --border-radius: 12px;
  --background: var(--ion-color-light);
  --color: var(--ion-color-dark);
}
</style>
