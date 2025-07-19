<template>
  <div class="table-container">
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
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Column {
  label: string;
  key: string;
}

const { columns, data } = defineProps<{
  columns: Column[];
  data: Record<string, any>[];
}>();
</script>

<style scoped>
.table-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
}

.data-table thead tr {
  background-color: black;
  color: white;
  text-align: left;
  font-weight: 600;
  font-size: 16px;
}

.data-table th {
  padding: 12px 16px;
  user-select: none;
}

.data-table tbody tr {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}

.data-table tbody tr:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transform: translateY(-3px);
  background-color: #fafafa;
}

.data-table td {
  padding: 12px 16px;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
}

.data-table tbody tr:first-child td:first-child {
  border-top-left-radius: 12px;
}

.data-table tbody tr:first-child td:last-child {
  border-top-right-radius: 12px;
}

.data-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

.data-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}
</style>
