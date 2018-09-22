Ext.define('SupermarketInvoicingSystem.view.leaveapprove.task.ModifyApply', {
    extend: 'Ext.form.Panel',
    alias: 'widget.modifyApply',
    requires: [
        'Ext.button.Button',
        'Ext.form.RadioGroup',
        'Ext.form.field.*'
    ],
    bodyPadding: 5,
    bodyBorder: true,
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'none',
        invalidCls: '' 
    },
    items: [{
		xtype: 'radiogroup',
		fieldLabel: '重新申请',
		items: [{
			name: 'reApply',
			inputValue: true,
			boxLabel: '是',
			checked: true
		}, {
			name: 'reApply',
			inputValue: false,
			boxLabel: '否'
		}]
    },{
    	xtype: 'textfield',
		name: 'taskId',
		fieldLabel: '任务ID',
        hidden: true,
        readOnly: true
	},{
		xtype: 'combobox',
		name: 'leaveType',
		fieldLabel: '请假类型',
		//vtype: 'email',
		store: Ext.create('Ext.data.Store', {
			fields: ['value', 'name'],
			data : [
				{"value":"A", "name":"带薪假期"},
				{"value":"B", "name":"无薪假期"},
				{"value":"C", "name":"病假"}
			]
		}),
		queryMode: 'local',
		displayField: 'name',
		valueField: 'value',
		allowBlank: false
	},{
		xtype: 'datefield',
		fieldLabel: '请假开始时间',
		format: 'Y/m/d H:i:s', 
		name: 'startTime'
	},{
		xtype: 'datefield',
		fieldLabel: '请假结束时间',
		format: 'Y/m/d H:i:s', 
		name: 'endTime'
	},{
		xtype : 'textareafield',
		grow: true,
		name: 'reason',
		fieldLabel: '请假原因',
		anchor: '100%'
	}],

   	bbar: [{
		xtype: 'button',
		ui: 'soft-green',
		text: '提交'	,
		handler: 'onClickModifyApplyFormSubmitButton'
	},{
		xtype: 'button',
		ui: 'gray',
		text: '取消',
		handler:function(btn){
			var win = btn.up('window');
	        if (win) {
	            win.close();
	        }
		}
	}]
});
