<template>
  <q-page class="row justify-center items-center">
    <PomodoroTimer />
    <Alarm :start="teste" />
  </q-page>
</template>

<script setup lang="ts">
import PomodoroTimer from 'components/PomodoroTimer.vue';
</script>
