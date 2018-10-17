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
		reserveScrollbar: true,
		loadMask: true,
	    frame: true,
	    bind:'{stockTree}',
	    scrollable:true,
	    columns: [{
	    	flex:3,
	    	text:'商品',
	    	columns:[{
		    	xtype: 'gridcolumn',
		        text: '名称',
		        dataIndex: 'name',
		    },{
		    	xtype: 'gridcolumn',
		        text: '类型',
		        dataIndex: 'commodityType',
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
	    	flex:1,
	    	renderer:Ext.util.Format.dateRenderer('Y/m/d'),
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
	        items:[{xtype: 'button', iconCls: 'x-fa fa-pencil',tooltip: '编辑'}],
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
	        enableGroupingMenu : false
	    }],
		listeners:{
			// itemmouseenter:function(record, item, index, e, eOpts){
			// 	console.log()
			// }
	    },
	}],
});