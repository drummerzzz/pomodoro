import { TimerControllerInterface } from 'src/models/timer';
import { ref, computed, watch } from 'vue';

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;

export const TimerController = (
  minutes: number,
  onFinish: () => void,
  onReset?: () => void
): TimerControllerInterface => {
  const initialTimeInMinutes = ref<number>(minutes);
  const totalTimeInSeconds = ref<number>(
    initialTimeInMinutes.value * MINUTE_IN_SECONDS
  );
  const isStarted = ref(false);
  let clockInterval: NodeJS.Timeout;

  const startTimer = () => {
    isStarted.value = !isStarted.value;
  };
  const updateTimer = (minutes: number) => {
    if (minutes > 0) {
      isStarted.value = false;
      initialTimeInMinutes.value = minutes;
      resetTimer();
    }
  };
  const resetTimer = () => {
    isStarted.value = false;
    totalTimeInSeconds.value = initialTimeInMinutes.value * MINUTE_IN_SECONDS;
    if (onReset) onReset();
  };

  const formatPadStart = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const timerDisplay = computed(() => {
    const hours = Math.floor(totalTimeInSeconds.value / HOUR_IN_SECONDS);
    const hoursInMinutes = hours * MINUTE_IN_SECONDS;
    const minutes =
      Math.floor(totalTimeInSeconds.value / MINUTE_IN_SECONDS) - hoursInMinutes;
    const seconds = Math.floor(totalTimeInSeconds.value % MINUTE_IN_SECONDS);
    return `${formatPadStart(hours)}:${formatPadStart(
      minutes
    )}:${formatPadStart(seconds)}`;
  });

  watch(
    () => isStarted.value,
    () => {
      const SECOND_IN_MILISECONDS = 1000;
      if (clockInterval && !isStarted.value) clearInterval(clockInterval);
      else {
        clockInterval = setInterval(() => {
          if (totalTimeInSeconds.value > 0) totalTimeInSeconds.value -= 1;
        }, SECOND_IN_MILISECONDS);
      }
    }
  );

  watch(
    () => totalTimeInSeconds.value,
    () => {
      if (totalTimeInSeconds.value == 0) onFinish();
    }
  );

  return {
    isStarted,
    timerDisplay,
    startTimer,
    updateTimer,
    resetTimer,
  };
};
