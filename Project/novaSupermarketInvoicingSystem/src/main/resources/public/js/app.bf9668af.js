(function(t){function e(e){for(var n,r,a=e[0],l=e[1],c=e[2],u=0,m=[];u<a.length;u++)r=a[u],o[r]&&m.push(o[r][0]),o[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);d&&d(e);while(m.length)m.shift()();return s.push.apply(s,c||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,a=1;a<i.length;a++){var l=i[a];0!==o[l]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=i[0]))}return t}var n={},o={app:0},s=[];function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var d=l;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"078d":function(t,e,i){"use strict";var n=i("c009"),o=i.n(n);o.a},1:function(t,e){},3016:function(t,e,i){"use strict";var n=i("b3fd"),o=i.n(n);o.a},"336b":function(t,e,i){"use strict";var n=i("ed13"),o=i.n(n);o.a},"38b9":function(t,e,i){"use strict";var n=i("8fb9"),o=i.n(n);o.a},"50be":function(t,e,i){t.exports=i.p+"img/commodity.ee7b6ee1.png"},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("097d");var n=i("2b0e"),o=i("28dd"),s=i("e069"),r=i.n(s),a=i("8c4f"),l=(i("dcad"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Layout",{attrs:{id:"app"}},[t.spinShow?n("Spin",{attrs:{size:"large",fix:""}}):t._e(),n("Modal",{attrs:{width:"500"},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[n("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[n("span",[t._v("搜索结果")])]),n("div",{attrs:{id:"goodsList"}},t._l(t.searchList,function(e,o){return n("div",{key:o,on:{click:function(i){t.addGoods(e)}}},[n("Card",{staticClass:"goodsItem"},[n("div",{staticClass:"itemTop"},[n("div",[n("img",{staticStyle:{width:"40px"},attrs:{src:null!=e.picUrl?"http://localhost:8080/resources/commodityPic/"+e.picUrl:i("50be")}})]),n("div",{staticStyle:{"text-align":"right"}},[n("div",{staticStyle:{color:"red"}},[t._v("￥"+t._s(e.price))]),n("div",[t._v("库存:"+t._s(e.amount))])])]),n("div",{staticClass:"itemBotton"},[n("div",[t._v(t._s(e.name))])])])],1)})),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Page",{attrs:{current:t.searchResultPage,total:t.searchResultTotal,simple:""},on:{"on-change":t.changePage}})],1)]),n("Header",{attrs:{id:"header"}},[n("i-menu",{attrs:{mode:"horizontal",theme:"dark","active-name":"1"}},[n("div",{staticClass:"layout-logo",on:{click:function(e){t.toVIP()}}}),n("div",{staticClass:"layout-nav"},[n("i-menuItem",{attrs:{name:"1",to:"/Login"}},[n("Icon",{attrs:{type:"ios-navigate"}}),t._v("\n                        开会员卡\n                    ")],1),n("i-menuItem",{attrs:{name:"2"}},[n("Icon",{attrs:{type:"ios-keypad"}})],1),n("i-menuItem",{attrs:{name:"3"}},[n("Icon",{attrs:{type:"ios-analytics"}}),t._v("\n                        Item 3\n                    ")],1),n("i-menuItem",{attrs:{name:"4"}},[n("Icon",{attrs:{type:"ios-paper"}}),t._v("\n                        Item 4\n                    ")],1)],1)])],1),n("Layout",[n("router-link"),n("router-view"),n("Sider",{attrs:{id:"sider",width:"250"}},[n("Card",{staticStyle:{"background-color":"inherit","border-color":"inherit"}},[n("i-input",{attrs:{placeholder:"搜索商品",search:""},on:{"on-enter":function(e){t.searchProduct()}},model:{value:t.searchContent,callback:function(e){t.searchContent=e},expression:"searchContent"}})],1),n("div",{staticStyle:{"font-size":"15px",padding:"3px 10px","background-color":"white"}},[n("div",{staticClass:"itemTop"},[n("div",[t._v("日期: "+t._s(t.currTime))])]),n("div",{staticClass:"itemBotton"},[n("div",[t._v("操作员: "+t._s(t.salesmanId))]),n("div",[t._v("超市: "+t._s(t.superMarketID))])])]),n("Card",{staticStyle:{height:"80px","border-radius":"0px"}},[n("div",{staticClass:"itemTop"},[n("div",[t._v("订单号:")]),n("div",[t._v(t._s(t.orderId))])]),n("div",{staticClass:"itemBotton"},[n("div",[t._v("合计:")]),n("div",{staticStyle:{color:"red","font-size":"20px"}},[t._v("￥"+t._s(t.amount))])])]),n("Scroll",{staticStyle:{"background-color":"white"},attrs:{height:"440"}},t._l(t.list,function(e,i){return n("div",{key:i},[n("div",{staticClass:"orderItem",style:i==t.onClickOrderItem?"background-color:#97ACD4;":"",on:{click:function(e){t.clickOrderItem(i)}}},[n("Row",[n("i-col",{attrs:{span:"2"}},[n("div",{staticClass:"centerItem"},[t._v(t._s(i+1))])]),n("i-col",{attrs:{span:"18",offset:"1"}},[n("Row",[n("i-col",{attrs:{span:"18"}},[t._v(t._s(e.name))])],1),n("Row",[n("i-col",{attrs:{span:"20"}},[t._v("编号: "+t._s(e.id))])],1),n("Row",[n("i-col",{attrs:{span:"14"}},[t._v("单价: "+t._s(e.price)+"￥")]),n("i-col",{staticStyle:{"font-weight":"700"},attrs:{span:"10"}},[t._v("小结: "+t._s(e.summary)+"￥")])],1)],1),n("i-col",{attrs:{span:"3"}},[n("div",{staticClass:"centerItem",staticStyle:{"font-size":"15px"}},[t._v("×"+t._s(e.num))])])],1)],1)])}))],1),n("Sider",{attrs:{width:"100"}},[n("orderToolbar",{on:{"order-settle":function(e){t.orderSettlement()},"item-add":function(e){t.orderItemNumAdd()},"item-sub":function(e){t.orderItemNumSub()},"item-del":function(e){t.orderItemDel()},"order-del":function(e){t.orderDel()}}})],1),n("Layout",[n("Content",{attrs:{id:"content"}},[n("product",{on:{"add-goods":function(e){t.addGoods(e)}}})],1),n("Footer",{attrs:{id:"footer"}},[t._v("\n            ©Howie-Shen 2018\n        ")])],1)],1)],1)}),c=[],d=(i("7f7f"),i("6b54"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{position:"relative"}},[n("div",{attrs:{id:"goodsType"}},[n("scrollView",{on:{"change-type":function(e){t.changeType(e)}}})],1),n("div",{attrs:{id:"goodsList"}},t._l(t.list,function(e,o){return n("div",{key:o},[n("div",{on:{click:function(i){t.$emit("add-goods",e)}}},[n("Card",{staticClass:"goodsItem"},[n("div",{staticClass:"itemTop"},[n("div",{staticStyle:{width:"20%"}},[n("img",{attrs:{src:null!=e.picUrl?"http://localhost:8080/resources/commodityPic/"+e.picUrl:i("50be")}})]),n("div",{staticStyle:{"text-align":"right"}},[n("div",{staticStyle:{color:"red"}},[t._v("￥"+t._s(e.price))]),n("div",[t._v(t._s(e.amount)+"个")])])]),n("div",{staticClass:"itemBotton"},[n("div",[t._v(t._s(e.name))]),n("div",[t._v("("+t._s(e.id)+")")])])])],1)])})),n("div",{attrs:{id:"pageBar"}},[n("Page",{attrs:{total:t.totalItem,"page-size":t.pageSize,"show-elevator":""},on:{"on-change":t.changePage}})],1),t.spinShow?n("Spin",{attrs:{size:"large",fix:""}}):t._e()],1)}),u=[],m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{style:t.style_val,attrs:{id:"wrapper"}},[i("div",{staticStyle:{display:"flex",height:"100%"}},t._l(t.list,function(e,n){return i("div",{key:n,on:{click:function(e){t.$emit("change-type",n)}}},[i("div",{staticClass:"scroll-item",style:t.clickedItemIndex==n?"background-color:#97ACD4;":"",on:{click:function(e){t.clickItem(n)}}},[t._v("["+t._s(e.index)+"] "+t._s(e.mean))])])}))])},h=[],p={name:"scrollView",data:function(){return{style_val:"",direction:"x",x:"scroll",y:"hidden",height:"60px",width:"auto",lastClickedIndex:0,clickedItemIndex:0,list:[{index:0,mean:"粮油零食"},{index:1,mean:"酒水饮料"},{index:2,mean:"清洁洗护"},{index:3,mean:"家电数码"},{index:4,mean:"厨房用品"},{index:5,mean:"首饰美容"},{index:6,mean:"玩具母婴"},{index:7,mean:"果蔬生鲜"},{index:8,mean:"时装箱包"},{index:9,mean:"家具摆饰"},{index:10,mean:"体育棋牌"},{index:11,mean:"文具书簿"},{index:12,mean:"其他"}]}},methods:{clickItem:function(t){this.lastClickedIndex=this.clickedItemIndex,this.clickedItemIndex=t}},created:function(){var t="overflow-x: "+this.x+"; ";t+="overflow-y: "+this.y+"; ",t+="height:"+this.height+"; ",t+="width:"+this.width+"; ",this.style_val=t}},v=p,f=(i("aed1"),i("2877")),g=Object(f["a"])(v,m,h,!1,null,null,null);g.options.__file="scrollView.vue";var y,_,I=g.exports,C="http://localhost:8080",b={host:C},k=b,x=Object(f["a"])(k,y,_,!1,null,null,null);x.options.__file="Global.vue";x.exports;var w={components:{scrollView:I},data:function(){return{list:[],pageSize:20,typeIndex:0,totalItem:0,spinShow:!1}},created:function(){},methods:{changeType:function(t){var e=this;this.spinShow=!0,this.typeIndex=t;var i=this.typeIndex,n=this.pageSize;this.$http.get("http://localhost:8080/commodity/listByType",{params:{commodityType:i,page:0,size:n}}).then(function(t){console.log(t),e.list=t.body.commodityList.content,e.totalItem=t.body.commodityList.totalElements,e.spinShow=!1},function(t){})},changePage:function(t){var e=this;console.log(t);var i=this.typeIndex,n=this.pageSize;this.$http.get("http://localhost:8080/commodity/listByType",{params:{commodityType:i,page:t-1,size:n}}).then(function(t){console.log(t),e.list=t.body.commodityList.content},function(t){})}}},S=w,O=(i("38b9"),Object(f["a"])(S,d,u,!1,null,"0d5779ec",null));O.options.__file="product.vue";var L=O.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"itemContainer",staticStyle:{"margin-top":"10px"}},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",type:"primary",vertical:"true"},on:{click:function(e){t.$emit("order-settle")}}},[t._v("结算")])],1),n("div",{staticClass:"itemContainer"},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",type:"warning",vertical:"true"},on:{click:function(e){t.$emit("item-add")}}},[t._v("+")])],1),n("div",{staticClass:"itemContainer"},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",type:"error",vertical:"true"},on:{click:function(e){t.$emit("item-sub")}}},[t._v("-")])],1),n("div",{staticClass:"itemContainer"},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"},on:{click:function(e){t.$emit("item-del")}}},[t._v("删除")])],1),n("div",{staticClass:"itemContainer"},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"},on:{click:function(e){t.$emit("order-del")}}},[t._v("清空")])],1),n("div",{staticClass:"itemContainer"},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"},on:{click:function(e){t.showDrawer()}}},[t._v("记录")])],1),n("div",{staticClass:"itemContainer"},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"}},[t._v("会员")])],1),n("div",{staticClass:"itemContainer",staticStyle:{"margin-top":"200px"}},[n("i-button",{staticClass:"toolBtn",attrs:{size:"large",long:"",vertical:"true"}},[t._v("更多")])],1),n("Drawer",{attrs:{title:"订单【列表】",placement:"left",closable:!1,width:"360"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}},t._l(t.orderInfoList,function(e,i){return n("div",{key:i},[n("Card",{staticStyle:{"margin-bottom":"10px"},attrs:{padding:10}},[n("div",{on:{click:function(e){t.showOrderDetail(i)}}},[n("Row",[n("i-col",{attrs:{span:"14"}},[t._v("\n                                    订单编号: "+t._s(e.orderId)+"\n                                ")]),n("i-col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v("\n                                    顾客: "+t._s(e.menberId)+"\n                                ")])],1),n("Row",[n("i-col",{attrs:{span:"14"}},[t._v("\n                                    超市编号: "+t._s(e.shopId)+"\n                                ")]),n("i-col",{staticStyle:{"text-align":"right"},attrs:{span:"10"}},[t._v("\n                                    总金额: ￥"+t._s(e.orderAmount)+"\n                                ")])],1),n("Row",[n("i-col",{attrs:{span:"24"}},[t._v("\n                                    下单时间: "+t._s(e.orderTime)+"\n                                ")])],1)],1)])],1)})),n("Drawer",{attrs:{title:"订单【详情】",placement:"left",closable:!1},model:{value:t.value6,callback:function(e){t.value6=e},expression:"value6"}},[n("div",[t._v("基本信息")]),n("div",[n("div",{staticStyle:{"font-size":"15px"}},[t._v("单号: "+t._s(t.ClickedOrderId))]),n("div",{staticStyle:{"font-size":"15px"}},[t._v("总金额: ￥"+t._s(t.ClickedOrderAmount))])]),n("Divider",[t._v("商品列表")]),t._l(t.orderDetailList,function(e,o){return n("div",{key:o},[n("Card",{staticStyle:{margin:"5px 0px"}},[n("div",[n("Row",[n("i-col",{attrs:{span:"6"}},[n("img",{attrs:{src:null!=e.picUrl?"http://localhost:8080/resources/commodityPic/"+e.picUrl:i("50be")}})]),n("i-col",{attrs:{span:"12"}},[t._v("\n                                    "+t._s(e.itemTitle)+"\n                                ")]),n("i-col",{attrs:{span:"6"}},[n("div",{staticStyle:{width:"100%","text-align":"right"}},[t._v("￥"+t._s(e.itemPrice))]),n("div",{staticStyle:{width:"100%","text-align":"right"}},[t._v("×"+t._s(e.itemNum))]),n("div",{staticStyle:{width:"100%","text-align":"right",color:"red"}},[t._v("￥"+t._s(e.itemPrice*e.itemNum))])])],1)],1)])],1)})],2)],1)},z=[],T={name:"orderToolbar",data:function(){return{pageSize:10,value2:!1,value6:!1,orderInfoList:[],orderDetailList:[],ClickedOrderIndex:0,ClickedOrderId:"",ClickedOrderAmount:0}},methods:{showDrawer:function(){var t=this,e=this.pageSize;this.$http.get("http://localhost:8080/order/getOrderList",{params:{page:0,size:e}}).then(function(e){console.log(e),t.orderInfoList=e.body.content,t.value2=!0},function(t){})},showOrderDetail:function(t){var e=this,i=this;this.ClickedOrderIndex=t,this.ClickedOrderId=this.orderInfoList[t].orderId,this.ClickedOrderAmount=this.orderInfoList[t].orderAmount,this.$http.get("http://localhost:8080/order/getOrderDetail",{params:{orderId:i.orderInfoList[t].orderId}}).then(function(t){console.log(t),e.orderDetailList=t.body,e.value6=!0},function(t){})}}},P=T,$=(i("336b"),Object(f["a"])(P,D,z,!1,null,"0ca38969",null));$.options.__file="orderToolbar.vue";var R=$.exports,j={name:"app",components:{product:L,orderToolbar:R},data:function(){return{searchList:[],searchContent:"",searchResultPage:1,searchResultSize:6,searchResultTotal:0,modal:!1,spinShow:!1,superMarketID:"001",salesmanId:"007",onClickOrderItem:null,LastClickOrderItem:null,currTime:null,amount:null,list:[]}},created:function(){var t=this;setInterval(function(){t.currTime=t.formatTime(new Date)},990);for(var e=0,i=0;i<this.list.length;i++)e+=this.list[i].summary;this.amount=e,this.orderId=Date.parse(new Date)/1e3+this.superMarketID},methods:{formatNumber:function(t){return t=t.toString(),t[1]?t:"0"+t},formatTime:function(t){var e=t.getFullYear(),i=t.getMonth()+1,n=t.getDate(),o=t.getHours(),s=t.getMinutes(),r=t.getSeconds();return[e,i,n].map(this.formatNumber).join("/")+" "+[o,s,r].map(this.formatNumber).join(":")},clickOrderItem:function(t){if(this.LastClickOrderItem=this.onClickOrderItem,this.onClickOrderItem=t,this.LastClickOrderItem==t)return this.onClickOrderItem=null},orderItemNumAdd:function(){null!=this.onClickOrderItem?(this.list[this.onClickOrderItem].num++,this.list[this.onClickOrderItem].summary+=this.list[this.onClickOrderItem].price,this.amount+=this.list[this.onClickOrderItem].price):this.$Notice.warning({title:"请先选中订单中的商品项",duration:1.5})},orderItemNumSub:function(){null!=this.onClickOrderItem?1!=this.list[this.onClickOrderItem].num&&(this.list[this.onClickOrderItem].num--,this.list[this.onClickOrderItem].summary-=this.list[this.onClickOrderItem].price,this.amount-=this.list[this.onClickOrderItem].price):this.$Notice.warning({title:"请先选中订单中的商品项",duration:1.5})},orderItemDel:function(){null!=this.onClickOrderItem&&(this.amount-=this.list[this.onClickOrderItem].summary,this.list.splice(this.onClickOrderItem,1))},orderDel:function(){this.amount=0,this.list=[]},addGoods:function(t){console.log(t);for(var e=0,i=0;i<this.list.length;i++)if(this.list[i].id==t.id){e=1,this.$Notice.warning({title:"订单中已存在该商品",duration:1.5});break}e||(t.num=1,t.summary=t.price,this.amount+=t.price,this.list.push(t))},orderSettlement:function(){var t=this;this.spinShow=!0;for(var e=this,i=[],n=0,o=0;o<this.list.length;o++){var s={};s.orderId=this.orderId,s.itemId=this.list[o].id,s.itemTitle=this.list[o].name,s.itemNum=this.list[o].num,s.itemPrice=this.list[o].price,s.itemDiscount=1,s.itemImg=this.list[o].picUrl,s.itemAmout=this.list[o].summary,n+=this.list[o].cost,i.push(s)}var r={};r.orderId=this.orderId,r.salesmanId=this.salesmanId,r.shopId=this.superMarketID,r.menberId=null,r.menberName=null,r.menberPhone=null,r.menberDiscount=1,r.goodsTotalCost=n,r.goodsTotalPrice=this.amount,r.orderDiscount=1,r.orderAmount=this.amount,r.type=1,console.log(i),this.$http.post("http://localhost:8080/order/save",{orderInfo:r,orderDetailList:i}).then(function(i){e.spinShow=!1,console.log(i),t.$Modal.success({title:"购买成功",content:"content"}),e.orderId=Date.parse(new Date)/1e3+t.superMarketID,e.orderDel()},function(t){})},searchProduct:function(){var t=this;this.modal=!0;var e=this.searchContent,i=this.searchResultPage-1,n=this.searchResultSize;this.$http.get("http://localhost:8080/commodity/search",{params:{name:e,page:i,size:n}}).then(function(e){console.log(e),t.searchList=e.body.commodityList.content,t.searchResultTotal=e.body.commodityList.totalElements},function(t){})},changePage:function(t){var e=this;console.log(t);var i=this.searchContent,n=this.searchResultSize;this.$http.get("http://localhost:8080/commodity/search",{params:{name:i,page:t-1,size:n}}).then(function(t){console.log(t),e.searchList=t.body.commodityList.content},function(t){})},toVIP:function(){console.log("afa"),this.$router.push({path:"/Login"})}}},B=j,N=(i("078d"),Object(f["a"])(B,l,c,!1,null,"1bd21259",null));N.options.__file="App.vue";var A=N.exports,M=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div")},E=[],U={name:"Login",data:function(){return{}}},V=U,G=(i("3016"),Object(f["a"])(V,M,E,!1,null,"66526ce9",null));G.options.__file="Login.vue";var H=G.exports;n["default"].use(r.a),n["default"].use(o["a"]),n["default"].use(a["a"]);var F=[{path:"/App",component:A},{path:"/Login",component:H}];n["default"].config.productionTip=!1;var J=new a["a"]({routes:F});new n["default"]({router:J,render:function(t){return t(A)}}).$mount("#app")},"8fb9":function(t,e,i){},aed1:function(t,e,i){"use strict";var n=i("f081"),o=i.n(n);o.a},b3fd:function(t,e){},c009:function(t,e,i){},ed13:function(t,e,i){},f081:function(t,e,i){}});
//# sourceMappingURL=app.bf9668af.js.map