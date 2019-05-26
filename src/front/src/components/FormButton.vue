<template>
  <v-btn
    :data-emit="button.emit"
    :color="button.color"
    :disabled="button.disabled"
    @click="click"
  >{{ button.title }}</v-btn>
</template>

<script>
export default {
  name: 'FormButton',
  props: [
    'button',
  ],
  methods: {
    click(event) {
      console.log('FormButton.click', event);
      this.$emit('click', event.target.parentNode.dataset.emit);
    },
  },
};
</script>
