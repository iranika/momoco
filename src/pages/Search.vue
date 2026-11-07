<template>
  <q-page padding>
    <q-banner v-if="searchStore.status === 'error'" class="bg-negative text-white" rounded>
      検索DBの読み込みに失敗しました: {{ searchStore.errorMessage }}
      <template v-slot:action>
        <q-btn flat label="再読み込み" @click="searchStore.fetch()" />
      </template>
    </q-banner>
    <q-table
      title="びゅあー検索㌼"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs"
      :rows="searchStore.products"
      :columns="columns"
      row-key="No"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      :pagination="pagenation"
      :filter-method="filterMethod"
      :filter="filter"
      style="max-width: 900px; margin: 0 auto"
    >
      <template v-slot:top-left>
        <div class="text-h5" style="margin-top: 5px">びゅあー検索くん㌼</div>
        <div>
          <q-btn round push size="sm" v-for="c in chara" :key="c.name" @click="clickAvator(c.searchName)">
            <q-avatar><img style="width: 100%" :src="c.icon" /></q-avatar>
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
          <q-btn
            dense
            flat
            size="sm"
            icon="arrow_forward_ios"
            :to="`/?page=${props.row.No}`"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type { QTableColumn } from 'quasar';
import { useSearchStore } from 'src/stores/SearchStore';
import type { SearchDB } from 'src/stores/SearchStore';
import { characters as chara } from 'src/data/characters';

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }
  if (typeof value === 'string') {
    return value
      .split(/,|、/)
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }
  return [];
};

const columns: QTableColumn<SearchDB>[] = [
  {
    name: 'No',
    required: true,
    label: 'No',
    align: 'left',
    field: 'No',
    sortable: true,
  },
  {
    name: 'Title',
    label: 'タイトル',
    align: 'left',
    field: 'Title',
    sortable: true,
    style: 'width: 5px;',
  },
  {
    name: 'Characters',
    label: 'キャラクター',
    align: 'left',
    field: 'Characters',
    sortable: true,
    format: (val: unknown) => toStringArray(val).join(','),
  },
  {
    name: 'Keyword',
    label: 'キーワード',
    align: 'left',
    field: 'Keyword',
    format: (val: unknown) => toStringArray(val).join(','),
  },
  //{ name: 'Comment', label: 'コメント', align: 'left', field: 'Comment' },
  { name: 'Link', label: 'リンク', align: 'left', field: 'No' },
];

export default defineComponent({
  // name: 'PageName'
  setup() {
    const navigationActive = ref(false);
    const pagination = ref({});
    const selected = ref([]);
    const searchStore = useSearchStore();
    const filter = ref('');

    function clickAvator(namae: string) {
      if (filter.value.includes(namae)) {
        filter.value = filter.value.replace(namae + ',', '');
        filter.value = filter.value.replace(namae, '');
      } else {
        filter.value += namae + ',';
      }
    }

    const filterMethod = (
      rows: readonly SearchDB[],
      terms: string | number | null | undefined,
    ): readonly SearchDB[] => {
      if (rows == null || typeof rows === 'boolean') {
        console.info('rows mismatch. rows need type of SearchDB[].', rows);
        return [];
      }

      const filterText = terms == null || terms === '' ? '' : String(terms);
      if (filterText === '') {
        return rows;
      }

      const words = filterText
        .split(/,|、/)
        .map((w) => w.trim())
        .filter((x) => x); //空要素をremove

      function isInclude(row: SearchDB, w: string, rebase = false) {
        if (String(row.No).includes(w)) return !rebase;
        if (row.Title.includes(w)) return !rebase;
        if (toStringArray(row.Characters).join(',').includes(w)) return !rebase;
        if (toStringArray(row.Keyword).join(',').includes(w)) return !rebase;
        if (row.Comment.includes(w)) return !rebase;
        return rebase;
      }

      return rows.filter((row) => {
        return words.every((w) => {
          if (w[0] == '!') {
            //return isInclude(row, w, true)
            if (!toStringArray(row.Characters).join(',').includes(w.replace('!', ''))) return true;
            return false;
          } else {
            return isInclude(row, w);
          }
        });
      });
    };

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
      tableClass: computed(() => (navigationActive.value === true ? 'shadow-8 no-outline' : null)),
      clickAvator,
      getSelectedString() {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${searchStore.products.length}`;
      },
    };
  },
});
</script>
