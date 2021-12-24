<template>
  <q-page padding class="bg">
    <ViewerContent :page="page" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn size="small" round @click="scrollTop()" icon="keyboard_arrow_up" color="white" class="text-black"/>
    </q-page-sticky>
    <!-- content -->
  </q-page>
</template>

<style scoped>
.bg {
  background-image: url("../assets/bg.jpg");
  background-repeat: repeat;
  background-size: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import ViewerContent from 'components/ViewerContent.vue';

export default defineComponent({
  props:{
    page: String,
    lang: String
  },
  components:{
    ViewerContent
  },
  methods:{
    scrollTop(){
      scrollTo(0, 0)
    }
  }
})
</script>
