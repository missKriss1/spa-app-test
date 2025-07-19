<template>
  <div class="container">
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
.container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 20px;
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #000;
  padding: 12px 20px;
  border-radius: 8px;
  user-select: none;
  box-sizing: border-box;
  margin: 0 auto 1rem auto;
  max-width: 500px;
  justify-content: center;
}

.filters label {
  color: #eee;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.filters input[type="date"] {
  margin-top: 4px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1.5px solid #ccc;
  background-color: #111;
  color: #fff;
  font-size: 14px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.filters input[type="date"]:focus {
  outline: none;
  border-color: #fff;
  background-color: #222;
}

.filters button {
  background-color: #fff;
  color: #000;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
  user-select: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 20px ;
}

.filters button:hover {
  background-color: #ddd;
  color: #000;
}

</style>
