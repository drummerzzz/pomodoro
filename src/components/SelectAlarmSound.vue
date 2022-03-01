<template>
  <div class="row justify-center q-col-gutter-sm q-px-sm q-py-lg">
    <div class="col-8">
      <q-select
        dark
        label="Som do alarme"
        class="col-6"
        color="white"
        outlined
        v-model="selectedAlarmSoundUrl"
        :options="AlarmSounds"
        option-label="label"
      />
    </div>
    <div class="col-3">
      <q-btn
        outline
        round
        size="lg"
        color="white"
        :icon="isPlaying ? 'stop' : 'mdi-play'"
        @click="alarmContorler.toogle()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlarmController,
  AlarmSounds,
  selectedAlarmSoundUrl,
} from 'src/controllers/alarm';
const alarmContorler = AlarmController();

const { isPlaying } = alarmContorler;
</script>
