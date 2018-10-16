Ext.define('SupermarketInvoicingSystem.store.indent.ShopStore', {
	extend: 'Ext.data.Store',
	storeId:'shopStore',
	alias: 'store.shopStore',
	model:'SupermarketInvoicingSystem.model.indent.ShopModel',
	proxy: {
		type: 'rest',
		url: '/shop/findAll',
		reader:{
			type:'json',
			rootProperty:'content',//对应后台返回的结果集名称
		},
		simpleSortMode: true	//简单排序模式
	},
	autoLoad: true
});