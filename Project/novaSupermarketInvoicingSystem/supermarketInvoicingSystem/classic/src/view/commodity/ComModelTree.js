var strG = new Array('允许进货,不允许进货');
var comModelStore = Ext.create('Ext.data.Store', {
    model:'SupermarketInvoicingSystem.model.commodity.ComModelModel',
    storeId:'comModelStoreId',
    data:[
         {id:'1',barCode:'4',commodityType:'TTT',
         period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'scc9',
         price:'scc00',note:'scc000',commodityStatus:'scc0000'},

         {id:'2',barCode:'44',commodityType:'TTT',
         period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'scc9',
         price:'scc00',note:'scc000',commodityStatus:'scc0000'},

         {id:'3',barCode:'444',commodityType:'TT',
         period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'scc9',
         price:'scc00',note:'scc000',commodityStatus:'scc0000'}
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
    var categoryStore = Ext.create('Ext.data.Store', {
    fields: [{name: 'index',type: 'int'},{name: 'name',  type: 'string'}],
    proxy: {
        type: 'ajax',
        url: '/commodity/allType',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
}); //货物数据
var i = 0;
var rt = { expanded: true,children:[],};
var cate;
categoryStore.on('load',function(){
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
        rt.children.push(node);
        i++;
    }
    // console.log(rt);
}); //分类
i=0;
var comMdl;
comModelStore.on('load',function(){
    while(true){
        comMdl = comModelStore.data.getAt(i);
        if(null == comMdl) break;
        comMdl = comMdl.data;
        var node ={};
        node.text = comMdl.name;
        node.barCode = comMdl.barCode;
        node.leaf = true;
        var j = 0;
        while(true){
            var cate = rt.children[j];
            // console.log(cate);
            if(null == cate) break;
            //console.log(cate);
            if (cate.text == comMdl.commodityType) {
                rt.children[j].children.push(node);
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
    items:[{
        xtype: 'treepanel',
        title: '商品分类',
        width: 300,
        rootVisible: false,
        root:rt,
        // id:'comModelTreeId',    
        // listeners:{
        //     beforerender:'beforeRoot',
        // }
    }],

});
