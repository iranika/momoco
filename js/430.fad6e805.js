"use strict";(globalThis["webpackChunkmomoco"]=globalThis["webpackChunkmomoco"]||[]).push([[430],{771:(t,e,o)=>{o.d(e,{Z:()=>a});var s=o(499),l=o(9981),n=o.n(l);const c="https://script.google.com/macros/s/AKfycbzXYMhKrkOm3NtwqeQMBOJYc4uTz8kIbKMYOAdP0cb_lHB1BhTG8B9yc1CTyDAe_drT/exec";class r{constructor(t){if(this.db=(0,s.qj)({products:[]}),t!=r.getInstance)throw r.instance?new Error("Already created instance of AuthStore. You should use AuthStore.getInstance()."):new Error("Constractor args valided illegal. You should use AuthStore.getInstance()");console.info("create instance of ProductsStore"),this.syncSpreadSheet()}static getInstance(){return this.instance||(this.instance=new r(r.getInstance)),this.instance}syncSpreadSheet(){n().get(c).then((t=>{this.db.products=t.data}))}}function a(){return r.getInstance()}},2430:(t,e,o)=>{o.r(e),o.d(e,{default:()=>T});var s=o(9835),l=o(6970);const n={class:"text-subtitle1 text-bold"},c=["src"],r=(0,s.Uk)("DLsiteの作品ページ"),a=(0,s._)("div",{class:"text-subtitle1 text-bold"}," Now waiting -> next... ",-1),i=(0,s._)("div",{class:"text-subtitle1 text-bold"}," Now loading memories... ",-1);function d(t,e,o,d,u,m){const w=(0,s.up)("q-btn"),b=(0,s.up)("q-timeline-entry"),h=(0,s.up)("q-timeline"),p=(0,s.up)("q-page-sticky"),g=(0,s.up)("q-page");return(0,s.wg)(),(0,s.j4)(g,{padding:""},{default:(0,s.w5)((()=>[(0,s._)("div",null,[(0,s.Wm)(h,{color:"secondary",layout:t.layout},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.db.products,((e,o)=>((0,s.wg)(),(0,s.j4)(b,{key:o,side:o%2==0?"right":"left"},{title:(0,s.w5)((()=>[(0,s._)("div",n,(0,l.zw)(t.db.products[o].title),1)])),subtitle:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(t.db.products[o].release),1)])),default:(0,s.w5)((()=>[(0,s._)("img",{src:t.db.products[o].img,style:{width:"100%","max-width":"500px"}},null,8,c),(0,s._)("div",null,[(0,s.Wm)(w,{type:"a",flat:"",href:t.db.products[o].dalf},{default:(0,s.w5)((()=>[r])),_:2},1032,["href"])])])),_:2},1032,["side"])))),128)),0!=t.db.products.length?((0,s.wg)(),(0,s.j4)(b,{key:0},{title:(0,s.w5)((()=>[a])),subtitle:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(t.date.formatDate(Date(),"YYYY/MM/DD")),1)])),_:1})):((0,s.wg)(),(0,s.j4)(b,{key:1},{title:(0,s.w5)((()=>[i])),subtitle:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(t.date.formatDate(Date(),"YYYY/MM/DD")),1)])),_:1}))])),_:1},8,["layout"])]),(0,s.Wm)(p,{position:"bottom-right",offset:[18,18]},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{size:"small",round:"",onClick:e[0]||(e[0]=e=>t.scrollTop()),icon:"keyboard_arrow_up",color:"white",class:"text-black"})])),_:1}),(0,s.Wm)(p,{position:"bottom-left",offset:[18,18]},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{size:"small",round:"",onClick:e[1]||(e[1]=e=>t.scrollBottom()),icon:"keyboard_arrow_down",color:"white",class:"text-black"})])),_:1})])),_:1})}var u=o(771),m=o(9302),w=o(4376);const b=(0,s.aZ)({setup(){const t=(0,u.Z)().db,e=(0,m.Z)(),o=(0,s.Fl)((()=>e.screen.lt.sm?"dense":e.screen.lt.md?"comfortable":"loose"));return{db:t,layout:o,date:w.ZP}},methods:{scrollTop(){scrollTo(0,0)},scrollBottom(){scrollTo(0,document.documentElement.scrollHeight)}}});var h=o(1639),p=o(9885),g=o(6292),f=o(8767),y=o(4455),k=o(627),_=o(9984),Y=o.n(_);const x=(0,h.Z)(b,[["render",d]]),T=x;Y()(b,"components",{QPage:p.Z,QTimeline:g.Z,QTimelineEntry:f.Z,QBtn:y.Z,QPageSticky:k.Z})}}]);