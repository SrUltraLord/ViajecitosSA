<template>
  <div class="form-container w-full flex justify-content-center">
    <div class="flex-row xl:p-3 lg:p-4 md:p-6 sm:p-full">
      <Message
        v-show="isErrorMessageVisible"
        class="message"
        severity="error"
        @close="() => (isErrorMessageVisible = false)"
      >
        El formulario presenta inconsistencias.
      </Message>

      <div class="surface-card p-4 shadow-7 border-round">
        <div class="text-center mb-5">
          <h1>Registro</h1>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="formgrid grid">
            <div class="col">
              <InputContainer label="Nombre *">
                <template v-slot:input-field>
                  <InputText
                    v-model="registerForm.name"
                    type="text"
                    class="w-full"
                    :class="{ 'p-invalid': isInvalidField('name') }"
                  />
                </template>

                <template v-if="isInvalidField('name')" v-slot:error-label>
                  {{ getFieldErrors('name') }}
                </template>
              </InputContainer>
            </div>

            <div class="col">
              <InputContainer label="Apellido *">
                <template v-slot:input-field>
                  <InputText
                    v-model="registerForm.lastName"
                    type="text"
                    class="w-full"
                    :class="{ 'p-invalid': isInvalidField('lastName') }"
                  />
                </template>

                <template v-if="isInvalidField('lastName')" v-slot:error-label>
                  {{ getFieldErrors('lastName') }}
                </template>
              </InputContainer>
            </div>
          </div>

          <InputContainer icon="pi pi-id-card" label="NUI *">
            <template v-slot:input-field>
              <InputText
                v-model="registerForm.nui"
                type="text"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('nui') }"
              />
            </template>

            <template v-if="isInvalidField('nui')" v-slot:error-label>
              {{ getFieldErrors('nui') }}
            </template>
          </InputContainer>

          <InputContainer icon="pi pi-envelope" label="Email *">
            <template v-slot:input-field>
              <InputText
                v-model="registerForm.email"
                type="text"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('email') }"
              />
            </template>

            <template v-if="isInvalidField('email')" v-slot:error-label>
              {{ getFieldErrors('email') }}
            </template>
          </InputContainer>

          <InputContainer icon="pi pi-lock-open" label="Contraseña *">
            <template v-slot:input-field>
              <InputText
                @input="setPasswordRef(($event.target as HTMLTextAreaElement).value)"
                v-model="registerForm.password"
                type="password"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('password') }"
              />
            </template>

            <template v-if="isInvalidField('password')" v-slot:error-label>
              {{ getFieldErrors('password') }}
            </template>
          </InputContainer>

          <InputContainer icon="pi pi-lock" label="Confirmar contraseña *">
            <template v-slot:input-field>
              <InputText
                v-model="registerForm.passwordConfirmation"
                type="password"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('passwordConfirmation') }"
              />
            </template>

            <template
              v-if="isInvalidField('passwordConfirmation')"
              v-slot:error-label
            >
              {{ getFieldErrors('passwordConfirmation') }}
            </template>
          </InputContainer>

          <Button
            label="Registrar"
            class="w-full"
            type="submit"
            :loading="authStore.isLoading"
            @click="onSubmit()"
          >
          </Button>
        </form>

        <div class="mt-4">
          ¿Ya tienes una Cuenta?
          <a class="redirect-link" @click="redirectToLogin()">Inicia sesión</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ValidationArgs } from '@vuelidate/core'
import {
  helpers,
  required,
  email,
  numeric,
  sameAs,
  minLength,
  maxLength,
} from '@vuelidate/validators'
import InputContainer from '../components/InputContainer.vue'

import { useForm } from '../composables/useForm'
import { useAuthStore } from '../store/auth'

interface RegisterForm {
  name: string
  lastName: string
  nui: string
  email: string
  password: string
  passwordConfirmation: string
}

const router = useRouter()
const authStore = useAuthStore()

const message = ref<string>('')
const registerForm = ref<RegisterForm>({
  name: '',
  lastName: '',
  nui: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})
const password = ref<string>('')

const validationRules: ValidationArgs<RegisterForm> = {
  name: {
    required: helpers.withMessage('El nombre es requerido', required),
  },
  lastName: {
    required: helpers.withMessage('El apellido es requerido', required),
  },
  nui: {
    required: helpers.withMessage('El nui es requerido', required),
    numeric: helpers.withMessage('Solo se permite números', numeric),
    minLength: helpers.withMessage('Debe tener 10 dígitos', minLength(10)),
    maxLength: helpers.withMessage('Debe tener 10 dígitos', maxLength(10)),
  },
  email: {
    required: helpers.withMessage('El correo es requerido', required),
    email: helpers.withMessage('El correo no es válido', email),
  },
  password: {
    required: helpers.withMessage('La contraseña es requerida', required),
    minLength: helpers.withMessage(
      'Debe tener al menos 8 caracteres',
      minLength(8),
    ),
  },
  passwordConfirmation: {
    required: helpers.withMessage(
      'La confirmación de la contraseña es requerida',
      required,
    ),
    sameAsRef: helpers.withMessage(
      'Las contraseñas no coinciden',
      sameAs(password),
    ),
  },
}

watch(registerForm.value, function hideMessageIfValid() {
  if (isInvalidForm.value) return
  isErrorMessageVisible.value = false
})

const {
  isInvalidForm,
  isErrorMessageVisible,
  hasBeenSubmitted,
  getFieldErrors,
  isInvalidField,
} = useForm<RegisterForm>(registerForm, validationRules)

async function onSubmit() {
  hasBeenSubmitted.value = true

  if (isInvalidForm.value) {
    isErrorMessageVisible.value = true
    message.value = authStore.error.message

    if (authStore.error.errors !== null) {
      message.value = authStore.error.errors
        .map((e: any) => e.defaultMessage)
        .join(' ')
    }
    return
  }

  const { nui, name, lastName, email, password } = registerForm.value

  await authStore.registerUser({
    nui,
    name,
    lastName,
    email,
    password,
  })

  isErrorMessageVisible.value = false

  router.push({ name: 'auth' })
}

function setPasswordRef(value: string) {
  password.value = value
}

function redirectToLogin() {
  router.push({ name: 'auth' })
}
</script>

<style scoped>
.form-container .message,
.form-container .surface-card {
  min-width: 450px;
  max-width: 450px;
}

.redirect-link {
  color: #2563eb;
  cursor: pointer;
}
</style>
