<template>
  <div class="row justify-center q-gutter-sm">
    <div class="col-10">
      <q-input
        dark
        mask="######"
        type="tel"
        outlined
        color="white"
        label="Minutos de trabalho"
        v-model="workTimeInMinutes"
        :readonly="isStarted"
        input-style="font-size: 20px"
      />
    </div>
    <div class="col-10">
      <q-input
        dark
        mask="######"
        type="tel"
        label="Minutos de descanso"
        outlined
        color="white"
        v-model="restTimeInMinutes"
        input-style="font-size: 20px"
      />
    </div>
    <div class="col-10">
      <div class="text-subtitle1">Rodada de:</div>
      <q-radio
        color="white"
        size="lg"
        label="Trabalho"
        v-model="isWorkTimer"
        :val="true"
      />
      <q-radio
        color="white"
        size="lg"
        label="Descanso"
        v-model="isWorkTimer"
        :val="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { pomodoroTimer } from 'src/controllers/pomodoroTimer';

const { restTimeInMinutes, workTimeInMinutes, isWorkTimer, isStarted } =
  pomodoroTimer;
</script>
