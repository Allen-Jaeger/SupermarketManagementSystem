Ext.define('SupermarketInvoicingSystem.view.userMsg.person', {
    extend: 'Ext.container.Container',
    viewModel: 'personViewModel',
    
    layout: 'fit',
    title: '我的信息',
    xtype: 'person',
    items: [{
    	xtype:'personPanel',
    }],

});