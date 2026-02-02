<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";
const cards = ref([
  {
    title: "De l'écologie",
    description:
      "Nous nous engageons à minimiser notre impact environnemental : Serveurs durables, coding écologique, chaque détail compte.",
    icon: "i-lucide-leaf",
  },
  {
    title: "De la qualité",
    description:
      "Fidélisez vos clients avec une solution fiable et performante, conçue pour offrir une expérience conviviale à chaque interaction.",
    icon: "i-lucide-medal",
  },
  {
    title: "De la simplicité",
    description:
      "Scannez le QR code du commerçant avec votre smartphone pour ajouter un tampon digital. C'est simple, rapide et efficace.",
    icon: "i-lucide-thumbs-up",
  },
]);

const links = ref<ButtonProps[]>([
  {
    label: "Je suis commerçant",
    to: "/docs/getting-started",
    icon: "i-lucide-square-play",
  },
  {
    label: "Je suis client",
    to: "/docs/getting-started/theme/design-system",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-right",
  },
]);
</script>
<template>
  <UPageHero
    title="Gifted vous accompagne"
    description="Offrez à vos clients une carte de tampons digitale simple et intuitive, accessible depuis leur smartphone. "
    headline="La fidélité réinventée, 100% digital !"
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
