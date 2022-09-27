<template>
  <q-page padding>
    <q-card class="chara-card q-mx-auto">
      <q-card-section>
        <div class="text-h5" style="margin: 10px auto 10px auto;">登場人物の紹介</div>
        ※いらにかの主観で書かれています。
      </q-card-section>
      <q-card-section>
        <q-btn round fab-mini padding="xs" v-for="(_, i) in chara" :key="i" :to="'/charactor/' + chara[i].name">
          <q-avatar><img style="width:100%;" :src="chara[i].icon" /></q-avatar>
        </q-btn>
        <q-btn round fab-mini padding="xs" to="/charactor/all">
          <q-avatar>All</q-avatar>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <div v-for="(_, i) in chara" :key="i">
          <q-card flat v-if="name == chara[i].name || name == 'all'">
            <q-card-section>
              <div class="text-h6" style="margin: 10px auto 10px auto;">{{ chara[i].namae }}</div>
              CV:<label v-html="chara[i].cv"></label>
            </q-card-section>
            <q-card-section class="text-subtitle2" v-text="chara[i].text" style="white-space:pre-wrap;">
            </q-card-section>
            <q-card-section>
              <q-expansion-item
                class="text-center"
                label="関連作品"
                style="background-color:#f7f7f7;"
              >
                <q-card class="text-left">
                  <q-card-section>
                    クリックすると作品ページに飛べます
                  </q-card-section>
                  <q-card-section>
                    <div v-for="content in chara[i].contents" :key="content" style="margin-bottom:4px;">
                      <div v-html="content"></div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div style="mergin-bottom:10px;">メイン出演</div>
                    <div v-for="mainProd in getProductsBanner(chara[i].cvArray, 'mainAct')" :key="mainProd">
                      <div v-html="mainProd" class="panel"></div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div style="mergin-bottom:10px;">サブ出演</div>
                    <div v-for="subProd in getProductsBanner(chara[i].cvArray, 'subAct')" :key="subProd">
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
.chara-card{
  width: 96%;
  max-width: 700px;
}
.panel a img {
  width: 100%;
}

</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useProductStore from 'src/stores/ProductStore';

const chara = [
  {
    name: 'seri',
    namae: 'せり/せりさん',
    cv: '雁庵うずめ',
    cvArray: ['雁庵うずめ'],
    icon: '/img/charactor/seri-205.jpg',
    text: '道草屋の女将。\nお母さんのような存在。お茶目で乙女。\nおしゃべり好きでトークスキルが高く、怪談話が得意。\nお酒好きで、酔うと絡んでくる。\n耳飾りは着脱式。住み込みのしろさん・ずなちゃんと一緒に道草屋で暮らしている。\n芹は春の七草のひとつ。',
    contents: [
      'せりさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2ydtFT3cSDbvJX75Fmgpb3K6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    ]
  },
  {
    name: 'suzusiro',
    namae: 'すずしろ/しろさん',
    icon: '/img/charactor/suzusiro-241.jpg',
    cv: '餅よもぎ→<a href="https://twitter.com/hiyori_voice">御崎ひより</a>→三月',
    cvArray: ['餅よもぎ','御崎ひより'],
    text: 'せりさんの世話係。\n三番目に道草屋歴が長い。道草屋の働き者。\nせりさん、ずなちゃんと一緒に暮らしている。\n湿気で癖毛の髪がもじゃるのが悩み。梅雨は大敵。\n花粉も大敵。あとお腹のお肉も大敵…\n春の七草のすずしろは、大根の別名。',
    contents: [
      'しろさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yeRJUxBt4Ea-pXXL8L8TUQZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]
  },
  {
    name: 'suzuna',
    namae: 'すずな/ずなちゃん',
    cv: '<a href="https://twitter.com/toudourenge">藤堂れんげ</a>',
    cvArray: ['藤堂れんげ'],
    icon: '/img/charactor/suzuna-177.jpg',
    text: '道草屋の可愛い代表。私服がちょっとダサ可愛いのも魅力のひとつ。\n真面目な良い子で沢山の人から愛されている。\n出身は北海道。祖母の伝手で道草屋で働きはじめた。\n今はせりさん、しろさんと一緒に暮らしている。\n最年少ゆえ世間知らずな一面もあるが、田舎における生活スキルが高く無人販売所を使いこなす田舎暮らしのプロ。\n実は能力保持者で、霊感だけでなく優位性アピール無力化（ドヤ顔キャンセル）など稀有な能力を持っている可能性がある[要出典]。\n春の七草の菘(すずな)は、カブの別名',
    contents: [
      'ずなさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yexGT79Qa4g0J450CKGuvtz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    ]
  },
  {
    name: 'hakobera',
    namae: 'はこべら/はこさん',
    icon: '/img/charactor/hako-256.jpg',
    cv: '藤村咲樹→<a href="https://twitter.com/kotoka_11_28">琴香</a>',
    cvArray: ['藤村咲樹","琴香"'],
    text: '道草屋のエッチなお姉さん。\nせりさんと幼馴染で二番目に道草屋歴が長い。\n丁寧な言葉遣いとは裏腹に悪戯好き。ずなちゃんと旦那様がよく悪戯の被害を受けている。\n最近は、なっちゃんもよく被害にあっているとか。\nバイク乗りで愛車を褒めると心を開いてくれるらしい。\nはこべらは春の七草のひとつ。ナデシコ科ハコベ属（Stellaria）。',
    contents: [
      'はこさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yedk4HUf0oUOPVuhfeXirnm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]
  },
  {
    name: 'ine',
    namae: 'いね/いねさん',
    cv: '<a href="https://twitter.com/hinyanm">真宮ひいろ</a>',
    cvArray: ['真宮ひいろ'],
    icon: '/img/charactor/ine-177.jpg',
    text: 'いつも眠そうでこちらまで眠くなる（癒し）\nたびさんとは同級生。\nめんどくさがりだけど根は真面目でしっかり働く。\nおせち大会で何度も優勝する強者だが料理は得意ではない。\n審査員の心をつかむテクニックが成せる技だ。\n実はツッコミが上手。サボテンとアロエ（名はルサンチマン）を育てている。\nイネ科イネ属の稲は現代の七草に数えられないが、七草粥にはお米として入っている。',
    contents: [
      'いねさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2ydScUTbTcXcQqzZwuQn88TG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]
  },
  {
    name: 'tabirako',
    namae: 'たびらこ/たびさん',
    cv: '<a href="https://twitter.com/aiedakyoko">愛枝今日子</a>',
    cvArray: ['愛枝今日子'],
    icon: '/img/charactor/tabirako-185.jpg',
    text: 'いねさんとは同級生。\nいねさんのお世話が大好きで、まるで保護者。\n溢れ出る母性のせいか奥様と間違われたことがある。\n道草屋と実家のうどん屋を掛け持ちしているワーカーホリックで、うどんへの信頼と情熱がすごい。\n鉄瓶を育てるのが上手。私服がちょっとダサ可愛いのも魅力の一つ。\n春の七草のほとけのざの別名がオニタビラコ。\n鬼のようなたびさんは見たことがない。',
    contents: [
      'たびさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yc-mFTjtErv4DF9YO0rj665" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]
  },
  {
    name: 'inoko',
    namae: 'いのこ/うりちゃん',
    cv: '<a href="https://twitter.com/hako_noah">箱河ノア</a>',
    cvArray: ['箱河ノア'],
    icon: '/img/charactor/inoko-251.jpg',
    text: '名はいのこだが通称うりちゃん。ずなちゃんと仲良し。\n独特な敬語を使う。活発でずる賢いが、おかげで痛い目にもあっている。\n欲しいものを買うために道草屋で働き始め、一度退職したがとある理由で再就職したバイト戦士。\nはこさんから譲り受けたチョイノリ（原付）に乗っていたが、祖父の伝手でトリッカー（普通二輪）を譲り受けて乗り回している。\n夏の七草の猪子槌（いのこづち）に由来。',
    contents: [
      'いのこさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yfRdhG6DHOxA-MG2Ziduz8j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]
  },
  {
    name: 'natuna',
    namae: 'なつな/なっちゃん',
    icon: '/img/charactor/natuna-250.jpg',
    cv: '<a target="_blank" href="https://twitter.com/tanba_usa">丹羽うさぎ</a>',
    cvArray: ['丹羽うさぎ'],
    text: '道草屋のお客さん。苗字は橘。元社畜。\nいねさん・たびさんと同級生で、小学三年生に転校してから約15年ぶり？に村に帰ってきた。\n生粋のカフェインジャンキー。好きな珈琲豆はそこにあるやつ（なんでもいい）。\nいねさんのおかげで道草屋の電話番ができるが、彼女は従業員ではなく客だということを忘れてはならない。\n春の七草のなずなは夏には枯れることから「夏無（なつな）」から変化した説がある[要出典]。',
    contents: [
      'なっちゃんさんぷる',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yd2ErdrZWRF2eKj4uoR500x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    ]
  }
];
    

export default defineComponent({
  // name: 'PageName'

  props:{
    name: String
  },
  data(){
    return {
      db: useProductStore().db
    }
  },
  computed:{
  },
  setup(){
    const db = useProductStore().db;

    const getProductsBanner = computed(()=>{
      return function(cvArray: Array<string>, prodType = 'mainAct'){
        let charaProdcts = db.products.filter(v => cvArray.some(cv => prodType == 'mainAct' ? v.mainAct.includes(cv) : v.subAct.includes(cv)));
        return charaProdcts.map(v => v.banner)
      }
    })

    return {
      getProductsBanner,
      chara,
      // eslint-disable-next-line vue/no-dupe-keys
      db
    }
  }
  
})
</script>
