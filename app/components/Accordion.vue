<script setup lang="ts">
const items = ref([
  {
    label: "Qu'est-ce Gifted ?",
    content:
      "Gifted est une application web / PWA ou Progressive Web App qui fonctionne comme une application mobile mais sans besoin de la télécharger. Elle permet aux commerçants de fidéliser leurs clients sous forme de cartes de tampons digitaux.",
  },
  {
    label: "C'est quoi votre objectif ?",
    content:
      "Notre objectif est de réinventer la fidélité en offrant une solution digitale simple et efficace. Nous voulons aider les commerçants à fidéliser leurs clients tout en offrant une expérience utilisateur moderne et agréable.",
  },
  {
    label: "Dois-je m'inscrire pour utiliser Gifted ?",
    content:
      "Oui, en tant que commerçant ou client, vous devez créer un compte pour accéder à toutes les fonctionnalités de Gifted. L'inscription est rapide et vous permettra de profiter pleinement de notre plateforme.",
  },
  {
    label: "Comment ça marche ?",
    content:
      "À chaque achat dans un magasin, l’utilisateur scanne le QR code du commerçant qui valide le scan (pour éviter la fraude) puis le tampon digital est ajouté dans la carte de fidélité du client. Au bout du 9ème achat, le client reçoit une récompense que le commerçant a choisi.",
  },
  {
    label: "J'ai d'autres questions ?",
    content:
      "N'hésitez pas à nous écrire à : hello@gifted.cool pour toute question ou suggestion. Nous sommes là pour vous aider !",
  },
]);
</script>

<template>
  <UPageHero
    title="Vous avez des questions ?"
    description="Remarques, suggestions, questions fréquentes • Nous sommes là pour vous aider ! Écrivez-nous si besoin à hello@gifted.cool"
    headline="Nous avons les réponses !"
    :ui="{ container: 'sm:py-10 py-10 lg:py-10' }"
  />
  <UAccordion :items="items" class="pr-16 pl-16" />
</template>
