Ext.define('SupermarketInvoicingSystem.view.transfer.TransferCenterPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'transferCenterPanel',
	layout:'fit',
    margin: '20 20 20 20',
	controller: 'transferViewController',
    viewModel : { type: 'transferViewModel'},
	items: [{xtype:'transferGrid'}]	//需要修改
});