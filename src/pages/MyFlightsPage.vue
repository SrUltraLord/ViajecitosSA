<template>
  <h1>Mis Vuelos</h1>
  <Divider />
  <div class="card p-4 border-round w-full">
    <DataTable :value="tickets">
      <Column field="flight.number" header="Número"></Column>
      <Column field="flight.cityOrigin" header="Origen"></Column>
      <Column field="flight.cityDestination" header="Destino"></Column>
      <Column field="flight.cost" header="Precio">
        <template #body="{ data }"> $ {{ data.flight.cost }} </template>
      </Column>
      <Column field="flight.dateDeparture" header="Fecha Salida"></Column>
      <Column field="flight.timeDeparture" header="Hora Salida"></Column>
      <Column field="dateBought" header="Fecha Compra"></Column>

      <template #empty>
        <h4>No tienes vuelos comprados</h4>
      </template>

      <template #loading>
        <h4>Cargando vuelos...</h4>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useTicketStore } from '../store/ticket'

const ticketStore = useTicketStore()
const authStore = useAuthStore()
const { tickets } = storeToRefs(ticketStore)

onMounted(() => ticketStore.getTicketsByUserNui(authStore.user?.nui!))
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}
</style>
