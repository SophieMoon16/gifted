<script setup lang="ts">
import Header from "~/components/Header.vue";
import LoginClient from "~/components/LoginClient.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <Header />
      <LoginClient />
    </div>
    <Footer />
  </div>
</template>
