Ext.define('SupermarketInvoicingSystem.store.indent.WareCommoditiesStore', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.wareCommoditiesStore',
	model:'SupermarketInvoicingSystem.model.indent.CommoditiesModel',
    storeId: 'wareCommoditiesStore',

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
	//autoLoad: true,//自动更新暂且注释 响应点击事件看看
	//autoSync: true,
	remoteSort: true,//全局(远程)排序
	pageSize: 15,
	sorters: {
		direction: 'ASC',property: 'id'
	},
	listeners: {}
});