Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsPieStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsPieStore',
    alias: 'store.salesStatisticsPieStore',
//	model:'SupermarketInvoicingSystem.model.statistics.SalesStatisticsModel',
    fields: ['quarterProfits', 'quarterSales', 'quarterTotalCosts', 'quarter'],

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
