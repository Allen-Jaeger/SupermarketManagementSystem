Ext.define('SupermarketInvoicingSystem.view.indent.IndentCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'indentCenterPanel',
    controller: 'indentViewController',
    viewModel: {type: 'indentViewModel'},
    layout: 'fit',
    items: [{xtype:'indentGridPanel'}]
});
