Ext.define('SupermarketInvoicingSystem.model.indent.CommoditiesModel', {
	extend: 'SupermarketInvoicingSystem.model.Base',
	requires: [
			'Ext.data.proxy.Rest'
		],
	fields: [
		 {type:'int'   ,name:'id'}         //单id
		,{type:'int',name:'amount'}  //单编号
		,{type:'string',name:'barCode'}  //条形码
		,{type:'int',name:'commodityStatus'}  //创建者id
		,{type:'int',name:'cost'}  //创建者id
		,{type:'string',name:'name'}
		,{type:'string',name:'picUrl'}
		,{type:'string',name:'commodityType'}
		,{type:'date',name:'period'}//保质期
	
	]
	,
	proxy: {
		type: 'rest',
		url: '/commodity'
	}
});