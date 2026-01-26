<script setup lang="ts">
import { ref } from "vue";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const showEditModal = ref(false);

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  deletedAt: string | null;
}

const { task } = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "submit-success"): void;
}>();

const closeEditModal = () => {
  showEditModal.value = false;
};

const completeTask = async () => {
  try {
    await $fetch(`${apiBase}/tasks/${task.id}/complete`, {
      method: "PATCH",
      credentials: "include",
    });
    emit("submit-success");
  } catch (err) {
    console.error("Erro ao completar tarefa:", err);
  }
};

const deleteTask = async () => {
  try {
    await $fetch(`${apiBase}/tasks/${task.id}/delete`, {
      method: "DELETE",
      credentials: "include",
    });
    emit("submit-success");
  } catch (err) {
    console.error("Erro ao remover tarefa:", err);
  }
};

const updateTask = () => {
  emit("submit-success");
  closeEditModal();
};
</script>
<template>
  <li
    class="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition"
  >
    <div class="flex items-center gap-3">
      <input type="checkbox" class="h-4 w-4" @change="completeTask" />
      <div class="flex flex-col">
        <span class="font-medium">{{ task.title }}</span>
        <span class="text-sm text-gray-500">{{ task.description }}</span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100 transition"
        @click="showEditModal = true"
      >
        Editar
      </button>
      <button
        class="text-xs px-3 py-1 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition"
        @click="deleteTask"
      >
        Remover
      </button>
    </div>
    <TodoEditModal
      :task="task"
      :open="showEditModal"
      @close="closeEditModal"
      @updated="updateTask"
    />
  </li>
</template>
