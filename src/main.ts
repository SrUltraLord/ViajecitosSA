import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Divider from 'primevue/divider'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import Panel from 'primevue/panel'

const app = createApp(App)

app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Divider', Divider)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Menubar', Menubar)
app.component('Message', Message)
app.component('Panel', Panel)

app.use(createPinia()).use(PrimeVue).use(router).mount('#app')
