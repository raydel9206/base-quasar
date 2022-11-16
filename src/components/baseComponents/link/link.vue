<template>
  <router-link
    :tag="tag"
    :to="to"
    :class="classLink"
    :class-active="classActive"
    >{{ text }}</router-link
  >
</template>

<script>
export default {
  name: "LinkCmp",
  props: {
    to: {
      type: String,
      default: "/#",
    },
    text: {
      type: String,
    },
    tag: {
      type: String,
      default: "a",
    },
    classLink: {
      type: String,
      default: "routerLink",
    },
    classActive: {
      type: String,
      default: "routerLinkActive",
    },
  },
};
</script>
<style scoped lang="scss">
.routerLink {
  color: $ap-primary;
  text-decoration: none;

  &:hover {
    color: $ap-secondary-dark;
  }
}

.routerLinkActive {
  color: $ap-complementary;
}
</style>
