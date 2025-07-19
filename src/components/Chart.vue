<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { defineProps, computed } from 'vue';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  data: ChartData<'bar'>;
}>();

const chartData = computed(() => {
  const copiedData = JSON.parse(JSON.stringify(props.data)) as ChartData<'bar'>;

  if (copiedData.datasets) {
    copiedData.datasets.forEach(dataset => {
      dataset.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      dataset.borderColor = '#000000';
      dataset.borderWidth = 1;
    });
  }

  return copiedData;
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#000000',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#000000',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#000000',
        font: {
          size: 12,
        },
      },
      grid: {
        color: '#ccc',
      },
    },
    y: {
      ticks: {
        color: '#000000',
        font: {
          size: 12,
        },
      },
      grid: {
        color: '#ccc',
      },
    },
  },
};

</script>

<style scoped>
.chart-container {
  max-width: 850px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
</style>
