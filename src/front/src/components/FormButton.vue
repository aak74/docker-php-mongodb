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
  props: [
    'button',
  ],
  methods: {
    click(event) {
      this.$emit('click', event.target.parentNode.dataset.emit);
    },
  },
};
</script>
