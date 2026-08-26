<template>
  <div class="footer-ads">
    <div class="footer-ads__notice">
      <q-badge color="orange-8" text-color="white" label="MOCK" />
      <span>フッター広告枠のモックです。DLsite / 出品の本番配信は未接続です。</span>
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
        <header class="ad-frame__head">
          <div class="ad-frame__label">DLsite 選出作品</div>
          <div class="ad-frame__sub">道草屋まわりからピックアップした作品枠（ダミー）</div>
        </header>
        <div class="work-list">
          <a
            v-for="work in dlsiteWorks"
            :key="work.id"
            class="work-card"
            :href="work.href"
            :title="work.title"
          >
            <div class="work-card__cover" :style="{ background: work.coverTone }">
              <span>{{ work.coverLabel }}</span>
            </div>
            <div class="work-card__body">
              <div class="work-card__maker">{{ work.maker }}</div>
              <div class="work-card__title">{{ work.title }}</div>
              <div class="work-card__price">{{ work.price }}</div>
            </div>
          </a>
        </div>
      </section>

      <section v-show="!isNarrow || activeTab === 'listing'" class="ad-frame" aria-label="出品・広告枠">
        <header class="ad-frame__head">
          <div class="ad-frame__label">出品・広告枠</div>
          <div class="ad-frame__sub">広告を出したい方向けの掲載スロット（ダミー）</div>
        </header>
        <div class="listing-list">
          <article
            v-for="slot in listingSlots"
            :key="slot.id"
            class="listing-slot"
            :class="{ 'listing-slot--vacant': slot.vacant }"
          >
            <template v-if="!slot.vacant">
              <a class="listing-slot__link" :href="slot.href" target="_blank" rel="noopener noreferrer">
                <div class="listing-slot__kicker">掲載中</div>
                <div class="listing-slot__title">{{ slot.title }}</div>
                <div class="listing-slot__meta">{{ slot.advertiser }}</div>
                <div class="listing-slot__note">{{ slot.note }}</div>
              </a>
            </template>
            <template v-else>
              <div class="listing-slot__vacant-body">
                <div class="listing-slot__kicker">空き枠</div>
                <div class="listing-slot__title">あなたの作品・告知をここに</div>
                <div class="listing-slot__note">{{ slot.note }}</div>
                <q-btn
                  unelevated
                  color="primary"
                  size="sm"
                  label="出品について（モック）"
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
  margin: 0 auto 12px;
}

.footer-ads__notice {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #555;
  margin-bottom: 10px;
}

.footer-ads__tabs {
  margin-bottom: 8px;
}

.footer-ads__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.footer-ads__grid--stacked {
  grid-template-columns: 1fr;
}

.ad-frame {
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  min-height: 168px;
}

.ad-frame__head {
  margin-bottom: 8px;
}

.ad-frame__label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.ad-frame__sub {
  font-size: 11px;
  color: #666;
}

.work-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.work-card {
  flex: 0 0 92px;
  width: 92px;
  color: inherit;
  text-decoration: none;
}

.work-card__cover {
  width: 92px;
  height: 92px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.work-card__body {
  margin-top: 4px;
}

.work-card__maker {
  font-size: 10px;
  color: #888;
}

.work-card__title {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.work-card__price {
  font-size: 11px;
  color: #c45c22;
  font-weight: 700;
}

.listing-list {
  display: grid;
  gap: 8px;
}

.listing-slot {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fafafa;
  min-height: 72px;
}

.listing-slot--vacant {
  border-style: dashed;
  background: repeating-linear-gradient(
    -45deg,
    #fff,
    #fff 6px,
    #f3f3f3 6px,
    #f3f3f3 12px
  );
}

.listing-slot__link,
.listing-slot__vacant-body {
  display: block;
  padding: 8px 10px;
  color: inherit;
  text-decoration: none;
}

.listing-slot__kicker {
  font-size: 10px;
  color: #1976d2;
  font-weight: 700;
}

.listing-slot--vacant .listing-slot__kicker {
  color: #888;
}

.listing-slot__title {
  font-size: 13px;
  font-weight: 700;
}

.listing-slot__meta {
  font-size: 11px;
  color: #666;
}

.listing-slot__note {
  font-size: 11px;
  color: #777;
  margin: 2px 0 6px;
}
</style>
