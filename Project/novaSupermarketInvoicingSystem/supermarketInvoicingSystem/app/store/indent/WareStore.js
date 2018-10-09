Ext.define('SupermarketInvoicingSystem.store.indent.WareStore', {
	extend: 'Ext.data.Store',
	storeId:'wareStore',
	alias: 'store.wareStore',
	model:'SupermarketInvoicingSystem.model.indent.WareModel',
	proxy: {
		type: 'rest',
		url: '/warehouse/findAll',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
		},
		simpleSortMode: true	//简单排序模式
	},
	autoLoad: true
});