<template>
  <div>
    <q-dialog persistent v-model="dialog">
      <q-card dark flat>
        <q-card-section>
          <div class="text-h6 text-center">
            <b>Timer name</b>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-px-md">
          <q-btn
            outline
            icon="stop"
            size="5rem"
            color="red-9"
            label="Stop"
            @click="onStop"
            v-close-popup
          />
        </q-card-section>

        <q-card-actions align="center">
          <!-- <q-btn icon="stop" flat color="red-9" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { AlarmController } from 'src/controllers/alarm';

const props = defineProps<{
  start: boolean;
}>();

const emit = defineEmits(['onStop']);

const dialog = ref<boolean>(false);
const alarmContorler = AlarmController();

const onStop = () => {
  dialog.value = false;
  emit('onStop');
};

watch(
  () => props.start,
  () => {
    if (dialog.value != props.start) dialog.value = props.start;
  }
);

watch(
  () => dialog.value,
  () => {
    if (dialog.value) alarmContorler.play();
    else alarmContorler.stop();
  }
);
</script>
