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

<script>
import { ref } from 'vue'
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export default {
  name: 'UpdateNofity',
  setup(){
    let refreshing = ref(false)
    //var registration = ref(null)
    let updateExists = ref(false)

    function updateAvailable(){
      //registration = event.detail;
      updateExists = true;
    }

    function refreshApp(){
      updateExists = false;
      //if (!registration.value || !registration.value.waiting) return;
      ServiceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }

    document.addEventListener('swUpdated', updateAvailable, {
      once: true
    })

    navigator.serviceWorker.addEventListener('controllerchange', ()=>{
      if (refreshing.value) return;
      refreshing = true;

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
