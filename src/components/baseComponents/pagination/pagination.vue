<template>
  <div :style="stylePagination">
    <q-pagination
      v-show="show"
      class="q-mx-auto"
      v-model="modelValue"
      :max="max"
      input
      @update:model-value="loadData"
    />
  </div>
<!--  <div>-->
    <q-btn :style="styleUpdate" v-show="show" flat color="ap-secondary" icon="update" size="sm" @click="loadData"/>
<!--  </div>-->

</template>

<script>
import mixinGrid from "components/baseComponents/grid/_mixinGrid/mixinGrid";
export default {
  name: "pagination",
  mixins: [mixinGrid],
  props: {
    model: {
      type: Object
    },
    max: {
      type: Object
    },
    show: {
      type: Boolean,
      default: true
    },
    stylePagination: {
      type: String,
      default: ''
    },
    styleUpdate: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      modelValue: this.model
    }
  },
  methods: {
    loadData(page){
      this.$emit('loadData', page)
    }
  }
}
</script>

<style scoped>

</style>
