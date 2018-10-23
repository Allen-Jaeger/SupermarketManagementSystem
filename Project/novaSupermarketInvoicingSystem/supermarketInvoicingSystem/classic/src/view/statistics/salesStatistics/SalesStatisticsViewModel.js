Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.SalesStatisticsViewModel', {
    extend: 'Ext.app.ViewModel',
	alias:'viewmodel.salesStatisticsViewModel',
	requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.reader.Json'
    ],
    stores:{
		salesStatisticsBarStoreLists:{type:'salesStatisticsBarStore'},
        salesStatisticsGridStoreLists:{type:'salesStatisticsOrderInfoGidStore'},
        salesStatisticsPieStoreLists:{type:'salesStatisticsPieStore'},
        salesStatisticsOrderDetailLists:{type:'salesStatisticsOrderDetailStore'}
	}
});