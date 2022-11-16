<template>
  <q-card flat class="q-ma-md" :class="classCard" style="width: 98%">
    <q-card-section v-if="title" class="bg-grey-1 q-py-sm">
      <div class="text-h6 q-ma-none">{{ title }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section :class="getClassBody">
      <q-scroll-area
        :class="scroll ? 'q-scrollarea__content absolute' : ''"
        :style="getStyleScroll"
      >
        <slot name="body"></slot>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions
      v-if="visibleButtonArea"
      class="q-pr-lg bg-grey-1"
      align="right"
    >
      <slot name="buttons"></slot>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "cardForm",
  props: {
    title: {
      type: String,
    },
    classCard: {
      type: String,
      default: "",
    },
    classBody: {
      type: String,
      default: "",
    },
    colorBody: {
      type: String,
      default: "grey-1",
    },
    visibleButtonArea: {
      type: Boolean,
      default: true,
    },
    classScroll: {
      type: String,
      default: "height: calc(100vh - 300px)",
    },
    scroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getClassBody() {
      return `${this.classBody} ${this.getBgColorBody}`;
    },
    getBgColorBody() {
      return `bg-${this.colorBody}`;
    },
    getStyleScroll() {
      return `${this.classScroll}`;
    },
  },
};
</script>

<style lang="sass">
.q-scrollarea__content
  width: 90% !important
  min-width: 99% !important
</style>
