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
				},{
					xtype:'hidden',
					name:'stockId',
					value:record.data.id,
				},{
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
    }
});
