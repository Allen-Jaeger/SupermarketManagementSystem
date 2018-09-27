Ext.define('SupermarketInvoicingSystem.view.indent.IndentEditWindow', {
    
    extend:'Ext.window.Window',
	
	alias: 'widget.indentAddWindow',
    height: 550,
    minHeight: 350,
    minWidth: 300,
    width: 800,
    scrollable: true,
    title: 'Add Indent Window',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
	 defaults: {
        bodyPadding: 10
	 },
    items: [{
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
		items: [{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel: 'indentStatus',
            name:'indentStatus',
            value:'NEW',
            hidden: true,
            readOnly: true
        },{
			xtype: 'textfield',
			name: 'creatorId',
			fieldLabel: '订单创建者',
			id:'creatorId',
			disabled:true
		},
		{
			xtype: 'fieldcontainer',
			fieldLabel: '添加商品',
			layout:"hbox" ,
			name:'commoditiesList',
			id:'commoditiesList',
				items:[
				{
					xtype:'gridpanel',
					id:'leftList',
					extend: 'Ext.grid.plugin.Editing',
					requires: ['Ext.grid.CellEditor', 'Ext.util.DelayedTask'],
					  plugins: {
						cellediting: {
							clicksToEdit: 1
						}
					},

					name:'leftList',
					bind: '{leftList}',
					width:250,
					height:300,
					scrollable:true,
					selModel: {type: 'checkboxmodel'},
					columns:[
						{header: 'name',dataIndex:'name',width: 60,sortable: true,flex:1}
						,{header: 'num',dataIndex:'num',width: 60,sortable: true}
					],
					
				},
					{
					xtype:'panel',
					name:'middleButton',
					id:'middleButton',
					width:150,
					height:300,
					layout: {align: 'middle',pack: 'center',type: 'vbox'},				
					items:[
							{xtype: 'button', iconCls: 'x-fa fa-arrow-left',handler: 'addIntoselectcommoditiesList'},
							{xtype: 'button', iconCls: 'x-fa fa-arrow-right',handler: 'cancelselectcommoditiesList'}
					]
					
				}
				,
				{
					xtype:'gridpanel',
					marginLeft:20,
					bind: '{commodityList}',
					width:250,
					height:300,
					paddingLeft:20,
					scrollable:true,
					selModel: {type: 'checkboxmodel'},
					name:'rightList',
					id:'rightList',
					columns: [
						 {header: 'id',dataIndex:'id',width: 60,sortable: true}
						 , {header: 'name',dataIndex:'name',width: 60,sortable: true,flex:1}
						 ,{xtype: 'actioncolumn',cls: 'content-column', width: 80,text: 'Actions',tooltip: 'edit ',
							items: [
								{xtype: 'button', iconCls: 'x-fa fa-plus',handler: ''}
							]
							}
					]
				},
				{//隐藏栏
					xtype: 'button', 
					name:'displayorhiderightButton',
					id:'displayorhiderightButton',
					width:10,
					height:300,
					iconCls: 'x-fa fa-arrow-left',
					handler: 'displayorhideright'
					
					
					
				}
			]	
		},{
			xtype     : 'textareafield',
			grow      : true,
			name      : 'note',
			fieldLabel: '备注',
			anchor    : '100%'
		}]
    }],
	buttons: ['->',{
        xtype: 'button',
        text: 'Submit',
        handler: 'submitAddForm'
    },{
        xtype: 'button',
        text: 'Close',
        handler: function(btn) {
            btn.up('window').close();
        }
    },'->']
});
