<template>
  <q-page padding>
    <q-table
      title="びゅあー検索㌼"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs"
      :rows="searchStore.products.value"
      :columns="columns"
      row-key="No"
      :filter="filter"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :pagination="pagenation"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useSearchStore } from 'src/stores/SearchStore';

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

const rows = [
  {
    No: 1,
    Title: '都会派',
    Charactors: ['せり','すずな'],
    Keyword: ['きっぷ','お婆ちゃん'],
    Comment: 'きっぷが買えるなんてずなちゃんは都会派だね！',
    Link: ''
  },
  {
    No: 2,
    Title: '隣町より遠く/手渡し',
    Charactors: ['せり','すずな','しろ'],
    Keyword: ['きっぷ','電車'],
    Comment: 'ずなちゃんかわいいね',
    Link: ''
  },
]

export default defineComponent({
  // name: 'PageName'
  setup(){
    const navigationActive = ref(false)
    const pagination = ref({})
    const selected = ref([])
    const searchStore = useSearchStore()
    return {
      columns,
      rows,
      searchStore,
      navigationActive,
      selected,
      pagination,
      tableRef: ref(null),
      filter: ref(''),
      pagenation: ref({}),
      tableClass: computed(()=> navigationActive.value === true ? 'shadow-8 no-outline' : null),
      getSelectedString(){
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      }
    }
  }
})
</script>
