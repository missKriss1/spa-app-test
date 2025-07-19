<template>
  <div>
    <h1>Stocks</h1>


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
import DateTable from '../components/DateTable.vue';
import type { Stock } from '../types';

const data = ref<Stock[]>([]);
const page = ref(1);
const pageSize = 10;
const totalCount = ref(0);

const columns = [
  { label: 'Article', key: 'supplier_article' },
  { label: 'Date', key: 'date' },
  { label: 'Last Date', key: 'last_change_date' },
  { label: 'Client', key: 'in_way_from_client' },
  { label: 'Warehouse', key: 'warehouse_name' },
  { label: 'Price', key: 'price' },
];

function getToday(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const fetchData = async () => {
  try {
    const res = await api.get('/api/stocks', {
      params: {
        dateFrom: getToday(),
        page: page.value,
        limit: pageSize,
      },
    });

    data.value = res.data.data || [];
    totalCount.value = Number(res.data.meta?.total || 0);
    page.value = Number(res.data.meta?.current_page || page.value);

    console.log('Stocks loaded:', data.value.length);
  } catch (e) {
    console.error('Failed to fetch stocks:', e);
  }
};

watch(page, fetchData, { immediate: true });

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

const chartData = computed(() => ({
  labels: data.value.map(i => i.date),
  datasets: [
    {
      label: 'Price',
      data: data.value.map(i => Number(i.price)),
    },
  ],
}));
</script>
