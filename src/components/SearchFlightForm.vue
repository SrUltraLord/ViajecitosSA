<template>
  <div class="flex">
    <div class="flex-1">
      <h5>Ciudad Origen</h5>
      <InputText v-model="cityOrigin" placeholder="AAA" />
    </div>

    <div class="flex-1">
      <h5>Ciudad Destino</h5>
      <InputText v-model="cityDestination" placeholder="AAA" />
    </div>

    <div class="flex-1">
      <h5>Rango de fechas</h5>
      <Calendar
        v-model="dateRange"
        :showIcon="true"
        selection-mode="range"
        date-format="yy-mm-dd"
      />
    </div>

    <div class="flex-1">
      <h5>.</h5>
      <Button label="Buscar" icon="pi pi-search" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const cityOrigin = ref<string>("");
const cityDestination = ref<string>("");
const dateRange = ref();
</script>

<style scoped></style>
