<template>
<div class='areal-modal'>
  <v-layout row justify-center>
    <v-dialog
      :value='value'
      :max-width="maxWidth"
      :scrollable='scrollable'
      @update:returnValue='closeModal'
    >
      <v-card class='areal-modal-dialog'>
        <div class='areal-modal-dialog__content'>
          <slot></slot>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>

export default {
  name: 'ArealModal',
  props: ['maxWidth', 'value', 'scrollable'],
  methods: {
    closeModal(event) {
      // Закрытие модалки по клику вне области
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss">
.areal-modal-dialog {
  padding: 65px;
  &__content {
    position: relative;
  }
}
</style>
