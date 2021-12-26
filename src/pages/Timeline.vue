<template>
  <q-page padding>
    <div>
      <q-timeline color="secondary" :layout="layout">
        <template v-for="(_, i) in db.products" :key="i">
          <q-timeline-entry>
            <template v-slot:title>
              <div class="text-subtitle1 text-bold">
                {{ db.products[i].title }}
              </div>
            </template>
            <template v-slot:subtitle>
              {{ db.products[i].release }}
            </template>
            <img :src="db.products[i].img" style="width:100%; max-width: 500px;" />
            <q-btn type="a" flat :href="db.products[i].dalf">DLsiteの作品ページ</q-btn>
          </q-timeline-entry>
        </template>
        <q-timeline-entry>
          <template v-slot:title>
            <div class="text-subtitle1 text-bold">
              Now waiting -> next...
            </div>
          </template>
          <template v-slot:subtitle>
            {{ date.formatDate(Date(), "YYYY/MM/DD") }}
          </template>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useProductStore from 'src/stores/ProductStore'
import { useQuasar, date } from 'quasar';

export default defineComponent({
  // name: 'PageName'

  setup(){
    const db = useProductStore().db;
    const $q = useQuasar();
    const layout = computed(()=>{
      return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
    })

    return {
      db,
      layout,
      date
    }
  }
})
</script>
