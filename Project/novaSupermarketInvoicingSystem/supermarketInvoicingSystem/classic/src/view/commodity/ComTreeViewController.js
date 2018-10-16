Ext.define('SupermarketInvoicingSystem.view.commodity.ComTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.comTreeViewController',
    clickLeaf:function(record, item, index, e, eOpts){
                // console.log();
                // console.log(comModelStore.findRecord('barCode',item.data.barCode));
                if (!item.data.leaf) {
                	return false;
                }
                comModelStore.load();
                comModelStore.on('load',function(){
	                var res = comModelStore.findRecord('barCode',item.data.barCode)
	                var form = Ext.getCmp('comModelLookFormId');
	                form.loadRecord(res);
	                form.down('image').setSrc("../../../../../resources/commodityPic/" + res.data.picUrl);
	                // console.log(form.down('button'));
	                form.down('button').setDisabled(false);
	                // console.log(form.down('subCls'));
                });
           	},
    ComPicWindow:function(){	//上传商品模板图片窗口
    	// if (Ext.getCmp('comModelLookFormId')) {}
    	var oldSrc = Ext.getCmp('comModelLookFormId').down('image').getSrc();
    	var comPicWindow = Ext.create('Ext.window.Window',{
    		padding:'30',
    		modal:true,
    		title:'上传商品模板样图',
    		items:[{
				//图片布局
				layout:{type:'table',columns:1},
				xtype:'form',
				url:'/commodity/comModelPic',
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
				},{
					xtype:'hidden',
					name:'comModelBarcode',
					value:Ext.getCmp('comModelBarcodeId').getValue(),
				},{
					xtype:'button',
					text: '开始上传',
					disabled:true,
					handler:function(){
						this.up('form').submit({
							success:function(form,action){
								// var res = Ext.decode(response.responseText);
								Ext.Msg.alert('<i class="fa fa-warning" style="color:orange"></i> 注意',action.result.info);
								comModelStore.load();
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
    updateComModel:function(){
    	var form = Ext.getCmp('comModelLookFormId');
    	if(!form.isValid()){
    		return false;
    	}else{
    		form.submit({
    			success:function(form,action){
					Ext.Msg.alert('<i class="fa fa-warning" style="color:orange"></i> 注意',action.result.info+"<br />即将刷新页面");
			  //     	categoryStore.load();
					// comModelStore.load();
					// var theTree = Ext.getCmp('comModelTreeId');
					// var pan = theTree.up('panel');
					// theTree.destroy();
					// console.log(rt);
					// theTree = Ext.create({xtype:'treepanel', title:'商品分类', width:300, rootVisible:false, scrollable:true, root:rt, id:'comModelTreeId', listeners:{itemclick:'clickLeaf'}});
					// pan.add(theTree);
					// pan.updateLayout();
					setTimeout(function(){
						location.reload();
					},1500);
    			},
    			failure:function(){
    				Ext.Msg.alert('错误！','获取服务器响应失败');
    			}
    		});
    	}
    },
    deleteComModel:function(){
    	var bc = Ext.getCmp('comModelBarcodeId').getValue();
    	if (bc == null || bc == "") {return false;}
    	Ext.create('Ext.window.Window', {
    		title:'<i class="fa fa-warning" style="color:orange"></i> 注意',
    		padding:'30',
    		closable: false,
		    modal:true,
		    defaults:{
		    	xtype:'button',
		    	margin:'20',
		    },
    		items:[{
    			xtype:'box',
    			html:"您确定要删除此商品模板吗？<br />条形码："+bc+"<br />删除前请确认模板下商品库存为0"
    		},{
    			text:'确定',
    			handler:function(){
					Ext.Ajax.request({
					    url: 'commodity/deleteComModel',
					    method:'GET',
					    params:{
					    	barCode:bc,
					    },
					    success: function(response, opts) {
					        var res = Ext.decode(response.responseText);
					        Ext.Msg.alert('<i class="fa fa-warning" style="color:orange"></i> 注意',res.info);
					        if (res.info == "删除成功") {
					        	Ext.Msg.alert('<i class="fa fa-warning" style="color:orange"></i> 注意',"删除成功<br />即将刷新页面");
						        setTimeout(function(){
									location.reload();
								},1500);		        	
					        }
					    },
					    failure: function(response, opts) {
					        Ext.Msg.alert('错误！','获取服务器响应失败');
					        
					    }
					});
					this.up('window').destroy();
    			}
    		},{
    			text:'取消',
    			handler:function(){
    				this.up('window').destroy();
    			}
    		}],
    	}).show();
    }

});


// var cateTree = Ext.getCmp('comModelTreeId');
// var theBarcode = Ext.getCmp('comModelBarcodeId').getValue();
// var cate = form.down('combobox').getValue();
// var theName = Ext.getCmp('comModelNameId').getValue();
// // cateTree.update();

// var oldRoot = cateTree.getConfig('root');
// var node = {};
// node.text = theName;
// node.barCode = theBarcode;
// node.leaf = true;
// var i = 0;
// while(true){
//   if (null == oldRoot.children[i]) {break;}
//   if(oldRoot.children[i].text == cate){
//     oldRoot.children[i].expanded = true;
//     var l = oldRoot.children[i].children.length;
//     oldRoot.children[i].children[l] = node;
//     console.log();
//     break;
//   }
//   i++;
// }