Ext.define('SupermarketInvoicingSystem.view.statistics.purchaseStatistics.PurchaseStatisticsViewModel', {
    extend: 'Ext.app.ViewModel',
	alias:'viewmodel.purchaseStatisticsViewModel',
	requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.reader.Json'
    ],
    stores:{
		purchaseStatisticsLists:{type:'purchaseStatisticsStore'}
	}
});