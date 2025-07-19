<template>
  <table class="data-table">
    <thead>
    <tr>
      <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, rowIndex) in data" :key="rowIndex">
      <td v-for="col in columns" :key="col.key">
        {{ item[col.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Column {
  label: string;
  key: string;
}

const props = defineProps<{
  columns: Column[];
  data: Record<string, any>[];
}>();
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.data-table th {
  background-color: #f2f2f2;
  text-align: left;
}
.data-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
.data-table tr:hover {
  background-color: #e9e9e9;
}
</style>
