<template>
  <div class='areal-input'>
    <div v-if='title' class='areal-input-title'>{{ title }}</div>
    <v-text-field
      :single-line='singleLine'
      :hide-details='hideDetails'
      class='areal-input-text'
      :clearable='clearable'
      :disabled='disabled'
      :placeholder='placeholder'
      :prepend-icon='prIcon'
      :value='value'
      :readonly='readonly'
      :mask='mask'
      @click="click"
      @input='input'
      @focus="eraseError"
      :return-masked-value="returnMaskedValue"
      @keydown.native="preventInput"
    />
  </div>
</template>

<script>
export default {
  name: 'ArealInput',
  props: [
    'title',
    'placeholder',
    'clearable',
    'disabled',
    'prIcon',
    'value',
    'readonly',
    'mask',
    'singleLine',
    'hideDetails',
    'returnMaskedValue',
    'error',
    'allowedChars',
  ],
  methods: {
    click(e) {
      this.$emit('click', e);
    },
    input(value) {
      this.$emit('input', value);
    },
    eraseError() {
      this.$emit('eraseError');
    },
    preventInput(e) {
      const allowed = this.allowedChars;
      const key = e.key;
      if (allowed && key && key.length === 1 && !e.ctrlKey) {
        const regex = new RegExp(`[${allowed}]`);
        if (!regex.test(e.key)) {
          e.preventDefault();
        }
      }
    },
  },
};
</script>

<style>
.areal-input-text {
  margin-top: 0;
}
</style>

