(function(t){function e(e){for(var n,s,a=e[0],l=e[1],c=e[2],u=0,m=[];u<a.length;u++)s=a[u],o[s]&&m.push(o[s][0]),o[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);d&&d(e);while(m.length)m.shift()();return r.push.apply(r,c||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],n=!0,a=1;a<i.length;a++){var l=i[a];0!==o[l]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=i[0]))}return t}var n={},o={app:0},r=[];function s(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var d=l;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("c21b"),o=i.n(n);o.a},1:function(t,e){},"1d7b":function(t,e,i){"use strict";var n=i("4c34"),o=i.n(n);o.a},"44c1":function(t,e,i){},"4c34":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("097d");var n=i("2b0e"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Layout",{attrs:{id:"app"}},[i("Header",{attrs:{id:"header"}},[t._v("\n    Header\n  ")]),i("Layout",[i("Sider",{attrs:{id:"sider",width:"250"}},[i("Card",{staticStyle:{"background-color":"inherit","border-color":"inherit"}},[i("i-input",{attrs:{icon:"ios-clock-outline",placeholder:"搜索商品"}})],1),i("div",{staticStyle:{"font-size":"15px",padding:"3px 10px","background-color":"white"}},[i("div",{staticClass:"itemTop"},[i("div",[t._v("日期: "+t._s(t.currTime))])]),i("div",{staticClass:"itemBotton"},[i("div",[t._v("操作员: "+t._s(t.salesmanId))]),i("div",[t._v("超市: "+t._s(t.superMarketID))])])]),i("Card",{staticStyle:{height:"80px","border-radius":"0px"}},[i("div",{staticClass:"itemTop"},[i("div",[t._v("订单号:")]),i("div",[t._v(t._s(t.orderId))])]),i("div",{staticClass:"itemBotton"},[i("div",[t._v("合计:")]),i("div",{staticStyle:{color:"red","font-size":"20px"}},[t._v("$"+t._s(t.amount))])])]),i("Scroll",{staticStyle:{"background-color":"white"},attrs:{height:"440"}},t._l(t.list,function(e,n){return i("div",{key:n},[i("div",{staticClass:"orderItem",style:n==t.onClickOrderItem?"background-color:#97ACD4;":"",on:{click:function(e){t.clickOrderItem(n)}}},[i("Row",[i("i-col",{attrs:{span:"2"}},[i("div",{staticClass:"centerItem"},[t._v(t._s(n+1))])]),i("i-col",{attrs:{span:"18",offset:"1"}},[i("Row",[i("i-col",{attrs:{span:"18"}},[t._v(t._s(e.name))])],1),i("Row",[i("i-col",{attrs:{span:"20"}},[t._v("编号: "+t._s(e.id))])],1),i("Row",[i("i-col",{attrs:{span:"14"}},[t._v("单价: "+t._s(e.price)+"￥")]),i("i-col",{staticStyle:{"font-weight":"700"},attrs:{span:"10"}},[t._v("小结: "+t._s(e.summary)+"￥")])],1)],1),i("i-col",{attrs:{span:"3"}},[i("div",{staticClass:"centerItem",staticStyle:{"font-size":"15px"}},[t._v("×"+t._s(e.num))])])],1)],1)])}))],1),i("Sider",{attrs:{width:"100"}},[i("orderToolbar",{on:{"order-settle":function(e){t.orderSettlement()},"item-add":function(e){t.orderItemNumAdd()},"item-sub":function(e){t.orderItemNumSub()},"item-del":function(e){t.orderItemDel()},"order-del":function(e){t.orderDel()}}})],1),i("Layout",[i("Content",{attrs:{id:"content"}},[i("product",{on:{"add-goods":function(e){t.addGoods(e)}}})],1),i("Footer",{attrs:{id:"footer"}},[t._v("\n            Footer\n        ")])],1)],1)],1)},r=[],s=(i("7f7f"),i("6b54"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"goodsType"}},[n("scrollView",{on:{"change-type":function(e){t.changeType(e)}}})],1),n("div",{attrs:{id:"goodsList"}},t._l(t.list,function(e,o){return n("div",{key:o},[n("div",{on:{click:function(i){t.$emit("add-goods",e)}}},[n("Card",{staticClass:"goodsItem"},[n("div",{staticClass:"itemTop"},[n("div",{staticStyle:{width:"20%"}},[n("img",{attrs:{src:i("cf05")}})]),n("div",{staticStyle:{color:"red"}},[t._v("$"+t._s(e.price))])]),n("div",{staticClass:"itemBotton"},[n("div",[t._v(t._s(e.name))]),n("div",[t._v("("+t._s(e.id)+")")])])])],1)])})),n("div",{attrs:{id:"pageBar"}},[n("Page",{attrs:{total:t.totalItem,"page-size":28,"show-elevator":""},on:{"on-change":t.changePage}})],1)])}),a=[],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{style:t.style_val,attrs:{id:"wrapper"}},[i("div",{staticStyle:{display:"flex",height:"100%"}},t._l(t.list,function(e,n){return i("div",{key:n,on:{click:function(e){t.$emit("change-type",n)}}},[i("div",{staticClass:"scroll-item",style:t.clickedItemIndex==n?"background-color:#97ACD4;":"",on:{click:function(e){t.clickItem(n)}}},[t._v("["+t._s(e.index)+"] "+t._s(e.mean))])])}))])},c=[],d={name:"scrollView",data:function(){return{style_val:"",direction:"x",x:"scroll",y:"hidden",height:"60px",width:"auto",lastClickedIndex:0,clickedItemIndex:0,list:[{index:0,mean:"粮油零食"},{index:1,mean:"酒水饮料"},{index:2,mean:"清洁洗护"},{index:3,mean:"家电数码"},{index:4,mean:"厨房用品"},{index:5,mean:"首饰美容"},{index:6,mean:"玩具母婴"},{index:7,mean:"果蔬生鲜"},{index:8,mean:"时装箱包"},{index:9,mean:"家具摆饰"},{index:10,mean:"体育棋牌"},{index:11,mean:"文具书簿"},{index:12,mean:"其他"}]}},methods:{clickItem:function(t){this.lastClickedIndex=this.clickedItemIndex,this.clickedItemIndex=t}},created:function(){var t="overflow-x: "+this.x+"; ";t+="overflow-y: "+this.y+"; ",t+="height:"+this.height+"; ",t+="width:"+this.width+"; ",this.style_val=t}},u=d,m=(i("aed1"),i("2877")),h=Object(m["a"])(u,l,c,!1,null,null,null);h.options.__file="scrollView.vue";var p,f,v=h.exports,g="http://localhost:8080",y={host:g},I=y,_=Object(m["a"])(I,p,f,!1,null,null,null);_.options.__file="Global.vue";_.exports;var C={components:{scrollView:v},data:function(){return{list:[],typeIndex:0,totalItem:0}},created:function(){},methods:{changeType:function(t){var e=this;this.typeIndex=t;var i=this.typeIndex;this.$http.get("http://localhost:8080/commodity/listByType",{params:{commodityType:i,page:0,size:28}}).then(function(t){console.log(t),e.list=t.body.commodityList.content,e.totalItem=t.body.commodityList.totalElements},function(t){})},changePage:function(t){console.log(t);var e=this.typeIndex;this.$http({url:"http://localhost:8080/commodity/listByType",method:"GET",params:{commodityType:e,page:t-1,size:28}}).then(function(t){console.log(t),this.list=t.body.content},function(){})}}},b=C,k=(i("a51f"),Object(m["a"])(b,s,a,!1,null,"23a33781",null));k.options.__file="product.vue";var x=k.exports,O=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"itemContainer",staticStyle:{"margin-top":"10px"}},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",type:"primary",vertical:"true"},on:{click:function(e){t.$emit("order-settle")}}},[t._v("结算")])],1),i("div",{staticClass:"itemContainer"},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",type:"warning",vertical:"true"},on:{click:function(e){t.$emit("item-add")}}},[t._v("+")])],1),i("div",{staticClass:"itemContainer"},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",type:"error",vertical:"true"},on:{click:function(e){t.$emit("item-sub")}}},[t._v("-")])],1),i("div",{staticClass:"itemContainer"},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"},on:{click:function(e){t.$emit("item-del")}}},[t._v("删除")])],1),i("div",{staticClass:"itemContainer"},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"},on:{click:function(e){t.$emit("order-del")}}},[t._v("清空")])],1),i("div",{staticClass:"itemContainer"},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"}},[t._v("记录")])],1),i("div",{staticClass:"itemContainer"},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"}},[t._v("会员")])],1),i("div",{staticClass:"itemContainer",staticStyle:{"margin-top":"200px"}},[i("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"}},[t._v("更多")])],1)])},w=[],S={name:"orderToolbar"},T=S,D=(i("1d7b"),Object(m["a"])(T,O,w,!1,null,"b16edf9c",null));D.options.__file="orderToolbar.vue";var $=D.exports,j={name:"app",components:{product:x,orderToolbar:$},data:function(){return{superMarketID:"001",salesmanId:"007",onClickOrderItem:null,LastClickOrderItem:null,currTime:null,amount:null,list:[]}},created:function(){var t=this;setInterval(function(){t.currTime=t.formatTime(new Date)},990);for(var e=0,i=0;i<this.list.length;i++)e+=this.list[i].summary;this.amount=e,this.orderId=Date.parse(new Date)/1e3+this.superMarketID},methods:{formatNumber:function(t){return t=t.toString(),t[1]?t:"0"+t},formatTime:function(t){var e=t.getFullYear(),i=t.getMonth()+1,n=t.getDate(),o=t.getHours(),r=t.getMinutes(),s=t.getSeconds();return[e,i,n].map(this.formatNumber).join("/")+" "+[o,r,s].map(this.formatNumber).join(":")},clickOrderItem:function(t){if(this.LastClickOrderItem=this.onClickOrderItem,this.onClickOrderItem=t,this.LastClickOrderItem==t)return this.onClickOrderItem=null},orderItemNumAdd:function(){null!=this.onClickOrderItem&&(this.list[this.onClickOrderItem].num++,this.list[this.onClickOrderItem].summary+=this.list[this.onClickOrderItem].price,this.amount+=this.list[this.onClickOrderItem].price)},orderItemNumSub:function(){null!=this.onClickOrderItem&&1!=this.list[this.onClickOrderItem].num&&(this.list[this.onClickOrderItem].num--,this.list[this.onClickOrderItem].summary-=this.list[this.onClickOrderItem].price,this.amount-=this.list[this.onClickOrderItem].price)},orderItemDel:function(){null!=this.onClickOrderItem&&(this.amount-=this.list[this.onClickOrderItem].summary,this.list.splice(this.onClickOrderItem,1))},orderDel:function(){this.amount=0,this.list=[]},addGoods:function(t){console.log(t);for(var e=0,i=0;i<this.list.length;i++)if(this.list[i].id==t.id){e=1;break}e||(t.num=1,t.summary=t.price,this.amount+=t.price,this.list.push(t))},orderSettlement:function(){var t=this,e=this,i={};i.orderId=this.orderId,i.salesmanId=this.salesmanId,i.shopId=this.superMarketID,i.menberId=null,i.menberName=null,i.menberPhone=null,i.menberDiscount=1,i.goodsTotalCost=1,i.goodsTotalPrice=this.amount,i.orderDiscount=1,i.orderAmount=this.amount,i.type=1;for(var n=[],o=0;o<this.list.length;o++){var r={};r.orderId=this.orderId,r.itemId=this.list[o].id,r.itemTitle=this.list[o].name,r.itemNum=this.list[o].num,r.itemPrice=this.list[o].price,r.itemDiscount=1,r.itemImg=this.list[o].picUrl,r.itemAmout=this.list[o].summary,n.push(r)}console.log(n),this.$http.post("http://localhost:8080/order/save",{orderInfo:i,orderDetailList:n}).then(function(i){console.log(i),e.orderId=Date.parse(new Date)/1e3+t.superMarketID},function(t){})}}},z=j,B=(i("034f"),Object(m["a"])(z,o,r,!1,null,null,null));B.options.__file="App.vue";var P=B.exports,M=i("28dd"),L=i("e069"),N=i.n(L);i("dcad");n["default"].use(N.a),n["default"].use(M["a"]),n["default"].config.productionTip=!1,new n["default"]({render:function(t){return t(P)}}).$mount("#app")},a51f:function(t,e,i){"use strict";var n=i("44c1"),o=i.n(n);o.a},aed1:function(t,e,i){"use strict";var n=i("f081"),o=i.n(n);o.a},c21b:function(t,e,i){},cf05:function(t,e,i){t.exports=i.p+"img/logo.82b9c7a5.png"},f081:function(t,e,i){}});
//# sourceMappingURL=app.ad5ff4ba.js.map