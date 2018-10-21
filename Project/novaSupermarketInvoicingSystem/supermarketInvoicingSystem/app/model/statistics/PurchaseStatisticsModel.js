Ext.define('SupermarketInvoicingSystem.model.statistics.PurchaseStatisticsModel', {
    extend: 'SupermarketInvoicingSystem.model.Base',
    fields: [	//需要修改	//dateFormat: 'Y-m-d'
		{type: 'date' ,name: 'time', dateFormat: 'time'},
		{type: 'auto' ,name: 'purchaseAmount'}
    ]
    		
});