<template>
  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "card_example",
};
</script>
