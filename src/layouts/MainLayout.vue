<template>
  <Menubar :model="items">
    <template #start>
      <div class="flex justify-content-center logo-container">
        <img
          class="monsters-logo"
          src="https://i.pinimg.com/originals/3e/03/78/3e03787d5bfce6ef15ffa944ed86f50d.png"
          alt=""
        />
        <h4>Viajecitos SA</h4>
      </div>
    </template>

    <template #end>
      <Button
        icon="pi pi-sign-out"
        label="Cerrar Sesión"
        class="p-button-danger"
        @click="logout()"
      />
    </template>
  </Menubar>

  <div class="w-screen flex justify-content-center">
    <div class="content xl:w-6 lg:w-8 md:w-10 sm:w-12">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MenuItem } from 'primevue/menuitem'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const router = useRouter()

const items: MenuItem[] = [
  { separator: true },
  { label: 'Buscar', icon: 'pi pi-fw pi-search', to: { name: 'home-search' } },
  {
    label: 'Mis Vuelos',
    icon: 'pi pi-fv pi-shopping-bag',
    to: { name: 'home-my-flights' },
  },
]

function logout() {
  authStore.logout()
  router.push({ name: 'auth' })
}
</script>

<style scoped>
.monsters-logo {
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.logo-container {
  margin-right: 15px;
}
</style>
