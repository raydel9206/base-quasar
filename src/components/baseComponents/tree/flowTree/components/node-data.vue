<template>
  <li>
    <node-info  @action="action"  class="nodeInfo" :data="data"/>
    <ul v-if="hasChildren">
      <node-data @action="action" v-for="child in children" :data="child" :key="child.id"/>
    </ul>
  </li>
</template>

<script>
import nodeInfo from "src/components/baseComponents/tree/flowTree/components/node-info.vue";

export default {
  components: { nodeInfo },
  name: "node",
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        id: -1,
        name: "",
        children: []
      })
    }
  },
  computed: {
   
    children() {
      return this.data.children;
    },
    hasChildren()
    {
      return this.data.children&&this.data.children.length>0
    }
  },
  methods:
  {
    action(act)
    {
        this.$emit("action",act)
    }
  }
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

  code
    font-family: monaco, Consolas, 'Lucida Console', monospace

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
