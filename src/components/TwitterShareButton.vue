<template>
  <div style="text-align: center;">
    <q-btn
      type="a"
      rounded
      size="xs"
      color="primary"
      class="text-white"
      href="https://twitter.com/intent/tweet?hashtags=%E9%81%93%E8%8D%89%E5%B1%8B&original_referer=https%3A%2F%2Fpublish.twitter.com%2F%3FbuttonText%3D%25E3%2581%2593%25E3%2581%2593%25E3%2581%2599%25E3%2581%258D%25EF%25BC%2581%25EF%25BC%2581%2523%25E3%2581%25BF%25E3%2581%25A1%25E3%2581%258F%25E3%2581%2595%25E3%2581%25B3%25E3%2582%2585%25E3%2581%2582%25E3%2583%25BC%26buttonType%3DTweetButton%26buttonUrl%3Dhttps%253A%252F%252Fmovue.iranika.info%252F%252310%26dnt%3D1%26lang%3Dja%26widget%3DButton&ref_src=twsrc%5Etfw&text=%E7%AC%AC1%E8%A9%B1%E3%80%8C%E9%83%BD%E4%BC%9A%E6%B4%BE%E3%80%8D&tw_p=tweetbutton&url=https%3A%2F%2Fmovue.iranika.info%2F%23%2F%3Fpage%3D1"
      target="_blank"
    >
      <q-icon :name="mdiTwitter" />シェア 
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mdiTwitter } from '@quasar/extras/mdi-v6';

export default defineComponent({
  // name: 'ComponentName'
  props:{
    link: String
  },
  setup(){
    return {
      mdiTwitter
    }
  }
})
</script>
