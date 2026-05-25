<template>
  <div style="text-align: center">
    <q-btn
      type="a"
      rounded
      size="xs"
      color="primary"
      class="text-white"
      :href="props.link"
      target="_blank"
    >
      <q-icon :name="mdiTwitter" />シェア
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { mdiTwitter } from '@quasar/extras/mdi-v6';

const props = defineProps<{
  link: string;
}>();
</script>
