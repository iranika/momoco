<template>
  <q-dialog v-model="updateExists" position="top" persistent>
    <q-card style="width: 350px">
      <q-card-section class="row items-center no-wrap">
        びゅあーの更新があります
        <q-space />
        <q-btn flat round label="更新する" v-close-popup @click="refreshApp" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UpdateNotify',
  setup() {
    const refreshing = ref(false);
    const updateExists = ref(false);
    let registration: ServiceWorkerRegistration | undefined;

    function updateAvailable(event: Event) {
      registration = (event as CustomEvent<ServiceWorkerRegistration>).detail;
      updateExists.value = true;
    }

    function refreshApp() {
      updateExists.value = false;
      registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
    }

    document.addEventListener('swUpdated', updateAvailable, {
      once: true,
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing.value) return;
      refreshing.value = true;
      window.location.reload();
    });

    return {
      updateExists,
      refreshApp,
    };
  },
});
</script>
