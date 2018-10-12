<template>
  <div class='areal-select'>
    <div v-if='title' class='areal-select-title'>{{ title }}</div>
    <v-select
      class="areal-select-item"
      hide-details
      :item-text='itemText'
      :item-value='(itemValue) ? itemValue : "id"'
      :disabled='disabled'
      :items="items"
      :value="value"
      :returnObject='returnObject'
      :clearable='clearable'
      content-class='menu__content--areal-select'
      @change='change'
    />
  </div>
</template>

<script>
export default {
  name: 'ArealSelect',
  props: ['items', 'itemText', 'itemValue', 'title', 'returnObject', 'value', 'disabled', 'clearable'],
  methods: {
    change(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style>
.areal-select-item {
  margin-top: 0;
}
</style>
