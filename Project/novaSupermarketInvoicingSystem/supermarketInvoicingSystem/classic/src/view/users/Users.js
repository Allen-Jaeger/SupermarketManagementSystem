Ext.define('SupermarketInvoicingSystem.view.users.Users', {
    extend: 'Ext.container.Container',
    viewModel: 'usersViewModel',
    controller:'usersViewController',

    layout: 'fit',
    title: '管理用户信息',
    xtype: 'users',
    items: [{
    	xtype:'usersGrid',
    }],

});