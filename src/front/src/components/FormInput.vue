<template>
  <v-text-field
    :value="field.value"
    :label="field.attrs.label"
    :disabled="field.attrs.disabled"
    :readonly="field.attrs.readonly"
    :placeholder="field.attrs.placeholder"
    :type="field.attrs.inputType"
  />
</template>

<script>
export default {
  props: [
    'field',
  ],
};
</script>
