import { Ref, ComputedRef } from 'vue';

export interface TimerControllerInterface {
  isStarted: Ref<boolean>;
  timerDisplay: ComputedRef<string>;
  startTimer: () => void;
  updateTimer: (minutes: number) => void;
  resetTimer: () => void;
}
