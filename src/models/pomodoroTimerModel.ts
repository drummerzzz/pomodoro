import { Ref } from 'vue';

import { TimerControllerInterface } from './timer';

export interface PomodoroTimerInterface extends TimerControllerInterface {
  restTimeInMinutes: Ref<number>;
  workTimeInMinutes: Ref<number>;
  startAlarm: Ref<boolean>;
  isWorkTimer: Ref<boolean>;
  onFinishRound: () => void;
}
