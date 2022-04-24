<template>
  <q-page padding>
    <div>
      <q-card style="max-width:600px; margin: 0 auto;" flat>
        <q-card-section>
          <div class="text-h6">みちくさびゅあーについて</div>
          <q-separator />
          <div style="margin-top: 20px;">
            桃鳥さんが描いている「<a href="http://momoirocode.web.fc2.com/">ばっくやーど数コマ</a>」をスマホで読みやすくするアプリです。<br>
            桃鳥さんの許諾を得て、<a href="https://twitter.com/happy_packet">いらにか</a>がアプリを公開・メンテしています。<br>
            画像等の著作権は桃鳥さんにあり、アプリの著作権はいらにかにあります。アプリに関するお問い合わせは<a href="https://twitter.com/happy_packet">いらにか(twitter)</a>までお願いします。<br>
            漫画の更新情報はTwitterのハッシュタグ『<a href="https://twitter.com/hashtag/%E6%A1%83%E8%89%B2CODE%E6%9B%B4%E6%96%B0%E6%83%85%E5%A0%B1">#桃色CODE更新情報</a>』でつぶやいています。<br>
            <a href="https://mo4koma.iranika.info/feed.atom">RSS/Atom</a>でも配信しています。
          </div>
        </q-card-section>
        <q-space />
        <q-card-section>
          <div class="text-h6">いろいろな機能</div>
          <q-separator />
          <ol>
            <li>
              スクロールして読み進めると自動で次の話をロードしてくれます。とっても便利！！
            </li>
            <li>
              シェアボタンでボタンの上にある話数をTwitterでシェアできます。布教しやすい便利設計‼
            </li>
            <li>
              右上のメニューボタンから好きな話数にジャンプできます。話数表示で便利！！
            </li>
            <li>トップのLATESTタブで最新話にジャンプできます。地味に便利！！</li>
            <li>
              URLで指定話数にジャンプできます。数字の代わりにlatestと記載すると最新話にジャンプできます。こいつのおかげで、好きな話数をシェアできる！！
            </li>
            https://movue.iranika.info/#/?page=100<br />
            https://movue.iranika.info/#/?page=latest<br />
            <li>PWAに対応しているのでアプリのようにインストールできます。</li>
          </ol>
          <div>
            他にも便利な機能がいっぱいあるので、専用の解説ページを用意しました。<br>
            <div>
              <a href="https://help.iranika.info">みちくさびゅあーの解説ページ</a><br>
              ※外部サイトに移動します
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">プライバシーポリシー</div>
          <q-separator />
          <div style="margin-top: 20px;">
            <a href="https://iranika.github.io/policy/MichikusaViewer.index">プライバシーポリシーはこちら</a><br>
            ※外部サイトに移動します
          </div>
        </q-card-section>
      </q-card>
      <q-separator style="margin-top: 40px;" />
    </div>
  </q-page>
</template>

<style scoped>
p{
  margin-bottom: 2px;
}
</style>


<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar, date } from 'quasar';

export default defineComponent({
  // name: 'PageName'

  setup(){

    return {
      date
    }
  }
})
</script>
