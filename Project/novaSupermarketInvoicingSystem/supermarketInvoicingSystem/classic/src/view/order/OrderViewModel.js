Ext.define('SupermarketInvoicingSystem.view.order.OrderViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.orderViewModel',

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
		orderLists: {type: 'orderGridStroe'}
    }
});
