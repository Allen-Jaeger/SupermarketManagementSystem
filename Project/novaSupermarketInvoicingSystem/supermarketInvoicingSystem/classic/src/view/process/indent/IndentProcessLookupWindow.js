Ext.define('SupermarketInvoicingSystem.view.process.indent.IndentProcessLookupWindow', {
    extend:'Ext.window.Window',
  
    alias: 'widget.indentProcessLookupWindow',
    id:'indentProcessLookupWindow',
    height: 550,
    minHeight: 350,
    minWidth: 300,
    width: 820,
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
        layout: 'absolute',
        padding: '10px',
        ariaLabel: 'Enter your name',
        id:'indentEditForm',
    
    items: [
    
      {xtype: 'textfield',fieldLabel: 'id',name:'id',id:"indentId",hidden: true},
      {xtype: 'textfield',fieldLabel: 'taskId',name:'taskId',id:"taskId",hidden: true},
      {xtype: 'textfield',fieldLabel: 'taskName',name:'taskName',id:"taskName",hidden: true},
      //{xtype: 'textfield',fieldLabel: 'taskC',name:'taskName',id:"taskName",hidden: true}
    //订单状态:默认为创建
    
    //订单类型:默认为订货单，枚举类型
    //{xtype: 'textfield',fieldLabel: 'indentType',name:'indentType',hidden: true,value:'1'}
    //订单编号：自动生成 随机
   
    {x:20,y:0,xtype: 'displayfield',fieldLabel: '订单编号',name:'indentNum'}
    ,{x:20,y:40,xtype: 'displayfield',fieldLabel: '创建时间',name:'createDate',renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s')}
    ,{x:20,y:80,xtype: 'displayfield',fieldLabel: '订单状态', name:'indentStatus'}
    ,{x:20,y:120,xtype: 'displayfield',fieldLabel: '订单创建者',name:'creatorName'}
    ,{x:20,y:160,xtype: 'displayfield',fieldLabel: '进货点',name:'toPlaceName' }
    ,{x:20,y:200,xtype: 'displayfield',fieldLabel: '总成本',name: 'cost'}
    
    ,{x:20,y:240,xtype: 'displayfield',fieldLabel: '备注',name: 'note',grow:true,}
    ,{x:20,y:280,
      xtype: 'fieldcontainer',
      fieldLabel: '商品列表',
      layout:"hbox",
      name:'commoditiesList',
      id:'commoditiesList',
        items:[
         {
          xtype:'gridpanel',
          id:'leftList',
          name:'leftList',
          bind: '{leftList}',
          border:1,
          width:600,
          scrollable:true,
          
          
          columns:[
             {header: 'id' ,dataIndex:'id',width: 60,sortable: true,hidden:true}
            ,{header: '商品名称' ,dataIndex:'name',width: 60,sortable: true,flex:4}
            ,{header: '数量',dataIndex:'amount',width: 60,sortable: true,flex:1.5}
            ,{header: '单价',dataIndex:'cost',width: 60,sortable: true,flex:1.5}
            ,{header: '总价',dataIndex:'price',width: 60,sortable: true,flex:1.5}
           ],
          
        },
       ] 
    },
     {
      xtype:'container',
      x:350,//横坐标为距父容器左边缘10像素的位置
      y:0,
      //纵坐标为距父容器上边缘10像素的位置
      width:300,
      items: [
        
         
     
        //订单状态:默认为创建
        
        //订单类型:默认为订货单，枚举类型
        //{xtype: 'textfield',fieldLabel: 'indentType',name:'indentType',hidden: true,value:'1'}
        //订单编号：自动生成 随机
        {xtype: 'radiogroup',fieldLabel: '审批',labelWidth:50,
            items:[
              {boxLabel:'同意',name:'check',inputValue:true,width:70,checked:true},
              {boxLabel:'不同意',name:'check',inputValue:false,width:100}
            ]
          },
        {xtype: 'textareafield',fieldLabel: '备注',name:'reason',labelWidth:50,width:350,height:150,grow:false
            
          }  
        
        ]
    }



    ]
    }],
  buttons: ['->',{
        xtype: 'button',
        text: '提交',
        iconCls: 'fa fa-search',
        handler: 'submitIndentProcessWindow'
    },{
        xtype: 'button',
        text: '关闭',
        handler: function(btn) {
            Ext.getCmp('leftList').getStore().removeAll();
            btn.up('window').close();
        }
    },'->']
});