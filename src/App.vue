<template>
  <router-view />
  <UpdateNofity />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UpdateNofity from 'components/UpdateNotify.vue';

//import UpdateNofity from 'components/UpdateNofity.vue'
export default defineComponent({
  name: 'App',
  components:{
    UpdateNofity
  }
})
</script>
