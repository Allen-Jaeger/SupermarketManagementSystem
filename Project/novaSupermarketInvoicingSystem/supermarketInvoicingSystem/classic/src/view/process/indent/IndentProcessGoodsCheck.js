Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessGoodsCheck', {
    extend:'Ext.window.Window',
  
    alias: 'widget.indentProcessGoodsCheck',
    id:'indentProcessGoodsCheck',
    height: 150,
    minHeight: 350,
    minWidth: 300,
    width: 220,
    scrollable: true,
    resizable:true,
    title: 'Indent Detail',
    closable: true,
    constrain: true,
    defaultFocus: 'textfield',
    modal:true,
    layout: 'fit',
    requires:[
      'Ext.form.RadioGroup'
    ],
    
    
    defaults: {
        bodyPadding: 10
   },
    items: [{
     scrollable: true,
        xtype: 'form',
        layout: 'form',
        padding: '10px',
        ariaLabel: 'Enter your name',
        id:'GoodsCheck',
    
    items: [
    
      
        {xtype: 'textfield',fieldLabel: 'id',name:'id',id:"indentId",hidden: true},
        {xtype: 'textfield',fieldLabel: 'taskId',name:'taskId',id:"taskId",hidden: true},
        {xtype: 'textfield',fieldLabel: 'taskName',name:'taskName',id:"taskName",hidden: true},
        {xtype: 'radiogroup',fieldLabel: '审批',labelWidth:50,
            items:[
              {boxLabel:'同意',name:'check',inputValue:true,width:70,checked:true},
              {boxLabel:'不同意',name:'check',inputValue:false,width:100}
            ]
          },
        {xtype: 'textareafield',fieldLabel: '备注',name:'reason',labelWidth:50,width:350,height:150,grow:false}  
        
        ]
    }]
,
  buttons: ['->',{
        xtype: 'button',
        text: '提交',
        iconCls: 'fa fa-search',
        handler: 'submitGoodsCheckWindow'
    },{
        xtype: 'button',
        text: '关闭',
        handler: function(btn) {
            Ext.getCmp('leftList').getStore().removeAll();
            btn.up('window').close();
        }
    },'->']
});