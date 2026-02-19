<script setup lang="ts">
import Header from "~/components/Header.vue";
import Activation from "~/components/Activation.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <Activation />
    </div>
    <Footer />
  </div>
</template>
