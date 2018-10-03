Ext.define('SupermarketInvoicingSystem.view.userMsg.person', {
    extend: 'Ext.container.Container',
    viewModel: 'personViewModel',
    controller: 'personViewController',

    layout: 'fit',
    title: '我的信息',
    xtype: 'personMsg',
    items: [{
    	xtype:'personPanel',
    }],

}); 