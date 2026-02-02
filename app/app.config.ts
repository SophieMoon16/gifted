export default defineAppConfig({
  ui: {
    colors: {
      primary: "zinc",
      secondary: "zinc",
      neutral: "gray",
      success: "emerald",
      info: "blue",
      warning: "amber",
      error: "rose",
    },
  },
  colorMode: {
    preference: "light", // ou 'light' ou 'dark'
    fallback: "light",
    classSuffix: "", // Important : pas de suffixe
  },
});
