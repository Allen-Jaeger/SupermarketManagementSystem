Ext.define('SupermarketInvoicingSystem.store.commodity.StockStatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockStatusStore',
    storeId: 'StockStatusStoreId',
	fields:[{type:'auto',name:'index'},{type:'auto',name:'name'},],
	data:[
    {name:'status1',index:'1'},
    {name:'status2',index:'2'},
    {name:'status3',index:'3'},
	],

    proxy: {
        type: 'ajax',
        url: '/commodity/getStockStatus',
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