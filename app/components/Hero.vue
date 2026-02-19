<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";
const cards = ref([
  {
    title: "1. Scan",
    description: "Scannez le code QR code du commerçant après votre achat.",
    icon: "i-lucide-scan-qr-code",
  },
  {
    title: "2. Validation",
    description:
      "Le commerçant valide votre tampon digital pour éviter toutes fraudes.",
    icon: "i-lucide-thumbs-up",
  },
  {
    title: "3. Récompense",
    description:
      "Au bout du 9ème tampon, obtenez une récompense de la part du commerçant.",
    icon: "i-lucide-gift",
  },
]);

const links = ref<ButtonProps[]>([
  {
    label: "Je suis commerçant",
    to: "/register-shop",
    icon: "i-lucide-square-play",
  },
  {
    label: "Je suis client",
    to: "/signup-client",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);
</script>
<template>
  <UPageHero
    title="La fidélité réinventée"
    description="Oubliez les cartes papier. Collectionnez des tampons digitaux auprès de vos commerces préférés et gagnez des récompenses."
    headline="100% digital, 100% simple, 100% fun !"
    :ui="{ container: 'sm:py-10 py-10 lg:py-10' }"
    orientation="horizontal"
    :links="links"
  >
    <NuxtImg
      src="/img/hero.png"
      alt="Hero image"
      class="rounded-lg shadow-2xl ring ring-default"
    />
  </UPageHero>
  <UPageGrid class="p-10">
    <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
  </UPageGrid>
</template>
