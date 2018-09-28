Ext.define('SupermarketInvoicingSystem.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                iconCls: 'x-fa fa-desktop',
                viewType: 'admindashboard',
                routeId: 'dashboard', // routeId defaults to viewType
                leaf: true
            },{
                text: '流程定义模块',
                iconCls: 'x-fa fa-address-card',
                viewType: 'processDefinitionCenterPanel',
                leaf: true
            },{
                text: '货单申请模块',
                iconCls: 'x-fa fa-address-card',
                viewType: 'indentCenterPanel',
                leaf: true
            }, {
                text: '货单工作流模块',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',
                children: [
                    {
                        text: '采购工作流模块',
                        iconCls: 'x-fa fa-file-o',
                        viewType: '',
                        leaf: true
                    },{
                        text: '调货工作流模块',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'transferCenterPanel',
                        leaf: true
                    }
                ]
            },{
                text: '我的信息',
                iconCls: 'x-fa fa-user',
                viewType: 'person',
                //hidden:true,
                //style:'display:none',
                leaf: true
            },{
                text: '管理用户信息',
                iconCls: 'x-fa fa-group',
                viewType: 'users',
                //hidden:true,
                //style:'display:none',
                leaf: true
           }
        ]
    }
});
