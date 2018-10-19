Ext.define('SupermarketInvoicingSystem.store.statistics.SalesStatisticsPie3DStore', {
    extend: 'Ext.data.Store',
    storeId:'salesStatisticsPie3DStore',
    alias: 'store.salesStatisticsPie3DStore',
    fields: ['os', 'data1' ],
    data: [
        { os: 'Android', data1: 68.3 },
        { os: 'BlackBerry', data1: 1.7 },
        { os: 'iOS', data1: 17.9 },
        { os: 'Windows Phone', data1: 10.2 },
        { os: 'Others', data1: 1.9 }
    ],
    proxy: {
        type: 'memory',
        //type: 'ajax',
        //method:'get',
        //url: 'data/SalesStatisticsdata.json',	//mvc url  xxx.json //data文件夹要放到webapp下
	    reader:{
	    	type:'json',
	    	//rootProperty:'salesStatisticsLists'
	    }
    },
    	
    autoLoad: 'true'
//listeners: {}


    
});
