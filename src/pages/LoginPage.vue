<template>
  <div class="form-container w-full flex justify-content-center">
    <div class="flex-row xl:p-3 lg:p-4 md:p-6 sm:p-full">
      <Message
        v-show="isMessageVisible"
        class="message"
        severity="error"
        @close="setMessageVisible(false)"
      >
        El formulario presenta inconsistencias.
      </Message>

      <div class="surface-card p-4 shadow-7 border-round">
        <div class="text-center mb-5">
          <img
            src="https://via.placeholder.com/1800x400.png?text=Logo+Empresa"
            alt="Image"
            class="border-round w-full"
          />
        </div>

        <form @submit.prevent="onSubmit">
          <InputContainer icon="pi pi-user" label="NUI *">
            <template v-slot:input-field>
              <InputText
                v-model="userNui"
                type="text"
                class="w-full"
                :class="{ 'p-invalid': isInvalidField('userNui') }"
              />
            </template>

            <template v-if="isInvalidField('userNui')" v-slot:error-label>
              {{ getFieldErrorsString('userNui') }}
            </template>
          </InputContainer>

          <Button
            label="Iniciar sesión"
            class="w-full"
            type="submit"
            :loading="isLoading"
          >
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputContainer from './../components/InputContainer.vue'
import { useUserForm } from './../composables/useUserForm'

const {
  isLoading,
  //
  userNui,
  isMessageVisible,
  setMessageVisible,
  isInvalidField,
  onSubmit,
  getFieldErrorsString,
} = useUserForm()
</script>

<style scoped>
.form-container .message,
.form-container .surface-card {
  min-width: 450px;
  max-width: 450px;
}
</style>
