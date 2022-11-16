<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white" style="background-color: #0181b0">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          Quasar App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-img
        class="absolute-top"
        src="~assets/img/material.png"
        style="height: 130px"
      >
        <div class="absolute-bottom bg-transparent">
          <div class="row justify-center my-div">
            <q-avatar size="56px" class="text-center">
              <img src="~assets/img/user.png" />
            </q-avatar>
          </div>

          <div class="text-weight-bold text-center q-pt-sm">
            Nombre completo del usurio
          </div>
          <div class="text-center">@alias</div>
        </div>
      </q-img>

      <q-list
        style="
          height: calc(100% - 130px);
          margin-top: 130px;
          border-right: 1px solid #ddd;
        "
        bordered
      >
        <q-expansion-item
          expand-separator
          dense
          dense-toggle
          class="q-mt-xs rounded-borders"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="light-blue" name="home" />
            </q-item-section>

            <q-item-section>Ejemplos</q-item-section>
          </template>
          <q-list class="text-weight-regular">
            <q-item
              dense
              clickable
              v-ripple
              to="/examples/card"
              active-class="light-blue"
            >
              <q-item-section avatar class="q-ml-md">
                <q-icon color="light-blue" name="local_hospital" />
              </q-item-section>
              <q-item-section class="rounded-borders">Card</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>@DASIG</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
