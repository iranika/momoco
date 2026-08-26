<template>
  <div class="footer-ads">
    <div class="footer-ads__notice">
      <q-badge color="orange-8" text-color="white" label="MOCK" />
      <span>広告枠モック（本番未接続）</span>
    </div>

    <q-tabs
      v-if="isNarrow"
      v-model="activeTab"
      dense
      class="footer-ads__tabs"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="dlsite" label="DLsite選出" />
      <q-tab name="listing" label="出品枠" />
    </q-tabs>

    <div class="footer-ads__grid" :class="{ 'footer-ads__grid--stacked': isNarrow }">
      <section v-show="!isNarrow || activeTab === 'dlsite'" class="ad-frame" aria-label="DLsite選出作品">
        <div class="ad-frame__label">DLsite 選出</div>
        <div class="work-list">
          <a
            v-for="work in dlsiteWorks"
            :key="work.id"
            class="work-card"
            :href="work.href"
            :title="`${work.title} ${work.price}`"
          >
            <div class="work-card__cover" :style="{ background: work.coverTone }">
              {{ work.coverLabel }}
            </div>
            <div class="work-card__body">
              <div class="work-card__title">{{ work.title }}</div>
              <div class="work-card__price">{{ work.price }}</div>
            </div>
          </a>
        </div>
      </section>

      <section v-show="!isNarrow || activeTab === 'listing'" class="ad-frame" aria-label="出品・広告枠">
        <div class="ad-frame__label">出品枠</div>
        <div class="listing-list">
          <article
            v-for="slot in listingSlots"
            :key="slot.id"
            class="listing-slot"
            :class="{ 'listing-slot--vacant': slot.vacant }"
          >
            <template v-if="!slot.vacant">
              <a class="listing-slot__row" :href="slot.href" target="_blank" rel="noopener noreferrer">
                <span class="listing-slot__kicker">掲載中</span>
                <span class="listing-slot__title">{{ slot.title }}</span>
              </a>
            </template>
            <template v-else>
              <div class="listing-slot__row">
                <span class="listing-slot__kicker">空き枠</span>
                <span class="listing-slot__title">広告募集</span>
                <q-btn
                  unelevated
                  color="primary"
                  size="xs"
                  dense
                  label="出品（モック）"
                  @click="guideOpen = true"
                />
              </div>
            </template>
          </article>
        </div>
      </section>
    </div>

    <q-dialog v-model="guideOpen">
      <q-card style="max-width: 420px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">出品枠について（モック）</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <p class="q-mb-sm">本番ではまだ受け付けていません。流れのイメージです。</p>
          <ol class="q-pl-md">
            <li>掲載したいバナー／テキストを用意する</li>
            <li>管理者（いらにか）へ連絡する</li>
            <li>空き枠に掲載する</li>
          </ol>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            color="primary"
            type="a"
            href="https://twitter.com/happy_packet"
            target="_blank"
            rel="noopener noreferrer"
            label="連絡先（Twitter）"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { MOCK_DLSITE_WORKS, MOCK_LISTING_SLOTS } from 'src/data/footerAdMock';

defineOptions({ name: 'FooterAdSlots' });

const $q = useQuasar();
const isNarrow = computed(() => $q.screen.lt.sm);
const activeTab = ref<'dlsite' | 'listing'>('dlsite');
const guideOpen = ref(false);

const dlsiteWorks = MOCK_DLSITE_WORKS;
const listingSlots = MOCK_LISTING_SLOTS;
</script>

<style scoped>
.footer-ads {
  text-align: left;
  max-width: 960px;
  margin: 0 auto 6px;
}

.footer-ads__notice {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #555;
  margin-bottom: 4px;
}

.footer-ads__tabs {
  margin-bottom: 4px;
}

.footer-ads__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 8px;
}

.footer-ads__grid--stacked {
  grid-template-columns: 1fr;
}

.ad-frame {
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 0;
}

.ad-frame__label {
  flex: 0 0 auto;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.work-list {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  min-width: 0;
  flex: 1;
}

.work-card {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1 1 0;
  min-width: 92px;
  color: inherit;
  text-decoration: none;
}

.work-card__cover {
  width: 36px;
  height: 36px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}

.work-card__body {
  min-width: 0;
}

.work-card__title {
  font-size: 11px;
  font-weight: 600;
  line-height: 1.2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.work-card__price {
  font-size: 10px;
  color: #c45c22;
  font-weight: 700;
}

.listing-list {
  display: flex;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.listing-slot {
  flex: 1 1 0;
  min-width: 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #fafafa;
}

.listing-slot--vacant {
  border-style: dashed;
  background: #fff;
}

.listing-slot__row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  min-height: 36px;
  color: inherit;
  text-decoration: none;
}

.listing-slot__kicker {
  font-size: 10px;
  color: #1976d2;
  font-weight: 700;
  flex-shrink: 0;
}

.listing-slot--vacant .listing-slot__kicker {
  color: #888;
}

.listing-slot__title {
  font-size: 11px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
}
</style>
