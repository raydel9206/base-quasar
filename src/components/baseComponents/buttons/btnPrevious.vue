<template>
  <btn :label="label" :color="color" :disable="disable" class="q-ma-xm" :tooltip="tooltip" icon='arrow_back'/>
</template>

<script>
import btn from './btn'
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'BtnPrevious',
  components: { btn },
  mixins: [mixinBtn],
  props: {
    label: {
      type: String,
      default: 'Anterior'
    },
    color: {
      type: String,
      default: 'ap-secondary'
    }
  }
}
</script>
