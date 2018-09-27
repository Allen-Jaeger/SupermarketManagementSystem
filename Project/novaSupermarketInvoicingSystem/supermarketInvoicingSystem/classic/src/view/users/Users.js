Ext.define('SupermarketInvoicingSystem.view.users.Users', {
    extend: 'Ext.container.Container',
    viewModel: 'usersViewModel',


    layout: 'fit',
    title: '管理用户信息',
    xtype: 'users',
    items: [{
    	xtype:'usersGrid',
    }],

});