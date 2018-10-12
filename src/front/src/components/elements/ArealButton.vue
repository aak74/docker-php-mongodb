<template>
  <div class="areal-button">
    <v-btn @click='buttonClick'>
      <svgicon
        :icon="icon.svg"
        v-if="icon"
        width="18"
        height="18"
        :color="icon.color"
      />
      <slot>
        {{ title }}
      </slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ArealButton',
  props: [
    'title',
    'icon',
  ],
  methods: {
    buttonClick($event) {
      this.$emit('click', $event);
    },
  },
};
</script>
