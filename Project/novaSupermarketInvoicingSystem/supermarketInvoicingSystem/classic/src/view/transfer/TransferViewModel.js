Ext.define('SupermarketInvoicingSystem.view.transfer.TransferViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.transferViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],
    stores: {
    	transferStore: {type: 'transferStore'}//调用组件2
    }
});
