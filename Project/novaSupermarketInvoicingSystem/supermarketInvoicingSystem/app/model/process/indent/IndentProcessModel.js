Ext.define('SupermarketInvoicingSystem.model.process.indent.IndentProcessModel', {
	extend: 'SupermarketInvoicingSystem.model.Base',
	requires: [
		'Ext.data.proxy.Rest'
	],
	/*fields: [
		 {type:'int'   ,name:'id'}         //单id
		,{type:'string',name:'indentNum'}  //单编号
		,{type:'string',name:'creatorId'}  //创建者id
		,{type:'string',name:'keeperId'}  //创建者id
		,{type:'string',name:'managerId'}  //创建者id
		,{type:'string',name:'toWarehouseId'}
		,{type:'string',name:'toShopId'}
		,{type:'string',name:'commoditiesJSON'}
		,{type:'date',name:'createDate',dateFormat:'Y/m/d H:i:s'}  //创建时间
		,{type:'string',name:'indentStatus'}  //订单状态
		,{type:'number',name:'cost'}
		,{type:'string',name:'note'}          //备注
		,{type:'string',name:'indentType'}  //1
		,{type:'string',name:'processInstanceId'} //流程实例id
	],
	proxy: {
		type: 'rest',
		url: '/indent'
	}*/
});