<template>
  <q-page padding>
    <q-card style="max-width:600px; margin: 0 auto;" flat>
      <q-card-section>
        <div class="text-h6">DLsite</div>
        <q-separator />
        <div style="margin-top: 20px;">
          DLsiteのページに遷移します。<br />
          数秒経っても移動しない場合は<a :href="href">このリンク</a>からアクセスしてください。
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const href =
  'https://www.dlsite.com/home/dlaf/=/aid/momoco/url/https%3A%2F%2Fwww.dlsite.com%2Fmaniax%2Fcircle%2Fprofile%2F%3D%2Fmaker_id%2FRG24350.html%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dtext';

onMounted(() => {
  setTimeout(() => {
    location.href = href;
  }, 1500);
});
</script>
