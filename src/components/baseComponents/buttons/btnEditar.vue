<template>
  <btn icon="edit" :label="label" :color="color" :disable="disable" class="q-ma-xm" :tooltip="tooltip"/>
</template>

<script>
import btn from './btn'
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'BtnEditar',
  components: { btn },
  mixins: [mixinBtn],
  props: {
    label: {
      type: String,
      default: 'Editar'
    },
    color: {
      type: String,
      default: 'ap-secondary'
    }
  }
}
</script>
