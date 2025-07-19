<template>
  <el-header class="header">
    <div class="container">
      <div class="site-title">SPA App</div>

      <div class="nav-wrapper">
        <el-menu
            mode="horizontal"
            @select="navigate"
            class="nav-menu"
        >
          <el-menu-item index="stocks">Stock</el-menu-item>
          <el-menu-item index="incomes">Income</el-menu-item>
          <el-menu-item index="orders">Order</el-menu-item>
          <el-menu-item index="sales">Sales</el-menu-item>
        </el-menu>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const active = ref(route.path.replace('/', '') || 'stocks');

function navigate(key: string) {
  active.value = key;
  router.push(`/${key}`);
}
</script>

<style scoped>

.container {
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header {
  background-color: #000000;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}

.site-title {
  color: white;
  font-weight: 700;
  font-size: 26px;
  user-select: none;
}
.nav-wrapper {
  flex: 1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-left: 20px;
}

/* Меню */
.nav-menu {
  min-width: 800px;
  background-color: transparent !important;
  border-bottom: none !important;
  display: flex;
  justify-content: center;
}

.el-menu-item {
  color: white !important;
  font-weight: 600;
  font-size: 20px;
  white-space: nowrap;
  padding: 0 20px;
  cursor: pointer;
  transition: none !important;
}

.el-menu-item:hover,
.el-menu-item:focus,
.el-menu-item.is-active {
  background-color: transparent !important;
  color: white !important;
  box-shadow: none !important;
}
</style>
