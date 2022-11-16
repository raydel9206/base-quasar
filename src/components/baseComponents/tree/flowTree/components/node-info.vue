<template>
  <div>
    <q-card class="test">
      <div class="justify-around q-px-md q-gutter-xs actions-left" >
        <btn round icon="add" style="z-index: 2" size="6px" @click="action('add')" />
        <btn round icon="edit" style="z-index: 2" size="6px" @click="action('edit')" />
        <btn
          round
          icon="delete"
          style="z-index: 2"
          color="red"
          size="6px"
          @click="action('delete')"
        />
      </div>

      <q-card-section>
        {{ name }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Btn from "src/components/baseComponents/buttons/btn";
export default {
  name: "node-info",
  components: { Btn },
  props: {
    data:{ type: Object,
      required: null,} //name , id
 
  },
  computed:{
    name(){
      return this.data.name
    }
  },

  methods: {
    action(act){
    this.$emit("action", { data: this.data, action: act });
    }
   
  },
};
</script>
<style lang="sass" scoped>
.my-card  
  width: 100%
  min-width: 70px
  max-width: 200px
  min-height: 70px

.test:hover .actions-left 
  display: block

.actions-left
  position: absolute
  margin-left: -30px
  margin-top: -8px
  max-width: 24px
  display: none


  

</style>
