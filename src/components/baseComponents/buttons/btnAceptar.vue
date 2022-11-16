<template>
  <btn :label="label" :color="color" :size="size" :disable="disable" class="q-ma-xm" :tooltip="tooltip"/>
</template>

<script>
import btn from './btn'
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'BtnAceptar',
  components: { btn },
  mixins: [mixinBtn],
  props: {
    label: {
      type: String,
      default: 'Aceptar'
    },
    color: {
      type: String,
      default: 'ap-secondary'
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>
