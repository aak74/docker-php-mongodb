<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="true"
    :rows-per-page-items="defaultPagination"
    @update:pagination="$emit('update:pagination', $event)"
    class="elevation-1"
    :total-items="totalItems"
    :disable-initial-sort="disableInitialSort"
    :hide-actions="hideActions"
  >
    <v-progress-linear
      slot="progress"
      color="blue"
      indeterminate
      :active="loading"
    />
    <template slot="items" slot-scope="props">
      <td
        v-for="(field, index) in visibleHeaders"
        :key="props.index + '_' + index"
        :data-key="props.index + '_' + index"
        :class="getClassName(field)"
        @click="click(props)"
      >
        {{ getTransformedValue(field.value, props.item[field.value]) }}
      </td>
      <td class="justify-center layout px-0s table-controls" :class="{invisible: !showControls}">
        <v-btn
          class="mx-0"
          icon
          @click="emit(control.emit, props.item)"
          v-for="(control, controlIndex) in controls"
          :key="props.index + '_' + controlIndex"
        >
          <v-icon :color="control.color">{{ control.icon }}</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: ['headers', 'items', 'loading', 'controls', 'pagination', 'transforms',
    'totalItems', 'disableInitialSort', 'hideActions'],
  computed: {
    showControls() {
      return this.$props.controls && this.$props.controls.length;
    },

    visibleHeaders() {
      return this.headers.reduce((carry, item) => {
        if (!item.invisible) {
          carry.push(item);
        }
        return carry;
      }, []);
    },

    defaultPagination() {
      return this.$store.state.admin.ui.defaultPagination;
    },
  },
  methods: {
    getClassName(header) {
      if (!header.align) {
        return '';
      }
      return `text-xs-${header.align}`;
    },

    emit(emit, item) {
      // console.log('emit', emit, item);
      this.$emit(emit, item);
    },

    // преобразует значение по ключу заголовка (headers)
    // используется для корректной сортировки (например по дате)
    getTransformedValue(filter, value) {
      if (this.transforms && this.transforms[filter]) {
        return this.transforms[filter](value);
      }
      return value;
    },

    click(props) {
      this.$emit('click', props.item, props.index);
    },
  },
};
</script>

<style>
.table-controls.invisible {
  display: none;
}
.v-table td {
  cursor: pointer;
}
</style>
