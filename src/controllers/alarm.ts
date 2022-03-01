import { ref, watch } from 'vue';
import {
  AlarmControllerInterface,
  AlarmSoundIntermface,
} from 'src/models/alarm';

const AlarmSounds: AlarmSoundIntermface[] = [
  { label: 'Alarme 1', url: 'https://www.fesliyanstudios.com/play-mp3/4383' },
  { label: 'Alarme 2', url: 'https://www.fesliyanstudios.com/play-mp3/4384' },
  { label: 'Alarme 3', url: 'https://www.fesliyanstudios.com/play-mp3/4385' },
  { label: 'Alarme 4', url: 'https://www.fesliyanstudios.com/play-mp3/4388' },
  { label: 'Alarme 5', url: 'https://www.fesliyanstudios.com/play-mp3/4389' },
];

const selectedAlarmSoundUrl = ref<AlarmSoundIntermface>(AlarmSounds[0]);

const AlarmController = (): AlarmControllerInterface => {
  let audio = new Audio(selectedAlarmSoundUrl.value.url);
  const isPlaying = ref<boolean>(false);

  const play = async (loop = true) => {
    audio.loop = loop;
    audio.pause();
    audio.currentTime = 0;
    await audio.play().then(() => {
      isPlaying.value = true;
    });
  };

  const stop = () => {
    audio.pause();
    isPlaying.value = false;
  };

  const toogle = async () => {
    if (!isPlaying.value) await play(false);
    else stop();
  };

  audio.onended = () => {
    if (audio.loop) return;
    isPlaying.value = false;
  };

  watch(
    () => selectedAlarmSoundUrl.value,
    () => {
      stop();
      audio = new Audio(selectedAlarmSoundUrl.value.url);
    }
  );

  return {
    isPlaying,
    play,
    stop,
    toogle,
  };
};

export { AlarmController, AlarmSounds, selectedAlarmSoundUrl };
