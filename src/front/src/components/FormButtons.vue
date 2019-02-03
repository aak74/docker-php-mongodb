<template>
  <div class="buttons" v-if="buttons.length > 0">
    <form-button
      v-for="button in buttons"
      :button="button"
      @click="emit($event, button)"
    />
  </div>
</template>

<script>
import FormButton from './FormButton'

export default {
  props: [
    'buttons',
  ],
  components: {
    FormButton
  },
  methods: {
    emit() {
      console.log('buttons emit');
    },
  },
}
</script>
