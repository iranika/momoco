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
      <div style="display: flex; justify-content: center;">
        <TwitterShareButton :link="CreateShareLinkTwitter(i + 1, pages[i].Title)" />
        <!-- NOTE:ブックマーク機能の実装 -->
        <q-btn color="green" class="text-white" rounded size="xs"><q-icon name="book" />しおり</q-btn>
        <q-btn color="orange" class="text-white" rounded size="xs"
          v-if="db.memos[i] && db.memos[i] != null"
          v-on:click="memo = db.memos[i]; memodal = !memodal"
        >
          <q-icon name="book" />Memo
        </q-btn>
      </div>
    </div>
    <!-- メモモーダル -->
    <q-dialog v-model="memodal">
      <q-card>
        <q-card-section>
          <div class="text-h6">ひとくちメモ</div>
          <q-space></q-space>
        </q-card-section>
        <q-card-section>
          <div v-html="memo"></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn type="text" label="閉じる" v-close-popup flat v-on:click="memodal = !memodal"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import TwitterShareButton from 'components/TwitterShareButton.vue';
import useMemoStore from 'src/stores/MemoStore';

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
  components:{
    TwitterShareButton
  },
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

    const memodal = ref(false);
    const memo = ref('');

    const db = useMemoStore().db

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
      if (page === 'latest'){
        return [pages.length -1]
      }else if (0 < pageInt && pageInt <= pages.length){
        return [Number(page) -1]
      }else if (pageInt <= 0){
        return [0]
      }else {
        return [0]
        console.log('?page query is unknown value');
      }
    }
    function CreateShareLinkTwitter(num: number, title: string) {
      const tw_text = encodeURI(`第${num}話「${title}」`);
      return `https://twitter.com/intent/tweet?hashtags=%E9%81%93%E8%8D%89%E5%B1%8B&original_referer=https%3A%2F%2Fpublish.twitter.com%2F%3FbuttonText%3D%25E3%2581%2593%25E3%2581%2593%25E3%2581%2599%25E3%2581%258D%25EF%25BC%2581%25EF%25BC%2581%2523%25E3%2581%25BF%25E3%2581%25A1%25E3%2581%258F%25E3%2581%2595%25E3%2581%25B3%25E3%2582%2585%25E3%2581%2582%25E3%2583%25BC%26buttonType%3DTweetButton%26buttonUrl%3Dhttps%253A%252F%252Fmovue.iranika.info%252F%252310%26dnt%3D1%26lang%3Dja%26widget%3DButton&ref_src=twsrc%5Etfw&text=${tw_text}&tw_p=tweetbutton&url=https%3A%2F%2Fmovue.iranika.info%2F%23%2F%3Fpage%3D${num}`;
      //`<a class="tweetbtn hidden-image" href="https://twitter.com/intent/tweet?hashtags=%E9%81%93%E8%8D%89%E5%B1%8B&original_referer=https%3A%2F%2Fpublish.twitter.com%2F%3FbuttonText%3D%25E3%2581%2593%25E3%2581%2593%25E3%2581%2599%25E3%2581%258D%25EF%25BC%2581%25EF%25BC%2581%2523%25E3%2581%25BF%25E3%2581%25A1%25E3%2581%258F%25E3%2581%2595%25E3%2581%25B3%25E3%2582%2585%25E3%2581%2582%25E3%2583%25BC%26buttonType%3DTweetButton%26buttonUrl%3Dhttps%253A%252F%252Fmovue.iranika.info%252Fmo-code%252F%252310%26dnt%3D1%26lang%3Dja%26widget%3DButton&ref_src=twsrc%5Etfw&text=${tw_text}&tw_p=tweetbutton&url=https%3A%2F%2Fmovue.iranika.info%2Fmo-code%2F%23${pageNum +1}"><span class="label">ツイートする</span></a>`
    }

    watch(
      ()=> props.page,
      (page) => {
        show.value = initShow(page)
      },
      { deep: true }
    )

    return {
      memodal,
      memo,
      db,
      pages,
      show,
      addContent,
      beforeContent,
      scrolled,
      CreateShareLinkTwitter
    }
  },
  methods:{
  }
})
</script>
