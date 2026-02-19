<script setup lang="ts">
import { useRoute } from "vue-router";

interface ActivationResponse {
  success: boolean;
  message: string;
}

const route = useRoute();
const token = route.query.token as string;

let message = "";

if (token) {
  try {
    const response = await $fetch<ActivationResponse>(
      `/api/activate-shop?token=${token}`,
    );
    message = response.message;
  } catch (err: any) {
    message = err.data?.message || "Erreur lors de l'activation";
  }
} else {
  message = "Token manquant";
}
</script>

<template>
  <UPageHero
    title="Activation du compte"
    :description="message"
    headline="Confirmation du compte !"
    :ui="{ container: 'sm:py-8 py-8 lg:py-8' }"
  >
    <NuxtImg
      src="/img/logo.png"
      alt="Activation image"
      class="mx-auto w-32 h-32"
    ></NuxtImg>
  </UPageHero>
</template>
