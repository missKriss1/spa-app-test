<template>
  <div>
    <h1>Orders</h1>

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
import {computed, ref, watch} from 'vue';
import api from '../api';
import Filters from '../components/Filters.vue';
import DateTable from '../components/DateTable.vue';
import type { IncomeFilters, Order} from '../types';
import Chart from "../components/Chart.vue";

const data = ref<Order[]>([]);
const filters = ref<IncomeFilters>({});
const page = ref(1);
const pageSize = 10;
const totalCount = ref(0);

const columns = [
  { label: 'Article', key: 'supplier_article' },
  { label: 'Price', key: 'total_price' },
  { label: 'Discount', key: 'discount_percent' },
  { label: 'Date', key: 'date' },
  { label: 'Warehouse', key: 'warehouse_name' },
  { label: 'Region', key: 'oblast' },
  { label: 'Price', key: 'total_price' },
];

const fetchData = async () => {
  try {
    const res = await api.get('/api/orders', {
      params: {
        dateFrom: filters.value.dateFrom || '2024-01-01',
        dateTo: filters.value.dateTo || '2024-12-31',
        page: page.value,
        limit: pageSize,
      },
    });

    data.value = res.data.data || [];
    totalCount.value = Number(res.data.meta?.total || 0);
    page.value = Number(res.data.meta?.current_page || page.value);

    console.log('Sales loaded:', data.value.length);
  } catch (e) {
    console.error('Failed to fetch sales:', e);
  }
};

watch([filters, page], fetchData, { immediate: true });

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
      label: 'Pay',
      data: data.value.map(i => i.total_price),
    },
  ],
}));
</script>
