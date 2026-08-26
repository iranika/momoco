<template>
  <div class="footer-ads">
    <div class="footer-ads__notice">
      <q-badge color="orange-8" text-color="white" label="MOCK" />
      <span>広告枠モック（本番未接続）・カルーセル表示</span>
    </div>

    <div class="footer-ads__grid" :class="{ 'footer-ads__grid--stacked': isNarrow }">
      <section class="ad-frame" aria-label="DLsite選出作品">
        <div class="ad-frame__head">
          <div class="ad-frame__label">DLsite 選出</div>
          <div class="ad-frame__nav">
            <q-btn
              flat
              dense
              round
              size="xs"
              icon="chevron_left"
              aria-label="前の作品"
              @click="scrollWorks(-1)"
            />
            <q-btn
              flat
              dense
              round
              size="xs"
              icon="chevron_right"
              aria-label="次の作品"
              @click="scrollWorks(1)"
            />
          </div>
        </div>
        <div ref="worksTrackEl" class="works-carousel" @scroll="onWorksScroll">
          <a
            v-for="work in dlsiteWorks"
            :key="work.id"
            class="work-slide"
            :href="work.href"
            :title="`${work.title} ${work.price}`"
          >
            <div class="work-slide__cover" :style="{ background: work.coverTone }">
              <span>{{ work.coverLabel }}</span>
            </div>
            <div class="work-slide__title">{{ work.title }}</div>
            <div class="work-slide__price">{{ work.price }}</div>
          </a>
        </div>
      </section>

      <section class="ad-frame" aria-label="出品・広告枠">
        <div class="ad-frame__head">
          <div class="ad-frame__label">出品枠</div>
          <div class="ad-frame__nav">
            <q-btn
              flat
              dense
              round
              size="xs"
              icon="chevron_left"
              aria-label="前の出品"
              @click="prevListing"
            />
            <q-btn
              flat
              dense
              round
              size="xs"
              icon="chevron_right"
              aria-label="次の出品"
              @click="nextListing"
            />
          </div>
        </div>
        <q-carousel
          v-model="listingSlide"
          class="listing-carousel"
          animated
          infinite
          :autoplay="listingAutoplay"
          transition-prev="slide-right"
          transition-next="slide-left"
          control-color="primary"
          height="76px"
          @mouseenter="listingAutoplay = 0"
          @mouseleave="listingAutoplay = 4200"
        >
          <q-carousel-slide
            v-for="slot in listingSlots"
            :key="slot.id"
            :name="slot.id"
            class="listing-slide"
          >
            <a
              v-if="!slot.vacant"
              class="listing-banner"
              :href="slot.href"
              target="_blank"
              rel="noopener noreferrer"
              :style="{ background: slot.accent }"
            >
              <div class="listing-banner__kicker">掲載中</div>
              <div class="listing-banner__title">{{ slot.title }}</div>
              <div class="listing-banner__meta">{{ slot.advertiser }}</div>
            </a>
            <div
              v-else
              class="listing-banner listing-banner--vacant"
              :style="{ background: slot.accent }"
            >
              <div class="listing-banner__kicker">空き枠</div>
              <div class="listing-banner__title">{{ slot.title }}</div>
              <q-btn
                unelevated
                color="white"
                text-color="primary"
                size="xs"
                dense
                label="出品（モック）"
                @click="guideOpen = true"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { MOCK_DLSITE_WORKS, MOCK_LISTING_SLOTS } from 'src/data/footerAdMock';

defineOptions({ name: 'FooterAdSlots' });

const $q = useQuasar();
const isNarrow = computed(() => $q.screen.lt.sm);
const guideOpen = ref(false);

const dlsiteWorks = MOCK_DLSITE_WORKS;
const listingSlots = MOCK_LISTING_SLOTS;

const worksTrackEl = ref<HTMLElement | null>(null);
const listingSlide = ref(listingSlots[0]?.id ?? '');
const listingAutoplay = ref(4200);
let worksTimer: ReturnType<typeof setInterval> | undefined;

function scrollWorks(direction: 1 | -1) {
  const el = worksTrackEl.value;
  if (!el) return;
  const step = Math.max(120, Math.floor(el.clientWidth * 0.7));
  const max = el.scrollWidth - el.clientWidth;
  const next = el.scrollLeft + direction * step;
  if (direction > 0 && next >= max - 4) {
    el.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (direction < 0 && next <= 4) {
    el.scrollTo({ left: max, behavior: 'smooth' });
  } else {
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }
}

function onWorksScroll() {
  /* reserved for future progress dots */
}

function nextListing() {
  const ids = listingSlots.map((s) => s.id);
  const i = ids.indexOf(listingSlide.value);
  listingSlide.value = ids[(i + 1) % ids.length] ?? ids[0] ?? '';
}

function prevListing() {
  const ids = listingSlots.map((s) => s.id);
  const i = ids.indexOf(listingSlide.value);
  listingSlide.value = ids[(i - 1 + ids.length) % ids.length] ?? ids[0] ?? '';
}

onMounted(() => {
  worksTimer = setInterval(() => {
    if (document.hidden) return;
    scrollWorks(1);
  }, 3800);
});

onBeforeUnmount(() => {
  if (worksTimer) clearInterval(worksTimer);
});
</script>

<style scoped>
.footer-ads {
  text-align: left;
  max-width: 960px;
  margin: 0 auto 8px;
}

.footer-ads__notice {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #555;
  margin-bottom: 6px;
}

.footer-ads__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 8px;
}

.footer-ads__grid--stacked {
  grid-template-columns: 1fr;
}

.ad-frame {
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 6px 8px 8px;
  min-width: 0;
}

.ad-frame__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.ad-frame__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.ad-frame__nav {
  display: flex;
  gap: 0;
}

.works-carousel {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-bottom: 2px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.works-carousel::-webkit-scrollbar {
  display: none;
}

.work-slide {
  flex: 0 0 72px;
  width: 72px;
  color: inherit;
  text-decoration: none;
  scroll-snap-align: start;
}

.work-slide__cover {
  width: 72px;
  height: 72px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.work-slide__title {
  margin-top: 4px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.25;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.work-slide__price {
  font-size: 10px;
  color: #c45c22;
  font-weight: 700;
}

.listing-carousel {
  border-radius: 6px;
  overflow: hidden;
  background: transparent;
}

.listing-carousel :deep(.q-carousel__slides-container),
.listing-carousel :deep(.q-carousel__slide) {
  padding: 0;
}

.listing-slide {
  padding: 0 !important;
}

.listing-banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  height: 76px;
  padding: 8px 12px;
  border-radius: 6px;
  color: #fff;
  text-decoration: none;
  box-sizing: border-box;
}

.listing-banner--vacant {
  align-items: flex-start;
}

.listing-banner__kicker {
  font-size: 10px;
  font-weight: 700;
  opacity: 0.9;
}

.listing-banner__title {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}

.listing-banner__meta {
  font-size: 11px;
  opacity: 0.9;
}
</style>
