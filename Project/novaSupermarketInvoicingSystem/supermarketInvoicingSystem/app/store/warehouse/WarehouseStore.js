Ext.define('SupermarketInvoicingSystem.store.warehouse.WarehouseStore', {
	extend: 'Ext.data.Store',
	storeId:'warehouseStore',
	alias: 'store.warehouseStore',
	model:'SupermarketInvoicingSystem.model.warehouse.WarehouseModel',
	proxy: {
		type: 'rest',
		url: '/warehouse/findAll',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
			totalProperty: 'totalElements'//分页需要知道总记录数
		},
		simpleSortMode: true	//简单排序模式
	},
	autoLoad: true,
	autoSync: true,
	remoteSort: true,//全局(远程)排序
	sorters: {
		direction: 'ASC',property: 'id'
	},
	listeners: {}
});