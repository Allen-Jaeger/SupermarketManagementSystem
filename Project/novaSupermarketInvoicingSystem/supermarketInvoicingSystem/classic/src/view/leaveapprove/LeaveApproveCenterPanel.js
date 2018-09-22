Ext.define('SupermarketInvoicingSystem.view.leaveapprove.LeaveApproveCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'leaveApproveCenterPanel',
	layout:'fit',
    margin: '20 20 20 20',
	controller: 'leaveApproveViewController',
    viewModel : { type: 'leaveApproveViewModel'},
	items: [{xtype:'leaveApproveGrid'}]	//需要修改
});