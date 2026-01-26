<script setup lang="ts">
import { ref } from "vue";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

interface Props {
  taskId?: string;
  initialTitle?: string;
  initialDescription?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "submit-success"): void;
}>();

const title = ref(props.initialTitle || "");
const description = ref(props.initialDescription || "");
const loading = ref(false);
const error = ref<string | null>(null);

const isEditMode = computed(() => !!props.taskId);

const handleSubmit = async () => {
  if (!title.value.trim()) return;
  loading.value = true;
  error.value = null;

  try {
    if (isEditMode.value) {
      await $fetch(`${apiBase}/tasks/${props.taskId}`, {
        method: "PUT",
        credentials: "include",
        body: {
          title: title.value,
          description: description.value,
        },
      });
    } else {
      await $fetch(`${apiBase}/tasks`, {
        method: "POST",
        credentials: "include",
        body: {
          title: title.value,
          description: description.value,
        },
      });
      title.value = "";
      description.value = "";
    }
    emit("submit-success");
  } catch (err: any) {
    error.value = err?.data?.message ?? "Erro ao salvar tarefa";
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex flex-col gap-2 mb-6">
    <input
      v-model="title"
      type="text"
      placeholder="Nova tarefa..."
      class="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring"
    />
    <input
      v-model="description"
      type="text"
      placeholder="Descrição da tarefa..."
      class="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring"
    />
    <button
      class="px-5 py-2 bg-black text-white rounded-xl hover:opacity-90 transition"
      @click="handleSubmit"
    >
      {{
        loading ? "Carregando..." : isEditMode ? "Salvar" : "Adicionar Tarefa"
      }}
    </button>
    <p v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </p>
  </div>
</template>
