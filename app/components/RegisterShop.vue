<script setup lang="ts">
const toast = useToast();
const showPassword = ref(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
interface RegisterResponse {
  success: boolean;
  message: string;
}
const state = reactive({
  name: "",
  email: "",
  password: "",
});

async function submit() {
  state.email = normalizeEmail(state.email);
  // console.log("Form submitted with data:", state);
  if (!state.name || !state.email || !state.password) {
    toast.add({
      title: "Oups ! Une petite erreur",
      description: "Tous les champs doivent être renseignés.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
    return;
  }

  if (!emailRegex.test(state.email)) {
    toast.add({
      title: "Oups ! Une petite erreur",
      description: "L'email n'est pas valide.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
    return;
  }

  if (state.password.length < 5) {
    toast.add({
      title: "Oups ! Une petite erreur",
      description: "Le mot de passe doit contenir au moins 5 caractères.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
    return;
  }

  try {
    // Appel backend
    const response = await $fetch<RegisterResponse>("/api/register-shop", {
      method: "POST",
      body: state,
    });

    // Vérifier success pour les cas comme "Email d'activation renvoyé"
    if (response.success) {
      toast.add({
        title: "Inscription réussie !",
        description: response.message,
        icon: "i-lucide-check",
        progress: false,
      });
    } else {
      toast.add({
        title: "Oups ! Une erreur",
        description: response.message || "Une erreur est survenue.",
        icon: "i-lucide-annoyed",
        progress: false,
      });
    }
  } catch (error: any) {
    // Couvre toutes les erreurs levées par throw createError
    toast.add({
      title: "Oups ! Une erreur",
      description: error.data?.message || "Une erreur inattendue est survenue.",
      icon: "i-lucide-annoyed",
      progress: false,
    });
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-7">
    <UForm
      :state="state"
      class="space-y-4 w-full max-w-md p-7 border border-gray-300 rounded"
      @submit="submit"
    >
      <UIcon name="i-lucide-store" class="w-full size-8 mx-auto" />
      <h3 class="text-center text-2xl font-bold">
        S'inscrire en tant que commerçant
      </h3>
      <p class="text-center text-sm">
        De retour chez nous ?
        <a href="/login-shop" class="hover:underline">Se connecter</a>
      </p>
      <UFormField label="Nom du magasin" name="shop-name">
        <UInput class="w-full" v-model="state.name" />
      </UFormField>
      <UFormField label="Email" name="email">
        <UInput class="w-full" v-model="state.email" />
      </UFormField>
      <UFormField label="Mot de passe" name="password">
        <UInput
          :type="showPassword ? 'text' : 'password'"
          v-model="state.password"
          class="w-full"
        >
          <template #trailing>
            <UButton
              type="button"
              color="neutral"
              variant="ghost"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye' : 'i-lucide-eye-closed'"
              @click="showPassword = !showPassword"
              class="cursor-pointer"
              :aria-label="
                showPassword
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              "
            />
          </template>
        </UInput>
      </UFormField>
      <p class="text-xs">
        En cliquant sur "S'inscrire", vous acceptez nos
        <a href="/conditions" class="hover:underline">Conditions générales</a>
        et notre
        <a href="/confidentialite" class="hover:underline"
          >Politique de confidentialité</a
        >.
      </p>
      <UButton
        class="w-full flex justify-center items-center cursor-pointer"
        type="submit"
      >
        S'inscrire
      </UButton>
    </UForm>
  </div>
</template>
