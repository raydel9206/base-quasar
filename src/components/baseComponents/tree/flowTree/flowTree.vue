<template>
  <div>
    <div v-if="existTree">
      <figure v-for="t in tree" :key="t.id">
        <ul class="tree">
          <node-data @action="action" :data="t" />
        </ul>
      </figure>
    </div>
    <div v-else class="row justify-center q-pa-md">
      <btn
        label="Añadir Nuevo Nivel"
        class="q-ma-xm"
        @click="action({ action: 'add', data: { id: -1 } })"
      />
    </div>
  </div>
</template>

<script>
import nodeData from "src/components/baseComponents/tree/flowTree/components/node-data";
import Btn from "src/components/baseComponents/buttons/btn";
import { api } from "boot/axios";

export default {
  components: { nodeData, Btn },
  name: "flowTree",
  props: {
    url: {
      type: String,
    },
  },
  data() {
    return {
      tree: null, //ARRAY
    };
  },
  methods: {
    action(act) {
      this.$emit("action", act);
    },
    async loadData() {
      this.loading = true;
      await api
        .get(this.url)
        .then((resp) => {
          this.tree = resp.data;
        })
        .catch((error) => {
          return this.error;
        })
        .finally(() => {});
      this.loading = false;
    },
  },
  computed: {
    existTree() {
      return this.tree;
    },
  },
  async mounted() {
    await this.loadData();
  },
};
</script>
<style lang="sass" scoped>
body
  font-family: Calibri, Segoe, "Segoe UI", "Gill Sans", "Gill Sans MT", sans-serif


.tree
  list-style: none
  margin: 0
  padding: 0
  position: relative

  ul, li
    list-style: none
    margin: 0
    padding: 0
    position: relative

  margin: 0 0 1em
  text-align: center
  display: table

  ul
    display: table
    width: 100%

  li
    display: table-cell
    padding: 1em 0
    vertical-align: top

    &:before
      outline: solid 1px #666
      content: ""
      left: 0
      position: absolute
      right: 0
      top: 0

    &:first-child:before
      left: 50%

    &:last-child:before
      right: 50%

  .nodeInfo

    display: inline-block
    margin: 0 .2em 1em
    padding: .2em .5em
    position: relative

  ul:before, code:before, .nodeInfo:before
    outline: solid 1px #666
    content: ""
    height: 1em
    left: 50%
    position: absolute

  ul:before
    top: -1em

  code:before, .nodeInfo:before
    top: -1.05em

  > li
    margin-top: 0

    &:before, &:after
      outline: none

    >
      code:before, .nodeInfo:before
        outline: none
</style>
