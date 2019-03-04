<template>
  <v-btn
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
    click() {
      console.log('button click');

      this.$emit('click');
    }
  }
}
</script>
