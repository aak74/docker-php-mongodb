<template>
  <v-text-field
    v-model="field.value"
    :label="field.label"
    :disabled="field.disabled"
    :readonly="field.readonly"
    :placeholder="field.placeholder"
    :type="field.inputType"
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
