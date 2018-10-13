Ext.define('SupermarketInvoicingSystem.store.commodity.ComModelStore', {
    extend: 'Ext.data.Store',
    alias: 'store.comModelStore',
    storeId: 'comModelStoreId',
	  model:'SupermarketInvoicingSystem.model.commodity.ComModelModel',
	data:[
			{id:'scc3',barCode:'scc4',commodityType:'TTT',
			period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'scc9',
			price:'scc00',note:'scc000',commodityStatus:'scc0000'},

      {id:'scc3',barCode:'scc4',commodityType:'TTT',
      period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'scc9',
      price:'scc00',note:'scc000',commodityStatus:'scc0000'},

      {id:'scc3',barCode:'scc4',commodityType:'TT',
      period:'scc6',picUrl:'scc7',name:'scc8',saveStock:'scc9',
      price:'scc00',note:'scc000',commodityStatus:'scc0000'}
	],

	pageSize: 5,
    proxy: {
        type: 'ajax',
        url: '/commodity/findAll1',
        reader : {  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
    remoteSort: true,
    autoLoad: true,
    listeners: {}
});
//  {type: 'string' ,name: 'barCode'}
// ,{type: 'string' ,name: 'id'}
// ,{type: 'string' ,name: 'commodityType'}
// ,{type: 'string' ,name: 'period'}
// ,{type: 'string' ,name: 'picUrl'}
// ,{type: 'string' ,name: 'name'}
// ,{type: 'int' ,name: 'saveStock'}
// ,{type: 'number' ,name: 'price'}    
// ,{type: 'string',name: 'note'}
// ,{type: 'string',name: 'commodityStatus'}