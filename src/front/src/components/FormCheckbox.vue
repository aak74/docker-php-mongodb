<template>
  <v-checkbox
    :label="field.label"
    v-model="field.value"
    :disabled="field.disabled"
    :readonly="field.readonly"
    @change="$emit('change', field)"
  />
</template>

<script>
export default {
  props: [
    'field',
  ],
};
</script>
