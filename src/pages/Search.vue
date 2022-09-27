<template>
  <q-page padding>
    <q-table
      title="びゅあー検索㌼"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs"
      :rows="searchStore.products.value"
      :columns="columns"
      row-key="No"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :pagination="pagenation"
      :filter-method="filterMethod"
      filter="filter"
      style="max-width: 900px; margin: 0 auto;"
    >
      <template v-slot:top-left>
        <div class="text-h5" style="margin-top:5px;">びゅあー検索くん㌼</div>
        <div>
          <q-btn round push size="sm" v-for="(_, i) in chara" :key="i" @click="clickAvator(i)">
            <q-avatar><img style="width:100%;" :src="chara[i].icon" /></q-avatar>
          </q-btn>
        </div>
      </template>
      <template v-slot:top-right>
        <q-btn label="クリア" flat @click="filter = ''"></q-btn>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" filled>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-Link="props">
        <q-td :props="props">
          <q-btn dense flat size="sm" icon="arrow_forward_ios" :to="`/?page=${props.row.No}`"></q-btn>
        </q-td>          
      </template>
    </q-table>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useSearchStore, SearchDB } from 'src/stores/SearchStore';

const chara = 
  [
    {
      name: 'seri',
      namae: 'せり',
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
      namae: 'すずしろ',
      icon: '/img/charactor/suzusiro-241.jpg',
      cv: '餅よもぎ→<a href="https://twitter.com/hiyori_voice">御崎ひより</a>',
      cvArray: ['餅よもぎ','御崎ひより'],
      text: 'せりさんの世話係。\n三番目に道草屋歴が長い。道草屋の働き者。\nせりさん、ずなちゃんと一緒に暮らしている。\n湿気で癖毛の髪がもじゃるのが悩み。梅雨は大敵。\n花粉も大敵。あとお腹のお肉も大敵…\n春の七草のすずしろは、大根の別名。',
      contents: [
        'しろさんぷる',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yeRJUxBt4Ea-pXXL8L8TUQZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      ]
    },
    {
      name: 'suzuna',
      namae: 'すずな',
      cv: '<a href="https://twitter.com/toudourenge">藤堂れんげ</a>',
      cvArray: ['藤堂れんげ'],
      icon: '/img/charactor/suzuna-177.jpg',
      text: '道草屋の可愛い代表。私服がちょっとダサ可愛いのも魅力のひとつ。\n真面目な良い子で沢山の人から愛されている。\n出身は北海道。祖母の伝手で道草屋で働きはじめた。今はせりさん、しろさんと一緒に暮らしている。\n最年少ゆえ世間知らずな一面もあるが、田舎における生活スキルが高く無人販売所を使いこなす田舎暮らしのプロ。\n実は能力保持者で、霊感だけでなく優位性アピール無力化（ドヤ顔キャンセル）など稀有な能力を持っている可能性がある[要出典]。\n春の七草の菘(すずな)は、カブの別名',
      contents: [
        'ずなさんぷる',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yexGT79Qa4g0J450CKGuvtz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      ]
    },
    {
      name: 'hakobera',
      namae: 'はこべら',
      icon: '/img/charactor/hako-256.jpg',
      cv: '藤村咲樹→<a href="https://twitter.com/kotoka_11_28">琴香</a>',
      cvArray: ['藤村咲樹","琴香"'],
      text: '道草屋のエッチなお姉さん。\nせりさんと幼馴染で二番目に道草屋歴が長い。\n丁寧な言葉遣いとは裏腹に悪戯好き。ずなちゃんと旦那様がよく悪戯の被害を受けている。\nバイク乗りで愛車を褒めると心を開く（ちょろい）。',
      contents: [
        'はこさんぷる',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yedk4HUf0oUOPVuhfeXirnm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      ]
    },
    {
      name: 'ine',
      namae: 'いね',
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
      namae: 'たびらこ',
      cv: '<a href="https://twitter.com/aiedakyoko">愛枝今日子</a>',
      cvArray: ['愛枝今日子'],
      icon: '/img/charactor/tabirako-185.jpg',
      text: 'いねさんとは同級生。\nいねさんのお世話が大好きで、まるで保護者。\n溢れ出る母性のせいか奥様と間違われたことがある。\n道草屋と実家のうどん屋を掛け持ちしているワーカーホリックで、うどんへの信頼と情熱がすごい。\n鉄瓶を育てるのが上手。私服がちょっとダサ可愛いのも魅力の一つ。\n春の七草のほとけのざの別名がオニタビラコ。',
      contents: [
        'たびさんぷる',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yc-mFTjtErv4DF9YO0rj665" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      ]
    },
    {
      name: 'inoko',
      namae: 'いのこ',
      cv: '<a href="https://twitter.com/hako_noah">箱河ノア</a>',
      cvArray: ['箱河ノア'],
      icon: '/img/charactor/inoko-251.jpg',
      text: '名はいのこだが通称うりちゃん。\n独特な敬語を使う。活発だが圧倒的に運がない。\nずる賢いが、おかげで痛い目にもあっている。\n欲しいものを買うために道草屋で働き始めて、一度は退職したがとある理由で再就職したバイト戦士。\nはこさんから譲り受けたチョイノリ（原付）に乗っていたが、祖父の伝手でトリッカー（普通二輪）を譲り受けて乗り回している。\n夏の七草の猪子槌（いのこづち）に由来。',
      contents: [
        'いのこさんぷる',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yfRdhG6DHOxA-MG2Ziduz8j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      ]
    },
    {
      name: 'natuna',
      namae: 'なつな',
      icon: '/img/charactor/natuna-250.jpg',
      cv: '<a target="_blank" href="https://twitter.com/tanba_usa">丹羽うさぎ</a>',
      cvArray: ['丹羽うさぎ'],
      text: '道草屋のお客さん。苗字は橘。元社畜。\nいねさん・たびさんと同級生で、小学三年生に転校してから約15年ぶり？に村に帰ってきた。\n生粋のカフェインジャンキー。好きな珈琲豆はそこにあるやつ（なんでもいい）。\nいねさんのおかげで道草屋の電話番ができるが、彼女は従業員ではなく客だということを忘れてはならない。\n春の七草のなずなは夏には枯れることから「夏無（なつな）」から変化した説がある[要出典]。',
      contents: [
        'なっちゃんさんぷる',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yd2ErdrZWRF2eKj4uoR500x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      ]
    }
  ]

const columns = [
  {
    name: 'No',
    required: true,
    label: 'No',
    align: 'left',
    field: 'No',
    sortable: true,
  },
  { name: 'Title',
    label: 'タイトル',
    align: 'left',
    field: 'Title',
    sortable: true,
    style: 'width: 5px;'
  },
  { name: 'Charactors',
    label: 'キャラクター',
    align: 'left',
    field: 'Charactors',
    sortable: true,
    format: (val:Array<string>) => val.join(',')
  },
  { name: 'Keyword', label: 'キーワード', align: 'left', field: 'Keyword', format: (val:Array<string>) => val.join(',')},
  //{ name: 'Comment', label: 'コメント', align: 'left', field: 'Comment' },
  { name: 'Link', label: 'リンク', align: 'left', field: 'Links' }
]

export default defineComponent({
  // name: 'PageName'
  setup(){
    const navigationActive = ref(false)
    const pagination = ref({})
    const selected = ref([])
    const searchStore = useSearchStore()
    const filter = ref('')

    function clickAvator(index: number){
      if (filter.value.includes(chara[index].namae)){
        //const reg = new RegExp(chara[index].name + /,/)
        filter.value = filter.value.replace(chara[index].namae + ',', '')
        filter.value = filter.value.replace(chara[index].namae, '')
      }else{
        filter.value += chara[index].namae + ','
      }
    }
    
    const filterMethod = (rows: Array<SearchDB>)=>{
      if (rows == null || typeof rows === 'boolean') {
        console.info('rows mismatch. rows need type of SearchDB[].',rows)
        return []
      }

      if (filter.value == ''){
        return rows
      }

      let words = filter.value
        .split(/,|、/)
        .map(w => w.trim())
        .filter(x => x); //空要素をremove

      function isInclude(row: SearchDB, w: string, rebase=false){
        if (String(row.No).includes(w)) return !rebase;
        if (row.Title.includes(w)) return !rebase;
        if (row.Charactors.join(',').includes(w)) return !rebase;
        if (row.Keyword.join(',').includes(w)) return !rebase;
        if (row.Comment.includes(w)) return !rebase;
        return rebase;  
      }

      return rows.filter(row => {
        return words.every(w => {
          if (w[0] == '!'){
            //return isInclude(row, w, true)
            if (!row.Charactors.join(',').includes(w.replace('!', ''))) return true;
            return false
          }else{
            return isInclude(row, w)
          }
        })
      })
    }

    return {
      columns,
      chara,
      searchStore,
      filter,
      filterMethod,
      navigationActive,
      selected,
      pagination,
      tableRef: ref(null),
      pagenation: ref({}),
      tableClass: computed(()=> navigationActive.value === true ? 'shadow-8 no-outline' : null),
      clickAvator,
      getSelectedString(){
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${searchStore.products.value.length}`
      }
    }
  }
})
</script>
