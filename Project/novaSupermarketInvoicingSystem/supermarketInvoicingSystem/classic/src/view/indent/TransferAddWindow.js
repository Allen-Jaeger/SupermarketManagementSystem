Ext.define('SupermarketInvoicingSystem.view.indent.TransferAddWindow', {
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
	
    autoShow: true,
    height: 535,
    width: 847,
    layout: 'absolute',
    title: 'Add Transfer Window',

    items: [
        {
            xtype: 'textfield',
            x: 10,
            y: 10,
            width: 201,
            fieldLabel: 'CreatorId',
            value: 'Lzyyyy',
            editable: false
        },
        {
            xtype: 'gridpanel',
            x: 10,
            y: 90,
            height: 250,
            width: 201,
			title: '',
			scrollable: true,
			selModel: {
				type: 'checkboxmodel'
			},
            columns: [
                {
					header:'Name',
                    dataIndex: 'Name',
					sortable: true,
					flex:1
                },
                {
					header:'Num',
					dataIndex: 'Num',
					width: 80,
                    text: 'Number'
                }
            ],
            viewConfig: {
                width: 402
            }
        },
        {
            xtype: 'textfield',
            x: 10,
            y: 50,
            width: 201,
            fieldLabel: 'ToPlace',
            editable: false
        },
        {
            xtype: 'combobox',
            x: 240,
            y: 10,
            width: 220,
			fieldLabel: 'FromPlace',
			store: Ext.create('Ext.data.Store', {
				fields: ['name', 'value'],
				data: [{
						name: '仓库一',
						value: 'WH1'
					}, {
						name: '仓库二',
						value: 'WH2'
					}, {
						name: '仓库三',
						value: 'WH3'
					}, {
						name: '仓库四',
						value: 'WH4'
					}
				]
			}),
			displayField: 'name',
			valueField: 'value',
			value: '全部',
			editable: false,
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: 'Select a warehouse...',
			editable: false,
			listeners: {
				select: '...'
			}
        },
        {
            xtype: 'combobox',
            x: 470,
            y: 10,
            width: 120,
			fieldLabel: '',
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
			value: '全部',
			editable: false,
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: 'Select a type...',
			editable: false,
			listeners: {
				select: '...'
			}
        },
        {
            xtype: 'textfield',
            x: 600,
            y: 10,
            width: 160,
            fieldLabel: 'KeyWord'
        },
        {
            xtype: 'button',
            x: 770,
            y: 10,
            text: 'Search'
        },
        {
            xtype: 'gridpanel',
            x: 290,
            y: 50,
            height: 250,
            width: 540,
			title: '',
			scrollable: true,
			selModel: {
				type: 'checkboxmodel'
			},
            columns: [
				{
					header:'Name',
                    dataIndex: 'Name',
					sortable: true,
					flex:1
                },{
					header:'Num',
					dataIndex: 'Num',
					width: 60
                },{
                    xtype: 'datecolumn',
                    dataIndex: 'date',
					text: 'EXP Date',
					width: 180
                }
            ]
        },
        {
            xtype: 'textareafield',
            x: 10,
            y: 360,
            width: 820,
            fieldLabel: 'Remark'
        },
        {
            xtype: 'button',
            x: 220,
            y: 110,
            width: 60,
            iconCls: 'x-fa fa-arrow-left'
        },
        {
            xtype: 'button',
            x: 220,
            y: 160,
            width: 60,
            iconCls: 'x-fa fa-arrow-right'
        },
        {
            xtype: 'button',
            x: 220,
            y: 220,
            width: 60,
            iconCls: 'x-fa fa-refresh'
        },
        {
            xtype: 'textfield',
            x: 290,
            y: 310,
            width: 200,
			fieldLabel: 'Cost',
			editable: false
        },
        {
            xtype: 'button',
            x: 500,
            y: 310,
            text: 'Calculate'
        },
        {
            xtype: 'button',
            x: 290,
            y: 450,
            width: 120,
            text: 'Submit'
        },
        {
            xtype: 'button',
            x: 430,
            y: 450,
            width: 120,
			text: 'Close',
			handler: function(btn) {
				btn.up('window').close();
			}
		},
		{
            xtype: 'checkboxfield',
            x: 610,
            y: 310,
            fieldLabel: '',
            boxLabel: 'Become a RETREAT Indent'
        }
    ]

});