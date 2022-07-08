<template>
  <div class="form-container w-full flex justify-content-center">
    <div class="flex-row xl:p-3 lg:p-4 md:p-6 sm:p-full">
      <Message
        v-show="isErrorMessageVisible"
        class="message"
        severity="error"
        @close="() => (isErrorMessageVisible = false)"
      >
        {{ errorMessage ?? 'Error' }}
      </Message>

      <div class="surface-card p-4 shadow-7 border-round">
        <div class="text-center mb-5">
          <img
            src="https://seeklogo.com/images/M/monsters-university-logo-EC9AA5387B-seeklogo.com.png"
            alt="Image"
            class="border-round w-full"
          />
        </div>

        <form @submit.prevent="onSubmit">
          <InputContainer icon="pi pi-envelope" label="Email *">
            <template v-slot:input-field>
              <InputText
                v-model="userForm.email"
                type="text"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('email') }"
              />
            </template>

            <template v-if="isInvalidField('email')" v-slot:error-label>
              {{ getFieldErrors('email') }}
            </template>
          </InputContainer>

          <InputContainer icon="pi pi-lock" label="Contraseña *">
            <template v-slot:input-field>
              <InputText
                v-model="userForm.password"
                type="password"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('password') }"
              />
            </template>

            <template v-if="isInvalidField('password')" v-slot:error-label>
              {{ getFieldErrors('password') }}
            </template>
          </InputContainer>

          <Button
            label="Iniciar sesión"
            class="w-full"
            type="submit"
            :loading="authStore.isLoading"
            @click="onSubmit()"
          >
          </Button>
        </form>

        <div class="mt-4">
          ¿Aún no tienes una Cuenta?
          <a class="redirect-link" @click="redirectToRegister()">Regístrate</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ValidationArgs } from '@vuelidate/core'
import { helpers, required, email } from '@vuelidate/validators'

import { useAuthStore } from './../store/auth'
import InputContainer from './../components/InputContainer.vue'
import { useForm } from './../composables/useForm'

interface LoginForm {
  email: string
  password: string
}

const router = useRouter()
const authStore = useAuthStore()

const errorMessage = ref<string | null>(null)

const userForm = ref<LoginForm>({
  email: '',
  password: '',
})

const validationRules: ValidationArgs<LoginForm> = {
  email: {
    required: helpers.withMessage('Ingrese su correo', required),
    email: helpers.withMessage('El correo no es válido', email),
  },
  password: {
    required: helpers.withMessage('Ingrese su contraseña.', required),
  },
}

const {
  isInvalidForm,
  hasBeenSubmitted,
  isErrorMessageVisible,
  getFieldErrors,
  isInvalidField,
} = useForm<LoginForm>(userForm, validationRules)

watch(userForm.value, function hideMessageIfValid() {
  if (isInvalidForm.value) {
    return
  }

  isErrorMessageVisible.value = false
})

async function onSubmit() {
  hasBeenSubmitted.value = true

  if (isInvalidForm.value) {
    errorMessage.value = 'El formulario presenta inconsistencias'
    isErrorMessageVisible.value = true
    return
  }

  isErrorMessageVisible.value = false

  await authStore.loginWithEmailAndPassword(
    userForm.value.email,
    userForm.value.password,
  )

  if (authStore.error !== null) {
    isErrorMessageVisible.value = true
    errorMessage.value = authStore.error.message
    return
  }

  router.push({ name: 'home' })
}

function redirectToRegister(): void {
  router.push({ name: 'register' })
}
</script>

<style scoped>
.redirect-link {
  color: #2563eb;
  cursor: pointer;
}
</style>
