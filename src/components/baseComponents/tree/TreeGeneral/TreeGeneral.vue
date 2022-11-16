<template>
    <q-tree class="col-12 col-sm-6"
            :nodes="nodes"
            v-model:ticked="tik"
            v-model:expanded="expand"
            :tick-strategy="tickStrategy"
            @update:ticked="UpdateTicked"
            @update:selected="UpdateSelected"
    >
      <template v-slot:default-header="prop">
        <slot v-bind:prop="prop"></slot>
      </template>
    </q-tree>


</template>

<script>
  import {ref}from 'vue'
  import mixingTree from "../_mixingTree/mixingTree";

    export default {
      name: "TreeGeneral",
      props:['nodes','ticked','expanded','tickStrategy'],
      mixins:[mixingTree],
      data(){
        return{
          tik:this.ticked,
          expand:this.expanded
        }
      },
      methods:{
        UpdateTicked(val){
          this.$emit('Valor',val)
        },
        UpdateSelected(val){
          this.$emit('Selected',val)

        }
      }

    }

</script>

<style scoped>

</style>
