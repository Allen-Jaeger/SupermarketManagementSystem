Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsOrderInfoGidStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsOrderInfoGidStore',
    alias: 'store.salesStatisticsOrderInfoGidStore',
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
