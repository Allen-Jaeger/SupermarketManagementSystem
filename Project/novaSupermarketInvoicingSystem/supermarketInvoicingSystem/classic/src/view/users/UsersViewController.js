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

Ext.define('SupermarketInvoicingSystem.view.userMsg.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersViewController',
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
		Ext.create('Ext.window.Window', {
		    title: '添加用户',
            iconCls: 'fa fa-user-plus',
		    //height: 600,
		    width: 750,
		    layout: 'fit',
		    padding:'20',
		    modal:true,//设置是否添加遮罩
		    items: [{  
		    	xtype:'form',
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
		    	},{
		    		fieldLabel:'性别',
		    		xtype: 'fieldcontainer',
		    		defaultType: 'radiofield',
		    		layout: 'hbox',
		    		defaults:{
		    			margin:'0 10',
		    		},
		    		items: [{
		                    boxLabel  : '<i style="color:#03D6D8; font-weight:bolder;" class="fa fa-mars"></i> 男',
		                    name      : 'gender',
		                    inputValue: 'MALE',
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
		    		name:'',
		    	},{
		    		xtype:'button',
		    		iconCls:'fa fa-random fa-lg',
		    		width:'10',
		    		handler: function() {
				        alert('You clicked the button!');
				    },
		    	},{
		    		fieldLabel:'用户类型',
		    		xtype: 'combobox',
		    		name:'',
		    		// id:'userTId',
		    		editable: false,
		    		selectOnFocus: false, 
	    		    store: userTypeStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        listeners:{
			        	change:function(){
			        		userT = this.getDisplayValue();
			        		if (userT == "超级管理员" || userT == "采购员") {
			        			Ext.getCmp('depId').setDisabled(true);
								Ext.getCmp('depId').select (null);
			        		}else{
			        			Ext.getCmp('depId').setDisabled(false);
			        		}
			        		userT = "/getDep?userT=" + this.getDisplayValue();
		        		    depStore.getProxy().url = userT;
							depStore.load();
			        		// console.log(userT);
			        		// console.log(depStore);
			        	},
			        },
		    	},{
		    		fieldLabel:'雇佣日期',
		    		name:'',
    		        xtype: 'datefield',
    		        format:'Y年M月d日',
			        maxValue: new Date(),
		    	},{
		    		fieldLabel:'所属部门',
		    		xtype: 'combobox',
		    		name:'',
		    		id:'depId',
		    		editable: false,
		    		selectOnFocus: false, 
	    		    store: depStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        allowBlank: true,
		    	},{
		    		fieldLabel:'权限',
		    		xtype: 'tagfield',
		    		editable: false,
		    		selectOnFocus: false, 
		    		store: privilegeStore,
				    queryMode: 'remote',
				    displayField: 'name',
			        valueField: 'index',
			        height:'400',
		    	},{
		    		width: 150,
		    		xtype:'button',
		    		text: '添加',
		    		style:{
		    			left: '50px',
		    			// top:'300px',
		    		}
		    	}],
		    }],
		}).show();
    }
});