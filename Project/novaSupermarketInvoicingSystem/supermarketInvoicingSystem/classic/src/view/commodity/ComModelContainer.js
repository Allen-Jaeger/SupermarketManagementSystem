Ext.define('SupermarketInvoicingSystem.view.commodity.ComModelContainer', {
    extend: 'Ext.container.Container',
    viewModel: 'comModelViewModel',
    controller:'comTreeViewController',

/**
	管理商品模板而不是真正的库存
*/
    requires:[
        'Ext.tree.View',
        'Ext.selection.TreeModel',
        'Ext.tree.Column',
        'Ext.data.TreeStore',
        'Ext.tree.NavigationModel',
        'Ext.data.field.Boolean',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.writer.Json',
        'Ext.mixin.Observable',
        'widget.treepanel'
    ],
    layout: 'fit',
    title: '管理商品模板',
    xtype: 'comModel',
    items: [{
    	xtype:'comModelTree',
    }],

});