Ext.define('SupermarketInvoicingSystem.view.process.definition.ProcessDefinitionViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.processDefinitionViewController',
	onClickProcessDefinitionGridUploadButton: function (btn) {
		btn.up('panel').up('container').add(Ext.widget('processDefinitionUploadWindow')).show();
    },
	onClickUploadFormSumbitButton: function (btn) {
		var form = btn.up('window').down('form');;
		form.getForm().submit({       
			url:'/process-definition',
			method : 'POST',
			waitMsg: '正在上传，请耐心等待....',
			success: function(form, action){    
				Ext.Msg.alert('Success', action.result.msg,function(){
					btn.up('window').close();
					Ext.data.StoreManager.lookup('processDefinitionStroe').load();
					//form.getViewModel().getStore('processDefinitionStroe').load();
				});       
			}, 
			failure: function(form, action){
				Ext.Msg.alert('Error', action.result.msg);
			}
		});
    },
  	onClickProcessDefinitionReadResourceButton: function(view, recIndex, cellIndex, item, e, record) {
 		var resourceUrl = 'process-definition/resource?pdid='+record.get('id')+'&resourceName='+record.get('resourceName');
		var win = new Ext.window.Window({
			title : '流程文件bpmn',width : 780,height : 470,layout:'fit',
			items:[{xtype:'panel',autoScroll: true}]
		});
		win.show();
		Ext.Ajax.request({
	        url:resourceUrl,
	        success: function(response,options){
				var panel =win.down('panel');
				panel.body.update("<xmp>"+response.responseText+"</xmp>");
				//panel.body.update("<textarea style='width:775px;height:420px;overflow:auto;'>"+response.responseText+"</textarea>");
	        }
		});
    },
    onClickProcessDefinitionReadDiagramResourceButton: function(view, recIndex, cellIndex, item, e, record) {
 		var diagramResourceUrl = 'process-definition/resource?pdid=' + record.get('id') + '&resourceName=' + record.get('diagramResourceName');
        var win = new Ext.window.Window({
            title: '查看流程PNG',
            width : 860,
			height : 500,
            layout: 'fit',
            items:[new Ext.Panel({         
	           resizeTabs :true,
	           autoScroll : true,
	           html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src='+diagramResourceUrl+'></iframe>'
	       })]
        });
        win.show();
    },
	onClickProcessDefinitionGridDeleteButton: function (view, recIndex, cellIndex, item, e, record) {
		Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！',
  			function(btn, text){
            	if(btn=='yes'){
            		Ext.Ajax.request({ 
						url : '/process-definition', 
						method : 'delete', 
						params : { 
							deploymentId :record.get('deploymentId')//record.data.deploymentId
						}, 
						success: function(response, options) {
							var json = Ext.util.JSON.decode(response.responseText); 
			                Ext.Msg.alert('操作成功', json.msg, function() {
			                    view.getStore('processDefinitionGridStore').reload();
			                });
			            },
			            failure: function(response, options) {
			            	var json = Ext.util.JSON.decode(response.responseText);
			                Ext.Msg.alert('操作失败', json.msg);
			            }
					});
				}
        	}
        , this);
    },
    onClickProcessDefinitionActiveButton: function(view, recIndex, cellIndex, item, e, record) {
    	Ext.Msg.alert("提示","已激活!");
    },	
    onClickProcessDefinitionSuspendButton: function(view, recIndex, cellIndex, item, e, record) {
      	Ext.Msg.alert("Title","Click Suspend Button");
    },
    onClickProcessDefinitionGridConvertModelButton: function(view, recIndex, cellIndex, item, e, record) {
      	Ext.Msg.alert("Title","Click Convert Model Button");
    }
});
