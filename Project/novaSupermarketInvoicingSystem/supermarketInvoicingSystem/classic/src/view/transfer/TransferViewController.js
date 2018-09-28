Ext.define('Admin.view.transfer.TransferViewController', {
    extend: Ext.app.ViewController,
    alias: 'controller.transferViewController',
    //1.签收任务
    onClickTransferClaimButton: function(view, recIndex, cellIndex, item, e, record) {
        Ext.Ajax.request({
            url: 'transfer/claim/' + record.get('taskId'),
            method: 'post',
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                        view.getStore().reload();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
    },
    //2.创建审批表单（并绑定Task id）
    setCurrentView: function(view, form, title) {
		var cfg = Ext.apply({
			xtype: 'transferWindow',
			items: [{xtype: form}]
		},{
			title: title
		});
		var win = Ext.widget(cfg);
        view.up('panel').up('container').add(win);
        return win;
    },
    onClickTransferCompleteWindowButton: function(view, recIndex, cellIndex, item, e, record) {
    	//选中点击的行
        var taskDefinitionKey = record.get('taskDefinitionKey');
        var win=null;
        if (taskDefinitionKey == 'principalAudit') {
            //仓库负责人审批
            win = this.setCurrentView(view,taskDefinitionKey, '负责人审批');
            win.down('form').getForm().loadRecord(record);
        } else if (taskDefinitionKey == 'confirmReceipt') {
        	//确认收货
        	win = this.setCurrentView(view,taskDefinitionKey,'确认收货');
        	win.down('form').getForm().loadRecord(record);
        }
        else if (taskDefinitionKey == 'modifyApply') {
        	//申请人调整申请：可以编写到工具类中
        	win = this.setCurrentView(view,taskDefinitionKey,'调整申请表单');
        	win.down('form').getForm().loadRecord(record);
        }
        win=null;
    },
    //3.封装审批表单数据,并以Ajax提交到后台完成任务的流程变量封装对象中。
	complete: function(url, variables,form){
		// 转换JSON为字符串
	    var keys = "", values = "", types = "";
		if (variables) {
			Ext.each(variables, function (item) {
				if (keys != "") {
					keys += ",";
					values += ",";
					types += ",";
				}
				keys += item.key;
				values += item.value;
				types += item.type;
            });
		}
		Ext.Ajax.request({
            url: url,
            method: 'post',
            params : { 
			 	keys: keys,
		        values: values,
		        types: types
			}, 
            success: function(response, options) {
                var json = Ext.util.JSON.decode(response.responseText);
                if (json.success) {
                    Ext.Msg.alert('操作成功', json.msg, function() {
                    	form.up('window').close();
                        //grid.getStore().reload();
                        Ext.data.StoreManager.lookup('transferStore').load();
                    });
                } else {
                    Ext.Msg.alert('操作失败', json.msg);
                }
            }
        });
	},
	//部门经理审批
    onClickPrincipalAuditFormSubmitButton: function(btn) {
    	var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'transfer/complete/' + values.taskId;
    	var variables = [{
			key: 'auditPass',
			value: values.auditPass,//获取表单选择的value
			type: 'B'
		},{
			key: 'principalBackReason',
			value: values.principalBackReason,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
    //确认收货
    onClickConfirmReceiptFormSubmitButton: function(btn) {
        var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'transfer/complete/' + values.taskId;
    	var variables = [{
			key: 'receiptRemark',
			value: values.receiptRemark,//获取表单选择的value
			type: 'S'
		}];
        this.complete(url,variables,form);
    },
    //调整申请
    onClickModifyApplyFormSubmitButton: function(btn) {
        var form = btn.up('form');
    	var values = form.getValues();
    	var url = 'transfer/complete/' + values.taskId;
    	var variables = [
        //     {
		// 	key: 'reApply',
		// 	value: values.reApply,//获取表单选择的value
		// 	type: 'B'
		// },{
		// 	key: 'transferType',
		// 	value: values.transferType,//获取表单选择的value
		// 	type: 'S'
		// },{
		// 	key: 'startTime',
		// 	value: values.startTime,//获取表单选择的value
		// 	type: 'D'
		// },{
		// 	key: 'endTime',
		// 	value: values.endTime,//获取表单选择的value
		// 	type: 'D'
		// },{
		// 	key: 'reason',
		// 	value: values.reason,//获取表单选择的value
		// 	type: 'S'
        // }
    ];
        this.complete(url,variables,form);
    },
  	//流程跟踪
    onClickTransferGraphTraceButton: function (view, rowIndex, colIndex, item, e, record, row) {
        var diagramResourceUrl = '/transfer/resource?pid=' + record.get('processInstanceId');
        var win = new Ext.window.Window({
            title: '流程跟踪',
            width: 860,
            height: 500,
            layout: 'fit',
            items: [new Ext.Panel({
                resizeTabs: true,
                autoScroll: true,
                html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src=' + diagramResourceUrl + '></iframe>'
            })]
        });
        win.show();
    }

});