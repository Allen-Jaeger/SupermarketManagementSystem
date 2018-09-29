Ext.define('SupermarketInvoicingSystem.store.commodity.ComModelStore', {
    extend: 'Ext.data.Store',
    alias: 'store.comModelStore',
	  model:'SupermarketInvoicingSystem.model.commodity.ComModelModel',
	// data:[
	// 		{id:'scc1',
	// 		workNum:'scc2',
	// 		password:'scc3',
	// 		name:'scc4',
	// 		gender:'scc5',
	// 		identity:'scc6',
	// 		userType:'scc7',
	// 		privileges:'scc8',
	// 		hireDate:'scc9',
	// 		iconUrl:'scc00',
	// 		userStatus:'scc000',
	// 		depName:'scc0000'}
	// ],
	pageSize: 5,
    proxy: {
        type: 'ajax',
        url: '/commodity/findAll',
        reader : {  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
    remoteSort: true,
    //sorters: [{ property: 'workNum',direction: 'desc'}],
    autoLoad: true,
    listeners: {}
   // proxy: {
   //      type: 'memory',
   //      //url: '/findMe',
   //      reader : {  
   //          type : 'json',  
   //          //rootProperty  : 'content',
   //          //totalProperty : 'totalElements'
   //      }
   //      ,simpleSortMode: true
   //  },




});