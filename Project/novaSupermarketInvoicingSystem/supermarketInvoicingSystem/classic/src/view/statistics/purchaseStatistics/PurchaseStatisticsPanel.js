Ext.define('SupermarketInvoicingSystem.view.statistics.purchaseStatistics.PurchaseStatisticsPanel', {
    extend: 'Ext.container.Container',
    xtype: 'purchaseStatisticsPanel',
    controller: 'purchaseStatisticsViewController',
    viewModel: {type: 'purchaseStatisticsViewModel'},
    layout: 'fit',
    items: [{xtype:'purchaseStatisticsChartPanel'}]
   
});
