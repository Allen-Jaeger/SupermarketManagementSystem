Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsBarStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsBarStore',
    alias: 'store.salesStatisticsBarStore',
//	model:'SupermarketInvoicingSystem.model.statistics.SalesStatisticsModel',
    fields: ['monthSales', 'monthProfits', 'month', 'mothTotalCosts'],
    	
    proxy: {
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
