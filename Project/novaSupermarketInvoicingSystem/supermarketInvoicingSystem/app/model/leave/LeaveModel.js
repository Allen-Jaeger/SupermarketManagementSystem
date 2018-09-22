Ext.define('SupermarketInvoicingSystem.model.leave.LeaveModel', {
	extend: 'SupermarketInvoicingSystem.model.Base',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: [
		{type:'int',name:'id'}
		,{type:'string',name:'userId'}
		,{type:'date',name:'startTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'endTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'realityStartTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'realityEndTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'date',name:'applyTime',dateFormat:'Y/m/d H:i:s'}
		,{type:'string',name:'leaveType'}
		,{type:'string',name:'processStatus'}
		,{type:'string',name:'reason'}
		,{type:'string',name:'processInstanceId'}
	],
	proxy: {
		type: 'rest',
		url: '/leave',
	}
});
