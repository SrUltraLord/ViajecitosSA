<template>
  <h1>Busca tu siguiente vuelo</h1>
  <Divider />

  <Panel header="Vuelos">
    <SearchFlightForm />
  </Panel>

  <Divider />

  <Message v-if="isLoading" severity="info" :closable="false">
    Cargando resultados...
  </Message>

  <FlightResult v-if="flight !== null && !isLoading" :flight="flight" />

  <Message
    v-if="flight === null && !isLoading && error !== null"
    severity="error"
    :closable="false"
  >
    No se han encontrado vuelos con los campos ingresados...
  </Message>

  <Message v-if="ticketStore.message !== null" severity="info" :life="5000">
    {{ ticketStore.message }}
  </Message>
</template>

<script lang="ts" setup>
import SearchFlightForm from '../components/SearchFlightForm.vue'
import FlightResult from '../components/FlightResult.vue'

import { useFlightStore } from '../store/flight'
import { storeToRefs } from 'pinia'
import { useTicketStore } from '../store/ticket'

const flightStore = useFlightStore()
const { isLoading, flight, error } = storeToRefs(flightStore)
const ticketStore = useTicketStore()
</script>

<style scoped></style>
