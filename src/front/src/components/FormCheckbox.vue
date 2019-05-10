<template>
  <v-checkbox
    :label="field.attrs.label"
    v-model="field.value"
    :disabled="field.attrs.disabled"
    :readonly="field.attrs.readonly"
    @change="$emit('change', field)"
  />
</template>

<script>
export default {
  props: [
    'field',
  ]
}
</script>
