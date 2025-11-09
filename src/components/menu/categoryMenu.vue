<template>
    <ion-page>
        <ion-content>
        <ion-searchbar show-cancel-button="focus" placeholder="buscar por categoria o producto"></ion-searchbar>
        <ion-item>
            <ion-button id="popover-categorias" size="small" shape="round"><ion-icon slot="icon-only" :icon="menuOutline"></ion-icon>Categorias</ion-button>
            <ion-popover trigger="popover-categorias" :dismiss-on-select="true">
                <ion-content>
                <ion-list>
                    <ion-item :button="true" :detail="false"><ion-icon  slot="start" :icon="addOutline"/>Añadir categoría</ion-item>
                    <ion-item :button="true" :detail="false"><ion-icon  slot="start" :icon="chevronCollapseOutline"></ion-icon>Cerrar todas las categorias</ion-item>
                    <ion-item :button="true" :detail="false"><ion-icon  slot="start" :icon="chevronExpandOutline"></ion-icon>Abrir todas las categorias</ion-item>
                    <ion-item :button="true" :detail="false">Categorias 1 | Productos 1</ion-item>
                    <ion-item :button="true" :detail="false">Nombre de categoria</ion-item>
                    <!-- <ion-item :button="true" id="nested-trigger">More options...</ion-item> -->

                    <ion-popover trigger="nested-trigger" :dismiss-on-select="true" side="end">
                    <ion-content>
                        <ion-list>
                        <ion-item :button="true" :detail="false">Nested option</ion-item>
                        </ion-list>
                    </ion-content>
                    </ion-popover>
                </ion-list>
                </ion-content>
            </ion-popover>
            <!-- deuda tecnica: este elemento debe aparece flotando, en UI se le llama flying search dialog modal -->
        </ion-item>

<!-- :value="['first', 'third']" = opened-->
            <ion-accordion-group :multiple="true" :value="[]"> 
                <ion-accordion value="first">
                <ion-item slot="header" color="light" class="category-header">
                    <div class="input-wrap" @click.stop @pointerdown.stop @touchstart.stop> <!--  propiedad para que no se propague el click (ponerlo si se sobresolapa la funcion entre los botones)-->
                        <ion-input
                            label="Nombre de categoría"
                            label-placement="floating"
                            :counter="true"
                            :maxlength="20"
                            placeholder=""
                            style="margin-right: 0.5rem;"
                        ></ion-input>
                    </div>

                    <ion-badge>1</ion-badge> 

                    <ion-button id="popover-opciones-categoria" size="small" shape="round" @click.stop @pointerdown.stop @touchstart.stop><ion-icon  slot="icon-only" :icon="ellipsisVertical" ></ion-icon></ion-button> 
                    <ion-popover trigger="popover-opciones-categoria" :dismiss-on-select="true">
                        <ion-content>
                        <ion-list>
                            <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="chevronUpOutline"></ion-icon>Mover arriba</ion-item>
                            <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="chevronDownOutline"></ion-icon>Mover abajo</ion-item>
                            <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="copyOutline"></ion-icon>Duplicar</ion-item>
                            <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="trashOutline"></ion-icon>Eliminar</ion-item>
                            <!-- <ion-item :button="true" id="nested-trigger">More options...</ion-item> -->

                            <ion-popover trigger="nested-trigger" :dismiss-on-select="true" side="end">
                            <ion-content>
                                <ion-list>
                                <ion-item :button="true" :detail="false">Nested option</ion-item>
                                </ion-list>
                            </ion-content>
                            </ion-popover>
                        </ion-list>
                        </ion-content>
                    </ion-popover>
                </ion-item>

                <div slot="content" class="product">
                    <ion-button size="small" style="--padding: 30px; margin: 0 auto; display: block; --box-shadow: none;"><ion-icon  slot="icon-only" :icon="addOutline"></ion-icon>Añadir producto</ion-button>
                </div>

                    <ion-list slot="content" class="product-list">
                        <ion-item id="open-product" class="product-row" lines="full" button :detail="false">
                        <ion-thumbnail slot="start" class="thumb">
                            <ion-img :src="arepa"></ion-img>
                        </ion-thumbnail>

                        <ion-label>
                            <h3>Arepa de carne mechada</h3>
                        </ion-label>

                        <ion-label slot="end" class="price">Bs. 22,00</ion-label>
                        <ion-button id="popover-producto" slot="end" fill="clear" size="small" @click.stop><ion-icon slot="icon-only" :icon="ellipsisVertical"/></ion-button>
                        <ion-popover trigger="popover-producto" :dismiss-on-select="true">
                            <ion-content>
                            <ion-list>
                                <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="chevronUpOutline"></ion-icon>Mover arriba</ion-item>
                                <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="chevronDownOutline"></ion-icon>Mover abajo</ion-item>
                                <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="copyOutline"></ion-icon>Duplicar</ion-item>
                                <ion-item lines="full" :button="true" :detail="false"><ion-icon  slot="start" :icon="trashOutline"></ion-icon>Eliminar</ion-item>
                                <ion-popover trigger="nested-trigger" :dismiss-on-select="true" side="end">
                                <ion-content>
                                    <ion-list>
                                    <ion-item :button="true" :detail="false">Nested option</ion-item>
                                    </ion-list>
                                </ion-content>
                                </ion-popover>
                            </ion-list>
                            </ion-content>
                        </ion-popover>
                        </ion-item>

                        <ion-modal trigger="open-product">
                        <ion-header>
                            <ion-toolbar>
                            <ion-title>Editar producto</ion-title>
                            <ion-buttons slot="end">
                                <ion-button onclick="this.closest('ion-modal').dismiss()"><ion-icon  slot="start" :icon="closeOutline"></ion-icon></ion-button>
                            </ion-buttons>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content class="ion-padding">
                            <ion-item>
                            <ion-input label="Nombre" label-placement="floating" value="Arepa de carne mechada" />
                            </ion-item>
                            <ion-item>
                            <ion-input label="Descripcion" label-placement="floating" value="Buenarda" />
                            </ion-item>
                            <ion-item>
                            <ion-input label="Precio" label-placement="floating" value="VES 22.00" />
                            </ion-item>
                        </ion-content>
                        </ion-modal>
                    </ion-list>

                    <!-- <ion-list slot="content" class="product-list">
                        <ion-item class="product-row" lines="full" button :detail="false">
                        <ion-thumbnail slot="start" class="thumb">
                            <ion-img :src="arepa2"></ion-img>
                        </ion-thumbnail>

                        <ion-label>
                            <h3>Arepa reina pepiada</h3>
                        </ion-label>
                        <ion-label slot="end" class="price">Bs. 22,00</ion-label>
                        <ion-button slot="end" fill="clear" size="small" @click.stop>
                            <ion-icon slot="icon-only" :icon="ellipsisVertical" />
                        </ion-button>
                        </ion-item>
                    </ion-list> -->
                    
                </ion-accordion>
            </ion-accordion-group>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonTitle, IonHeader, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonContent,IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonBadge, IonInput, IonPopover, IonList, IonThumbnail, IonImg, IonModal, IonButtons, IonSearchbar } from '@ionic/vue';
import { searchSharp, menuOutline, ellipsisVertical, addOutline, chevronCollapseOutline, chevronExpandOutline, chevronDownOutline, chevronUpOutline, copyOutline, trashOutline, closeOutline} from 'ionicons/icons';
import arepa from '@/assets/Arepa.png'
import arepa2 from '@/assets/Arepa-2.png'
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


</style>