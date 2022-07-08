<template>
  <div class="flex justify-content-between">
    <div class="flex">
      <div class="flex-1">
        <h5>Ciudad Origen</h5>
        <InputText v-model="cityOrigin" placeholder="AAA" />
      </div>
      <Divider layout="vertical" />
      <div class="flex-1">
        <h5>Ciudad Destino</h5>
        <InputText v-model="cityDestination" placeholder="AAA" />
      </div>

      <Divider layout="vertical" />

      <div class="flex-2">
        <h5>Fechas</h5>
        <Calendar
          v-model="dateRange.dates"
          :showIcon="true"
          selection-mode="range"
          date-format="yy-mm-dd"
        />
      </div>
    </div>

    <div class="flex align-items-end">
      <Button
        class="h-3rem"
        label="Buscar"
        icon="pi pi-search"
        :disabled="isDisabled"
        :loading="isLoading"
        @click="searchFlight()"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
import { useFlightStore } from '../store/flight'

const flightStore = useFlightStore()
const { isLoading } = storeToRefs(flightStore)

const cityOrigin = ref<string>('')
const cityDestination = ref<string>('')
const dateRange = reactive<{ dates: Date[] }>({ dates: [] })

const isDisabled = computed<boolean>(
  () =>
    cityOrigin.value === '' ||
    cityDestination.value === '' ||
    dateRange.dates.length === 0 ||
    // @ts-ignore
    dateRange.dates.includes(null),
)

function searchFlight() {
  const [dateFrom, dateTo] = dateRange.dates
  flightStore.searchFlight(
    cityOrigin.value,
    cityDestination.value,
    dateFrom.toISOString().split('T')[0],
    dateTo.toISOString().split('T')[0],
  )
}
</script>

<style scoped></style>
