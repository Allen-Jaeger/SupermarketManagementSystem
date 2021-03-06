﻿Ext.define('SupermarketInvoicingSystem.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    model:'SupermarketInvoicingSystem.model.MenuTreeModel',

    proxy:{
        type: 'ajax',
        url: '/getMenu',
        reader : {  
            type : 'json',  
            // rootProperty  : 'root',
        }
    }, 
    autoLoad: true,
    // root: {
    //     expanded: true,
    //     children: [
    //         {
    //             text: 'Dashboard',
    //             iconCls: 'x-fa fa-desktop',
    //             viewType: 'admindashboard',
    //             routeId: 'dashboard', // routeId defaults to viewType
    //             leaf: true
    //         },
    //     ]
    // },

});


    // listeners:{
    //     beforeload:function( store, operation, eOpts ) {
    //         console.log(store.root);
    //     }
    // },
    // root: {
    //     expanded: true,
    //     children: [
    //         {
    //             text: 'Dashboard',
    //             iconCls: 'x-fa fa-desktop',
    //             viewType: 'admindashboard',
    //             routeId: 'dashboard', // routeId defaults to viewType
    //             leaf: true
    //         },{
    //             text: '流程定义模块',
    //             iconCls: 'x-fa fa-font-awesome',
    //             viewType: 'processDefinitionCenterPanel',
    //             leaf: true
    //         }
    //         // ,{
    //         //     text: '实业信息',
    //         //     iconCls: 'x-fa fa-building-o',
    //         //     viewType: 'locationContainer',
    //         //     leaf: true
    //         // }
    //         ,{
    //             text: '货单模块',
    //             iconCls: 'x-fa fa-leanpub',
    //             expanded: false,
    //             selectable: false,
    //             //routeId: 'pages-parent',
    //             //id: 'pages-parent',
    //             children: [
    //                 {
    //                     text: '货单申请模块',
    //                     iconCls: 'x-fa fa-file-o',
    //                     viewType: 'indentCenterPanel',
    //                     leaf: true
    //                 },{
    //                     text: '货单工作流模块',
    //                     iconCls: 'x-fa fa-shopping-cart',
    //                     viewType: 'indentProcessCenterPanel',
    //                     leaf: true
    //                 }
    //             ]
    //         },{
    //             text: '商品管理',
    //             iconCls: 'x-fa fa-cubes',
    //             expanded: false,
    //             selectable: false,
    //             //routeId: 'pages-parent',
    //             //id: 'pages-parent',
    //             children: [
    //                 {
    //                     text: '管理商品模板',
    //                     iconCls: 'x-fa fa-cube',
    //                     viewType: 'comModel',
    //                     leaf: true
    //                 },{
    //                     text: '校准库存',
    //                     iconCls: 'x-fa fa-inbox',
    //                     viewType: 'stock',
    //                     leaf: true
    //                 }
    //             ],
    //         },{
    //             text: '统计分析',
    //             iconCls: 'x-fa fa-area-chart',
    //             expanded: false,
    //             selectable: false,
    //             //routeId: 'pages-parent',
    //             //id: 'pages-parent',
    //             children: [
    //                 {
    //                     text: '采购统计',
    //                     iconCls: 'x-fa fa-line-chart',
    //                     viewType: 'purchaseStatisticsPanel',
    //                     leaf: true
    //                 },{
    //                     text: '销售统计',
    //                     iconCls: 'x-fa fa-bar-chart',
    //                     viewType: 'salesStatisticsPanel',
    //                     leaf: true
    //                 }
    //             ],
    //         },{
    //             text: '我的信息',
    //             iconCls: 'x-fa fa-user',
    //             viewType: 'personMsg',
    //             //hidden:true,
    //             //style:'display:none',
    //             leaf: true
    //         },{
    //             text: '用户管理',
    //             iconCls: 'x-fa fa-group',
    //             expanded: false,
    //             selectable: false,
    //             children:[{
    //                 text: '管理用户信息',
    //                 iconCls: 'x-fa fa-street-view',
    //                 viewType: 'users',
    //                 //hidden:true,
    //                 //style:'display:none',
    //                 leaf: true
    //             },{
    //                 text: '职员整体概况',
    //                 iconCls: 'fa fa-bar-chart fa-rotate-90',
    //                 viewType: 'usersChart',
    //                 //hidden:true,
    //                 //style:'display:none',
    //                 leaf: true
    //             }],

    //        }
    //     ]
    // }

