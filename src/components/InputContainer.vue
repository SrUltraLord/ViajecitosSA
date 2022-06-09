<template>
  <div class="field mb-5">
    <span class="w-full p-float-label p-input-icon-right mb-2">
      <i v-if="icon !== null" :class="icon"></i>
      <slot name="input-field"></slot>
      <label v-if="label !== null"> {{ label }} </label>
    </span>

    <small class="p-error flex w-full align-content-start p-error">
      <slot name="error-label"></slot>
    </small>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  icon: String,
  label: String,
})
</script>
