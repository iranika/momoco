<template>
  <q-page padding class="bg">
    <div style="background-color: whitesmoke;">
      <q-list  bordered style="">
        <q-expansion-item expand-separator icon="perm_identity" label="ヘッダーの設定" caption="ヘッダーの画像を変更します">
          <q-card style="width: 98%; margin: 0px auto; background-color: whitesmoke;">
            <q-card-section>
              <div>
                ここでヘッダー画像を変更することができます。<br>
                <q-select v-model="current" use-input input-debounce="0" label="設定する画像" :options="options"
                  @filter="searchfilter" behavior="menu">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <q-btn label="ヘッダーをデフォルトに戻す" @click="headerImgStore.initCurrent()"></q-btn>

              </div>
            </q-card-section>
            <q-card-section>
              <div class="flex flex-center">
            <q-pagination v-model="page" :max="maxnum" input></q-pagination>
          </div>
          <div class="container fit row wrap justify-center items-start content-start">
            <q-card v-for="file in options.slice(shownum*(page - 1),shownum*(page))" :key="file"
              style="margin: 10px 10px;">
              <q-card-section>
                <q-img :src="headerImgStore.getFullpath(file)" class="archives" fit="scale-down" />
                <div>{{ file }}</div>
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn flat label="設定する" @click="headerImgStore.setCurrent(headerImgStore.getFullpath(file))"></q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="flex flex-center">
            <q-pagination v-model="page" :max="maxnum" input></q-pagination>
          </div>

            </q-card-section>
          </q-card>
        </q-expansion-item>

      </q-list>
    </div>
    <!-- content -->
  </q-page>
</template>
<style scoped>
.archives {
  width: 350px;
  height: 250px;
}

.container {
  width: 90%;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useHeaderImgStore } from 'src/stores/LocalStorage';

export default defineComponent({
  // name: 'PageName'
  setup() {
    // TODO: メチャクチャなロジックなのでそのうち整理する
    const options = ref(useHeaderImgStore().archives.value.files);
    const headerImgStore = useHeaderImgStore();
    const current = ref(headerImgStore.current.value.replace('https://mo4koma.iranika.info/top/archives/', ''));
    const page = ref(1);
    const shownum = 8;
    const maxnum = ref(options.value.length % shownum == 0 ? options.value.length / shownum : Math.floor(options.value.length / shownum) + 1);
    watch(
      current,
      (val) => {
        if (options.value.includes(val)) {
          headerImgStore.setCurrent(headerImgStore.getFullpath(val))
        }
      }
    )
    watch(
      headerImgStore.current,
      ()=>{
        current.value = headerImgStore.current.value.replace('https://mo4koma.iranika.info/top/archives/', '')
      }
    )
    watch(
      useHeaderImgStore().archives,
      (val) => {
        options.value = val.value.files
        maxnum.value = options.value.length % shownum == 0 ? options.value.length / shownum : Math.floor(options.value.length / shownum) + 1
      }
    )

    return {
      options,
      page,
      shownum,
      maxnum,
      current,
      headerImgStore,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      searchfilter(val: string, update: (prm: any) => any) {
        if (val === '') {
          update(() => {
            options.value = headerImgStore.archives.value.files;
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = headerImgStore.archives.value.files.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
})
</script>
