Ext.define('SupermarketInvoicingSystem.store.indent.TransferLeftStore', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.transferLeftStore',
	model:'SupermarketInvoicingSystem.model.indent.CommoditiesModel',
    storeId: 'transferLeftStore',

	proxy: {
		type: 'rest',
		url: '/commodity/findCommodities',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
			totalProperty: 'totalElements'//分页需要知道总记录数
		},
		writer: {
			type: 'json'
		},
		simpleSortMode: true	//简单排序模式
	},
	//autoLoad: true,//先不自动更新获取
	autoSync: true,
	remoteSort: true,//全局(远程)排序
	pageSize: 15,
	sorters: {
		direction: 'ASC',property: 'id'
	},
	listeners: {}
});