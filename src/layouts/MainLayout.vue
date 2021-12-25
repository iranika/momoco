<template>
  <q-layout view="lHr lpR lfr">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <div class="bg-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-space />
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

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header>みちくさびゅあー</q-item-label>
          <template v-for="list in linksList" :key="list">
            <q-item clickable v-ripple :to="list.link" :disable="list.disable">
              <q-item-section avatar>
                <q-icon :name="list.icon" />
              </q-item-section>

              <q-item-section>
                {{ list.disable ? $t(list.title) + " : WIP" : $t(list.title) }}
              </q-item-section>
            </q-item>  
          </template>
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

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <UpdateNofity />
    <Footer />
  </q-layout>
</template>

<style scoped>
.bg-header{
  background: linear-gradient(to top right, rgba(194, 174, 1, 0.8), rgba(14, 160, 106, 0.2)), url("https://mo4koma.iranika.info/top/top.webp") center center / cover no-repeat;
  /*background: linear-gradient(to top right, rgba(12, 121, 189, 0.8), rgba(14, 160, 106, 0.2)), url("https://mo4koma.iranika.info/top/top.webp") center center / cover no-repeat; */

}
</style>


<script lang="ts">
import { defineComponent, ref, } from 'vue';
import UpdateNofity from 'components/UpdateNotify.vue';
import Footer from 'components/Footer.vue';
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
    title: 'search-kun' ,
    caption: 'github.com/quasarframework',
    icon: 'info',
    link: '/search',
    disable: false
  },
  {
    title: 'products' ,
    caption: 'github.com/quasarframework',
    icon: 'book',
    link: '/products',
    disable: false
  },
  {
    title: 'timeline',
    caption: 'chat.quasar.dev',
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
  {
    title: 'mypage',
    caption: '',
    icon: 'help',
    link: '/mypage',
    disable: true
  },
  
];

export default defineComponent({
  components:{
    UpdateNofity,
    Footer,
    //LeftMenuList
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
//    const tabs = ref('home')

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      linksList
  //    tabs
    }
  }
})
</script>