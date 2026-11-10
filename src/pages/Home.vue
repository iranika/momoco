<template>
  <q-page padding class="bg">
    <ViewerContent :page="page" />
    <q-page-sticky position="bottom-right" :offset="[18, 140]">
      <q-btn
        size="small"
        stack
        @click="toggleHeader()"
        :icon="headerVisible ? 'fullscreen' : 'fullscreen_exit'"
        label="ヘッダー"
        color="white"
        class="text-black"
        :aria-pressed="headerVisible"
        :aria-label="headerVisible ? 'ヘッダを非表示' : 'ヘッダを表示'"
      >
        <q-tooltip>
          {{ headerVisible ? 'ヘッダを非表示' : 'ヘッダを表示' }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 80]">
      <q-btn
        size="small"
        stack
        @click="toggleAutoLoad()"
        :icon="autoLoad ? 'autorenew' : 'pause'"
        label="自動"
        color="white"
        class="text-black"
        :aria-pressed="autoLoad"
        :aria-label="autoLoad ? '自動で続きを読む（ON）' : '手動で続きを表示（OFF）'"
      >
        <q-tooltip>
          {{ autoLoad ? '自動で続きを読む（ON）' : '手動で続きを表示（OFF）' }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        size="small"
        stack
        @click="scrollTop()"
        icon="keyboard_arrow_up"
        label="先頭"
        color="white"
        class="text-black"
        aria-label="先頭に戻る"
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
      return useHeaderVisibilityStore().showHeader;
    },
    autoLoad() {
      return useAutoLoadStore().enabled;
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
});
</script>
