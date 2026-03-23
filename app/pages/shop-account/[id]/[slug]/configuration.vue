<script setup lang="ts">
import DashboardShop from "~/components/DashboardShop.vue";

const state = reactive({
  name: "",
  title: "",
  image: null as File | null,
  description: "",
});

async function submit() {}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <DashboardShop mode="slideover">
        <div class="flex w-full py-1">
          <UForm
            :state="state"
            class="space-y-4 w-full p-7 border border-gray-300 rounded"
          >
            <UIcon name="i-lucide-pen-tool" class="w-full size-8 mx-auto" />
            <h3 class="text-center text-2xl font-bold">
              Configurer vos cartes de fidélité
            </h3>
            <p class="text-center text-sm">Cutomisez à votre image</p>
            <UFormField required label="1. Nom du magasin" name="shop-name">
              <UInput class="w-full" v-model="state.name" />
            </UFormField>
            <UFormField
              required
              label="2. Téléchargez une image du tampon digital"
              description="Cette image sera utilisée pour créer le tampon digital de votre carte de fidélité. Assurez-vous que l'image est claire et facilement reconnaissable, de préférence avec un fond transparent pour un meilleur rendu sur la carte."
              class="mb-5"
            >
              <UFileUpload
                v-model="state.image"
                accept="image/jpeg,image/png,image/webp"
                highlight
                required
                layout="list"
                label="Image détourée du tampon avec fond transparent"
                description="WEBP, PNG, JPG (max. 800KB)"
                class="cursor-pointer w-full"
                :ui="{
                  base: 'min-h-48',
                }"
              />
            </UFormField>
            <UFormField
              required
              label="3. Intitulé de la récompense"
              description="Cette récompense sera affichée sur la carte de fidélité pour informer vos clients de ce qu'ils obtiendront après avoir collecté tous les tampons."
              name="reward-title"
            >
              <UInput
                placeholder="Boisson petit format offerte"
                class="w-full"
                v-model="state.title"
              />
            </UFormField>
            <UFormField
              required
              label="4. Description de la récompense"
              description="Cette description apparaîtra sur la carte de fidélité pour informer vos clients de la récompense qu'ils obtiendront après avoir collecté tous les tampons. Soyez clair et incitatif pour encourager vos clients à participer au programme de fidélité."
            >
              <UTextarea
                required
                v-model="state.description"
                color="neutral"
                variant="outline"
                placeholder="Au bout du 9ème tampon, obtenez une boisson petit format offerte hors bubble teas ! "
                class="w-full"
                maxlength="800"
                autoresize
              />
              <div class="text-sm text-gray-500 mt-1 text-right">
                {{ state.description.length }} / 800
              </div>
            </UFormField>
            <UButton
              class="cursor-pointer"
              label="Enregistrer "
              color="neutral"
              @click="submit"
            />
          </UForm>
        </div>
      </DashboardShop>
    </div>
  </div>
</template>
