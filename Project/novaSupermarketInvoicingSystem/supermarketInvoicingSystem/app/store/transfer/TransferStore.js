Ext.define('SupermarketInvoicingSystem.store.transfer.TransferStore', {
    extend: 'Ext.data.Store',
    storeId:'transferStore',
    alias: 'store.transferStore',
    model: 'SupermarketInvoicingSystem.model.transfer.TransferModel',
    //pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'indent/tasks', 			//需要修改
        reader : new Ext.data.JsonReader({  
            type : 'json',  
            rootProperty  : 'content',
            totalProperty : 'totalElements'
        })
        ,simpleSortMode: true
    },
    remoteSort: true,
    sorters: [{ property: 'id',direction: 'desc'}],
    autoLoad: true
});	