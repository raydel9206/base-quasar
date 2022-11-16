<template>
  <q-btn-group>
    <btn :color="color" icon="add" :tooltip="getLabelBtn('add')"/>
    <btn :color="color" icon="edit" :tooltip="getLabelBtn('edit')" :disable="disableEdit"/>
    <btn :color="color" icon="delete" :tooltip="getLabelBtn('del')" :disable="disableDel"/>
    <btn :color="color" icon="update" :tooltip="getLabelBtn('refresh')"/>
  </q-btn-group>
</template>

<script>
import btn from './btn'
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'BtnGroupCrud',
  components: { btn },
  mixins: [mixinBtn],
  props: {
    crudText: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'ap-secondary'
    },
    disableEdit: {
      type: Boolean,
      default: true
    },
    disableDel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getLabelBtn (actionBtn) {
      switch (actionBtn) {
        case 'add':
          return `Adicionar ${this.crudText}`
        case 'edit':
          return `Modificar ${this.crudText}`
        case 'del':
          return `Eliminar ${this.crudText}`
        case 'refresh':
          return 'Refrescar'
      }
      return this.label
    }
  }
}
</script>
