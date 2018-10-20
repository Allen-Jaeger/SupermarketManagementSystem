Ext.define('SupermarketInvoicingSystem.view.commodity.ComModelViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.comModelViewModel',
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
		comModelList: {
            type: 'comModelStore'
        }
    }
});