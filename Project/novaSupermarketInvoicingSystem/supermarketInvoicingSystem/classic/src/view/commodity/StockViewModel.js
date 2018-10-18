Ext.define('SupermarketInvoicingSystem.view.commodity.StockViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stockViewModel',
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
		stockTree: {
            type: 'stockStore'
        },
        stockStatus:{
            type:'stockStatusStore'
        }
    }
});