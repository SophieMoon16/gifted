<script setup lang="ts">
import Header from "~/components/Header.vue";
import RegisterClient from "~/components/RegisterClient.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <RegisterClient />
    </div>
    <Footer />
  </div>
</template>
