Ext.define('SupermarketInvoicingSystem.view.statistics.salesStatistics.SalesStatisticsPanel', {
    extend: 'Ext.container.Container',
    xtype: 'salesStatisticsPanel',
    controller: 'salesStatisticsViewController',
    viewModel: {type: 'salesStatisticsViewModel'},
    layout: 'fit',
    items: [{xtype:'salesStatisticsChartPanel'}]
    
});
