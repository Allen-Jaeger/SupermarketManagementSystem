Ext.define('SupermarketInvoicingSystem.view.leave.LeaveViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.leaveViewModel',
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
        leaveLists: {type: 'leaveStroe'}
    }
});
