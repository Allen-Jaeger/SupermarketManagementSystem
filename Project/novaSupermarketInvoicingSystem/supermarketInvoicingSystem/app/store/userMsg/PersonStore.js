Ext.define('SupermarketInvoicingSystem.store.userMsg.PersonStore', {
    extend: 'Ext.data.Store',
    storeId:'personalStroe',
    alias: 'store.personStore',
	model:'SupermarketInvoicingSystem.model.userMsg.PersonModel',

	//pageSize: 15,
    proxy: {
        type: 'ajax',
        url: '/findMe',
        reader : {  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        }
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'workNum',direction: 'desc'}],
    autoLoad: true,
    listeners: {}


});