Ext.define('SupermarketInvoicingSystem.view.userMsg.PersonPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'personPanel',
    requires: [
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Accordion',
    ],
    scrollable: true,
    layout: 'fit',
	title: '我的信息',
    margin: 20,
    defaults: {
        xtype: 'textfield',
        margin: '10',
        maxHeight: '30',
		labelAlign: 'right',
    },
    items: [
    	{
            fieldLabel: 'Id',
            name: 'id',
        },{
        	fieldLabel: '工号',
            name: 'workNum'
        },{
            fieldLabel: '密码',
            name: 'password'
        },{
            fieldLabel: '姓名',
            name: 'name'
        },{
            fieldLabel: '性别',
            name: 'gender'
        },{
            fieldLabel: '身份证',
            name: 'identity'
        },{
            fieldLabel: '用户类型',
            name: 'userType'
        },{
            fieldLabel: '权限',
            name: 'privileges'
        },{
            fieldLabel: '入职日期',
            name: 'hireDate',
        },{
            fieldLabel: '头像路径',
            name: 'iconUrl'
        },{
            fieldLabel: '用户状态',
            name: 'userStatus'
        },{
            fieldLabel: '所属部门',
            name: 'depName'
        },
    ],
    listeners:{
        afterRender: function(view) {
            var record=Ext.data.StoreManager.lookup('personStoreId').getAt(0);
            view.getForm().loadRecord(record);
        }
    },
});