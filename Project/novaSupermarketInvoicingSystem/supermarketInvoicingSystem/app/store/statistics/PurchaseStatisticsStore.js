Ext.define('SupermarketInvoicingSystem.store.statistics.PurchaseStatisticsStore', {
    extend: 'Ext.data.Store',
    storeId:'purchaseStatisticsStore',
    alias: 'store.purchaseStatisticsStore',
	model:'SupermarketInvoicingSystem.model.statistics.PurchaseStatisticsModel',
   
    proxy: {
        //type: 'memory',
        type: 'ajax',
        method:'get',
        url: '/purchaseStatistic/getAllPurchase',	//mvc url  xxx.json //data文件夹要放到webapp下
	    reader:{
	    	type:'json'
	    //	rootProperty:'purchaseStatisticsLists'
	    }
    }
    	
    //autoLoad: 'true'
//listeners: {}


    
});
