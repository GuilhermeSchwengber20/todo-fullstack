<script setup lang="ts">
import { computed } from "vue";
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  deletedAt: string | null;
}

const {
  data: tasks,
  pending,
  error,
  refresh,
} = await useFetch<Task[]>(`${apiBase}/tasks`, {
  method: "GET",
  credentials: "include",
  server: false,
});

const completedTasks = computed(() =>
  tasks.value ? tasks.value.filter((task) => task.completed) : [],
);

const pendingTasks = computed(() =>
  tasks.value ? tasks.value.filter((task) => !task.completed) : [],
);
</script>
<template>
  <TodoLayout>
    <TodoHeader />
    <TodoForm @submit-success="refresh" />

    <ClientOnly>
      <p v-if="pending" class="text-center text-gray-500">
        Carregando tarefas...
      </p>
      <p v-else-if="error" class="text-center text-red-500">
        Ocorreu um erro ao carregar as tarefas.
      </p>

      <TodoList v-else>
        <TodoItem
          v-for="task in pendingTasks"
          :key="task.id"
          :task="task"
          @submit-success="refresh"
        />

        <TodoItemCompleted
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
        />
      </TodoList>
    </ClientOnly>
  </TodoLayout>
</template>
