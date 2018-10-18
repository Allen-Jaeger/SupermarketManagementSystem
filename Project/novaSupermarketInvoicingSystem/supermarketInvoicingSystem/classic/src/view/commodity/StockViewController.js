Ext.define('SupermarketInvoicingSystem.view.commodity.StockViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockViewController',
    showPic:function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var oldSrc ="../../../../../resources/commodityPic/" + record.data.picUrl;
    	// console.log(url);
    	// Ext.Msg.alert("样图","<img src='"+url+"' alt='shit' />");
    	// var oldSrc = "../../../../..";
    	Ext.create('Ext.window.Window',{
    		padding:'30',
    		modal:true,
    		title:'上传商品特例图片',
    		items:[{
				//图片布局
				layout:{type:'table',columns:1},
				xtype:'form',
				url:'/commodity/stockPic',
				method:'POST',
				rowspan: 5,
				width:350,
				height: 400,
				items:[{
					xtype: 'image',
					maxWidth: 350,
					height: 300,
					src: oldSrc,
					alt:'查找商品样图出错，请重新上传'
				},{
					xtype:'filefield',
					buttonText:'选择图片',
					width:'80%',
					name:'picFile',
					accept: 'image/*',
					listeners:{ //监听预览 浏览器保护
                        change:function(file){
                            var newImg= this.inputEl.component.fileInputEl.dom.files[0];//新图片
                            // console.log(newImg);
                            // console.log(this.up('form').down('image'));
                            // console.log(this.up('form').down('button'));
                            if (null == newImg) {
                                this.up('form').down('button').setDisabled(true);
                            }else{
                                this.up('form').down('image').setSrc(window.URL.createObjectURL(newImg));
                                this.up('form').down('button').setDisabled(false);
                            }
                        }
                    }
				},{xtype:'hidden',name:'stockId',value:record.data.id,}
				,{
					xtype:'button',
					text: '开始上传',
					disabled:true,
					handler:function(){
						this.up('form').submit({
							success:function(form,action){
								// var res = Ext.decode(response.responseText);
								Ext.Msg.alert('<i class="fa fa-warning" style="color:orange"></i> 注意',action.result.info);
								Ext.data.StoreManager.lookup('StockStoreId').reload();
				                this.form.owner.up('window').destroy();
							},
							failure: function(form, action) {
		                        Ext.Msg.alert('错误！','获取服务器响应失败');
		                        this.form.owner.up('window').destroy();
		                    }
						});
					}
				}],
			}]
    	}).show();
    },
    editStock:function(view,rowIndex,colIndex,item,e,record,row){
    	var staSrc = "resources/commodityPic/"+record.data.picUrl;
    	var win = Ext.create('Ext.window.Window',{
    		modal:true,
    		title:'编辑库存',
    		iconCls:'x-fa fa-pencil',
    		padding:'20',
    		items:[{
    			xtype:'form',
    			layout:{
    				type:'table',
    				columns:2
    			},
    			defaults:{margin:'0 5',},
    			items:[{
    				xtype:'fieldset',
    				title: '<i class="fa fa-lock fa-lg"></i> 参数不允许编辑',
			        defaults:{
	    				xtype:'textfield',
	    				labelAlign:'right',
	    				editable:false,
	    				readOnly:true,
	    				style:{
	    					border: '0',
	    				},  
	    			},
			        layout:{type:'table',columns:1,},
			        items:[{
			        	margin:'0 0 10 0',
			        	xtype:'image',
	    				src:staSrc,
	    				alt:'图片加载失败,请重新上传',
	    				height:160,
	    				style: {
				            float:'right',
				        }
	    			},{
	    				fieldLabel:'条形码',
	    				name:'barCode',	
	    			},{
	    				fieldLabel:'存放位置',
	    				name:'depName',
	    			},{
	    				fieldLabel:'商品类型',
	    				name:'commodityType',
	    			},{
	    				fieldLabel:'平均进货成本',
	    				name:'cost',
	    			},],
    			},{
    				xtype:'fieldset',
    				title: '<i class="fa fa-unlock fa-lg"></i> 可编辑参数',
			        defaults:{
	    				xtype:'textfield',
	    				labelAlign: 'right',
	    				allowBlank: false,
	    			},
			        layout:{type:'table',columns:1},
			        items:[{
	    				fieldLabel:'商品名称',
	    				name:'name',
	    			},{
	    				fieldLabel:'售价',
	    				name:'price',
						emptyText:'(RMB:元)',
						regex:/(^[0-9]{1,}[\.]{0,1}[0-9]{0,2}?$)/,
						regexText:'请输入整数或带两位小数的价格',
						emptyText:'请输入整数或带两位小数的价格',
	    			},{
	    				fieldLabel:'存量',
	    				name:'amount',
						regex:/(^[0-9]*$)/,
						regexText:'请输入一个正整数',
						emptyText:'请输入一个正整数',
	    			},{
	    				xtype:'datefield',
	    				fieldLabel:'保质期',
	    				name:'periodEx',
	    				format:'Y-m-d',
	    				value:record.data.period,
	    			},{
	    				xtype:'combobox',
	    				fieldLabel:'商品状态',
	    				name:'commodityStatus',
	    				editable:false,
	    				store: Ext.data.StoreManager.lookup('StockStatusStoreId'),
	    				displayField:'name',
	    				displayField:'name',
	    			},{
	    				allowBlank:true,
	    				xtype:'textarea',
	    				fieldLabel:'备注',
	    				name:'note',
	    			},{
	    				xtype:'button',
	    				iconCls:'x-fa fa-check',
	    				text:'提交',
	    				margin:'0 0 5 10',
	    				style: {
				            float:'right',
				        },
				        handler:function(){
				        	var form = this.up('form');
				        	if(form.isValid()){
				        		form.submit({
    								url:'commodity/editStock',
    								method:'POST',
    								params: {
								        stockId: record.data.id,
								    },
								    success:function(form, action){
								    	Ext.Msg.alert('<i class="fa fa-warning" style="color:orange"></i> 注意',action.result.info);
										Ext.data.StoreManager.lookup('StockStoreId').load();
				                		this.form.owner.up('window').destroy();
								    },
								    failure: function(form, action) {
				                        Ext.Msg.alert('错误！','获取服务器响应失败');
				                        this.form.owner.up('window').destroy();
				                    }
				        		});
				        	}
				        }
	    			}],
    			},],
    		}],
    	}).show();
		win.down('form').loadRecord(record);
		
    }
});
