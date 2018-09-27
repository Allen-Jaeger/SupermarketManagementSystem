Ext.define('SupermarketInvoicingSystem.view.users.UsersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usersViewModel',
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
		allUsers: {
            type: 'usersStore'
        }
    }
});