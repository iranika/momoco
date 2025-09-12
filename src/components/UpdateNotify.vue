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
import { ref } from 'vue'




export default {
  name: 'UpdateNofity',
  setup() {
    const refreshing = ref(false)
    //var registration = ref(null)
    const updateExists = ref(false)

    function updateAvailable() {
      //registration = event.detail;
      updateExists.value = true;
    }

    function refreshApp() {
      updateExists.value = false;
      //if (!registration.value || !registration.value.waiting) return;
      //@ts-expect-error: 大丈夫 https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerRegistration/waiting
      ServiceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }

    document.addEventListener('swUpdated', updateAvailable, {
      once: true
    })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing.value) return;
      refreshing.value = true;

      window.location.reload();
    })

    return {
      dialog: ref(true),
      updateExists,
      refreshApp,
      updateAvailable,
    }
  },
  // name: 'ComponentName'
}
</script>
