Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsOrderDetailStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsOrderDetailStore',
    alias: 'store.salesStatisticsOrderDetailStore',
	model:'SupermarketInvoicingSystem.model.statistics.SalesStatisticsOrderDetailModel',
    	
    proxy: {
        type: 'ajax',
        method:'get',
        url: '/salesStatistics/getSalesDetail',	//mvc url  xxx.json //data文件夹要放到webapp下
	    reader:{
	    	type:'json'
	    	// rootProperty:'salesStatisticsData'
	    }
    }
    // ,
    	
    // autoLoad: 'true'
//listeners: {}


    
});
