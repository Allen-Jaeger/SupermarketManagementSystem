var userTypeStore = Ext.create('Ext.data.Store', {
    fields: ['index', 'name'],
    // data : [
    //     {"index":"AL", "name":"Alabama"},
    //     {"index":"AK", "name":"Alaska"},
    //     {"index":"AZ", "name":"Arizona"}
    // ],
	proxy: {
		type: 'ajax',
		url: '/getEnum?enumName=UserType',
		reader: {
			type: 'json',
			//rootProperty: 'users'
		},
		method: 'GET',
	},
	autoLoad: true
});

var privilegeStore = Ext.create('Ext.data.Store', {
    fields: ['index', 'name'],
	proxy: {
		type: 'ajax',
		url: '/getEnum?enumName=Privilege',
		reader: {
			type: 'json',
		},
		method: 'GET',
	},
	autoLoad: true
});
var userT = "/getDep?userT=采购员";
var depStore = Ext.create('Ext.data.Store', {
    fields: ['index', 'name'],
	proxy: {
		type: 'ajax',
		url: userT,
		reader: {
			type: 'json',
		},
		method: 'GET',
	},

	// data : [
 //        {"index":"AL", "name": userT},
 //        {"index":"AK", "name":"Alaska"},
 //        {"index":"AZ", "name":"Arizona"}
 //    ],
	autoLoad: true,
});
var win;
Ext.define('SupermarketInvoicingSystem.view.userMsg.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersViewController',
    frozen:function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var data = record.data;
    	var sta = 'FROZEN';
    	var tip = "您确定要<i style = 'color:blue'>冻结</i> 该用户吗？<br /> 工号："+data.workNum+"<br />姓名："+data.name+"<br />";
    	if (data.userStatus == "冻结的") {
    		tip = "您确定要<i style = 'color:green'>解冻</i> 该用户吗？<br /> 工号："+data.workNum+"<br />姓名："+data.name+"<br />";
    		sta = 'NORMAL';
    	}
		Ext.create('Ext.window.Window', {
		    title: '<i class= "fa fa-warning"></i> 注意',
		    bodyPadding: 20,
		    closable: false,
		    modal:true,
		    defaults:{
		    	xtype:'button',
		    	margin:'10',
		    },
		    items:[{
		    	xtype: 'box',
		    	html: tip,
		    },{
		    	text:'确定',
		    	handler:function(){
    				Ext.Ajax.request( {
						url : 'changeStatus',
						method : 'GET',
						params : {
							toStatus: sta,
							workNum: data.workNum,
						},
						success:function(response, options) {	
							var res = Ext.decode(response.responseText);
							if (res.success == 'false') {
								Ext.Msg.alert('<i class= "fa fa-warning"></i>', "冻结/解冻失败,该员工可能已被辞退");
							}else{				
								Ext.data.StoreManager.lookup('usersStoreId').reload();
							}
						},
						failure:function() {
							Ext.Msg.alert('<i class= "fa fa-warning"></i>', "冻结/解冻失败,该员工可能已被辞退");
						}
					});
					this.up('window').close();			    		
	    		}
		    },{
		    	text:'取消',
		    	handler:function(){
		    		this.up('window').close();
	    		}
		    }],
		}).show();
    	// console.log(data);
    },
    resetPassword:function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var data = record.data;
		var tip = "您确定要重置该用户的密码？<br /> 工号："+data.workNum+"<br />姓名："+data.name+"<br />";
		Ext.create('Ext.window.Window', {
		    title: '<i class= "fa fa-warning"></i> 注意',
		    bodyPadding: 20,
		    closable: false,
		    modal:true,
		    defaults:{
		    	xtype:'button',
		    	margin:'10',
		    },
		    items:[{
		    	xtype: 'box',
		    	html: tip,
		    },{
		    	text:'确定',
		    	handler:function(){
    				Ext.Ajax.request( {
						url : 'resetPassword',
						method : 'GET',
						params : {
							workNum: data.workNum,
						},
						success:function(response, options) {							
							Ext.data.StoreManager.lookup('usersStoreId').reload();
							var res = Ext.decode(response.responseText);
							Ext.Msg.alert('<i class= "fa fa-check"></i>', "密码重置成功<br />"+ res.info);
						},
						failure:function() {}
					});
					this.up('window').close();			    		
	    		}
		    },{
		    	text:'取消',
		    	handler:function(){
		    		this.up('window').close();
	    		}
		    }],
		}).show();
    },
    filter:function(){
    	//获取关键字
    	var key = Ext.getCmp('tbarTextId').getValue();
    	//console.log(key);	
    	//获取Store
    	var usersStore = Ext.data.StoreManager.lookup('usersStoreId');
    	usersStore.filterBy(
    		function(record) {   
				return record.get('workNum').indexOf(key) >= 0 
					|| record.get('identity').indexOf(key) >= 0
					|| record.get('name').indexOf(key) >= 0;
			}
		);  
    },
    cancelFilter:function(){
    	Ext.data.StoreManager.lookup('usersStoreId').clearFilter();
    },
    addUser:function(){
		win = Ext.create('Ext.window.Window', {
		    title: '添加用户',
            iconCls: 'fa fa-user-plus',
		    //height: 600,
		    width: 750,
		    layout: 'fit',
		    padding:'20',
		    modal:true,//设置是否添加遮罩
		    items: [{  
		    	xtype:'form',
		    	url:'/addUser',
		    	method:'POST',
		    	id:'addUserFormId',
		    	layout:'column',
		    	defaults:{
		    		xtype: 'textfield',
		    		margin:'10',
		    		allowBlank: false,
		    		labelAlign:'right',
		    		width: 300,
		    	},
		    	items:[{
		    		fieldLabel:'姓名',
		    		name:'name',
		    	},{
		    		fieldLabel:'身份证',
		    		name:'identity',
		    		id:'identityId',
		    		regex: /(^\d{15}$)|(^\d{17}([0-9Xx])$)/,
					regexText : '输入的身份证号码不符合规定！<br/>15位号码应全为数字<br/>18位号码末位可以为数字或X',
		    		listeners:{
		    			blur:function(){
		    				var v = Ext.getCmp('identityId').getValue();
		    				Ext.Ajax.request( {
								url : '/valIdentity',
								method : 'GET',
								params : {
									identity: v,
								},
								success:function(response, options) {
									if ("" != response.responseText) {
										// Ext.getCmp('identityId').setValue(response.responseText);
										Ext.getCmp('IDEN_Tip').setHtml(response.responseText);
										Ext.getCmp('IDEN_Tip').show();
				        				Ext.getCmp('identityId').setValue("");
									}else{
										Ext.getCmp('IDEN_Tip').setHtml('<i style="color:white;" class="fa fa-check"></i>可用');
									}
								},
								failure:function() {
								}
							});
		    			}
		    		},
		    	},{
		    		fieldLabel:'性别',
		    		xtype: 'fieldcontainer',
		    		defaultType: 'radiofield',
		    		layout: 'hbox',
		    		name:'gender',
		    		defaults:{
		    			margin:'0 10',
		    		},
		    		items: [{
		                    boxLabel  : '<i style="color:#03D6D8; font-weight:bolder;" class="fa fa-mars"></i> 男',
		                    name      : 'gender',
		                    inputValue: 'MALE',
		                    checked: true,
		                    //id        : 'radio1'
		                }, {
		                    boxLabel  : '<i style="color:pink; font-weight:bolder;" class="fa fa-venus"></i> 女',
		                    name      : 'gender',
		                    inputValue: 'FEMALE',
		                    //id        : 'radio2'
		                }
		            ],
		    	},{
		    		fieldLabel:'工号',
		    		name:'workNum',
		    		id:'wkId',
		    		regex:/^[a-zA-Z\d]+$/,
		    		regexText:'输入值非法<br/>请输入字母和数字的组合',
		    		listeners:{
		    			blur:function(){
		    				var wkNum = Ext.getCmp('wkId').getValue();
		    				Ext.Ajax.request( {
								url : '/valWorkNum',
								method : 'GET',
								params : {
									wk_num: wkNum,
								},
								success:function(response, options) {
									// console.log(this);									
									if ("" != response.responseText) {
										Ext.getCmp('WK_Tip').setHtml(response.responseText);
										Ext.getCmp('WK_Tip').show();
				        				Ext.getCmp('wkId').setValue("");
									}else{
										Ext.getCmp('WK_Tip').setHtml('<i style="color:white;" class="fa fa-check"></i>可用');
									}
								},
								failure:function() {
								}
							});
		    			}
		    		},
		    	},{
		    		xtype:'button',
		    		text:'<i class = "fa fa-refresh fa-lg"></i>',
		    		width:'8',
		    		handler: function() {
		    			//后台获取
				        Ext.Ajax.request( {
							url : '/randomWkNum',
							method : 'GET',
							success:function(response, options) {
								// console.log(this);
				        		Ext.getCmp('wkId').setValue(response.responseText);
				        		
							},
							failure:function() {
							}
						});
				    },
		    	},{
		    		fieldLabel:'用户类型',
		    		xtype: 'combobox',
		    		name:'userType',
		    		// id:'userTId',
		    		editable: false,
		    		selectOnFocus: false, 
	    		    store: userTypeStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        listeners:{
			        	change:function(){
			        		//改变部门
			        		userT = this.getDisplayValue();
			        		if (userT == "超级管理员" || userT == "采购员") {
			        			Ext.getCmp('depId').setDisabled(true);
			        		}else{
			        			Ext.getCmp('depId').setDisabled(false);
			        		}
							Ext.getCmp('depId').select (null);
			        		userT = "/getDep?userT=" + this.getDisplayValue();
		        		    depStore.getProxy().url = userT;
							depStore.load();
			        		// console.log(userT);
			        		// 改变默认权限
			        		var role = this.getDisplayValue();
			        		var privilegeStr = "";
			        		switch(role){
			        		case '超级管理员':
			        			privilegeStr = "0,1,2,3,4,5,6,7,8,9,10,11";
			        			break;
			        		case '采购员':
			        			privilegeStr = "6,8";
			        			break;
			        		case '仓库管理员':
			        			privilegeStr = "4,6,8,10";
			        			break;
			        		case '门店管理员':
			        			privilegeStr = "9,8,6,4,2,12";
			        			break;
			        		case '销售员':
			        			privilegeStr = "9,12";
			        			break;
			        		default:
			        			break;			        			
			        		}
			        		var priG = privilegeStr.split(",");
			        		Ext.getCmp('privilegeTabsId').setValue(priG);
			        	},
			        },
		    	},{
		    		fieldLabel:'雇佣日期',
		    		name:'hireDateEx',
    		        xtype: 'datefield',
    		        format:'Y-m-d',
			        maxValue: new Date(),
		    	},{
		    		fieldLabel:'所属部门',
		    		xtype: 'combobox',
		    		name:'depName',
		    		id:'depId',
		    		editable: false,
		    		selectOnFocus: false, 
		    		tooltip: '请先选择用户类型',
	    		    store: depStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        allowBlank: true,
		    	},{
		    		fieldLabel:'权限',
		    		xtype: 'tagfield',
		    		name:'privileges',
		    		editable: false,
		    		selectOnFocus: false, 
		    		store: privilegeStore,
		    		id:'privilegeTabsId',
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        height:'400',
		    	},{

		    		items:[{
			    		width: 150,
			    		xtype:'button',
			    		text: '添加',
			    		id:'addBtId',
			    		handler: function(){
			    			var form = this.up('form').getForm();
							if (form.isValid()) {
			    				win.mask('提交中...请稍后...','fa fa-cog');
								form.submit({
									success: function(form, action) {
										Ext.getCmp('WK_Tip').destroy();
										Ext.getCmp('IDEN_Tip').destroy();
										Ext.getCmp('identityId').destroy();
								        win.close();
								        Ext.Msg.alert('<i class= "fa fa-check"></i>添加成功', action.result.info);
								        Ext.data.StoreManager.lookup('usersStoreId').reload();
									},
									failure: function(form, action) {
										Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
									}
								});
							}
			    		},
		    		},],
		    		style:{
		    			left: '50px',
		    			// top:'300px',
		    		},
		    		xtype:'panel',
		    	}],
		    }],
		    listeners:{
		    	afterrender:function(){
		    		Ext.create('Ext.tip.ToolTip', {
					    target: 'wkId',
					    html: '此项唯一',
					    // autoHide:false,
					    // closable: false,
					    id:'WK_Tip'
					});
					Ext.create('Ext.tip.ToolTip', {
					    target: 'identityId',
					    html: '身份信息请保密，且精确输入',
					    // autoHide:false,
					    // closable: false,
					    id:'IDEN_Tip'
					});
		    	},
		    	close:function(){
					Ext.getCmp('WK_Tip').destroy();
					Ext.getCmp('IDEN_Tip').destroy();
					Ext.getCmp('identityId').destroy();
		    	}
		    },
		}).show();
    },
    edit:function(grid, rowIndex, colIndex, node, e, record, rowEl){
    	var data = record.data;
		win = Ext.create('Ext.window.Window', {
		    title: '编辑信息',
            iconCls: 'fa fa-pencil',
		    //height: 600,
		    width: 750,
		    layout: 'fit',
		    padding:'20',
		    modal:true,//设置是否添加遮罩
		    items: [{  
		    	xtype:'form',
		    	url:'/updateUser',
		    	method:'POST',
		    	layout:'column',
		    	defaults:{
		    		xtype: 'textfield',
		    		margin:'10',
		    		allowBlank: false,
		    		labelAlign:'right',
		    		width: 300,
		    	},
		    	items:[{
		    		xtype:'hiddenfield',
		    		name:'id',
		    		value:data.id,
		    	},{
		    		fieldLabel:'姓名',
		    		name:'name',
		    		value:data.name,
		    	},{
		    		fieldLabel:'身份证',
		    		name:'identity',
		    		id:'identityId',
		    		regex: /(^\d{15}$)|(^\d{17}([0-9Xx])$)/,
					regexText : '输入的身份证号码不符合规定！<br/>15位号码应全为数字<br/>18位号码末位可以为数字或X',
					value:data.identity,
		    		listeners:{
		    			blur:function(){
		    				var v = Ext.getCmp('identityId').getValue();
		    				Ext.Ajax.request( {
								url : '/valIdentity',
								method : 'GET',
								params : {
									identity: v,
									wk_Id: data.id
								},
								success:function(response, options) {
									if ("" != response.responseText) {
										// Ext.getCmp('identityId').setValue(response.responseText);
										Ext.getCmp('IDEN_Tip').setHtml(response.responseText);
										Ext.getCmp('IDEN_Tip').show();
				        				Ext.getCmp('identityId').setValue("");
									}else{
										Ext.getCmp('IDEN_Tip').setHtml('<i style="color:white;" class="fa fa-check"></i>可用');
									}
								},
								failure:function() {
								}
							});
		    			}
		    		},
		    	},{
		    		fieldLabel:'性别',
		    		xtype: 'fieldcontainer',
		    		defaultType: 'radiofield',
		    		layout: 'hbox',
		    		name:'gender',
		    		defaults:{
		    			margin:'0 10',
		    		},
		    		items: [{
		                    boxLabel  : '<i style="color:#03D6D8; font-weight:bolder;" class="fa fa-mars"></i> 男',
		                    name      : 'gender',
		                    inputValue: 'MALE',
		                    id:'genderM'
		                }, {
		                    boxLabel  : '<i style="color:pink; font-weight:bolder;" class="fa fa-venus"></i> 女',
		                    name      : 'gender',
		                    inputValue: 'FEMALE',
		                    id:'genderF'
		                }
		            ],
		            listeners:{
		            	afterrender:function(){
		            		if (data.gender == '男') {
		            			Ext.getCmp('genderM').setValue(true);
		            			Ext.getCmp('genderF').setValue(false);
		            		}else{
		            			Ext.getCmp('genderM').setValue(false);
		            			Ext.getCmp('genderF').setValue(true);
		            		}
		            	}
		            }
		    	},{
		    		fieldLabel:'工号',
		    		name:'workNum',
		    		value:data.workNum,
		    		id:'wkId',
		    		regex:/^[a-zA-Z\d]+$/,
		    		regexText:'输入值非法<br/>请输入字母和数字的组合',
		    		listeners:{
		    			blur:function(){
		    				var wkNum = Ext.getCmp('wkId').getValue();
		    				Ext.Ajax.request( {
								url : '/valWorkNum',
								method : 'GET',
								params : {
									wk_num: wkNum,
									wk_Id: data.id
								},
								success:function(response, options) {
									// console.log(this);									
									if ("" != response.responseText) {
										Ext.getCmp('WK_Tip').setHtml(response.responseText);
										Ext.getCmp('WK_Tip').show();
				        				Ext.getCmp('wkId').setValue("");
									}else{
										Ext.getCmp('WK_Tip').setHtml('<i style="color:white;" class="fa fa-check"></i>可用');
									}
								},
								failure:function() {
								}
							});
		    			}
		    		},
		    	},{
		    		xtype:'button',
		    		text:'<i class = "fa fa-refresh fa-lg"></i>',
		    		width:'8',
		    		handler: function() {
		    			//后台获取
				        Ext.Ajax.request( {
							url : '/randomWkNum',
							method : 'GET',
							success:function(response, options) {
								// console.log(this);
				        		Ext.getCmp('wkId').setValue(response.responseText);
				        		
							},
							failure:function() {
							}
						});
				    },
		    	},{
		    		fieldLabel:'用户类型',
		    		xtype: 'combobox',
		    		name:'userType',
		    		//emptyText:data.userType,
		    		editable: false,
		    		selectOnFocus: false, 
	    		    store: userTypeStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        listeners:{
			        	afterrender:function(){
			        		var value = userTypeStore.findRecord('name',data.userType).data.index;
			        		this.setValue(value);
			        	},
			        	change:function(){
			        		//改变部门
			        		userT = this.getDisplayValue();
			        		if (userT == "超级管理员" || userT == "采购员") {
			        			Ext.getCmp('depId').setDisabled(true);
			        		}else{
			        			Ext.getCmp('depId').setDisabled(false);
			        		}
							Ext.getCmp('depId').select (null);
							Ext.getCmp('depId').setEmptyText(null);
			        		userT = "/getDep?userT=" + this.getDisplayValue();
		        		    depStore.getProxy().url = userT;
							depStore.load();
			        		// console.log(userT);
			        		// 改变默认权限
			        		var role = this.getDisplayValue();
			        		var privilegeStr = "";
			        		switch(role){
			        		case '超级管理员':
			        			privilegeStr = "0,1,2,3,4,5,6,7,8,9,10,11";
			        			break;
			        		case '采购员':
			        			privilegeStr = "6,8";
			        			break;
			        		case '仓库管理员':
			        			privilegeStr = "4,6,8,10";
			        			break;
			        		case '门店管理员':
			        			privilegeStr = "9,8,6,4,2,12";
			        			break;
			        		case '销售员':
			        			privilegeStr = "9,12";
			        			break;
			        		default:
			        			break;			        			
			        		}
			        		var priG = privilegeStr.split(",");
			        		Ext.getCmp('privilegeTabsId').setValue(priG);
			        	},
			        },
		    	},{
		    		fieldLabel:'雇佣日期',
		    		name:'hireDateEx',
    		        xtype: 'datefield',
    		        value:data.hireDate,
    		        format:'Y-m-d',
			        maxValue: new Date(),
		    	},{
		    		fieldLabel:'所属部门',
		    		xtype: 'combobox',
		    		name:'depName',
		    		id:'depId',
		    		editable: false,
		    		selectOnFocus: false, 
		    		emptyText: data.depName,
		    		tooltip: '请先选择用户类型',
	    		    store: depStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'name',
			        allowBlank: true,
			    //     listeners:{
			    //     	afterrender:function(){
       //            			if (''==data.depName) {return;}
       //            			userT = "/getDep?userT="+data.userType;
							// depStore.getProxy().url = userT;
							// depStore.load();
			    //     		var value = depStore.findRecord('name',data.depName).data.index;
			    //     		this.setValue(value);
			    //     	},
			    //     },
		    	},{
		    		fieldLabel:'权限',
		    		xtype: 'tagfield',
		    		name:'privileges',
		    		editable: false,
		    		selectOnFocus: false, 
		    		store: privilegeStore,
		    		id:'privilegeTabsId',
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        height:'400',
					listeners:{
					afterrender:function(){
						//获取权限数组
						var priG = data.privileges.split(","); 
						console.log(priG);
						var vStr = "";
						for (var i = 0; i < priG.length; i++) {
							if(null == privilegeStore.findRecord('name',priG[i])){
								this.setValue(vStr);
								return;
							}
							vStr += privilegeStore.findRecord('name',priG[i]).data.index;
							if("" != priG[i+1]){
								vStr += ",";
							}else{
								break;
							}
						}
						this.setValue(vStr);
						}
					}
		    	},{
		    		defaults:{
		    			margin:'0 10',
		    		},
		    		items:[{
			    		width: 100,
			    		xtype:'button',
			    		text: '更新',
			    		id:'addBtId',
			    		handler: function(){
			    			var form = this.up('form').getForm();
							if (form.isValid()) {
			    				win.mask('提交中...请稍后...','fa fa-cog');
								form.submit({
									success: function(form, action) {
										Ext.data.StoreManager.lookup('usersStoreId').reload();
										Ext.getCmp('WK_Tip').destroy();
										Ext.getCmp('identityId').destroy();
										Ext.getCmp('IDEN_Tip').destroy();
								        Ext.Msg.alert('<i class= "fa fa-check"></i>更新', "更新完成");
								        win.close();
									},
									failure: function(form, action) {
										Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
									}
								});
							}			    		
						},
		    		},{
			    		width: 100,
			    		xtype:'button',
			    		text: '开除 / 重用',
			    		cls:'ljc-bg-red',
			    		handler:function(){
			    			var sta = 'LAIDOFF';
			    			var tip = "您确定要<i style='color:red'>开除</i> 此用户吗？<br />"
			    						+"姓名："+data.name+"<br />工号："+data.workNum;
			    			if (data.userStatus == '被解雇的') {
								tip = "您确定要<i style='color:green'>重用</i> 此用户吗？<br />"
			    						+"姓名："+data.name+"<br />工号："+data.workNum;
			    				sta = 'NORMAL';
			    			}

			    			Ext.create('Ext.window.Window', {
							    title: '<i class= "fa fa-warning"></i> 注意',
							    bodyPadding: 20,
							    closable: false,
							    modal:true,
							    defaults:{
							    	xtype:'button',
							    	margin:'10',
							    },
							    items:[{
							    	xtype: 'box',
							    	html: tip,
							    },{
							    	text:'确定',
							    	handler:function(){
					    				Ext.Ajax.request( {
											url : 'changeStatus',
											method : 'GET',
											params : {
												toStatus: sta,
												workNum: data.workNum,
											},
											success:function(response, options) {							
												Ext.data.StoreManager.lookup('usersStoreId').reload();
											},
											failure:function() {
												Ext.Msg.alert('<i class= "fa fa-warning"></i>', "操作失败");
											}
										});
										this.up('window').close();			    		
						    		}
							    },{
							    	text:'取消',
							    	handler:function(){
							    		this.up('window').close();
						    		}
							    }],
							}).show();
							this.up('window').close();
			    		}
		    		}],
		    		style:{
		    			left: '50px',
		    			// top:'300px',
		    		},
		    		xtype:'panel',
		    	}],
		    }],
		    listeners:{
		    	afterrender:function(){
		    		Ext.create('Ext.tip.ToolTip', {
					    target: 'wkId',
					    html: '此项唯一',
					    id:'WK_Tip'
					});
					Ext.create('Ext.tip.ToolTip', {
					    target: 'identityId',
					    html: '身份信息请保密，且精确输入',
					    // autoHide:false,
					    // closable: false,
					    id:'IDEN_Tip'
					});
		    	},
		    	close:function(){
					Ext.getCmp('WK_Tip').destroy();
					Ext.getCmp('IDEN_Tip').destroy();
					Ext.getCmp('identityId').destroy();
		    	}
		    },
		}).show();
    }

});