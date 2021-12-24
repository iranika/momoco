<template>
  <div class="viewer-content" v-scroll="scrolled">
    <div
      centered
      style="text-align:center; padding:10px"
      v-if="Math.min.apply(null, show) > 0"
    >
      <q-btn size="x-small" color="white" class="text-black" @click="beforeContent" rounded>▲前のお話▲</q-btn>
    </div>
    <div v-for="i in show" :key="i">
      <img
        v-for="(_,j) in pages[i].ImagesUrl"
        :key="j"
        :src="pages[i].ImagesUrl[j].replace('/ja/','/ja/webp/').replace('.jpg','.webp')"
        style="width:100%;"
      />
    </div>

    <div centered style="text-align:center; padding:10px">
      <q-btn
        rounded
        size="x-small"
        v-on:click="addContent()"
        color="white"
        class="text-black"
        v-if="pages.length - 1 > Math.max.apply(null, show)"
      >▼続きを表示▼</q-btn>
    </div>
  </div>
</template>

<style scoped>
.viewer-content {
  max-width: 1280px;
  margin: 0 auto 0 auto;
}

.btn {

}

</style>

<script lang="ts">
import { debounce } from 'quasar';
import { defineComponent, ref, watch } from 'vue';

interface Page {
    Title: string;
    ImagesUrl: Array<string>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
    pageData: Array<Page>;
}

export default defineComponent({
  // name: 'ComponentName'
  props:{
    page:{
      type: String,
      default: '1'
    },
    lang:{
      type: String,
      default: 'ja'
    }
  },

  setup(props){
    //TODO: Twitterボタン
    //TODO: MEMO
    //TODO: Bookmark

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pages = window.pageData;
    var show = ref<Array<number>>(initShow(props.page));

    function addContent(addnum = 1){
      if (pages.length -1 > Math.max.apply(null, show.value)){
        show.value.push(Math.max.apply(null, show.value) + addnum);
      }else{
        console.log('viewerContent info: show.length is over pages.length');
      }
    }

    function beforeContent() {
      if (Math.min.apply(null, show.value) > 0) {
        show.value.unshift(Math.min.apply(null, show.value) - 1);
      } else {
        console.log('viewerContent info: can not show page under 0');
      }
    }
    function bottomVisible() {
      const scrollY = window.scrollY;
      const visible = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY + 2 >= pageHeight; // +2 is margin
      //console.log("bottomVisible is fired", {scrollY, visible, pageHeight, bottomOfPage})
      return bottomOfPage || pageHeight < visible;
    }

    const scrolled = debounce(() => {
      if (bottomVisible()){
        addContent()
      }
    }, 300)

    function initShow(page: string){
      const pageInt = parseInt(page)
      if (page === "latest"){
        return [pages.length -1]
      }else if (0 < pageInt && pageInt <= pages.length){
        return [Number(page) -1]
      }else if (pageInt <= 0){
        return [0]
      }else {
        return [0]
        console.log("?page query is unknown value");
      }
    }

    watch(
      ()=> props.page,
      (page, prevPage) => {
        show.value = initShow(page)
      },
      { deep: true }
    )

    return {
      pages,
      show,
      addContent,
      beforeContent,
      scrolled
    }
  },
  methods:{
  }
})
</script>
