<template>
  <div class="filters">
    <label>
      Дата от:
      <input type="date" v-model="dateFrom" />
    </label>
    <label>
      Дата до:
      <input type="date" v-model="dateTo" />
    </label>
    <button @click="applyFilters">Применить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';
import type { IncomeFilters } from '../types.ts';

const emit = defineEmits<{
  (e: 'updateFilters', filters: IncomeFilters): void;
}>();

const props = defineProps<{
  filters: IncomeFilters;
}>();

const dateFrom = ref(props.filters.dateFrom || '');
const dateTo = ref(props.filters.dateTo || '');

function applyFilters() {
  emit('updateFilters', {
    ...props.filters,
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
  });
}

watch(
    () => props.filters,
    (newFilters) => {
      dateFrom.value = newFilters.dateFrom || '';
      dateTo.value = newFilters.dateTo || '';
    },
    { deep: true }
);
</script>


<style scoped>
.filters {
  margin-bottom: 1rem;
}
.filters label {
  margin-right: 1rem;
}
</style>
