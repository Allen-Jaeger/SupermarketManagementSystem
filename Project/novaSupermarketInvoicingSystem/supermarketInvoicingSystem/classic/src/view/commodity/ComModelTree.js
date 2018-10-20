var strG = new Array('允许进货,不允许进货');
var comModelStore = Ext.create('Ext.data.Store', {
    model:'SupermarketInvoicingSystem.model.commodity.ComModelModel',
    storeId:'comModelStoreId',
    data:[
         {id:'1',barCode:'4',commodityType:'TTT',
         period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'234',
         price:'123',note:'scc000',commodityStatus:'不允许进货'},

         {id:'2',barCode:'44',commodityType:'TTT',
         period:'scc6',picUrl:'test001.jpeg',name:'scc8',saveStock:'234',
         price:'123',note:'scc000',commodityStatus:'不允许进货'},

         {id:'3',barCode:'444',commodityType:'TT',
         period:'scc6',picUrl:'comDefault.jpg',name:'scc8',saveStock:'234',
         price:'123',note:'scc000',commodityStatus:'允许进货'}
    ],
    pageSize: 50000,
    proxy: {
        type: 'ajax',
        url: '/commodity/allComModel?status='+strG,
        reader : {  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
    remoteSort: true,
    autoLoad: true,
});


var rt = { expanded: true,children:[],};
categoryStore.load();
categoryStore.on('load',function(){
    var i = 0;
    var cate;
    while (true) {
        cate = categoryStore.getAt(i);
        if (null == cate) {
            break;
        }
        cate = cate.data;
        // console.log(cate);
        var node = {};
        node.text = cate.name;
        node.id = cate.index;
        // node.expanded = true;
        node.children = [];
        rt.children[i]=node;
        i++;
    }
    // console.log(rt);
}); //分类
comModelStore.load();
comModelStore.on('load', function() {
    var ii = 0;
    while(true){
        if(null != rt.children[ii]){
            rt.children[ii].children = [];
        }else{
            break;
        }
        ii++;
    }
    var comMdl;
    var i = 0;
    var cate;
    while (true) {
        comMdl = comModelStore.data.getAt(i);
        if (null == comMdl) {
            break; 
        }
        comMdl = comMdl.data;
        var node = {};
        node.text = comMdl.name;
        node.barCode = comMdl.barCode;
        node.iconCls = 'fa-shopping-bag';
        node.leaf = true;
        var j = 0;
        while (true) {
            var cate = rt.children[j];
            if (null == cate) {
                break;
            }
            if (cate.text == comMdl.commodityType) {
                var l = rt.children[j].children.length;
                rt.children[j].children[l] = node;
                break;
            }
            j++;
        }
        i++;
    }
  // console.log(rt);
});

//本体  (*^__^*) 嘻嘻……
Ext.define('SupermarketInvoicingSystem.view.commodity.ComModelTree', {
    extend: 'Ext.panel.Panel',
    xtype: 'comModelTree',
    //title: '管理用户信息',
    margin:'0 0 0 0',
    scrollable:true,
    items:[{
        xtype: 'treepanel',
        title: '商品分类',
        width: 300,
        rootVisible: false,
        scrollable:true,
        root:rt,
        // root:{
        //     expanded:true,
        //     children:[
        //         {leaf:true, text:'444',barCode:'444'},
        //         {leaf:true, text:'44',barCode:'44'},
        //     ]
        // },
        id:'comModelTreeId',    
        listeners:{
            itemclick:'clickLeaf',
        }
    }],

});
