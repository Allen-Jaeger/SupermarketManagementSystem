Ext.define('SupermarketInvoicingSystem.view.commodity.ComModelPanel',{
	extend: 'Ext.panel.Panel',
	layout:'fit',
	xtype:'comModelPanel',
	title:'详细信息',
	margin:'45 0 0 0',
	layout:'fit',
	items:[{
		padding:'30',
		xtype:'form',
		id:'comModelLookFormId',
		url:'commodity/updateModel',
		method:'POST',
		layout:{
			type:'table',
			columns: 3
		},
		defaults:{
            xtype: 'textfield',
            labelAlign:'right',
            allowBlank: false,
		},
		items:[{
			//图片布局
			layout:{type:'table',columns:1},
			xtype:'panel',
			rowspan: 5,
			width:350,
			height: 400,
			items:[{
				xtype: 'image',
				maxWidth: 350,
				height: 300,
				src: '../../../../../resources/commodityPic/empty.jpg',
				alt:'查找商品样图出错，请重新上传'
			},{
				xtype:'button',
				text:'更改样图',
                handler:'ComPicWindow',
                disabled : true,
			}],
		},{
			xtype:'combobox',
			fieldLabel: '商品类型',
			name:'commodityType',
			store:categoryStore,
			displayField:'name',
			valueField:'name',
			editable: false,			
		},{
			name:'name',
			fieldLabel: '商品名称',
			emptyText:'建议写明商品规格',
			id:'comModelNameId',
		},{
			name:'saveStock',
			fieldLabel: '安全库存',
			inputType:'int',
			regex:/(^[0-9]*$)/,
			regexText:'请输入一个正整数',
			emptyText:'请输入一个正整数',
		},{
			name:'price',
			inputType:'double',
			fieldLabel: '默认售价',
			emptyText:'(RMB:元)',
			regex:/(^[0-9]{1,}[\.]{0,1}[0-9]{0,2}?$)/,
			regexText:'请输入整数或带两位小数的价格'
		},{
			inputType:'int',
			fieldLabel: '条形码',
			name:'barCode',
			id:'comModelBarcodeId',
			regex:/(^[0-9]*$)/,
			regexText:'请输入正确的条形码',
			emptyText:'请对照商品精确输入',
		},{
			name:'commodityStatus',
			fieldLabel: '允许进货',
			xtype:'fieldcontainer',
			defaultType: 'radiofield',
			layout: 'hbox',
			flex:1,
			defaults:{margin:'0 15 0 0'},
			items:[{
	                boxLabel  : '<i style="color:green" class = "fa fa-check"></i>',
	                name      : 'commodityStatus',
	                inputValue: '允许进货',
	                // id        : 'radio1'
                },{
                    boxLabel  : '<i style="color:red" class = "fa fa-close"></i>',
                    name      : 'commodityStatus',
                    inputValue: '不允许进货',
                    checked : true,
                }
			],
		},{
			xtype:'textarea',
			name:'note',
			fieldLabel: '备注',
			colspan:2,
			width:'80%',
			allowBlank: true,
		},{
			xtype:'button',
			text:'<i style="color:white" class = "fa fa-check"></i> 更新 / 新增',
			margin:'0 0 0 150',
			width:120,
			handler:'updateComModel',
			tooltip:'条形码已被记录时更新模板<br />条形码未被记录时新增模板<br />请精确输入条形码。',
		},{
			xtype:'button',
			text:'<i style="color:white" class = "fa fa-close"></i> 删除',
			margin:'0 0 0 50',
			width:120,
			handler:'deleteComModel',		
			tooltip:'删除模板前请确认该模板下的商品库存为0',
			cls:'ljc-bg-red',
		}],
	}],
});