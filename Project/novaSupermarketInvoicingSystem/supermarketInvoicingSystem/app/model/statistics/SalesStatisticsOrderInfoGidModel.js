Ext.define('SupermarketInvoicingSystem.model.statistics.SalesStatisticsOrderInfoGidModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
    fields: ['orderId','payTime', 'goodsTotalCost', 'orderAmount', 'ordeProfits']
});