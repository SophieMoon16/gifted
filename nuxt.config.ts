// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/image"],
  colorMode: {
    preference: "light", // ou 'light' ou 'dark'
    fallback: "light",
    classSuffix: "", // Important : pas de suffixe
  },
});
