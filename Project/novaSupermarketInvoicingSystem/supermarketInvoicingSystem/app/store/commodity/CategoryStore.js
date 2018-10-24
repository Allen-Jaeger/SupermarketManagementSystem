Ext.define('SupermarketInvoicingSystem.store.commodity.CategoryStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.categoryStore',
    storeId: 'categoryStoreId',
	fields: [
        {type: 'int' ,name: 'index'},
        {type: 'string' ,name: 'name'},
        {name: 'children',type: 'auto'},
        {name: 'text',type: 'auto'},
        {name: 'leaf',type: 'auto'},
  	],
	// data:[
	// 		{index:'2',name:'TT'},

 //      {index:'1',name:'T'},

 //      {index:'3',name:'TTT'}
	// ],

	// pageSize: 5000,
    proxy: {
        type: 'ajax',
        url: '/commodity/findAllModel',
        reader : {  
            type : 'json',  
            // rootProperty  : 'content',
            // totalProperty : 'totalElements'
        }
        // ,simpleSortMode: true
    },
    // remoteSort: true,
    autoLoad: true,
    // listeners: {}
});