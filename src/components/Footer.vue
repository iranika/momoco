<template>
  <footer class="footer">
    <q-card flat>
      <q-card-section class="footer__inner">
        <FooterAdSlots />
        <p>
          漫画は桃鳥さんが描いています。<br />
          画像等の著作権は桃鳥さんにあり、アプリの著作権はいらにかにあります。<br />
          アプリに関するお問い合わせは<a href="https://twitter.com/happy_packet"
            >いらにか(twitter)</a
          >までお願いします。
        </p>
        <p>
          もしこのアプリを気に入って支援したい人がいたら<a
            href="https://www.amazon.jp/hz/wishlist/ls/2ZHC8L3L1O20S?ref_=wl_share"
            >いらにかの欲しいものリスト</a
          >でプレゼントを送ってあげてください。<br />
          コーヒーとか喜びます。
        </p>
        <div class="">みちくさびゅーあー ©2019 iranika(@happy_packet)</div>
      </q-card-section>
    </q-card>
  </footer>
</template>

<style scoped>
.footer {
  background-color: rgb(238, 238, 238);
  color: black;
  text-align: center;
  position: relative;
  z-index: 1;
}

.footer__inner {
  padding: 8px 12px 10px;
}

.footer__inner p {
  margin: 6px 0;
  font-size: 12px;
  line-height: 1.4;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import FooterAdSlots from 'components/FooterAdSlots.vue';

export default defineComponent({
  name: 'AppFooter',
  components: { FooterAdSlots },
});
</script>
