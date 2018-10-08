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
                iconCls: 'x-fa fa-cubes',
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
                        iconCls: 'x-fa fa-cube',
                        //viewType: 'transferCenterPanel',
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
                text: '用户管理',
                iconCls: 'x-fa fa-group',
                expanded: false,
                selectable: false,
                children:[{
                    text: '管理用户信息',
                    iconCls: 'x-fa fa-street-view',
                    viewType: 'users',
                    //hidden:true,
                    //style:'display:none',
                    leaf: true
                },{
                    text: '职员整体概况',
                    iconCls: 'fa fa-bar-chart fa-rotate-90',
                    viewType: 'users',
                    //hidden:true,
                    //style:'display:none',
                    leaf: true
                }],

           }
        ]
    }
});
