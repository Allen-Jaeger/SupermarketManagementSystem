Ext.define('SupermarketInvoicingSystem.store.commodity.StockStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockStore',
    storeId: 'StockStoreId',
	 model:'SupermarketInvoicingSystem.model.commodity.StockModel',
	data:[
			{id:'scc3',barCode:'scc4',commodityType:'TTT',cost:'8',
			period:new Date(8888888888888),picUrl:'empty.jpg',name:'scc8',amount:'8',saveStock:'52',
			price:'18',note:'scc000',commodityStatus:'scc0000',depName:'scc8',},

      {id:'s3',barCode:'scc4',commodityType:'TTT',cost:'8',
      period:new Date(867867676),picUrl:'empty.jpg',name:'scc8',amount:'8',saveStock:'29',
      price:'18',note:'scc000',commodityStatus:'scc0000',depName:'scc8',},

      {id:'4843',barCode:'s46486464',commodityType:'TTT',cost:'8',
      period:new Date(245646),picUrl:'empty.jpg',name:'scc8',amount:'8',saveStock:'29',
      price:'18',note:'scc000',commodityStatus:'scc0000',depName:'scc8',},

	],


	pageSize: 15,
    proxy: {
        type: 'ajax',
        url: '/commodity/getAllStock',
        reader : {  
            type : 'json',
            rootProperty  : 'content',
            // totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
 //    remoteSort: true,
    autoLoad: true,
    grouper: {
      property: 'barCode'
    },
    // listeners: {
    //   afterload:function(){
    //     console.log(this);
    //   }
    // }
});
// ,{type: 'string' ,name: 'id'}
//   ,{type: 'string' ,name: 'barCode'}
//   ,{type: 'string' ,name: 'commodityType'}
//   ,{type: 'string' ,name: 'period'}
//   ,{type: 'string' ,name: 'picUrl'}
//   ,{type: 'string' ,name: 'name'}
//   ,{type: 'number' ,name: 'amount'}
//   ,{type: 'number' ,name: 'cost'}
//   ,{type: 'int' ,name: 'saveStock'}
//   ,{type: 'number' ,name: 'price'}    
//   ,{type: 'string',name: 'note'}
//   ,{type: 'string',name: 'commodityStatus'}
//   ,{type: 'string',name: 'depName'}