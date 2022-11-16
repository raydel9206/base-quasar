<template>
  <btn :label="label" outline :color="color" class="q-ma-xm" :tooltip="tooltip"/>
</template>

<script>
import btn from './btn'
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'BtnCancel',
  components: { btn },
  mixins: [mixinBtn],
  props: {
    label: {
      type: String,
      default: 'Cancelar'
    },
    color: {
      type: String,
      default: 'ap-secondary'
    }
  }
}
</script>
