Ext.define('SupermarketInvoicingSystem.view.commodity.ComModelContainer', {
    extend: 'Ext.container.Container',
    viewModel: 'comModelViewModel',
/**
	管理商品模板而不是真正的库存
*/

    layout: 'fit',
    title: '管理商品模板',
    xtype: 'comModel',
    items: [{
    	xtype:'comModelGrid',
    	html:'商品模板',
    }],

});