<template>
  <q-layout view="lHr lpR lfr">

    <q-header reveal elevated reveal-offset="10" class="bg-primary text-white">
      <div class="bg-header">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-space />
          <!-- Bookmark menu -->
          <q-btn dense flat round icon="book">
            <q-menu>
              <q-list padding>
                <q-item-label header>しおり</q-item-label>
                <q-item class="text-black" v-for="val in bookmarkStore.bookmarks.value.sort((a,b)=> Number(a) - Number(b) )" :key="val" :to="getPageUrl(Number(val))">
                  <q-item-section>第{{ val }}話</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- LeftDrawer Button -->
          <q-btn dense flat round icon="more_vert" @click="toggleRightDrawer"/>
        </q-toolbar>
        <q-toolbar inset>
          <q-toolbar-title style="margin-left: 1em">みちくさびゅあー</q-toolbar-title>
        </q-toolbar>
        <q-toolbar inset>
          <q-tabs>
            <q-route-tab to="/" label="Home" exact />
            <q-route-tab to="/?page=latest" label="Latest" exact/>
            <q-route-tab to="/charactor" label="Charactor" exact/>
          </q-tabs>
        </q-toolbar>
      </div>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered behavior="mobile">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header caption>みちくさびゅあー</q-item-label>
          <template v-for="list in linksList" :key="list">
            <q-item clickable v-ripple :to="list.link" :disable="list.disable" exact>
              <q-item-section avatar>
                <q-icon :name="list.icon" />
              </q-item-section>
              <q-item-section>
                {{ list.disable ? $t(list.title) + " : WIP" : $t(list.title) }}
              </q-item-section>
            </q-item>  
          </template>
          <q-item-label header caption>みちくさやのあぷり</q-item-label>
          <template v-for="list in nikaLinkList" :key="list">
            <q-item clickable @click="openURL(list.link)" :disable="list.disable">
              <q-item-section avatar>
                <q-icon :name="list.icon" />
              </q-item-section>
              <q-item-section>
                {{ list.disable ? $t(list.title) + " : WIP" : list.title }}
              </q-item-section>
            </q-item>
          </template>
          <q-item-label header caption>外部リンク</q-item-label>
          <template v-for="list in extLinkList" :key="list">
            <q-item clickable @click="openURL(list.link)" :disable="list.disable">
              <q-item-section avatar>
                <q-icon :name="list.icon" />
              </q-item-section>
              <q-item-section>
                {{ list.disable ? $t(list.title) + " : WIP" : list.title }}
              </q-item-section>
            </q-item>
          </template>
          <q-separator></q-separator>
          <q-item clickable v-ripple @click="toggleLeftDrawer">
            <q-item-section avatar>
              <q-icon name="chevron_left" />
            </q-item-section>
            <q-item-section>
              {{ $t("collapse") }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

    </q-drawer>

    <!-- right drawer -->
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered width="240" behavior="mobile">
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable style="margin-top: 10px;" to="/search">
            <q-item-section>詳細検索をひらく</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input dense label="検索" v-model="searchText"></q-input>
            </q-item-section>
          </q-item>
          <q-item clickable class="text-black" v-for="(_, i) in pageData" :key="i" :to="getPageUrl(getRightIndex(i))" v-show="isFiltered(pageData[i].Title, i)">
            <q-item-section>{{ pageData[i].Index }}.{{ pageData[i].Title }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<style scoped>
.bg-header{
  background: v-bind(backimg);
  /*background: linear-gradient(to top right, rgba(12, 121, 189, 0.8), rgba(14, 160, 106, 0.2)), url("https://mo4koma.iranika.info/top/top.webp") center center / cover no-repeat; */
}
</style>


<script lang="ts">
import { defineComponent, ref, } from 'vue';
import Footer from 'components/Footer.vue';
import { useBookmarkStore } from 'src/stores/LocalStorage';
import { openURL } from 'quasar';

const linksList = [
  {
    title: 'home',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/',
    disable: false
  },
  {
    title: 'latest' ,
    caption: '',
    icon: 'create',
    link: '/?page=latest',
    disable: false
  },
  {
    title: 'charactor' ,
    caption: 'charactor',
    icon: 'info',
    link: '/charactor',
    disable: false
  },
  {
    title: 'timeline',
    caption: '',
    icon: 'info',
    link: '/timeline',
    disable: false
  },
  {
    title: 'about',
    caption: '',
    icon: 'help',
    link: '/about',
    disable: false
  },
];

const extLinkList = [
  {
    title: 'DLsiteのページ',
    icon: 'home',
    link: 'https://www.dlsite.com/home/dlaf/=/aid/movue/url/https%3A%2F%2Fwww.dlsite.com%2Fmaniax%2Fcircle%2Fprofile%2F%3D%2Fmaker_id%2FRG24350.html%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dtext',
    disable: false
  },
  {
    title: 'BOOTHのページ',
    icon: 'home',
    link: 'https://www.dlsite.com/home/dlaf/=/aid/movue/url/https%3A%2F%2Fwww.dlsite.com%2Fmaniax%2Fcircle%2Fprofile%2F%3D%2Fmaker_id%2FRG24350.html%2F%3Futm_medium%3Daffiliate%26utm_campaign%3Dbnlink%26utm_content%3Dtext',
    disable: false
  },
  {
    title: 'お土産売り場(BOOTH)',
    icon: 'home',
    link: 'https://momotori.booth.pm/item_lists/rBkTe4Bm',
    disable: false
  },
  {
    title: '桃色CODE',
    icon: 'home',
    link: 'http://momoirocode.web.fc2.com/',
    disable: false
  },
  {
    title: '雑記的な(ブログ)',
    icon: 'home',
    link: 'http://blog.livedoor.jp/kai_tyou/',
    disable: false
  },
];

const nikaLinkList = [
  {
    title: 'みちくさでんわ',
    icon: 'home',
    link: 'http://blog.livedoor.jp/kai_tyou/',
    disable: true
  },
  {
    title: '道草恋歌',
    icon: 'apps',
    link: 'https://michikusa-renka.glideapp.io/',
    disable: false
  },
  {
    title: 'Nikaスタンプβ',
    icon: 'apps',
    link: 'https://stamp.iranika.info/#/',
    disable: false
  },
]

export default defineComponent({
  components:{
    Footer,
    //LeftMenuList
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const searchText = ref('')
    const pageData = window.pageData
    const bookmarkStore = useBookmarkStore()

    function getRightIndex(index: number){
      const ZureMin = 3;
      const ZureMax = 79;
      if (ZureMin <= index && index < ZureMax){
        return index + 2
      }else if(index == 79){
        return 'ri'
      }else{
        return index + 1
      }
    }
    function getPageUrl(index: number | string){
      if (index == 'ri'){
        return '/?page=rireki1' 
      }else{
        return `/?page=${(index).toString()}`;
      }
    }

    function isFiltered(title:string, index:number){
      const num = index + 1;
      return `${num}.${title}`.toString().includes(searchText.value)
    }

    return {
      extLinkList,
      linksList,
      nikaLinkList,
      getPageUrl,
      getRightIndex,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      pageData,
      searchText,
      isFiltered,
      bookmarkStore,
      openURL,
      backimg: 'linear-gradient(to top right, rgba(194, 174, 1, 0.8), rgba(14, 160, 106, 0.2)), url("https://mo4koma.iranika.info/top/top.webp") center center / cover no-repeat'
    }
  }
})
</script>