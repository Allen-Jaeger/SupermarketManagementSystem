﻿Ext.define('SupermarketInvoicingSystem.view.leaveapprove.LeaveApproveViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.leaveApproveViewModel',
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
    	leaveApproveStore: {type: 'leaveApproveStore'}//调用组件2
    }
});
