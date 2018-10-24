Ext.define('SupermarketInvoicingSystem.model.statistics.SalesStatisticsOrderDetailModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
	// requires: [
 //        'Ext.data.proxy.Rest'
 //    ],
    fields: ['itemTitle','itemNum', 'itemPrice', 'itemDiscount']
    // fields: [
    //     {
    //         name: 'salesStatisticsOrderInfoGidModelId',
    //         reference: {
    //             parent: 'SalesStatisticsOrderInfoGidModel',
    //             inverse: {
    //                 autoLoad: false
    //             }
    //         }
    //     },
    //     { name: 'itemTitle'},
    //     { name: 'itemNum'},
    //     { name: 'itemPrice'},
    //     { name: 'itemDiscount'}
    // ]

    // proxy: {
    //     type: 'rest',
    //     url: '/salesStatistics/getSalesDetail'
    // }
});