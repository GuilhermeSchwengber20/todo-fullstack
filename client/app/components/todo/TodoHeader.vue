<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const router = useRouter();
const { user } = useAuth();

const userInfo = computed(() => {
  return user.value?.name || "Usuário";
});

const logout = async () => {
  await $fetch(`${apiBase}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  router.push("/authenticate/login");
};
</script>
<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold">
      Suas tarefas,
      <ClientOnly>
        {{ userInfo }}
        <template #fallback>Usuário</template>
      </ClientOnly>
    </h1>
    <button
      class="text-sm text-gray-500 hover:text-black transition"
      @click="logout"
    >
      Sair
    </button>
  </div>
</template>
