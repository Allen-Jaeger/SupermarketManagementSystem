Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'indentProcessCenterPanel',
    controller: 'indentProcessViewController',
    viewModel: {type: 'indentProcessViewModel'},
    layout: 'fit',
    items: [{xtype:'indentProcessGridPanel'}]
});
