<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">びゅあー検索くん㌼</div>
      </q-card-section>
      <q-card-section>
        <q-table
          ref="tableRef"
          :class="tableClass"
          tabindex="0"
          title="Treats"
          :rows="rows"
          :columns="columns"
          row-key="name"
          selection="single"
          v-model:selected="selected"
          v-model:pagination="pagination"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

const columns = [
  {
    name: 'title',
    required: true,
    label: 'タイトル',
    align: 'left',
    field: name,
    sortable: true
  },
  { name: 'charactor', align: 'center', label: '登場キャラ', field: 'charactor', sortable: true },
  { name: 'keyword', label: 'キーワード', field: 'keyword', sortable: true },
  { name: 'comment', label: 'コメント', field: 'comment' },
  { name: 'link', label: 'リンク', field: 'link' }
]

const rows = [
  { id: 1, name: 'hoge', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: '14%', iron: '1%' },
  { id: 2, name: 'hoge2', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: '8%', iron: '1%' },
  { id: 3, name: 'hoge3', calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: '6%', iron: '7%' },
  { id: 4, name: 'hoge4', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: '3%', iron: '8%' },
]

export default defineComponent({
  // name: 'PageName'
  setup(){
    const navigationActive = ref(false)
    const pagination = ref({})
    const selected = ref({})

    return {
      columns,
      rows,
      navigationActive,
      selected,
      pagination,
      tableRef: ref(null),
      filter: ref(''),
      pagenation: ref({}),
      tableClass: computed(()=> navigationActive.value === true ? 'shadow-8 no-outline' : null),
    }
  }
})
</script>
