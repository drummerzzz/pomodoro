<template>
  <q-page class="row justify-center items-center">
    <div v-if="false" style="z-index: -2; position: fixed; font-size: 100vh; opacity: 0.9 !important">1</div>
    <div style="display: block; z-index: 1">
    <div class="col-12">
      <div v-if="false" class="row justify-center q-gutter-sm">
        <q-input mask="######" type="tel" dark :readonly="isStart" label="Quantidade de rodadas" outlined model-value="1"
          @change="minutesCount = defaultMinutesCount"
        />
      </div>
      <br>
      <div class="row justify-center q-gutter-sm">
        <div class="col-10 col-sm-6 col-md-4">
          <q-input mask="######" type="tel" dark :readonly="isStart" label="Minutos por rodada" outlined v-model="defaultMinutesCount"
          />
        </div>
        <div class="col-10 col-sm-6 col-md-4">
          <q-input mask="######" type="tel" dark label="Minutos de descanso" outlined v-model="restTimeMinutesCount" />
        </div>
      </div>
      <br>
      <div class="row justify-center q-gutter-sm">
        <q-btn size="lg" :icon="!isStart ? 'mdi-play' : 'pause'" :label="!isStart ? 'start' : 'pause'" :color="!isStart ? 'positive' : 'blue' " @click="start"/>
        <q-btn size="lg" icon="stop" :disable="!isStart" label="Reset" color="negative" @click="reset"/>
        <br>
        <div class="col-12 text-weight-bold text-center full-width" style="font-size: 6rem">
          {{timerAmount}}
        </div>
      </div>
    </div>
    </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const minuteInSeconds = 60
    const hourInMinutes = 60

    const restTimeMinutesCount = ref<number>(5)
    const defaultMinutesCount = ref<number>(25)
    const minutesCount = ref<number>(defaultMinutesCount.value)
    const secondsAmount = ref<number>(minutesCount.value * minuteInSeconds)
    const isStart = ref(false)

    const start = () => {
      isStart.value = !isStart.value
      if (isStart.value) timer()
    }
    const reset = () => {
      isStart.value = false
      secondsAmount.value = minutesCount.value * minuteInSeconds
    }

    const timer = () => {
      const clock = setTimeout(() => {
        if (!isStart.value) clearTimeout(clock)
        else secondsAmount.value -= 1
      }, 1000)
    }

    watch(() => minutesCount.value, () => {
      reset()
    })

    watch(() => defaultMinutesCount.value, () => {
      if (defaultMinutesCount.value > 0) minutesCount.value = defaultMinutesCount.value
      else defaultMinutesCount.value = 25
    })

    watch(() => secondsAmount.value, () => {
      if (!isStart.value) return
      if (secondsAmount.value > 0) timer()
    })

    const timerAmount = computed(() => {
      const hours = Math.floor(secondsAmount.value / minuteInSeconds / hourInMinutes).toString().padStart(2, '0')
      const minuteHours = parseInt(hours) * minuteInSeconds
      const minutes = (Math.floor(secondsAmount.value / minuteInSeconds) - minuteHours).toString().padStart(2, '0')
      const seconds = Math.floor(secondsAmount.value % minuteInSeconds).toString().padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    })

    return {
      defaultMinutesCount,
      restTimeMinutesCount,
      minutesCount,
      isStart,
      timerAmount,
      start,
      reset
    }
  }
})
</script>
