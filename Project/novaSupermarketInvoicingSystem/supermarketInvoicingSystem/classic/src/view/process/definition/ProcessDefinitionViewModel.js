Ext.define('SupermarketInvoicingSystem.view.process.definition.ProcessDefinitionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.processDefinitionViewModel',
    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],
    stores: {
        processDefinitionLists: {type: 'processDefinitionStroe'}
    }
});
