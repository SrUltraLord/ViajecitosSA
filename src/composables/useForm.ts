import { useVuelidate, ValidationArgs } from '@vuelidate/core'
import { computed, Ref, ref } from 'vue'

export function useForm<T>(
  formRef: Ref<T>,
  formValidations: ValidationArgs<T>,
) {
  type FormField = keyof T

  const isErrorMessageVisible = ref<boolean>(false)
  const hasBeenSubmitted = ref<boolean>(false)

  const v$ = useVuelidate<T, ValidationArgs<T>>(formValidations, formRef)

  function isInvalidField(fieldName: FormField): boolean {
    const field = v$.value[fieldName]
    return field.$invalid && hasBeenSubmitted.value
  }

  function getFieldErrors(fieldName: FormField): string {
    return v$.value[fieldName].$silentErrors.map((e) => e.$message).join('. ')
  }

  return {
    // refs
    hasBeenSubmitted,
    isErrorMessageVisible,
    isInvalidForm: computed<boolean>(() => v$.value.$invalid),
    // Functions
    isInvalidField,
    getFieldErrors,
  }
}
