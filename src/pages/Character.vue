<template>
  <q-page padding>
    <q-card class="chara-card q-mx-auto">
      <q-card-section>
        <div class="text-h5" style="margin: 10px auto 10px auto">登場人物の紹介</div>
        ※いらにかの主観で書かれています。
      </q-card-section>
      <q-card-section>
        <q-btn
          round
          fab-mini
          padding="xs"
          v-for="c in chara"
          :key="c.name"
          :to="'/character/' + c.name"
        >
          <q-avatar><img style="width: 100%" :src="c.icon" /></q-avatar>
        </q-btn>
        <q-btn round fab-mini padding="xs" to="/character/all">
          <q-avatar>All</q-avatar>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <div v-for="c in chara" :key="c.name">
          <q-card flat v-if="name == c.name || name == 'all'">
            <q-card-section>
              <div class="text-h6" style="margin: 10px auto 10px auto">{{ c.namae }}</div>
              CV:<label v-html="c.cv"></label>
            </q-card-section>
            <q-card-section class="text-subtitle2" style="white-space: pre-wrap">
              {{ c.text }}
            </q-card-section>
            <q-card-section>
              <q-expansion-item
                class="text-center"
                label="関連作品"
                style="background-color: #f7f7f7"
              >
                <q-card class="text-left">
                  <q-card-section> クリックすると作品ページに飛べます </q-card-section>
                  <q-card-section>
                    <div v-for="content in c.contents" :key="content" style="margin-bottom: 4px">
                      <div v-html="content"></div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div style="mergin-bottom: 10px">メイン出演</div>
                    <div
                      v-for="mainProd in getProductsBanner(c.cvArray, 'mainAct')"
                      :key="mainProd"
                    >
                      <div v-html="mainProd" class="panel"></div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div style="mergin-bottom: 10px">サブ出演</div>
                    <div v-for="subProd in getProductsBanner(c.cvArray, 'subAct')" :key="subProd">
                      <div v-html="subProd" class="panel"></div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
    <!-- content -->
  </q-page>
</template>

<style>
.chara-card {
  width: 96%;
  max-width: 700px;
}
.panel a img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 300 / 142;
}
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useProductStore } from 'src/stores/ProductStore';
import { characters as chara } from 'src/data/characters';

export default defineComponent({
  // name: 'PageName'

  props: {
    name: String,
  },
  computed: {},
  setup() {
    const productStore = useProductStore();

    const getProductsBanner = computed(() => {
      return function (cvArray: Array<string>, prodType = 'mainAct') {
        const charaProdcts = productStore.products.filter((v) =>
          cvArray.some((cv) =>
            prodType == 'mainAct' ? v.mainAct.includes(cv) : v.subAct.includes(cv),
          ),
        );
        return charaProdcts.map((v) => v.banner);
      };
    });

    return {
      getProductsBanner,
      chara,
    };
  },
});
</script>
