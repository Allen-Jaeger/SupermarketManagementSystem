Ext.define('SupermarketInvoicingSystem.view.commodity.StockContainer', {
    extend: 'Ext.container.Container',
    viewModel: 'stockViewModel',
    controller:'stockViewController',
    xtype:'stock',

    requires:[
        'Ext.tree.*',
        'Ext.selection.TreeModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.grid.feature.GroupStore'
    ],
    layout: {
        
    },
    height:'100%',
    items: [{
        xtype:'stockTreeGrid',
    }],

});