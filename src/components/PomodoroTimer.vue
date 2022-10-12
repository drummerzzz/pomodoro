<template>
  <div
    class="flex flex-center"
    :class="{
      'bg-red-9': isWorkTimer,
      'bg-green-9': !isWorkTimer,
      timer: isStarted,
    }"
    style="height: 90vh; width: 100vw"
  >
    <div class="col-12">
      <div class="row justify-center q-gutter-sm">
        <Alarm :start="startAlarm" @onStop="onFinishRound" />
        <div class="col-12">
          <div class="row justify-center q-gutter-sm">
            <q-btn
              size="lg"
              :icon="!isStarted ? 'mdi-play' : 'pause'"
              :label="!isStarted ? 'Iniciar' : 'Pausar'"
              :color="!isStarted ? 'blue-9' : 'cyan'"
              @click="
                () => {
                  currentDateTime = new Date();
                  startTimer();
                }
              "
            />
            <q-btn
              size="lg"
              icon="stop"
              :disable="!isStarted"
              label="Parar"
              color="grey-10"
              @click="
                () => {
                  currentDateTime = null;
                  resetTimer();
                }
              "
            />

            <div class="col-12 text-white text-weight-bold text-center q-mt-md">
              <div class="text-subtitle1">Tempo restante:</div>
              <div
                class="full-width q-px-md"
                style="font-size: 5.5rem; margin-top: -1.8rem"
              >
                {{ timerDisplay }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="text-center text-h3 text-weight-bold text-white">
          <div class="text-h6">Rodada de</div>
          <b>{{ isWorkTimer ? 'Trabalho' : 'Descanso' }}</b>
        </div>
      </div>
      <div v-show="currentDateTime" class="row justify-center">
        <div class="text-center text-weight-bold text-white">
          <br />
          Iniciado em {{ currentDateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pomodoroTimer } from 'src/controllers/pomodoroTimer';
import Alarm from 'components/Alarm.vue';
import { ref } from 'vue';

const currentDateTime = ref<Date | null>(null);

const {
  startAlarm,
  isWorkTimer,
  isStarted,
  timerDisplay,
  startTimer,
  resetTimer,
  onFinishRound,
} = pomodoroTimer;
</script>

<style scoped>
@keyframes clockEffect {
  from {
    opacity: 0.98;
  }
  to {
    opacity: 1;
  }
}

.timer {
  animation: clockEffect 1000ms infinite;
  -webkit-transition: opacity 400ms linear;
  -moz-transition: opacity 400ms linear;
  -o-transition: opacity 400ms linear;
  -ms-transition: opacity 400ms linear;
  transition: opacity 400ms linear;
}
</style>
