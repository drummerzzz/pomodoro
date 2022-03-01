import { Ref } from 'vue';

export interface AlarmControllerInterface {
  isPlaying: Ref<boolean>;
  play: () => void;
  stop: () => void;
  toogle: () => void;
}

export interface AlarmSoundIntermface {
  label: string;
  url: string;
}
