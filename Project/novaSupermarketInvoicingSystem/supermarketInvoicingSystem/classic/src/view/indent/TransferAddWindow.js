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
    controller: 'indentViewController',
    autoShow: true,
    height: 535,
    width: 847,
    constrain: true,
    defaultFocus: 'textfield',
    modal: true,
    layout: 'absolute',
    title: '添加调货工作单',
    //listeners:{afterRender:'searchRightCommodities'},//显示后更新第一次?→不成功 在mainViewController中查询
    //listeners:{callback:'getFirstLoad'},//显示后更新第一次?→不成功 完全没调用
    //listeners:{onReady:'getFirstLoad'},//显示后更新第一次?→不成功 没调用

    items: [{
            xtype: 'textfield',
            x: 10,
            y: 10,
            width: 200,
            name: 'creatorId',
            fieldLabel: '货单创建者',
            id: 'creatorId',
            disabled: true
        },
        {
            id: 'commoditiesJSON',
            name: 'commoditiesJSON',
            xtype: 'textfield',
            hidden: 'true',

        },
        {
            id: 'indentType',
            name: 'indentType',
            xtype: 'textfield',
            hidden: 'true',
        },
        {
            xtype: 'gridpanel',
            id: 'leftList',
            name: 'leftList',
            //bind: '{leftList}',
            x: 10,
            y: 90,
            height: 250,
            width: 301,
            scrollable: true,
            loadMask: true, //load时遮罩效果
            store: {
                type: 'transferLeftStore'
            },
            selModel: {
                type: 'checkboxmodel'
            },
            columns: [{
                    header: 'id',
                    hidden: true,
                    dataIndex: 'id',
                    sortable: true
                },
                {
                    header: '商品名',
                    dataIndex: 'name',
                    sortable: true,
                    flex: 1
                },
                {
                    header: '数量',
                    dataIndex: 'amount',
                    width: 60
                },
                {
                    header: '保质期',
                    xtype: 'datecolumn',
                    dataIndex: 'period',
                    format: 'Y/m/d',
                    width: 120
                }
            ],
            viewConfig: {
                width: 402
            },
            listeners: {
                //双击  
                itemdblclick: function (me, record, item, index, e, eOpts) {
                    if (Ext.getCmp('retreatCheck').getValue() == false) {
                        if (0 != record.get('amount'))
                            Ext.Msg.alert('警告框', '已锁定输入,若要修改请刷新重新列入商品...');
                        else
                            Ext.MessageBox.prompt("输入框", "注意:勿输入超过原有数量的数字<br>请输入调货数量：", function (btn, num) {
                                if (btn == "cancel")
                                    Ext.MessageBox.alert("Result", "你点击了" + btn + "按钮,<br>操作取消...");
                                else {
                                    Ext.MessageBox.alert("Result", "确认调货数量成功,<br>数量为" + num);
                                    record.set('amount', num);
                                }
                            });
                    } else {
                        Ext.Msg.alert('警告框', '原有商品不可修改!!!');
                    }
                }
            }

        },
        {
            xtype: 'textfield',
            x: 10,
            y: 50,
            width: 200,
            name: 'toPlace',
            id: 'toPlace',
            fieldLabel: '送往:',
            disabled: true
        },
        {
            xtype: 'textfield',
            hidden: 'true',
            id: 'toPlaceId',
            name: 'toPlaceId'
        },
        {
            xtype: 'textfield',
            hidden: 'true',
            id: 'toPlaceType',
            name: 'placeType'
        },
        {
            xtype: 'combobox',
            x: 240,
            y: 10,
            width: 220,
            fieldLabel: '货源:',
            name: 'fromWarehouseId',
            hiddenName: 'fromPlace',
            id: 'fromPlace',
            store: {
                type: 'wareStore'
            },

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

            allowBlank: false,
            displayField: 'name',
            valueField: 'index',
            editable: false,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '空仓库',
            listeners: {
                afterRender: 'getWareList',
                // afterrender:function () {//渲染后
                //     this.up('transferAddWindow').getController().searchRightCommodities(); //失败  
                // },
                //afterRender:'searchRightCommodities',//失败 requires a scope object
                select: 'refreshBtn'
            }
        },
        {
            xtype: 'combobox',
            x: 470,
            y: 10,
            width: 120,
            reference: 'searchFieldName',
            id: 'commodityType',
            hideLabel: true,
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
                }, {
                    name: '时装箱包',
                    value: 'DRESS'
                }, {
                    name: '家具摆饰',
                    value: 'FURNITURE'
                }, {
                    name: '体育棋牌',
                    value: 'SPORT'
                }, {
                    name: '文具书簿',
                    value: 'STUDY'
                }, {
                    name: '其他',
                    value: 'ELSE'
                }]
            }),
            displayField: 'name',
            valueField: 'value',
            value: '',
            editable: false,
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: 'Select a type...',
            listeners: {
                select: 'searchRightCommodities'
            }
        },
        {
            xtype: 'textfield',
            id: 'keyWord',
            x: 600,
            y: 10,
            width: 160,
            fieldLabel: '关键字'
        },
        {
            xtype: 'button',
            name: 'SearchButton',
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
            name: 'rightList',
            id: 'rightList',
            // bind: '{wareList}',//右列表bind→Store
            store: {
                type: 'wareCommoditiesStore'
            }, //...真的不知道为什么bind用不了 单开store却能用
            scrollable: true,
            selModel: {
                type: 'checkboxmodel'
            },
            loadMask: true, //load时遮罩效果
            columns: [{
                    header: 'id',
                    hidden: true,
                    dataIndex: 'id',
                    sortable: true
                },
                {
                    header: '商品名',
                    dataIndex: 'name',
                    sortable: true,
                    flex: 1
                }, {
                    header: '数量',
                    dataIndex: 'amount',
                    width: 60
                }, {
                    xtype: 'datecolumn',
                    header: '保质期',
                    dataIndex: 'period',
                    format: 'Y/m/d',
                    width: 180
                }
            ],
            listeners: {
                //双击  
                itemdblclick: function (me, record, item, index, e, eOpts) {
                    if (Ext.getCmp('retreatCheck').getValue() == true) {
                        if (0 != record.get('amount'))
                            Ext.Msg.alert('警告框', '已锁定输入,若要修改请刷新重新列入商品...');
                        else
                            Ext.MessageBox.prompt("输入框", "注意:勿输入超过原有数量的数字<br>请输入调货数量：", function (btn, num) {
                                if (btn == "cancel")
                                    Ext.MessageBox.alert("Result", "你点击了" + btn + "按钮,<br>操作取消...");
                                else {
                                    Ext.MessageBox.alert("Result", "确认调货数量成功,<br>数量为" + num);
                                    record.set('amount', num);
                                }
                            });
                    } else {
                        Ext.Msg.alert('警告框', '原有商品不可修改!!!');
                    }
                }
            }
        },
        {
            id: 'note',
            name: 'note',
            xtype: 'textareafield',
            x: 10,
            y: 360,
            width: 820,
            fieldLabel: '备注'
        },
        {
            id: 'leftBtn',
            xtype: 'button',
            x: 320,
            y: 110,
            width: 60,
            iconCls: 'x-fa fa-arrow-left',
            handler: 'commoditiesListRightToLeft'
        },
        {
            id: 'rightBtn',
            xtype: 'button',
            x: 320,
            y: 160,
            width: 60,
            disabled: true,
            iconCls: 'x-fa fa-arrow-right',
            handler: 'commoditiesListLeftToRight'
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
            id: 'cost',
            name: 'cost',
            xtype: 'textfield',
            x: 390,
            y: 310,
            width: 200,
            fieldLabel: '成本(RMB:元)',
            editable: false
        },
        {
            xtype: 'button',
            x: 600,
            y: 310,
            text: '计算',
            handler: 'calculateTransferCost'
        },
        {
            id: 'submitBtn',
            xtype: 'button',
            x: 290,
            y: 450,
            width: 120,
            text: '提交',
            disabled: true,
            handler: 'submitTransferForm'
        },
        {
            xtype: 'button',
            x: 430,
            y: 450,
            width: 120,
            text: '关闭',
            handler: function (btn) {
                btn.up('window').close();
            }
        },
        {
            id: 'retreatCheck',
            xtype: 'checkbox',
            x: 220,
            y: 50,
            boxLabel: '残旧品处理货单!!!',
            listeners: {
                change: 'listenCheckChange'
            }
        }
    ]

});