var alarmDays = 30;
Ext.define('SupermarketInvoicingSystem.view.commodity.StockTreeGrid',{
	extend: 'Ext.panel.Panel',
	layout:'fit',
	xtype:'stockTreeGrid',
	title:'校准库存',
	iconCls:'x-fa fa-inbox',
	defaults:{
        menuDisabled: true,
    	align: 'center',
	},
	items:[{
		xtype:'gridpanel',
		// reserveScrollbar: true,
		loadMask: true,
	    bind:'{stockTree}',
	    scrollable:true,
	    tbar: [{
	        xtype:'textfield',
	        emptyText:'关键字',
	        id:'stockFilterText',
	    },{
            text: '过滤',
            iconCls: 'fa fa-filter',
            handler: 'filter'
        },{
            text: '取消过滤',
            iconCls: 'fa fa-reply',
            handler: 'cancelFilter'
        },'-',{
        	xtype:'checkboxfield',
        	fieldLabel:'仅看库存警告',
        	labelAlign:'right',
        	labelWidth:90,
        	margin:'0',
        	listeners:{
        		change:'filterWarn',
        	}
        },'->',{
        	xtype:'textfield',
	        emptyText:'默认30天',
	        id:'alarmDaysId',
	        regex:/(^[0-9]*$)/,
			regexText:'请输入一个正整数',
			width:80,
			listeners:{
				change:function( newValue, oldValue, eOpts){
					var reg = /(^[0-9]*$)/;
					if(reg.test(newValue.value)){
						Ext.getCmp('alarmBtnId').setDisabled(false);
					}else{
						Ext.getCmp('alarmBtnId').setDisabled(true);
					}
				}
			}
        },{
        	id:'alarmBtnId',
        	text: '设置预警',
            iconCls: 'fa fa-cog',
            handler: 'alarmDays',
            disabled:true,
        }],
	    columns: [{
	    	flex:4,
	    	text:'商品',
	    	columns:[{
		    	xtype: 'gridcolumn',
		        text: '名称',
		        dataIndex: 'name',
	    		flex:2,
		    },{
		    	xtype: 'gridcolumn',
		        text: '类型',
		        dataIndex: 'commodityType',
	    		flex:1,
		    },{
		    	xtype: 'actioncolumn',
		    	text:'样图',
		    	width:50,
		    	align: 'center',
		    	items:[{
		    		xtype:'button',iconCls:'x-fa fa-picture-o',
		    		tooltip:'点击显示样图',handler:'showPic',
		    	}],
		    }]
	    },{
	    	flex:5,
	    	text:'价值',
	    	columns:[{
		    	xtype: 'gridcolumn', 
		        text: '售价',
	    		align: 'center',
		        dataIndex: 'price',
		        width:60,
		    },{
		    	xtype: 'gridcolumn',
		        text: '平均进货成本',
	    		align: 'center',
		        dataIndex: 'cost',
		    },{
		        text: '存量',
		    	align: 'center',
		        dataIndex: 'amount',
		        summaryType: 'sum',
		        summaryRenderer: function(value, summaryData, dataIndex,metaData ) {
		            return Ext.String.format('总存量:{0}', value);
		        }
	    	},{
		    	text:'总市值',
		    	align: 'center',
		        dataIndex: 'sumPrice',
		        summaryType: 'sum',
		        summaryRenderer: function(value, summaryData, dataIndex,metaData ) {
	            	return Ext.String.format('合计￥{0}', value);
	        	}
		    },{
		    	text:'总购买成本',
		    	align: 'center',
		        dataIndex: 'sumCost',
		        summaryType: 'sum',
		        summaryRenderer: function(value, summaryData, dataIndex,metaData ) {
	            	return Ext.String.format('合计￥{0}', value);
	        	}
		    }],
	    },{
	    	flex:2,
	    	renderer:function(value){
	    		var now = new Date();
	    		var times = value.getTime() - now.getTime();
	    		var fm = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
	    		if (Math.round(times/(1000*60*60*24)) < alarmDays) {
	    			return "<strong style='color:red'>警告:"+fm+"</strong>";
	    		}else{
	    			return fm;
	    		}
	    	},
	        text: '到期日',
	        dataIndex: 'period',
	    },{
	    	flex:1,
	        text: '存放位置',
	        dataIndex: 'depName',
	    },{
	    	flex:1,
	        text: '商品状态',
	        dataIndex: 'commodityStatus',
	    },{
	    	flex:2,
	        text: '备注',
	        dataIndex: 'note',
	    },{
	    	flex:1,
	        xtype: 'actioncolumn',
	        text: '操作',
	        align: 'center',
	        items:[{xtype: 'button', iconCls: 'x-fa fa-pencil',tooltip: '编辑',handler:'editStock'}
        		,{xtype: 'button', iconCls: 'x-fa fa-close',tooltip: '删除记录',handler:'delStock'}
	        ],
	    }],
	    dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{stockTree}'
        }],
	   	features: [{
	        ftype : 'groupingsummary',
	        groupHeaderTpl : '<i class = "fa fa-barcode"></i> 条形码:{name}',
	        hideGroupedHeader : false,
	        enableGroupingMenu : false,
	        expandTip:'点击展开',
	        collapseTip:'点击收起',
	        startCollapsed:true,
	    }],
		listeners:{
			// itemmouseenter:function(record, item, index, e, eOpts){
			// 	console.log()
			// }
	    },
	}],
});