<template>
  <div class="card py-3 px-4 border-round w-full">
    <div class="flex justify-content-between">
      <h1>{{ flight.number }}</h1>
      <h2>USD {{ flight.cost }}</h2>
    </div>

    <div class="flex justify-content-between">
      <div class="flex pb-3">
        <div class="mr-5">
          <h3>Origen</h3>
          {{ flight.cityOrigin }}
        </div>

        <Divider layout="vertical" />

        <div>
          <h3>Destino</h3>
          {{ flight.cityDestination }}
        </div>

        <Divider layout="vertical" />

        <div>
          <h3>Fecha</h3>
          {{ flight.dateDeparture }}
        </div>

        <Divider layout="vertical" />

        <div>
          <h3>Hora</h3>
          {{ flight.timeDeparture }}
        </div>
      </div>

      <Button @click="buyTicket()" icon="pi pi-shopping-cart" label="Comprar" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Flight } from '../model/Flight'

import { useAuthStore } from '../store/auth'
import { useFlightStore } from '../store/flight'
import { useTicketStore } from '../store/ticket'

const ticketStore = useTicketStore()
const authStore = useAuthStore()
const flightStore = useFlightStore()

defineProps<{ flight: Flight }>()

function buyTicket() {
  if (authStore.user === null || flightStore.flight === null) {
    return
  }

  ticketStore.buyTicket(authStore.user?.userId, flightStore.flight?.id)
  flightStore.clearFlight()
}
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}
</style>
