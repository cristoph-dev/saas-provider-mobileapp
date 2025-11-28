<template>
  <ion-page>
    <ion-content>
      <ion-searchbar
        show-cancel-button="focus"
        placeholder="buscar por categoria o producto"
      ></ion-searchbar>
      <ion-item>
        <ion-button id="popover-categorias" size="small" shape="round">
          <ion-icon slot="icon-only" :icon="menuOutline" /> Categorias
        </ion-button>

        <ion-popover trigger="popover-categorias" :dismiss-on-select="false">
          <ion-content>
            <ion-list>
              <ion-item button @click="handleAddCategory">
                <ion-icon slot="start" :icon="addOutline" /> Añadir categoría
              </ion-item>

              <ion-item button>
                <ion-icon slot="start" :icon="chevronCollapseOutline" />
                Cerrar todas
              </ion-item>

              <ion-item button>
                <ion-icon slot="start" :icon="chevronExpandOutline" />
                Abrir todas
              </ion-item>

              <ion-item>
                Categorías {{ categories.length }} |
                Productos {{ totalProducts }}
              </ion-item>

              <ion-item
                v-for="cat in categories"
                :key="cat.id"
                button
              >
                {{ cat.name }}
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </ion-item>
      <ion-accordion-group :multiple="true">
        <!-- Cada categoría -->
        <template v-for="category in categories" :key="category.id">
          <ion-accordion :value="String(category.id)">
            <!-- HEADER -->
            <ion-item slot="header" class="category-header" color="light">
              <div
                class="input-wrap"
                @click.stop
                @pointerdown.stop
                @touchstart.stop
              >
                <ion-input
                  v-model="category.name"
                  label="Nombre de categoría"
                  label-placement="floating"
                  :maxlength="20"
                  :counter="true"
                />
              </div>

              <ion-badge>{{ category.products.length }}</ion-badge>
            </ion-item>
            <!-- BOTÓN AÑADIR PRODUCTO -->
            <div slot="content" class="product">
              <ion-button
                size="small"
                expand="block"
                @click.stop="addProduct(category.id)"
              >
                <ion-icon slot="start" :icon="addOutline" />
                Añadir producto
              </ion-button>
            </div>
            <!-- LISTA DE PRODUCTOS -->
            <ion-list slot="content" class="product-list">
              <template v-for="product in category.products" :key="product.id">

                <ion-item
                  class="product-row"
                  button
                  lines="full"
                  :detail="false"
                  @click="openEditModal(category.id, product)"
                >
                  <ion-thumbnail slot="start" class="thumb">
                    <ion-img :src="getProductImage(product.imageKey)" />
                  </ion-thumbnail>

                  <ion-label>
                    <h3>{{ product.name }}</h3>
                  </ion-label>

                  <ion-label slot="end" class="price">
                    {{ product.currency }}. {{ product.price.toFixed(2) }}
                  </ion-label>
                </ion-item>

              </template>
            </ion-list>

          </ion-accordion>

        </template>
      </ion-accordion-group>
<ion-modal :is-open="isEditModalOpen" @didDismiss="isEditModalOpen = false">
  <template v-if="selectedProduct">

    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Editar producto</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="isEditModalOpen = false">
            <ion-icon :icon="closeOutline" />
          </ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          v-model="selectedProduct.name"
          label="Nombre"
          label-placement="floating"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model.number="selectedProduct.price"
          type="number"
          label="Precio"
        />
      </ion-item>

      <ion-item>
        <ion-input
          v-model="selectedProduct.currency"
          label="Moneda"
        />
      </ion-item>

      <ion-button expand="block" class="ion-margin-top" @click="saveProduct">
        Guardar
      </ion-button>

    </ion-content>

  </template>
</ion-modal>

    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {
  IonPage, IonToolbar, IonTitle, IonHeader, IonContent,
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonBadge,
  IonInput, IonPopover, IonList, IonThumbnail, IonImg,
  IonModal, IonButtons, IonSearchbar, IonButton
} from '@ionic/vue';

import {
  searchSharp, menuOutline, ellipsisVertical, addOutline,
  chevronCollapseOutline, chevronExpandOutline,
  chevronDownOutline, chevronUpOutline,
  copyOutline, trashOutline, closeOutline
} from 'ionicons/icons';

import { ref, computed } from 'vue';
import type { Category, CategoryProduct } from '@/mock/menu/categories';
import { CategoriesService } from '@/mock/menu/categoriesService';
import { getProductImage } from '@/mock/menu/productImages';
const categories = ref<Category[]>(CategoriesService.getAll());
const totalProducts = computed(() =>
  categories.value.reduce((sum, cat) => sum + cat.products.length, 0)
);

function handleAddCategory() {
  CategoriesService.addCategory();
  categories.value = [...CategoriesService.getAll()];
}

function addProduct(categoryId: number) {
  CategoriesService.addProduct(categoryId, {
    name: 'Nuevo producto',
    price: 0,
    currency: 'Bs',
    imageKey: 'noImage'   
  });

  categories.value = [...CategoriesService.getAll()];
}
function getProductImageSrc(product: CategoryProduct) {
  return getProductImage(product.imageKey);
}

const selectedProduct = ref<CategoryProduct | null>(null);
const selectedCategoryId = ref<number | null>(null);
const isEditModalOpen = ref(false);

function openEditModal(categoryId: number, product: CategoryProduct) {
  selectedCategoryId.value = categoryId;
  selectedProduct.value = { ...product }; 
  isEditModalOpen.value = true;
}

function saveProduct() {
  if (!selectedProduct.value || selectedCategoryId.value === null) return;

  CategoriesService.updateProduct(
    selectedCategoryId.value,
    selectedProduct.value
  );

  categories.value = [...CategoriesService.getAll()];

  isEditModalOpen.value = false;
}

</script>


<style scoped>
ion-badge {
    margin: 0 0.2rem 0 0;
}

.category-header {
  --inner-padding-start: 12px;
  --inner-padding-end: 8px;
  display: flex;
  align-items: center;
}
.input-wrap {
  flex: 1;
  min-width: 0;
}
.input-wrap ion-input {
  width: 100%;
}

.category-header ion-badge,
.category-header ion-button {
  margin-left: 8px;
}

#popover-categorias {
  --padding-start: var(--page-horizontal-padding);
  --padding-end: var(--page-horizontal-padding);
}
</style>
