<template>
  <v-text-field
    v-model="field.value"
    :label="field.attrs.label"
    :disabled="field.attrs.disabled"
    :readonly="field.attrs.readonly"
    :placeholder="field.attrs.placeholder"
    :type="field.attrs.inputType"
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
