Ext.define('SupermarketInvoicingSystem.view.order.OrderGridPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'orderGridPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date'
    ],
    //controller: 'searchresults',
   // viewModel: {type: 'orderViewModel'},
    layout: 'fit',
    items: [{
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: 'OrderGrid Results',
            //routeId: 'user',
            bind: '{orderLists}',
            scrollable: false,
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'identifier',text: '#'},
                {xtype: 'gridcolumn',width: 75,dataIndex: 'profile_pic',text: 'User',
                    renderer: function(value) {
                        return "<img src='resources/images/user-profile/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
                    }
                },
                {xtype: 'gridcolumn', cls: 'content-column',dataIndex: 'fullname',text: 'Name',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'email',text: 'Email',flex: 1},
                {xtype: 'datecolumn',cls: 'content-column',width: 120,dataIndex: 'joinDate',text: 'Date'},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'subscription',text: 'Subscription',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 120,dataIndex: 'bool',text: 'Actions',tooltip: 'edit ',
                    items: [
                        {xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: 'onEditButton'},
                        {xtype: 'button',iconCls: 'x-fa fa-close'	,handler: 'onDeleteButton'},
                        {xtype: 'button',iconCls: 'x-fa fa-ban'	 	,handler: 'onDisableButton'}
                    ]
                }
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'userPaginationToolbar',
                displayInfo: true,
                bind: '{orderLists}'
            }]
        }]
});
