<template>
  <q-page padding class="bg">
    <ViewerContent :page="page" />
    <q-page-sticky position="bottom-right" :offset="[18, 110]">
      <q-btn
        size="small"
        round
        @click="toggleHeader()"
        :icon="headerVisible ? 'fullscreen' : 'fullscreen_exit'"
        color="white"
        class="text-black"
      >
        <q-tooltip>
          {{ headerVisible ? 'ヘッダを非表示' : 'ヘッダを表示' }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 64]">
      <q-btn
        size="small"
        round
        @click="toggleAutoLoad()"
        :icon="autoLoad ? 'autorenew' : 'pause'"
        color="white"
        class="text-black"
        :aria-pressed="autoLoad"
      >
        <q-tooltip>
          {{ autoLoad ? '自動で続きを読む（ON）' : '手動で続きを表示（OFF）' }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        size="small"
        round
        @click="scrollTop()"
        icon="keyboard_arrow_up"
        color="white"
        class="text-black"
      />
    </q-page-sticky>
    <!-- content -->
  </q-page>
</template>

<style scoped>
.bg {
  background-image: url('../assets/bg.jpg');
  background-repeat: repeat;
  background-size: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import ViewerContent from 'components/ViewerContent.vue';
import { useAutoLoadStore, useHeaderVisibilityStore } from 'src/stores/LocalStorage';

export default defineComponent({
  props: {
    page: {
      type: String,
      default: '1',
    },
    lang: {
      type: String,
      default: 'ja',
    },
  },
  components: {
    ViewerContent,
  },
  computed: {
    headerVisible() {
      return useHeaderVisibilityStore().showHeader.value;
    },
    autoLoad() {
      return useAutoLoadStore().enabled.value;
    },
  },
  methods: {
    toggleHeader() {
      useHeaderVisibilityStore().forceToggle();
    },
    toggleAutoLoad() {
      useAutoLoadStore().toggle();
    },
    scrollTop() {
      scrollTo(0, 0);
    },
  },
});
</script>
