<template>
  <v-checkbox
    :label="field.attrs.label"
    v-model="field.value"
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
