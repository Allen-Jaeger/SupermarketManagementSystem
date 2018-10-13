﻿Ext.define('SupermarketInvoicingSystem.view.indent.TransferAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.transferAddWindow',

    // requires: [
    //     'Ext.grid.Panel',
    //     'Ext.grid.column.Number',
    //     'Ext.view.Table',
    //     'Ext.form.field.ComboBox',
    //     'Ext.button.Button',
    //     'Ext.grid.column.Date',
    //     'Ext.grid.column.Boolean',
    //     'Ext.form.field.TextArea'
	// ],
	controller:'indentViewController',
    autoShow: true,
    height: 535,
    width: 847,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'absolute',
    title: '添加调货工作单',
    //listeners:{afterRender:'searchRightCommodities'},//显示后更新第一次?→不成功 在mainViewController中查询
    //listeners:{callback:'getFirstLoad'},//显示后更新第一次?→不成功 完全没调用
    //listeners:{onReady:'getFirstLoad'},//显示后更新第一次?→不成功 没调用

    items: [
        {
            xtype: 'textfield',
            x: 10,
            y: 10,
            width: 200,
            name: 'creatorId',
            fieldLabel: '货单创建者',
            id:'creatorId',
            disabled:true
        },
        {
            xtype:'textfield',
            hidden:'true',
            id:'commoditiesJSON',
            name:'commoditiesJSON'
        },
        {
            xtype: 'gridpanel',
            id:'leftList',
            name:'leftList',
            //bind: '{leftList}',
            x: 10,
            y: 90,
            height: 250,
            width: 301,
            scrollable: true,
            store:{type:'transferLeftStore'},
			selModel: {type: 'checkboxmodel'},
            columns: [
                {
					header:'商品名',
                    dataIndex: 'name',
					sortable: true,
					flex:1
                },
                {
					header:'数量',
					dataIndex: 'amount',
					width: 60
                },
                {
                    header:'保质期',
                    xtype: 'datecolumn',
					dataIndex: 'period',
                    format: 'Y/m/d',
					width: 120
                }
            ],
            viewConfig: {
                width: 402
            }
            
            // ,store: Ext.create('Ext.data.Store', {
			// 	fields: ['name', 'num','date'],
			// 	data: [{
			// 			name: 'coco',
            //             amount: '2',
            //             period:'2018/9/9'
			// 		}, {
			// 			name: 'diner',
            //             amount: '1',
            //             period:'2018/10/7'
			// 		}, {
			// 			name: 'coffee',
            //             amount: '5',
            //             period:'2017/12/20 09:09:09'
			// 		}, {
			// 			name: 'rice',
            //             amount: '20',
            //             period:'2018/5/25'
			// 		}
			// 	]
            // })
            
        },
        {
            xtype: 'textfield',
            x: 10,
            y: 50,
            width: 200,
            name:'toPlace',
			id:'toPlace',
            fieldLabel: '送往:',
            disabled:true
        },
        {
            xtype:'textfield',
            hidden:'true',
            id:'toPlaceId',
            name:'toPlaceId'
        },
        {
            xtype:'textfield',
            hidden:'true',
            id:'toPlaceType',
            name:'toPlaceType'
        },
        {
            xtype: 'combobox',
            x: 240,
            y: 10,
            width: 220,
            fieldLabel: '货源:',
            name:'fromPlace',
            hiddenName: 'fromPlace',
			id:'fromPlace',
            store:{type:'wareStore'},

            // store: Ext.create('Ext.data.Store', {
			// 	fields: ['name', 'value'],
			// 	data: [{
			// 			name: '仓库一',
			// 			value: 'WH1'
			// 		}, {
			// 			name: '仓库二',
			// 			value: 'WH2'
			// 		}, {
			// 			name: '仓库三',
			// 			value: 'WH3'
			// 		}, {
			// 			name: '仓库四',
			// 			value: 'WH4'
			// 		}
			// 	]
            // }),
            
            allowBlank:false,
			displayField: 'name',
			valueField: 'index',
			editable: false,
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '空仓库',
			listeners: {
                afterRender:'getWareList',
                // afterrender:function () {//渲染后
                //     this.up('transferAddWindow').getController().searchRightCommodities(); //失败  
                // },
                //afterRender:'searchRightCommodities',//失败 requires a scope object
                select:'searchRightCommodities'
            }
        },
        {
            xtype: 'combobox',
            x: 470,
            y: 10,
            width: 120,
            reference:'searchFieldName', 
			id:'commodityType',
			hideLabel:true, 
			store: Ext.create('Ext.data.Store', {
				fields: ['name', 'value'],
				data: [{
						name: '全部',
						value: ''
					}, {
						name: '粮油零食',
						value: 'FOOD'
					}, {
						name: '酒水饮料',
						value: 'DRINK'
					}, {
						name: '家居清洁',
						value: 'DAILY'
					}, {
						name: '电器',
						value: 'ELETRICAL'
					}, {
						name: '厨房用品',
						value: 'COOKER'
					}, {
						name: '美容洗浴',
						value: 'BATH'
					}, {
						name: '母婴用品',
						value: 'INFANT'
					}, {
						name: '果蔬生鲜',
						value: 'FRESH'
					}
				]
			}),	
			displayField: 'name',
			valueField: 'value',
			value: '',
			editable: false,
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: 'Select a type...',
			listeners: {select:'searchRightCommodities'}
        },
        {
            xtype: 'textfield',
            id:'keyWord',
            x: 600,
            y: 10,
            width: 160,
            fieldLabel: '关键字'
        },
        {
            xtype: 'button',
            name:'SearchButton',
            x: 770,
            y: 10,
            text: 'Search',
            handler: 'searchRightCommodities'
        },
        {
            xtype: 'gridpanel',
            x: 390,
            y: 50,
            height: 250,
            width: 440,
            name:'rightList',
            id:'rightList',
            // bind: '{wareList}',//右列表bind→Store
            store:{type:'wareCommoditiesStore'},//...真的不知道为什么bind用不了 单开store却能用
			scrollable: true,
			selModel: {type: 'checkboxmodel'},
            columns: [
				{
					header:'商品名',
                    dataIndex: 'name',
					sortable: true,
					flex:1
                },{
					header:'数量',
					dataIndex: 'amount',
					width: 60
                },{
                    xtype: 'datecolumn',
                    header:'保质期',
                    dataIndex: 'period',
                    format: 'Y/m/d',
					width: 180
                }
            ]
        },
        {
            xtype: 'textareafield',
            x: 10,
            y: 360,
            width: 820,
            fieldLabel: '备注'
        },
        {
            xtype: 'button',
            x: 320,
            y: 110,
            width: 60,
            iconCls: 'x-fa fa-arrow-left'
        },
        {
            xtype: 'button',
            x: 320,
            y: 160,
            width: 60,
            disabled: true,
            iconCls: 'x-fa fa-arrow-right'
        },
        {
            xtype: 'button',
            x: 320,
            y: 220,
            width: 60,
            iconCls: 'x-fa fa-refresh',
            handler: 'refreshBtn'
        },
        {
            xtype: 'textfield',
            x: 390,
            y: 310,
            width: 200,
			fieldLabel: '成本',
			editable: false
        },
        {
            xtype: 'button',
            x: 600,
            y: 310,
            text: '计算'
        },
        {
            xtype: 'button',
            x: 290,
            y: 450,
            width: 120,
            text: '提交'
        },
        {
            xtype: 'button',
            x: 430,
            y: 450,
            width: 120,
			text: '关闭',
			handler: function(btn) {
				btn.up('window').close();
			}
		},
		{
            xtype: 'checkboxfield',
            x: 220,
            y: 50,
            boxLabel: '残旧品处理货单!!!'
        }
    ]

});