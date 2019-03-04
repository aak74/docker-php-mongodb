<template>
  <v-text-field
    :value="field.value"
    :label="field.attrs.label"
    :disabled="field.attrs.disabled"
    :readonly="field.attrs.readonly"
  />
</template>

<script>
export default {
  props: [
    'field',
  ]
}
</script>
