<template>
  <div>
    <h1>Incomes</h1>
    <Filters :filters="filters" @updateFilters="updateFilters" />
    <Chart :data="chartData" />
    <DateTable :columns="columns" :data="data" />
    <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page="page"
        @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import api from '../api';
import Chart from '../components/Chart.vue';
import Filters from '../components/Filters.vue';
import DateTable from '../components/DateTable.vue';
import type { Income } from '../types.ts';
import type { IncomeFilters } from '../types.ts';

const data = ref<Income[]>([]);
const filters = ref<IncomeFilters>({});
const page = ref(1);
const pageSize = 10;
const totalCount = ref(0);

const columns = [
  { label: 'Supplier Article', key: 'supplier_article' },
  { label: 'Date', key: 'date' },
  { label: 'Last Change Date', key: 'last_change_date' },
  { label: 'Tech Size', key: 'tech_size' },
  { label: 'Barcode', key: 'barcode' },
  { label: 'Quantity', key: 'quantity' },
  { label: 'Date Close', key: 'date_close' },
  { label: 'Warehouse', key: 'warehouse_name' },
];

const fetchData = async () => {
  try {
    const res = await api.get('/api/incomes', {
      params: {
        dateFrom: filters.value.dateFrom || '2024-01-01',
        dateTo: filters.value.dateTo || '2024-12-31',
        page: page.value,
        limit: pageSize,
      },
    });
    // обязательно перезаписываем данные, а не добавляем к старым
    data.value = res.data.data || [];
    totalCount.value = Number(res.data.meta?.total || 0);
    page.value = Number(res.data.meta?.current_page || page.value);
    console.log('Получено записей:', res.data.data.length);
  } catch (e) {
    console.error('Failed to fetch incomes:', e);
  }
};

watch([page, filters], () => {
  fetchData();
}, { immediate: true });

const updateFilters = (newFilters: IncomeFilters) => {
  filters.value = newFilters;
  page.value = 1;
};

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

const chartData = computed(() => ({
  labels: data.value.map(i => i.date),
  datasets: [
    {
      label: 'Quantity',
      data: data.value.map(i => i.quantity),
    },
  ],
}));
</script>
