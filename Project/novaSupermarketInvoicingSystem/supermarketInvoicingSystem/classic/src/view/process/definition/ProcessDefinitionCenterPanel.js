Ext.define('SupermarketInvoicingSystem.view.process.definition.ProcessDefinitionCenterPanel', {
    extend: 'Ext.container.Container',
    xtype: 'processDefinitionCenterPanel',
    controller: 'processDefinitionViewController',
    viewModel: {type: 'processDefinitionViewModel'},
    layout: 'fit',
    items: [{xtype:'processDefinitionGridPanel'}]
});
