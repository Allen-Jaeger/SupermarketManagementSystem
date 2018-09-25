Ext.define('SupermarketInvoicingSystem.view.userMsg.person', {
    extend: 'Ext.container.Container',
    viewModel: 'personViewModel',


    layout: 'fit',
    title: '我的信息',
    xtype: 'person',
    items: [{
        bind: '{testPersonMsg}',
        items:[{dataIndex : 'name',width : 100,sortable : true}],
    }],

});