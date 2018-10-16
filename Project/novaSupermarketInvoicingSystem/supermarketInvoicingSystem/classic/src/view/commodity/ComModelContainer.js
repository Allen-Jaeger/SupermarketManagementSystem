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
        'widget.treepanel',
        'Ext.form.Panel',
        'Ext.panel.Panel',
        'Ext.resizer.BorderSplitter',
        'Ext.fx.Anim',
        'Ext.layout.container.border.Region',
    ],
    layout: {
        type: 'hbox',
    },
    title: '管理商品模板',
    xtype: 'comModel',
    height:'100%',
    items: [{
        // anchor: '20% 100%',
        height: '100%',
    	xtype:'comModelTree',
        border:'1',
    },{
        // anchor: '80%',
        flex:1,
        xtype:'comModelPanel',
        height: '100%',
    }],

});

var categoryStore = Ext.create('Ext.data.Store', {
    data:[{index:'22',name:'TTT'},{index:'22',name:'TT'}],
    fields: [{name: 'index',type: 'int'},{name: 'name',  type: 'string'}],
    proxy: {
        type: 'ajax',
        url: '/commodity/allType',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
}); //货物数据