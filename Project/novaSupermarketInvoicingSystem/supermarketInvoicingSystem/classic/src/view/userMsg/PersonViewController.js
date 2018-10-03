Ext.define('SupermarketInvoicingSystem.view.userMsg.PersonViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personViewController',
    changePassword:function(){
    	//console.log("shit");
    	var nP = Ext.getCmp('newPass').value;
    	var oP = Ext.getCmp('pass').value;
		Ext.Ajax.request({
			url: '/password',
			params: { 
				pass: oP, 
				newPass: nP,
			},
			method: 'POST',
			success: function (response, options) { 
				//console.log(response);
				var res = response.responseText;
				var color = 'red';
				if (res == '修改成功') {
					color = 'green';
				}
				Ext.getCmp('confirm').inputEl.dom.value = "";
				Ext.getCmp('newPass').inputEl.dom.value = "";
				Ext.getCmp('passButton').setDisabled(true);
				Ext.getCmp('passwordTip').setHtml("<p style = 'color:"+ color +";'>"+ res +"</p>");
			},
			failure: function (response, options) {
				Ext.MessageBox.alert('失败', '请求超时或网络故障，错误编号：' + response.status);
			} 	            
		});
    },
    uploadIcon: function(){
    	//var img = Ext.getCmp("imgFile").inputEl.component.fileInputEl.dom.files[0];

		var form = Ext.getCmp("imgFile").up('form');
		form.getForm().submit({   
    	//Ext.Ajax.request({
			url: '/userIcon',
			// params: { 
			// 	extFile: img,
			// },
			waitMsg: '正在上传，请耐心等待....',
			method: 'POST',
			success: function (response, options) { 
				//console.log(response);
				//刷新
			    var res = this.result.info;
			    if (res == '修改成功') {
			      location.reload();
			    } else {
			      Ext.MessageBox.alert('错误', res);
			    }
			},
			// failure: function (response, options) {
			// 	Ext.MessageBox.alert('失败', '请求超时或网络故障，错误编号：' + response.status);
			// } 	            
		});
    }
});



