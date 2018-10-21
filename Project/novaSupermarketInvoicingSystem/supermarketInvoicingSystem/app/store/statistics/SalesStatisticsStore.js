Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsStore',
    alias: 'store.salesStatisticsStore',
	model:'SupermarketInvoicingSystem.model.statistics.SalesStatisticsModel',
   
    proxy: {
        //type: 'memory',
        type: 'ajax',
        method:'get',
        url: 'data/SalesStatisticsdata.json',	//mvc url  xxx.json //data文件夹要放到webapp下
	    reader:{
	    	type:'json',
	    	rootProperty:'salesStatisticsData'
	    }
    }
    // ,
    	
    // autoLoad: 'true'
//listeners: {}


    
});
