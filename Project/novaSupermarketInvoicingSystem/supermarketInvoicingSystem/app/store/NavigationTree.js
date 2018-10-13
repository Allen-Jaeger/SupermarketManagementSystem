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
                iconCls: 'x-fa fa-font-awesome',
                viewType: 'processDefinitionCenterPanel',
                leaf: true
            },{
                text: '货单申请模块',
                iconCls: 'x-fa fa-file-o',
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
                        iconCls: 'x-fa fa-shopping-cart',
                        viewType: '',
                        leaf: true
                    },{
                        text: '调货工作流模块',
                        iconCls: 'x-fa fa-exchange',
                        viewType: 'transferCenterPanel',
                        leaf: true
                    }
                ]
            },{
                text: '商品管理',
                iconCls: 'x-fa fa-truck',
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',
                children: [
                    {
                        text: '管理商品模板',
                        iconCls: 'x-fa fa-anchor',
                        viewType: 'comModel',
                        leaf: true
                    },{
                        text: '校准库存',
                        iconCls: 'x-fa fa-cubes',
                        //viewType: 'transferCenterPanel',
                        leaf: true
                    }
                ],
            },{
                text: '统计分析',
                iconCls: 'x-fa fa-area-chart',
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',
                children: [
                    {
                        text: '采购统计',
                        iconCls: 'x-fa fa-line-chart',
                        viewType: 'purchaseStatisticsPanel',
                        leaf: true
                    },{
                        text: '销售统计',
                        iconCls: 'x-fa fa-bar-chart',
                        viewType: 'salesStatisticsPanel',
                        leaf: true
                    }
                ],
            },{
                text: '我的信息',
                iconCls: 'x-fa fa-user',
                viewType: 'personMsg',
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
