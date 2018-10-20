Ext.define('SupermarketInvoicingSystem.store.process.indent.IndentProcessStore', {
	extend: 'Ext.data.Store',
	storeId:'indentProcessStore',
	alias: 'store.indentProcessStore',
	model:'SupermarketInvoicingSystem.model.process.indent.IndentProcessModel',
	proxy: {
		type: 'rest',
		url: '/indent/tasks',
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
	autoLoad: true,
	autoSync: true,
	remoteSort: true,//全局(远程)排序
	pageSize: 15,
	sorters: {
		direction: 'DESC',property: 'id'
	},
	listeners: {}
});