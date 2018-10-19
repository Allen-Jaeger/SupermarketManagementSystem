Ext.define('SupermarketInvoicingSystem.store.commodity.StockTypeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockTypeStore',
    storeId: 'StockTypeStoreId',
	fields:[{type:'auto',name:'index'},{type:'auto',name:'name'},],
	data:[
        {name:'Type1',index:'1'},
        {name:'Type2',index:'2'},
        {name:'Type3',index:'3'},
	],

    proxy: {
        type: 'ajax',
        url: '/commodity/getStockType',
        reader : {  
            type : 'json',
            rootProperty  : 'content',
            // totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
 //    remoteSort: true,
    autoLoad: true,
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