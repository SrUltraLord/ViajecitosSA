<template>
  <h1>Busca tu siguiente vuelo</h1>
  <Divider />

  <Panel header="Vuelos">
    <SearchFlightForm />

    <template #icons>
      <span class="pi pi-telegram"></span>
    </template>
  </Panel>

  <Divider />

  <DataTable :value="flights">
    <Column field="id" header="Id"></Column>
    <Column field="number" header="Número"></Column>
    <Column field="cityOrigin" header="Origen"></Column>
    <Column field="cityDestination" header="Destino"></Column>
    <Column field="cost" header="Precio">
      <template #body="{ data }"> $ {{ data.cost }} </template>
    </Column>
    <Column field="dateDeparture" header="Fecha Salida"></Column>
    <Column field="timeDeparture" header="Hora Salida"></Column>

    <Column>
      <template #body>
        <Button type="button" icon="pi pi-shopping-cart"></Button>
      </template>
    </Column>

    <template #empty>
      <h4>Busca un vuelo</h4>
    </template>

    <template #loading>
      <h4>Cargando vuelos...</h4>
    </template>
  </DataTable>
</template>

<script lang="ts" setup>
import SearchFlightForm from '../components/SearchFlightForm.vue'
import { Flight } from '../model/Flight'

const flights: Flight[] = [
  {
    id: 1,
    number: 'AV1234',
    cityOrigin: 'UIO',
    cityDestination: 'GYE',
    cost: 40.0,
    dateDeparture: '2022-05-26',
    timeDeparture: '08:40:17',
  },
  {
    id: 2,
    number: 'AV1111',
    cityOrigin: 'MEC',
    cityDestination: 'GYE',
    cost: 20.0,
    dateDeparture: '2022-05-29',
    timeDeparture: '17:40:57',
  },
  {
    id: 3,
    number: 'AV3412',
    cityOrigin: 'CUE',
    cityDestination: 'UIO',
    cost: 30.0,
    dateDeparture: '2022-05-25',
    timeDeparture: '08:41:15',
  },
  {
    id: 4,
    number: 'CM234',
    cityOrigin: 'UIO',
    cityDestination: 'CUE',
    cost: 30.0,
    dateDeparture: '2022-05-31',
    timeDeparture: '08:41:26',
  },
  {
    id: 5,
    number: 'EQ009',
    cityOrigin: 'UIO',
    cityDestination: 'GYE',
    cost: 35.0,
    dateDeparture: '2022-05-26',
    timeDeparture: '08:40:17',
  },
  {
    id: 6,
    number: 'CM312',
    cityOrigin: 'MEC',
    cityDestination: 'UIO',
    cost: 30.0,
    dateDeparture: '2022-05-25',
    timeDeparture: '10:36:39',
  },
]
</script>

<style scoped></style>
