Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsGridStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsGridStore',
    alias: 'store.salesStatisticsGridStore',
	model:'SupermarketInvoicingSystem.model.statistics.SalesStatisticsOrderInfoGidModel',
    // fields: ['orderId','payTime', 'goodsTotalCost', 'orderAmount', 'ordeProfits'],
    	
    proxy: {
        //type: 'memory',
        type: 'ajax',
        method:'get',
        url: '/salesStatistics/getAllSales',	//mvc url  xxx.json //data文件夹要放到webapp下
	    reader:{
	    	type:'json'
	    	// rootProperty:'salesStatisticsData'
	    }
    }
    // ,
    	
    // autoLoad: 'true'
//listeners: {}


    
});
