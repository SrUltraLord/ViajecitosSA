import { computed, Ref, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useVuelidate, Validation } from "@vuelidate/core";
import {
  required,
  minLength,
  helpers,
  numeric,
  maxLength,
} from "@vuelidate/validators";

import { useAuthStore } from "./../store/auth";
import { useRouter } from "vue-router";

export type UserFormField = "userNui";
export type UserForm = { [key in UserFormField]: string };
export type ValidationRules = { [key in UserFormField]: any };

export function useUserForm() {
  const router = useRouter();
  const authStore = useAuthStore();
  const { isLoading } = storeToRefs(authStore);

  const userNui = ref<string>("");
  const hasBeenSubmitted = ref<boolean>(false);
  const isMessageVisible = ref<boolean>(false);

  const setMessageVisible = (value: boolean) =>
    (isMessageVisible.value = value);

  const validationRules: ValidationRules = {
    userNui: {
      required: helpers.withMessage(
        "Ingrese su cédula de identidad.",
        required
      ),
      minLength: helpers.withMessage(
        "Debe tener 10 caracteres.",
        minLength(10)
      ),
      maxLength: helpers.withMessage(
        "Debe tener 10 caracteres.",
        maxLength(10)
      ),
      numeric: helpers.withMessage("Solo números", numeric),
    },
  };

  const v$: Ref<Validation<UserForm>> = useVuelidate(validationRules, {
    userNui,
  });

  function isInvalidField(fieldName: UserFormField): boolean {
    const field = v$.value[fieldName];
    return field.$invalid && hasBeenSubmitted.value;
  }

  function getFieldErrorsString(fieldName: UserFormField): string {
    return v$.value.$silentErrors
      .filter((e) => e.$property === fieldName)
      .map((e) => e.$message)
      .join("\n");
  }

  watch(userNui, function hideMessageIfValid() {
    if (v$.value.$invalid) {
      return;
    }

    isMessageVisible.value = false;
  });

  async function onSubmit() {
    hasBeenSubmitted.value = true;

    if (v$.value.$invalid) {
      isMessageVisible.value = true;
      return;
    }

    isMessageVisible.value = false;

    router.push({ name: "home" });
  }

  return {
    // Store
    isLoading,
    // Composable
    userNui,
    isMessageVisible,
    setMessageVisible,
    isFormInvalid: computed(() => v$.value.$invalid),

    isInvalidField,
    onSubmit,

    getFieldErrorsString,
  };
}
