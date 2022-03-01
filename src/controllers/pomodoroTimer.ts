import { ref, watch } from 'vue';
import { TimerController } from 'src/controllers/timer';
import { PomodoroTimerInterface } from 'src/models/pomodoroTimerModel';

const POMODORO_WORK_TIME_DEFAULT_IN_MINUTES = 25;
const POMODORO_REST_TIME_DEFAULT_IN_MINUTES = 5;

const restTimeInMinutes = ref<number>(POMODORO_REST_TIME_DEFAULT_IN_MINUTES);
const workTimeInMinutes = ref<number>(POMODORO_WORK_TIME_DEFAULT_IN_MINUTES);
const startAlarm = ref<boolean>(false);
const isWorkTimer = ref<boolean>(true);

const timer = TimerController(
  POMODORO_WORK_TIME_DEFAULT_IN_MINUTES,
  () => {
    startAlarm.value = true;
  },
  () => {
    startAlarm.value = false;
  }
);

const { isStarted, timerDisplay, startTimer, updateTimer, resetTimer } = timer;

const onFinishRound = () => {
  isStarted.value = false;
  isWorkTimer.value = !isWorkTimer.value;
  // TODO adicionar reincio automatico
  // if (!isWorkTimer.value) {
  //   startTimer();
  // }
};

const calcRestTime = () => {
  const newRestTIme =
    Math.floor(
      workTimeInMinutes.value / POMODORO_WORK_TIME_DEFAULT_IN_MINUTES
    ) * POMODORO_REST_TIME_DEFAULT_IN_MINUTES;
  if (newRestTIme >= POMODORO_REST_TIME_DEFAULT_IN_MINUTES)
    restTimeInMinutes.value = newRestTIme;
  else restTimeInMinutes.value = POMODORO_REST_TIME_DEFAULT_IN_MINUTES;
};

watch(
  () => isWorkTimer.value,
  () => {
    if (isWorkTimer.value) updateTimer(workTimeInMinutes.value);
    else updateTimer(restTimeInMinutes.value);
  }
);

watch(
  () => workTimeInMinutes.value,
  () => {
    if (isWorkTimer.value) {
      updateTimer(workTimeInMinutes.value);
      calcRestTime();
    }
  }
);
watch(
  () => restTimeInMinutes.value,
  () => {
    if (!isWorkTimer.value) updateTimer(restTimeInMinutes.value);
  }
);

const pomodoroTimer: PomodoroTimerInterface = {
  restTimeInMinutes,
  workTimeInMinutes,
  startAlarm,
  isWorkTimer,
  isStarted,
  timerDisplay,
  startTimer,
  updateTimer,
  resetTimer,
  onFinishRound,
};

export { pomodoroTimer };
