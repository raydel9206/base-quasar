<template>
  <q-card class="my-card bg-grey-1" flat bordered>
    <div class="q-pl-md">
    <div class="text-h4 bg-grey-1 text-grey" > {{title}} </div>

    </div>

      <q-card-section class="q-pt-xs">
       <slot name="body"></slot>


    </q-card-section>

    <q-card-actions align="right">
      <slot name="actions"></slot>
    </q-card-actions>




  </q-card>
</template>
<script>
export default {
  name: "subgrouper",
  props: {
    title: {
      type: String,
    },

  },
  watch: {

  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
.text-h4
  font-size: 13px
  font-weight: 400
  line-height: 2.5rem
  letter-spacing: 0.00735em
  position: relative
  margin-top: -20px
  width: fit-content





</style>
