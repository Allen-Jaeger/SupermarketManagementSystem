Ext.define('SupermarketInvoicingSystem.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'fit',
    
    listeners: {
        hide: 'onHideView',
        afterrender:function(){

            // let newRoot = {
            //     expanded: true,
            //     children: [
            //         {
            //             text: 'Dashboard',
            //             iconCls: 'x-fa fa-desktop',
            //             viewType: 'admindashboard',
            //             routeId: 'dashboard', // routeId defaults to viewType
            //             leaf: true
            //         },{
            //             text: 'Dashboard22',
            //             iconCls: 'x-fa fa-desktop',
            //             leaf: true
            //         }
            //     ]
            // };
            // Ext.data.StoreManager.lookup('NavigationTree').setRoot(newRoot);
            // console.log(Ext.data.StoreManager.lookup('NavigationTree'));
        }
    },
	width:'100%',
    html:'<iframe src="/home.html" frameborder="0" width="100%" height="100%"></iframe>'
    //items: []
});
