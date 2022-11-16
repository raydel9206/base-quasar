<template>
  <q-card class="my-card bg-grey-1" flat :style="style" >
    <div class="q-pl-md">
    <div class="text-h4 " >{{title}}</div>

    </div>
    <q-separator/>
    <div v-if="styleArea">
      <q-scroll-area :style="styleArea">
        <q-card-section class="q-pt-xs">
          <slot name="body"></slot>
        </q-card-section>
      </q-scroll-area>
    </div>
    <div v-else>
      <q-card-section class="q-pt-xs">
        <slot name="body"></slot>
      </q-card-section>
    </div>


    <q-card-actions>
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  name: "grouper",
  props: {
    title: {
      type: String,
    },
    styleArea: {
      type: String,
      default: ''
    },
    style: {
      type: String,
      default: ''
    }
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
  font-size: 18px
  font-weight: 400
  line-height: 2.5rem
  letter-spacing: 0.00735em



</style>
