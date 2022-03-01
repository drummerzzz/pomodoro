<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Pomodoro timer </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer dark v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <SelectAlarmSound />
        <TimerConfig />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import SelectAlarmSound from 'components/SelectAlarmSound.vue';
import TimerConfig from 'components/TimerConfig.vue';

const leftDrawerOpen = ref<boolean>(false);

const $q = useQuasar();
$q.dark.set(true); // or false or "auto"
</script>
