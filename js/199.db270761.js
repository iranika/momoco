"use strict";(self["webpackChunkmomoco"]=self["webpackChunkmomoco"]||[]).push([[199],{8226:(e,t,a)=>{a.d(t,{Z:()=>l});var r=a(1959),n=a(52),c=a.n(n);const o="https://script.google.com/macros/s/AKfycbzXYMhKrkOm3NtwqeQMBOJYc4uTz8kIbKMYOAdP0cb_lHB1BhTG8B9yc1CTyDAe_drT/exec";class i{constructor(e){if(this.db=(0,r.qj)({products:[]}),e!=i.getInstance)throw i.instance?new Error("Already created instance of AuthStore. You should use AuthStore.getInstance()."):new Error("Constractor args valided illegal. You should use AuthStore.getInstance()");console.info("create instance of ProductsStore"),this.syncSpreadSheet()}static getInstance(){return this.instance||(this.instance=new i(i.getInstance)),this.instance}syncSpreadSheet(){c().get(o).then((e=>{this.db.products=e.data}))}}function l(){return i.getInstance()}},8199:(e,t,a)=>{a.r(t),a.d(t,{default:()=>P});var r=a(3673),n=a(2323);const c=(0,r._)("div",{class:"text-h4",style:{margin:"10px auto 10px auto"}},"登場人物の紹介",-1),o=(0,r.Uk)(" ※いらにかの主観で書かれています。 "),i=["src"],l={class:"text-h5",style:{margin:"10px auto 10px auto"}},s=(0,r.Uk)(" CV:"),u=["innerHTML"],d=(0,r.Uk)(" クリックすると作品ページに飛べます "),m=["innerHTML"],p=(0,r._)("div",{style:{"mergin-bottom":"10px"}},"メイン出演",-1),w=["innerHTML"],h=(0,r._)("div",{style:{"mergin-bottom":"10px"}},"サブ出演",-1),y=["innerHTML"];function f(e,t,a,f,g,b){const v=(0,r.up)("q-card-section"),_=(0,r.up)("q-avatar"),k=(0,r.up)("q-btn"),x=(0,r.up)("q-card"),T=(0,r.up)("q-expansion-item"),Y=(0,r.up)("q-page");return(0,r.wg)(),(0,r.j4)(Y,{padding:""},{default:(0,r.w5)((()=>[(0,r.Wm)(x,{class:"chara-card q-mx-auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[c,o])),_:1}),(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.chara,((t,a)=>((0,r.wg)(),(0,r.j4)(k,{round:"","fab-mini":"",key:a,to:"/charactor/"+e.chara[a].name},{default:(0,r.w5)((()=>[(0,r.Wm)(_,null,{default:(0,r.w5)((()=>[(0,r._)("img",{style:{width:"100%"},src:e.chara[a].icon},null,8,i)])),_:2},1024)])),_:2},1032,["to"])))),128))])),_:1}),(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.chara,((t,a)=>((0,r.wg)(),(0,r.iD)("div",{key:a},[e.name==e.chara[a].name||"all"==e.name?((0,r.wg)(),(0,r.j4)(x,{key:0,flat:""},{default:(0,r.w5)((()=>[(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[(0,r._)("div",l,(0,n.zw)(e.chara[a].namae),1),s,(0,r._)("label",{innerHTML:e.chara[a].cv},null,8,u)])),_:2},1024),(0,r.Wm)(v,{textContent:(0,n.zw)(e.chara[a].text),style:{"white-space":"pre-wrap"}},null,8,["textContent"]),(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[(0,r.Wm)(T,{class:"text-center",label:"関連作品",style:{"background-color":"#f7f7f7"}},{default:(0,r.w5)((()=>[(0,r.Wm)(x,{class:"text-left"},{default:(0,r.w5)((()=>[(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[d])),_:1}),(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.chara[a].contents,(e=>((0,r.wg)(),(0,r.iD)("div",{key:e,style:{"margin-bottom":"4px"}},[(0,r._)("div",{innerHTML:e},null,8,m)])))),128))])),_:2},1024),(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[p,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.getProductsBanner(e.chara[a].cvArray,"mainAct"),(e=>((0,r.wg)(),(0,r.iD)("div",{key:e},[(0,r._)("div",{innerHTML:e,class:"panel"},null,8,w)])))),128))])),_:2},1024),(0,r.Wm)(v,null,{default:(0,r.w5)((()=>[h,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.getProductsBanner(e.chara[a].cvArray,"subAct"),(e=>((0,r.wg)(),(0,r.iD)("div",{key:e},[(0,r._)("div",{innerHTML:e,class:"panel"},null,8,y)])))),128))])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)):(0,r.kq)("",!0)])))),128))])),_:1})])),_:1})])),_:1})}var g=a(1959),b=a(8226);const v=[{name:"seri",namae:"せり/せりさん",cv:"雁庵うずめ",cvArray:["雁庵うずめ"],icon:"/img/charactor/seri-205.jpg",text:"道草屋の女将。\nお母さんのような存在。お茶目で乙女。\nおしゃべり好きでトークスキルが高く、怪談話が得意。\nお酒好きで、酔うと絡んでくる。\n耳飾りは着脱式。住み込みのしろさん・ずなちゃんと一緒に道草屋で暮らしている。\n芹は春の七草のひとつ。",contents:["せりさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2ydtFT3cSDbvJX75Fmgpb3K6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"suzusiro",namae:"すずしろ/しろさん",icon:"/img/charactor/suzusiro-241.jpg",cv:'餅よもぎ→<a href="https://twitter.com/hiyori_voice">御崎ひより</a>',cvArray:["餅よもぎ","御崎ひより"],text:"せりさんの世話係。\n三番目に道草屋歴が長い。道草屋の働き者。\nせりさん、ずなちゃんと一緒に暮らしている。\n湿気で癖毛の髪がもじゃるのが悩み。梅雨は大敵。\n花粉も大敵。あとお腹のお肉も大敵…\n春の七草のすずしろは、大根の別名。",contents:["しろさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yeRJUxBt4Ea-pXXL8L8TUQZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"suzuna",namae:"すずな/ずなちゃん",cv:'<a href="https://twitter.com/toudourenge">藤堂れんげ</a>',cvArray:["藤堂れんげ"],icon:"/img/charactor/suzuna-177.jpg",text:"道草屋の可愛い代表。私服がちょっとダサ可愛いのも魅力のひとつ。\n真面目な良い子で沢山の人から愛されている。\n出身は北海道。祖母の伝手で道草屋で働きはじめた。今はせりさん、しろさんと一緒に暮らしている。\n最年少ゆえ世間知らずな一面もあるが、田舎における生活スキルが高く無人販売所を使いこなす田舎暮らしのプロ。\n実は能力保持者で、霊感だけでなく優位性アピール無力化（ドヤ顔キャンセル）など稀有な能力を持っている可能性がある[要出典]。\n春の七草の菘(すずな)は、カブの別名",contents:["ずなさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yexGT79Qa4g0J450CKGuvtz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"hakobera",namae:"はこべら/はこさん",icon:"/img/charactor/hako-256.jpg",cv:'藤村咲樹→<a href="https://twitter.com/kotoka_11_28">琴香</a>',cvArray:['藤村咲樹","琴香"'],text:"道草屋のエッチなお姉さん。\nせりさんと幼馴染で二番目に道草屋歴が長い。\n丁寧な言葉遣いとは裏腹に悪戯好き。ずなちゃんと旦那様がよく悪戯の被害を受けている。\nバイク乗りで愛車を褒めると心を開く（ちょろい）。",contents:["はこさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yedk4HUf0oUOPVuhfeXirnm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"ine",namae:"いね/いねさん",cv:'<a href="https://twitter.com/hinyanm">真宮ひいろ</a>',cvArray:["真宮ひいろ"],icon:"/img/charactor/ine-177.jpg",text:"いつも眠そうでこちらまで眠くなる（癒し）\nたびさんとは同級生。\nめんどくさがりだけど根は真面目でしっかり働く。\nおせち大会で何度も優勝する強者だが料理は得意ではない。\n審査員の心をつかむテクニックが成せる技だ。\n実はツッコミが上手。サボテンとアロエ（名はルサンチマン）を育てている。\nイネ科イネ属の稲は現代の七草に数えられないが、七草粥にはお米として入っている。",contents:["いねさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2ydScUTbTcXcQqzZwuQn88TG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"tabirako",namae:"たびらこ/たびさん",cv:'<a href="https://twitter.com/aiedakyoko">愛枝今日子</a>',cvArray:["愛枝今日子"],icon:"/img/charactor/tabirako-185.jpg",text:"いねさんとは同級生。\nいねさんのお世話が大好きで、まるで保護者。\n溢れ出る母性のせいか奥様と間違われたことがある。\n道草屋と実家のうどん屋を掛け持ちしているワーカーホリックで、うどんへの信頼と情熱がすごい。\n鉄瓶を育てるのが上手。私服がちょっとダサ可愛いのも魅力の一つ。\n春の七草のほとけのざの別名がオニタビラコ。",contents:["たびさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yc-mFTjtErv4DF9YO0rj665" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"inoko",namae:"いのこ/うりちゃん",cv:'<a href="https://twitter.com/hako_noah">箱河ノア</a>',cvArray:["箱河ノア"],icon:"/img/charactor/inoko-251.jpg",text:"名はいのこだが通称うりちゃん。\n独特な敬語を使う。活発だが圧倒的に運がない。\nずる賢いが、おかげで痛い目にもあっている。\n欲しいものを買うために道草屋で働き始めて、一度は退職したがとある理由で再就職したバイト戦士。\nはこさんから譲り受けたチョイノリ（原付）に乗っていたが、祖父の伝手でトリッカー（普通二輪）を譲り受けて乗り回している。\n夏の七草の猪子槌（いのこづち）に由来。",contents:["いのこさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yfRdhG6DHOxA-MG2Ziduz8j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},{name:"natuna",namae:"なつな/なっちゃん",icon:"/img/charactor/natuna-250.jpg",cv:'<a target="_blank" href="https://twitter.com/tanba_usa">丹羽うさぎ</a>',cvArray:["丹羽うさぎ"],text:"道草屋のお客さん。苗字は橘。元社畜。\nいねさん・たびさんと同級生で、小学三年生に転校してから約15年ぶり？に村に帰ってきた。\n生粋のカフェインジャンキー。好きな珈琲豆はそこにあるやつ（なんでもいい）。\nいねさんのおかげで道草屋の電話番ができるが、彼女は従業員ではなく客だということを忘れてはならない。\n春の七草のなずなは夏には枯れることから「夏無（なつな）」から変化した説がある[要出典]。",contents:["なっちゃんさんぷる",'<iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLSY2NdJVC2yd2ErdrZWRF2eKj4uoR500x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']}],_=(0,r.aZ)({props:{name:String},data(){return{db:(0,b.Z)().db}},computed:{},setup(){const e=(0,b.Z)().db,t=(0,g.Fl)((()=>function(t,a="mainAct"){let r=e.products.filter((e=>t.some((t=>"mainAct"==a?e.mainAct.includes(t):e.subAct.includes(t)))));return r.map((e=>e.banner))}));return{getProductsBanner:t,chara:v,db:e}}});var k=a(4260),x=a(4379),T=a(151),Y=a(5589),A=a(9400),S=a(5096),C=a(6510),L=a(7518),j=a.n(L);const H=(0,k.Z)(_,[["render",f]]),P=H;j()(_,"components",{QPage:x.Z,QCard:T.Z,QCardSection:Y.Z,QBtn:A.Z,QAvatar:S.Z,QExpansionItem:C.Z})}}]);