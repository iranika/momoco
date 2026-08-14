<template>
  <q-page padding>
    <div>
      <q-timeline color="secondary" :layout="layout">
        <template v-for="(product, i) in db.products" :key="i">
          <q-timeline-entry :side="i % 2 == 0 ? 'right' : 'left'">
            <template v-slot:title>
              <div class="text-subtitle1 text-bold">
                {{ product.title }}
              </div>
            </template>
            <template v-slot:subtitle>
              {{ product.release }}
            </template>
            <img
              :src="product.img"
              width="500"
              height="237"
              style="
                display: block;
                width: 100%;
                max-width: 500px;
                height: auto;
                aspect-ratio: 500 / 237;
              "
            />
            <div>
              <q-btn type="a" flat :href="product.dalf">作品詳細（外部に移動します）</q-btn>
            </div>
          </q-timeline-entry>
        </template>
        <q-timeline-entry v-if="db.products.length != 0">
          <template v-slot:title>
            <div class="text-subtitle1 text-bold">Now waiting -> next...</div>
          </template>
          <template v-slot:subtitle>
            {{ date.formatDate(Date(), 'YYYY/MM/DD') }}
          </template>
        </q-timeline-entry>
        <q-timeline-entry v-else>
          <template v-slot:title>
            <div class="text-subtitle1 text-bold">Now loading memories...</div>
          </template>
          <template v-slot:subtitle>
            {{ date.formatDate(Date(), 'YYYY/MM/DD') }}
          </template>
        </q-timeline-entry>
      </q-timeline>
    </div>
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
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        size="small"
        round
        @click="scrollBottom()"
        icon="keyboard_arrow_down"
        color="white"
        class="text-black"
      />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useProductStore from 'src/stores/ProductStore';
import { useQuasar, date } from 'quasar';

export default defineComponent({
  // name: 'PageName'

  setup() {
    const db = useProductStore().db;
    const $q = useQuasar();
    const layout = computed(() => {
      return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose';
    });

    return {
      db,
      layout,
      date,
    };
  },
  methods: {
    scrollTop() {
      scrollTo(0, 0);
    },
    scrollBottom() {
      scrollTo(0, document.documentElement.scrollHeight);
    },
  },
});
</script>
