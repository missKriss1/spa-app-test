<template>
  <div>
    <h1 class="title-page">Проджи</h1>
    <Filters :filters="filters" @updateFilters="updateFilters" />
    <Chart :data="chartData" />
    <DateTable :columns="columns" :data="data" />
    <div class="pagination-wrapper">
      <el-pagination
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          :current-page="page"
          @current-change="handlePageChange"
          class="custom-pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import api from '../api';
import Filters from '../components/Filters.vue';
import DateTable from '../components/DateTable.vue';
import type { Sale, IncomeFilters } from '../types';
import Chart from "../components/Chart.vue";

const data = ref<Sale[]>([]);
const filters = ref<IncomeFilters>({});
const page = ref(1);
const pageSize = 10;
const totalCount = ref(0);

const columns = [
  { label: 'Артикул', key: 'supplier_article' },
  { label: 'Цена', key: 'total_price' },
  { label: 'Скидка', key: 'discount_percent' },
  { label: 'Дата', key: 'date' },
  { label: 'Страна', key: 'country_name' },
  { label: 'Федеральный округ', key: 'oblast_okrug_name' },
  { label: 'Регион', key: 'region_name' },
  { label: 'Опалата', key: 'for_pay' },
  { label: 'Итоговая цена', key: 'finished_price' },
];

const fetchData = async () => {
  try {
    const res = await api.get('/sales', {
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
      label: 'Покупки',
      data: data.value.map(i => Number(i.finished_price)),
    },
  ],
}));
</script>

<style scoped>
.title-page{
  text-align: center;
}
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.custom-pagination {
  --pagination-color: #fff;
  --pagination-bg: #000;
  --pagination-active-bg: #fff;
  --pagination-active-color: #000;
}

.custom-pagination .el-pager li {
  background-color: var(--pagination-bg);
  color: var(--pagination-color);
  border-radius: 4px;
  margin: 0 4px;
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: none;
}

.custom-pagination .el-pager li.active {
  background-color: var(--pagination-active-bg);
  color: var(--pagination-active-color);
  font-weight: 700;
  cursor: default;
}

.custom-pagination .el-pager li.btn-next,
.custom-pagination .el-pager li.btn-prev {
  background-color: var(--pagination-bg);
  color: var(--pagination-color);
  border-radius: 4px;
  margin: 0 6px;
  min-width: 40px;
  font-weight: 600;
}

.custom-pagination .el-pager li.disabled {
  color: #555;
  cursor: not-allowed;
  background-color: var(--pagination-bg);
}

.custom-pagination .el-pager li {
  border: none !important;
}
</style>
